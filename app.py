from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory
import mysql.connector
import os
import secrets
import hashlib
import re
from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv

# استيراد المساعد الذكي
from ai_assistant import get_ai_response

# محاولة استيراد خدمة المحاكاة المحلية
try:
    from local_ai_service import get_local_response
    LOCAL_SERVICE_AVAILABLE = True
    print("تم تحميل خدمة المحاكاة المحلية بنجاح")
except ImportError:
    LOCAL_SERVICE_AVAILABLE = False
    print("لم يتم العثور على خدمة المحاكاة المحلية")

# تحميل المتغيرات البيئية من ملف .env
load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')

# Configuración
app.secret_key = secrets.token_hex(16)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
app.config['SESSION_FILE_DIR'] = './sessions'

# Asegurarse de que el directorio de sesiones existe
os.makedirs('./sessions', exist_ok=True)

# Configuración de la base de datos MySQL desde variables de entorno
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),  # Usar contraseña desde .env o valor vacío por defecto
    'database': os.getenv('DB_NAME', 'chemistry_db'),
    'port': int(os.getenv('DB_PORT', 3306)),
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

# Función para obtener conexión a la base de datos
def get_db_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        print(f"Error al conectar a la base de datos: {err}")
        return None

# Función para verificar si la base de datos existe
def check_database():
    try:
        print("Intentando conectar a MySQL...")
        # Conectar sin especificar la base de datos
        conn = mysql.connector.connect(
            host=DB_CONFIG['host'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password']
        )
        print("Conexion a MySQL exitosa.")
        cursor = conn.cursor()
        
        # Verificar si la base de datos existe
        cursor.execute(f"SHOW DATABASES LIKE '{DB_CONFIG['database']}'") 
        result = cursor.fetchone()
        
        
        
        cursor.close()
        conn.close()
        
        return True
    except mysql.connector.Error as err:
        print(f"Error al verificar/crear la base de datos: {err}")
        return False


# Función para hashear contraseñas
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Decorador para rutas que requieren autenticación
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login_page'))
        return f(*args, **kwargs)
    return decorated_function

# Rutas estáticas para archivos HTML
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/login')
def login_page():
    return send_from_directory('.', 'login.html')

@app.route('/register')
def register_page():
    return send_from_directory('.', 'register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return send_from_directory('.', 'dashboard.html')

@app.route('/ai-assistant.html')
def ai_assistant():
    return send_from_directory('.', 'ai-assistant.html')

@app.route('/chemistry.html')
def chemistry():
    return send_from_directory('.', 'chemistry.html')

@app.route('/periodic-table.html')
def periodic_table():
    return send_from_directory('.', 'periodic-table.html')

# API para registro de usuarios
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Verificar datos requeridos
    required_fields = ['username', 'password', 'email', 'fullname']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'success': False, 'message': f'El campo {field} es requerido'})
    
    username = data['username']
    password = data['password']
    email = data['email']
    fullname = data['fullname']
    
    # Validar email
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'success': False, 'message': 'Email inválido'})
    
    # Validar longitud de contraseña
    if len(password) < 6:
        return jsonify({'success': False, 'message': 'La contraseña debe tener al menos 6 caracteres'})
    
    # Hash de contraseña
    hashed_password = hash_password(password)
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error al conectar a la base de datos'})
    
    try:
        cursor = conn.cursor()
        
        # Verificar si el usuario ya existe
        cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, email))
        existing_user = cursor.fetchone()
        
        if existing_user:
            return jsonify({'success': False, 'message': 'El nombre de usuario o email ya está en uso'})
        
        # Crear nuevo usuario
        cursor.execute(
            "INSERT INTO users (username, password, email, fullname) VALUES (%s, %s, %s, %s)",
            (username, hashed_password, email, fullname)
        )
        conn.commit()
        
        # Obtener ID del usuario recién creado
        user_id = cursor.lastrowid
        
        # Iniciar sesión
        session['user_id'] = user_id
        session['username'] = username
        session['fullname'] = fullname
        
        return jsonify({'success': True, 'redirect': '/dashboard'})
        
    except mysql.connector.Error as err:
        print(f"Error en el registro: {err}")
        return jsonify({'success': False, 'message': 'Error al registrar usuario'})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# API para inicio de sesión
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if 'username' not in data or 'password' not in data:
        return jsonify({'success': False, 'message': 'Usuario y contraseña son requeridos'})
    
    username = data['username']
    password = data['password']
    
    # Hash de contraseña
    hashed_password = hash_password(password)
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error al conectar a la base de datos'})
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Verificar credenciales
        cursor.execute(
            "SELECT id, username, fullname, email, role FROM users WHERE username = %s AND password = %s AND status = 'active'",
            (username, hashed_password)
        )
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'success': False, 'message': 'Usuario o contraseña incorrectos'})
        
        # Actualizar último inicio de sesión
        cursor.execute(
            "UPDATE users SET last_login = NOW() WHERE id = %s",
            (user['id'],)
        )
        conn.commit()
        
        # Iniciar sesión
        session['user_id'] = user['id']
        session['username'] = user['username']
        session['fullname'] = user['fullname']
        session['email'] = user['email']
        session['role'] = user['role']
        
        return jsonify({'success': True, 'redirect': '/dashboard'})
        
    except mysql.connector.Error as err:
        print(f"Error en el inicio de sesión: {err}")
        return jsonify({'success': False, 'message': 'Error al iniciar sesión'})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# API para cerrar sesión
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'redirect': '/login'})

# API para obtener información del usuario actual
@app.route('/api/user', methods=['GET'])
@login_required
def get_user():
    user_data = {
        'id': session.get('user_id'),
        'username': session.get('username'),
        'fullname': session.get('fullname'),
        'email': session.get('email'),
        'role': session.get('role')
    }
    
    return jsonify({'success': True, 'user': user_data})

# API para obtener experimentos
@app.route('/api/experiments', methods=['GET'])
@login_required
def get_experiments():
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error al conectar a la base de datos'})
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Obtener todos los experimentos
        cursor.execute("SELECT * FROM experiments ORDER BY created_at DESC")
        experiments = cursor.fetchall()
        
        return jsonify({
            'success': True,
            'experiments': experiments
        })
    except mysql.connector.Error as err:
        print(f"Error al obtener experimentos: {err}")
        return jsonify({'success': False, 'message': 'Error al obtener experimentos'})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# API para obtener el progreso del usuario
@app.route('/api/user/progress', methods=['GET'])
@login_required
def get_user_progress():
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error al conectar a la base de datos'})
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Obtener progreso del usuario con información del experimento
        cursor.execute("""
            SELECT up.*, e.title, e.description, e.difficulty, e.category, e.image_url 
            FROM user_progress up
            JOIN experiments e ON up.experiment_id = e.id
            WHERE up.user_id = %s
        """, (session['user_id'],))
        
        progress = cursor.fetchall()
        
        # Convertir timestamps a strings para serialización JSON
        for p in progress:
            if 'completed_at' in p and p['completed_at']:
                p['completed_at'] = p['completed_at'].isoformat()
        
        return jsonify({
            'success': True,
            'progress': progress
        })
    except mysql.connector.Error as err:
        print(f"Error al obtener progreso: {err}")
        return jsonify({'success': False, 'message': 'Error al obtener progreso'})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# API para chat con IA
@app.route('/api/chat', methods=['POST'])
@login_required
def chat():
    data = request.get_json()
    
    if 'question' not in data or not data['question']:
        return jsonify({'success': False, 'message': 'السؤال مطلوب'})
    
    question = data['question']
    
    # الحصول على تفضيلات الذكاء الاصطناعي (التفاصيل تدار في ai_assistant.py)
    provider = data.get('provider', None)  # مزود محدد (اختياري)
    provider_type = data.get('provider_type', None)  # نوع المزود المفضل ('deepseek' أو 'gamma')
    
    # تسجيل طلب المستخدم للتشخيص
    print(f"طلب جديد - السؤال: {question[:50]}... المزود: {provider} النوع: {provider_type}")
    
    try:
        # الحصول على استجابة من نموذج الذكاء الاصطناعي باستخدام الوحدة الخارجية
        # دعم معلمة provider_type الجديدة
        from ai_assistant import get_ai_response
        answer = get_ai_response(question, provider, provider_type)
        
        # تتبع مصدر الإجابة (مزود الذكاء الاصطناعي أو النظام المحلي)
        source = "AI"  # افتراضياً من مزود الذكاء الاصطناعي

        # التحقق من أن الإجابة من النظام المحلي
        if "تم استخدام نظام المحاكاة المحلي" in answer or "نظراً لحدوث مشكلة في الاتصال بالخادم" in answer:
            source = "LOCAL"
            print(f"تم استخدام النظام المحلي للإجابة على السؤال: {question[:50]}...")
        
        # حفظ المحادثة في قاعدة البيانات
        conn = get_db_connection()
        if conn:
            try:
                cursor = conn.cursor()
                # إضافة مصدر الإجابة للتحليل المستقبلي وتحسين قاعدة المعرفة المحلية
                cursor.execute(
                    "INSERT INTO chat_history (user_id, question, answer, source) VALUES (%s, %s, %s, %s)",
                    (session['user_id'], question, answer, source)
                )
                conn.commit()
            except mysql.connector.Error as err:
                print(f"خطأ في حفظ المحادثة: {err}")
            finally:
                if conn.is_connected():
                    cursor.close()
                    conn.close()
                    
        return jsonify({
            'success': True,
            'answer': answer,
            'source': source  # إضافة معلومات المصدر للواجهة
        })
        
    except Exception as e:
        print(f"خطأ أثناء معالجة السؤال: {str(e)}")
        
        # محاولة استخدام النظام المحلي مباشرة في حالة حدوث خطأ
        if LOCAL_SERVICE_AVAILABLE:
            try:
                # استيراد الدالة مباشرة من الوحدة المحلية
                from local_ai_service import get_local_response
                local_answer = get_local_response(question)
                
                # تسجيل استخدام النظام المحلي للتشخيص
                print(f"استخدام نظام الاحتياط المحلي للسؤال: {question[:50]}...")
                
                # حفظ الاستجابة المحلية في قاعدة البيانات
                conn = get_db_connection()
                if conn:
                    try:
                        cursor = conn.cursor()
                        cursor.execute(
                            "INSERT INTO chat_history (user_id, question, answer, source) VALUES (%s, %s, %s, %s)",
                            (session['user_id'], question, local_answer, "LOCAL_FALLBACK")
                        )
                        conn.commit()
                    except mysql.connector.Error as err:
                        print(f"خطأ في حفظ المحادثة المحلية: {err}")
                    finally:
                        if conn.is_connected():
                            cursor.close()
                            conn.close()
                
                return jsonify({
                    'success': True,
                    'answer': local_answer,
                    'source': 'LOCAL_FALLBACK'
                })
                
            except Exception as local_error:
                print(f"خطأ في استخدام النظام المحلي: {str(local_error)}")
        
        # في حالة فشل كل المحاولات
        return jsonify({
            'success': False,
            'message': 'حدث خطأ أثناء معالجة السؤال',
            'error': str(e)
        })

# API para obtener historial de chat
@app.route('/api/chat/history', methods=['GET'])
@login_required
def get_chat_history():
    conn = get_db_connection()
    if not conn:
        return jsonify({'success': False, 'message': 'Error al conectar a la base de datos'})
    
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT id, question, answer, source, created_at FROM chat_history WHERE user_id = %s ORDER BY created_at DESC LIMIT 50",
            (session['user_id'],)
        )
        history = cursor.fetchall()
        
        # تعديل البيانات للتوافق مع JSON
        for item in history:
            if 'created_at' in item and item['created_at']:
                item['created_at'] = item['created_at'].isoformat()
        
        return jsonify({
            'success': True,
            'history': history
        })
    except mysql.connector.Error as err:
        print(f"Error al obtener historial: {err}")
        return jsonify({'success': False, 'message': 'Error al obtener historial'})
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# Inicializar la base de datos al arrancar
@app.before_first_request
def initialize_database():
    check_database()

# Si se ejecuta como programa principal
if __name__ == '__main__':
    # Asegurarse de que la base de datos y tablas existan
    check_database()
    
    # Iniciar el servidor de desarrollo
    app.run(
        host='0.0.0.0',  # Escuchar en todas las interfaces de red
        port=5000,       # Puerto por defecto
        debug=True       # Habilitar modo de depuración
    )
