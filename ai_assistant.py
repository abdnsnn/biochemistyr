
import os
import json
import time
import random
import logging
import requests
import openai
import tiktoken
from datetime import datetime
from collections import deque
from typing import Dict, List, Optional, Union, TypedDict, Tuple
from dotenv import load_dotenv
import pathlib

# استيراد خدمة المحاكاة المحلية
try:
    from local_ai_service import get_local_response
    LOCAL_SERVICE_AVAILABLE = True
    print("تم تحميل نظام المحاكاة المحلي بنجاح")
except ImportError as e:
    LOCAL_SERVICE_AVAILABLE = False
    print(f"تعذر تحميل نظام المحاكاة المحلي: {str(e)}")

# تحديد المسار إلى ملف .env
current_dir = pathlib.Path(__file__).parent.absolute()
env_path = os.path.join(current_dir, '.env')

# تحميل المتغيرات البيئية من ملف .env
env_loaded = load_dotenv(env_path)

# تعريف أنواع الرسائل باستخدام TypedDict
class Message(TypedDict):
    """نوع الرسالة المستخدم في المحادثات"""
    role: str        # نوع الرسالة: 'system', 'user', أو 'assistant'
    content: str     # محتوى الرسالة النصي

# التحقق من تحميل ملف .env بنجاح
if not env_loaded:
    print(f"تحذير: لم يتم العثور على ملف .env في المسار {env_path}")
    print("جاري البحث عن المتغيرات البيئية في النظام...")

# إعداد التسجيل
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("ai_assistant.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("ai_assistant")

# طباعة حالة المتغيرات البيئية للتشخيص
print(f"DEEPSEEK_API_KEY: {'موجود' if os.getenv('DEEPSEEK_API_KEY') else 'غير موجود'}")
print(f"GAMMA_API_KEY: {'موجود' if os.getenv('GAMMA_API_KEY') else 'غير موجود'}")

# تكوين واجهات برمجة تطبيقات الذكاء الاصطناعي
# تعريف مزودي الذكاء الاصطناعي مع إصدارات متعددة لكل مزود
AI_PROVIDERS = {
    # إصدارات DeepSeek
    'deepseek': {
        'name': 'DeepSeek AI',
        'api_url': 'https://api.deepseek.com/v1/chat/completions',
        'api_key': os.getenv('DEEPSEEK_API_KEY', ''),
        'model': 'deepseek-chat',
        'system_prompt': 'أنت مساعد ذكي متخصص في الكيمياء الحيوية. مهمتك هي مساعدة الطلاب والباحثين على فهم مفاهيم الكيمياء الحيوية والإجابة على أسئلتهم بشكل دقيق ومفهوم. أجب باللغة العربية بشكل واضح ومبسط.',
        'available': False  # سيتم تحديثه عند الاختبار
    },
    'deepseek-llama': {
        'name': 'DeepSeek Llama',
        'api_url': 'https://api.deepseek.com/v1/chat/completions',
        'api_key': os.getenv('DEEPSEEK_API_KEY', ''),
        'model': 'deepseek-llama-67b',
        'system_prompt': 'أنت مساعد متخصص في الكيمياء الحيوية وعلم الأحياء الجزيئي. مهمتك تقديم شروحات مفصلة ودقيقة عن المفاهيم المعقدة في الكيمياء الحيوية باللغة العربية الواضحة.',
        'available': False
    },
    'deepseek-coder': {
        'name': 'DeepSeek Coder',
        'api_url': 'https://api.deepseek.com/v1/chat/completions',
        'api_key': os.getenv('DEEPSEEK_API_KEY', ''),
        'model': 'deepseek-coder',
        'system_prompt': 'أنت مساعد برمجة متخصص في مجال علوم البيانات والكيمياء الحسابية. مهمتك مساعدة الطلاب والباحثين في كتابة السكربتات والبرامج التي تساعد في تحليل البيانات ونمذجة الجزيئات الحيوية. الإجابة باللغة العربية.',
        'available': False
    },
    
    # إصدارات Gamma AI
    'gamma': {
        'name': 'Gamma AI',
        'api_url': 'https://api.getgamma.dev/v1/chat/completions',
        'api_key': os.getenv('GAMMA_API_KEY', ''),
        'model': 'gamma-7b',
        'system_prompt': 'أنت مساعد ذكي متخصص في الكيمياء الحيوية. مهمتك هي مساعدة الطلاب والباحثين على فهم مفاهيم الكيمياء الحيوية والإجابة على أسئلتهم بشكل دقيق ومفهوم. أجب باللغة العربية بشكل واضح ومبسط.',
        'available': False  # سيتم تحديثه عند الاختبار
    },
    'gamma-mini': {
        'name': 'Gamma AI Mini',
        'api_url': 'https://api.getgamma.dev/v1/completions',
        'api_key': os.getenv('GAMMA_API_KEY', ''),
        'model': 'gamma-mini',
        'system_prompt': 'أنت مساعد ذكي متخصص في الكيمياء الحيوية. أجب بشكل موجز ودقيق باللغة العربية.',
        'available': False
    },
    'gamma-api': {
        'name': 'Gamma API Alternative',
        'api_url': 'https://gamma.dev/api/chat/completions',  # عنوان URL بديل للواجهة
        'api_key': os.getenv('GAMMA_API_KEY', ''),
        'model': 'gamma-api',
        'system_prompt': 'أنت مساعد متخصص باللغة العربية للكيمياء الحيوية. قدم شروحات علمية دقيقة.',
        'available': False
    }
}

# ردود احتياطية للأسئلة الشائعة عن الكيمياء الحيوية
FALLBACK_RESPONSES = {
    'إنزيم': 'الإنزيمات هي بروتينات تعمل كمحفزات حيوية تسرع التفاعلات الكيميائية في الخلايا الحية. تقوم بخفض طاقة التنشيط للتفاعلات دون أن تستهلك أثناء التفاعل.',
    'بروتين': 'البروتينات هي جزيئات كبيرة مكونة من سلاسل من الأحماض الأمينية. تقوم بوظائف متعددة في الجسم مثل الإنزيمات، النقل، الدعم الهيكلي، والمناعة.',
    'DNA': 'الحمض النووي الريبوزي منقوص الأكسجين (DNA) هو جزيء يحمل المعلومات الوراثية لجميع الكائنات الحية. يتكون من شريطين ملتفين في شكل حلزوني مزدوج.',
    'RNA': 'الحمض النووي الريبوزي (RNA) هو جزيء أحادي الشريط يلعب دوراً في نقل المعلومات الوراثية من DNA إلى البروتينات وله أنواع متعددة مثل mRNA وtRNA وrRNA.',
    'كريبس': 'دورة كريبس (دورة حمض الستريك) هي سلسلة من التفاعلات الكيميائية الحيوية التي تحدث في الميتوكوندريا لأكسدة الأسيتيل كوانزيم أ وإنتاج NADH وFADH2 وATP.',
    'ببتيد': 'الروابط الببتيدية هي روابط كيميائية تتكون بين مجموعة الكربوكسيل لحمض أميني ومجموعة الأمين لحمض أميني آخر، مع فقدان جزيء ماء. هذه الروابط هي الأساس في تكوين البروتينات.',
    'تمثيل غذائي': 'التمثيل الغذائي (الأيض) هو مجموعة التفاعلات الكيميائية التي تحدث في الخلايا الحية للحفاظ على الحياة. يشمل عمليات الهدم (الكاتابوليزم) والبناء (الأنابوليزم).',
    'بروتين سكري': 'البروتينات السكرية هي جزيئات تتكون من بروتين مرتبط بواحد أو أكثر من السكريات. تلعب دوراً مهماً في التعرف الخلوي والاتصال بين الخلايا وتوجد بكثرة على سطح الخلية.',
    'عملية التنفس الخلوي': 'التنفس الخلوي هو مجموعة من التفاعلات الحيوية التي تحول الجلوكوز والأكسجين إلى ثاني أكسيد الكربون وماء، مع إنتاج ATP كمصدر للطاقة. تشمل عملية التنفس الخلوي: تحلل الجلوكوز، دورة كريبس، وسلسلة نقل الإلكترون.',
    'البناء الضوئي': 'البناء الضوئي هو عملية تحويل الطاقة الضوئية إلى طاقة كيميائية في النباتات والطحالب والبكتيريا الزرقاء. خلال هذه العملية، يتم استخدام ثاني أكسيد الكربون والماء لإنتاج الجلوكوز والأكسجين باستخدام الطاقة الضوئية.',
    'الحمض الأميني': 'الأحماض الأمينية هي اللبنات الأساسية للبروتينات. تتكون من مجموعة أمين (-NH2)، مجموعة كربوكسيل (-COOH)، ذرة هيدروجين، ومجموعة جانبية (R) تختلف من حمض أميني لآخر. هناك 20 حمضاً أمينياً أساسياً تدخل في تركيب البروتينات.'
}

# تكوين إعدادات معالجة الأخطاء

# رسالة الخطأ الافتراضية
DEFAULT_ERROR_MESSAGE = "نظراً لحدوث مشكلة في الاتصال بالخادم، لا يمكنني الإجابة على سؤالك بشكل كامل الآن. يرجى إعادة المحاولة لاحقاً أو طرح سؤال آخر يتعلق بالكيمياء الحيوية."

# الوضع المحلي (للعمل دون اتصال بالإنترنت)
LOCAL_MODE_ENABLED =True #True  False 

# مدة الاتصال بالمزودين (بالثواني)
API_TIMEOUT = 411  # مدة انتظار الاستجابة من واجهات برمجة التطبيقات

# عدد المحاولات الأقصى للاتصال بمزودي الذكاء الاصطناعي
MAX_RETRY_ATTEMPTS = 10


class AIAssistant:
    """فئة المساعد الذكي للكيمياء الحيوية"""
    
    def __init__(self):
        """تهيئة المساعد وفحص توفر مزودي الذكاء الاصطناعي
        
        تقوم بتهيئة المتغيرات اللازمة لعمل المساعد وتتحقق من توفر مزودي الذكاء الاصطناعي
        """
        # تهيئة المتغيرات اللازمة للمزودين
        self.check_available_providers()
        self.last_provider_check = datetime.now()
        self.available_providers = []
        self.current_provider = None
        
        # تهيئة المتغيرات اللازمة لحساب التوكنز (tokens)
        self.max_context_tokens = 4000  # الحد الأقصى لعدد التوكنز المسموح به
        self.max_response_tokens = 1000  # الحد الأقصى لعدد التوكنز في الرد
        self.messages_history = deque()  # استخدام deque لتخزين الرسائل بكفاءة أكبر
        
        # تهيئة إنكودنغ مرة واحدة لاستخدامه لاحقًا
        try:
            self.encoding = tiktoken.encoding_for_model('gpt-3.5-turbo')
        except Exception as e:
            self.encoding = None
            logger.warning(f"تعذر تهيئة إنكودنغ لحساب التوكنز: {str(e)}")
        
        # تحديث قائمة المزودين المتاحين
        self.update_available_providers()
    
    def check_available_providers(self):
        """فحص توفر كل مزود ذكاء اصطناعي مع إصداراته المختلفة"""
        
        # التحقق أولاً من المفاتيح الرئيسية - DeepSeek و Gamma
        deepseek_key = os.getenv('DEEPSEEK_API_KEY', '')
        gamma_key = os.getenv('GAMMA_API_KEY', '')
        
        # طباعة معلومات عن المفاتيح للتشخيص
        if deepseek_key:
            logger.info(f"DeepSeek API Key: موجود بطول {len(deepseek_key)} حرف")
        else:
            logger.warning("DeepSeek API Key: غير موجود")
            
        if gamma_key:
            logger.info(f"Gamma API Key: موجود بطول {len(gamma_key)} حرف")
        else:
            logger.warning("Gamma API Key: غير موجود")
        
        # فحص كل مزود
        for provider_id, provider in AI_PROVIDERS.items():
            # تحديد نوع المزود (إما DeepSeek أو Gamma)
            provider_type = provider_id.split('-')[0] if '-' in provider_id else provider_id
            
            # اختبار فيما إذا كان المفتاح موجودًا وبطول معقول
            api_key = provider['api_key']
            
            if not api_key or len(api_key.strip()) < 10:
                provider['available'] = False
                logger.warning(f"مزود الذكاء الاصطناعي {provider['name']} غير متاح. مفتاح API غير موجود أو غير صالح.")
                continue
            
            # التحقق من تنسيق المفتاح بناءً على المزود
            if provider_type == 'deepseek':
                if not api_key.startswith('sk-'):
                    logger.warning(f"تنسيق مفتاح {provider['name']} غير صحيح. يجب أن يبدأ بـ 'sk-'")
                    provider['available'] = False
                    continue
            
            # التحقق من وجود مشاكل معروفة مع URL معينة
            problem_domains = [
                'api.getgamma.dev',   # مشكلة معروفة مع هذا النطاق
            ]
            
            base_domain = provider['api_url'].split('/')[2]
            if base_domain in problem_domains:
                logger.warning(f"تعطيل مزود {provider['name']} بسبب مشاكل معروفة مع النطاق {base_domain}")
                provider['available'] = False
                continue
                
            # اختبار بسيط للاتصال بالنطاق الرئيسي للتحقق من إمكانية الوصول للإنترنت
            try:
                # التحقق من إمكانية حل اسم النطاق فقط
                import socket
                socket.gethostbyname(base_domain)
                provider['available'] = True
                logger.info(f"تم تأكيد إمكانية الوصول إلى نطاق {base_domain} لمزود {provider['name']}")
            except socket.gaierror:
                provider['available'] = False
                logger.warning(f"تعذر حل اسم النطاق {base_domain} لمزود {provider['name']}. قد تكون هناك مشكلة في الاتصال بالإنترنت.")
            
        # فحص الأولويات بين الإصدارات المتعددة
        providers_counts = {
            'deepseek': 0,
            'gamma': 0
        }
        
        # عد المزودين المتاحين من كل نوع
        for provider_id, provider in AI_PROVIDERS.items():
            if provider['available']:
                provider_type = provider_id.split('-')[0] if '-' in provider_id else provider_id
                if provider_type in providers_counts:
                    providers_counts[provider_type] += 1
        
        # عرض ملخص للمزودين المتاحين
        for provider_type, count in providers_counts.items():
            logger.info(f"عدد مزودي {provider_type} المتاحين: {count}")
    
    def update_available_providers(self):
        """تحديث قائمة مزودي الذكاء الاصطناعي المتاحين"""
        # إعادة فحص المزودين كل ساعة
        current_time = datetime.now()
        if (current_time - self.last_provider_check).total_seconds() > 3600:
            self.check_available_providers()
            self.last_provider_check = current_time
        
        # تحديث قائمة المزودين المتاحين
        self.available_providers = [provider_id for provider_id, provider in AI_PROVIDERS.items() if provider['available']]
        
        if not self.available_providers:
            logger.warning("لا يوجد مزودي ذكاء اصطناعي متاحين. سيتم استخدام الردود الاحتياطية.")
    
    def select_provider(self, preferred_type=None):
        """
        اختيار مزود ذكاء اصطناعي متاح بشكل عشوائي
        
        المعلمات:
            preferred_type (str، اختياري): نوع المزود المفضل - 'deepseek' أو 'gamma'
        
        العائد:
            str: معرف المزود المختار أو None إذا لم يوجد مزود متاح
        """
        self.update_available_providers()
        
        if not self.available_providers:
            self.current_provider = None
            logger.warning("لا يوجد مزودي ذكاء اصطناعي متاحين")
            return None
        
        # إذا تم تحديد نوع مفضل، حاول البحث عن مزودين من هذا النوع
        if preferred_type:
            # الحصول على جميع مزودي الذكاء الاصطناعي المتاحين من النوع المطلوب
            filtered_providers = [p for p in self.available_providers if p.startswith(preferred_type)]
            if filtered_providers:
                # اختيار مزود عشوائي من النوع المفضل
                self.current_provider = random.choice(filtered_providers)
                logger.info(f"تم اختيار مزود الذكاء الاصطناعي المفضل: {AI_PROVIDERS[self.current_provider]['name']}")
                return self.current_provider
        
        # اختيار عشوائي من جميع المزودين المتاحين
        self.current_provider = random.choice(self.available_providers)
        logger.info(f"تم اختيار مزود الذكاء الاصطناعي: {AI_PROVIDERS[self.current_provider]['name']}")
        return self.current_provider
    
    def get_fallback_response(self, question):
        """الحصول على رد احتياطي للسؤال"""
        
        # استخدام نظام المحاكاة المحلي أولاً إذا كان متاحاً
        if LOCAL_MODE_ENABLED and LOCAL_SERVICE_AVAILABLE:
            try:
                local_response = get_local_response(question)
                logger.info("تم استخدام نظام المحاكاة المحلي للحصول على إجابة")
                return local_response
            except Exception as e:
                logger.error(f"خطأ في نظام المحاكاة المحلي: {str(e)}")
                # متابعة إلى خطة الاحتياط التالية
                pass
        
        # التحقق من تطابق السؤال مع أي كلمة مفتاحية
        for keyword, response in FALLBACK_RESPONSES.items():
            if keyword in question.lower():
                logger.info(f"تم العثور على كلمة مفتاحية '{keyword}' في السؤال")
                return response
        
        # إرجاع رسالة الخطأ الافتراضية إذا لم يكن هناك تطابق
        logger.warning("لم يتم العثور على إجابة مناسبة، استخدام رسالة الخطأ الافتراضية")
        return DEFAULT_ERROR_MESSAGE
    
    def count_tokens(self, messages: List[Message]) -> int:
        """حساب عدد التوكنز في مجموعة من الرسائل
        
        المعلمات:
            messages (List[Message]): قائمة الرسائل لحساب عدد التوكنز فيها
            
        العائد:
            int: عدد التوكنز الكلي
        """
        # التحقق من أن الإنكودنغ تم تهيئته بنجاح
        if not self.encoding:
            # إذا لم يتم تهيئة الإنكودنغ، استخدم تقديرًا تقريبيًا (عدد الأحرف مقسومًا على 4)
            total_chars = sum(len(msg['content']) for msg in messages)
            return total_chars // 4
        
        # حساب عدد التوكنز لكل رسالة
        num_tokens = 0
        for message in messages:
            # إضافة توكنز لكل رسالة (3 توكنز للبيانات الوصفية)
            num_tokens += 3
            # إضافة توكنز لمحتوى الرسالة
            num_tokens += len(self.encoding.encode(message['content']))
        
        # إضافة توكنز إضافية للنموذج
        num_tokens += 3  # لبداية الصيغة
        
        return num_tokens
        
    def trim_messages_history(self, messages: List[Message], system_prompt: str) -> List[Message]:
        """تقليص تاريخ الرسائل للالتزام بالحد الأقصى لعدد التوكنز
        
        المعلمات:
            messages (List[Message]): قائمة الرسائل الحالية
            system_prompt (str): رسالة النظام التي يجب الاحتفاظ بها
            
        العائد:
            List[Message]: قائمة الرسائل بعد التقليص
        """
        # إعداد رسالة النظام
        trimmed_messages = [{
            'role': 'system',
            'content': system_prompt
        }]
        
        # إضافة رسائل المستخدم والمساعد بترتيب زمني
        user_assistant_messages = [msg for msg in messages if msg['role'] in ['user', 'assistant']]
        
        # تبدأ بكل الرسائل وتزيل أقدم أزواج الرسائل حتى تصبح ضمن الحدود
        while user_assistant_messages:
            # إضافة رسائل المستخدم والمساعد إلى الرسائل المقلصة
            potential_messages = trimmed_messages + user_assistant_messages
            
            # حساب عدد التوكنز الإجمالي
            total_tokens = self.count_tokens(potential_messages)
            
            # التحقق من أن عدد التوكنز لا يتجاوز الحد الأقصى مع مراعاة الرد
            if total_tokens <= (self.max_context_tokens - self.max_response_tokens):
                return potential_messages
                
            # إذا كان عدد التوكنز كبيرًا جدًا، قم بإزالة أقدم زوج من رسائل المستخدم والمساعد
            # حذف زوج من الرسائل (سؤال وجواب) للحفاظ على سياق المحادثة
            if len(user_assistant_messages) >= 2:
                # إزالة أقدم زوج من الرسائل (سؤال ثم جواب)
                user_assistant_messages.pop(0)  # حذف أقدم رسالة مستخدم
                if user_assistant_messages and user_assistant_messages[0]['role'] == 'assistant':
                    user_assistant_messages.pop(0)  # حذف أقدم رد مساعد مرتبط
            else:
                # إذا لم يكن هناك ما يكفي من الرسائل للحذف، فقط احتفظ برسالة النظام وآخر رسالة مستخدم
                return trimmed_messages + user_assistant_messages[-1:]
                
        # إذا لم يكن هناك رسائل متبقية، فقط أرجع رسالة النظام
        return trimmed_messages
    
    def get_response(self, question, provider_id=None, provider_type=None):
        """الحصول على إجابة للسؤال من مزود الذكاء الاصطناعي
        
        المعلمات:
            question (str): سؤال المستخدم
            provider_id (str, optional): معرف مزود محدد للاستخدام. Defaults to None.
            provider_type (str, optional): نوع مزود محدد (deepseek أو gamma). Defaults to None.
            
        العائد:
            str: إجابة السؤال أو رسالة خطأ
        """
        # التحقق من أن السؤال ليس فارغًا
        if not question or not isinstance(question, str) or question.strip() == "":
            logger.warning("تم استلام سؤال فارغ")
            return "الرسالة فارغة. الرجاء إدخال نص صحيح."
        
        # تسجيل السؤال لأغراض التشخيص
        logger.info(f"سؤال جديد: {question[:50]}...")
        
        # التحقق من صلاحية تحديث قائمة المزودين المتاحين
        current_time = datetime.now()
        time_diff = (current_time - self.last_provider_check).total_seconds()
        if time_diff > PROVIDER_CHECK_INTERVAL:
            self.update_available_providers()

        # محاولة استخدام مزود محدد
        if provider_id:
            if provider_id in [p['id'] for p in self.available_providers]:
                provider = next(p for p in self.available_providers if p['id'] == provider_id)
                try:
                    response = self.query_provider(question, provider)
                    if response:
                        return response
                except Exception as e:
                    logger.error(f"فشل الاتصال بالمزود المحدد: {provider_id}, الخطأ: {str(e)}")
            else:
                logger.warning(f"المزود المحدد غير متاح: {provider_id}")

        # اختيار مزود بناءً على نوع محدد
        self.current_provider = self.select_provider(provider_type)
        if self.current_provider:
            logger.info(f"تم اختيار مزود: {self.current_provider} من نوع {provider_type if provider_type else 'غير محدد'}")
        
        # إذا لم يكن هناك مزود متاح، استخدم الرد الاحتياطي
        if not self.current_provider:
            logger.warning("استخدام الرد الاحتياطي لعدم توفر مزودي الذكاء الاصطناعي")
            # إذا كان الوضع المحلي ممكنًا
            if LOCAL_MODE_ENABLED and LOCAL_SERVICE_AVAILABLE:
                try:
                    from local_ai_service import get_local_response
                    return get_local_response(question)
                except Exception as e:
                    logger.error(f"فشل الخدمة المحلية: {str(e)}")
            return self.get_fallback_response(question)
        
        # تحديد عدد المحاولات الأقصى للاتصال بمزودي الذكاء الاصطناعي
        tried_providers = set()
        
        for attempt in range(MAX_RETRY_ATTEMPTS):
            if self.current_provider in tried_providers:
                # تجنب تكرار نفس المزود
                other_providers = [p['id'] for p in self.available_providers if p['id'] not in tried_providers]
                if not other_providers:
                    logger.warning("تم استنفاد جميع مزودي الذكاء الاصطناعي المتاحين")
                    # استخدام الخدمة المحلية كملاذ أخير
                    if LOCAL_MODE_ENABLED and LOCAL_SERVICE_AVAILABLE:
                        try:
                            from local_ai_service import get_local_response
                            return get_local_response(question)
                        except Exception as e:
                            logger.error(f"فشل الخدمة المحلية: {str(e)}")
                    return self.get_fallback_response(question)
                self.current_provider = random.choice(other_providers)
            
            tried_providers.add(self.current_provider)
            provider = next(p for p in self.available_providers if p['id'] == self.current_provider)
            
            # استخراج نوع المزود (إما deepseek أو gamma أو غيرهما)
            provider_type = self.current_provider.split('-')[0] if '-' in self.current_provider else self.current_provider
            
            try:
                # تقليل مهلة الانتظار للكشف السريع عن مشكلات الاتصال
                timeout = API_TIMEOUT
                
                # إعداد رسائل المحادثة مع تقليص السياق بذكاء
                conversation_history = list(self.messages_history)
                system_prompt = provider.get('system_prompt', SYSTEM_PROMPT)
                
                # إضافة السؤال الحالي إلى المحادثة
                conversation_history.append({
                    'role': 'user',
                    'content': question
                })
                
                # تقليص الرسائل للالتزام بالحد الأقصى لعدد التوكنز
                trimmed_messages = self.trim_messages_history(conversation_history, system_prompt)
                
                # تسجيل معلومات عن عدد التوكنز المستخدمة
                token_count = self.count_tokens(trimmed_messages)
                logger.info(f"عدد التوكنز المستخدمة: {token_count} (الحد الأقصى: {self.max_context_tokens})")
                
                # إعداد الطلب بناءً على نوع المزود
                if provider_type == 'deepseek':
                    headers = {
                        'Content-Type': 'application/json',
                        'Authorization': f"Bearer {provider['api_key']}"
                    }
                    
                    payload = {
                        'model': provider['model'],
                        'messages': trimmed_messages,
                        'max_tokens': self.max_response_tokens,
                        'temperature': 0.7
                    }
                elif provider_type == 'gamma':
                    headers = {
                        'Content-Type': 'application/json',
                        'X-API-KEY': provider['api_key']
                    }
                    
                    # تحقق مما إذا كان Gamma يستخدم تنسيق OpenAI أو تنسيق مخصص
                    if provider.get('openai_compatible', True):
                        payload = {
                            'model': provider['model'],
                            'messages': trimmed_messages,
                            'max_tokens': self.max_response_tokens,
                            'temperature': 0.7
                        }
                    else:
                        # بناء السياق من الرسائل المقلصة
                        context = ""
                        for msg in trimmed_messages:
                            if msg['role'] == 'system':
                                context += f"{msg['content']}\n\n"
                            elif msg['role'] == 'user':
                                context += f"سؤال: {msg['content']}\n"
                            elif msg['role'] == 'assistant':
                                context += f"جواب: {msg['content']}\n\n"
                        
                        payload = {
                            'prompt': f"{context}\nجواب:",
                            'max_tokens': self.max_response_tokens,
                            'temperature': 0.7
                        }
                else:  # مزود آخر غير معروف، استخدم تنسيق مشابه لـ OpenAI
                    headers = {
                        'Content-Type': 'application/json'
                    }
                    
                    # إضافة مفتاح API إلى الرأس حسب إعدادات المزود
                    if provider.get('auth_header'):
                        headers[provider['auth_header']] = provider['api_key']
                    
                    payload = {
                        'model': provider['model'],
                        'messages': trimmed_messages,
                        'max_tokens': self.max_response_tokens,
                        'temperature': 0.7
                    }
                    
                    # إضافة مفتاح API إلى الطلب إذا كان المزود يتطلب ذلك
                    if not provider.get('auth_header') and provider.get('api_key_in_body', False):
                        payload['api_key'] = provider['api_key']
                
                logger.info(f"إرسال سؤال إلى {provider['name']}: {question[:50]}...")
                
                # إضافة إدارة الاستثناءات المحددة للشبكة لتشخيص المشكلة بدقة أكبر
                try:
                    # إرسال الطلب إلى واجهة برمجة التطبيقات
                    response = requests.post(
                        provider['api_url'],
                        headers=headers,
                        json=payload,
                        timeout=timeout
                    )
                    
                    # التحقق من رمز الحالة
                    if response.status_code == 200:
                        try:
                            response_data = response.json()
                            answer = None
                            
                            # استخراج الإجابة بناءً على نوع المزود
                            if provider_type == 'deepseek':
                                if 'choices' in response_data and len(response_data['choices']) > 0:
                                    answer = response_data['choices'][0]['message']['content']
                            elif provider_type == 'gamma':
                                if provider.get('openai_compatible', True):
                                    if 'choices' in response_data and len(response_data['choices']) > 0:
                                        answer = response_data['choices'][0]['message']['content']
                                elif 'generation' in response_data:
                                    answer = response_data['generation']
                            else:
                                # محاولة عامة للعثور على الإجابة
                                if 'choices' in response_data and len(response_data['choices']) > 0:
                                    if 'message' in response_data['choices'][0]:
                                        answer = response_data['choices'][0]['message'].get('content', '')
                                    elif 'text' in response_data['choices'][0]:
                                        answer = response_data['choices'][0]['text']
                            
                            # محاولات إضافية للعثور على الإجابة
                            if not answer:
                                for key in ['text', 'content', 'answer', 'message', 'response', 'generated_text']:
                                    if key in response_data and isinstance(response_data[key], str):
                                        answer = response_data[key]
                                        break
                            
                            # إذا كانت الاستجابة نفسها نصًا
                            if not answer and isinstance(response_data, str) and len(response_data) > 10:
                                answer = response_data
                            
                            # إذا تم العثور على إجابة
                            if answer:
                                # إضافة السؤال والجواب إلى سجل المحادثة
                                self.messages_history.append({'role': 'user', 'content': question})
                                self.messages_history.append({'role': 'assistant', 'content': answer})
                                
                                # تقليم الإجابة إذا كانت طويلة جدًا
                                if len(answer) > 4000:
                                    answer = answer[:4000] + "..." 
                                
                                logger.info(f"تم استخراج الإجابة بنجاح من {provider['name']} بطول {len(answer)} حرف")
                                return answer.strip()
                            else:
                                logger.warning(f"تنسيق استجابة غير متوقع من {provider['name']}: {response_data}")
                        except (ValueError, json.JSONDecodeError) as json_err:
                            logger.error(f"خطأ في تحليل استجابة JSON من {provider['name']}: {str(json_err)}")
                    else:
                        logger.error(f"رمز حالة HTTP غير ناجح من {provider['name']}: {response.status_code}, {response.text[:200]}")
                except requests.exceptions.ConnectionError as conn_err:
                    logger.error(f"خطأ اتصال بـ {provider['name']}: {str(conn_err)}")
                except requests.exceptions.Timeout as timeout_err:
                    logger.error(f"انتهت مهلة الاتصال بـ {provider['name']}: {str(timeout_err)}")
                except requests.exceptions.RequestException as req_err:
                    logger.error(f"خطأ في طلب {provider['name']}: {str(req_err)}")
                        
            except Exception as e:
                logger.error(f"خطأ عند طلب الإجابة من {provider['name']}: {str(e)}")
                continue  # تجربة مزود آخر
        
        # إذا وصلنا إلى هنا، فقد فشلت جميع المحاولات
        logger.warning("فشلت جميع محاولات الاتصال بمزودي الذكاء الاصطناعي، استخدام الإجابة الاحتياطية")
        return self.get_fallback_response(question)


# إنشاء نسخة واحدة من المساعد للاستخدام في جميع أنحاء التطبيق
assistant = AIAssistant()


def get_ai_response(question, provider_id=None):
    """
    الحصول على إجابة لسؤال عن الكيمياء الحيوية
    
    المعلمات:
        question (str): سؤال المستخدم
        provider_id (str، اختياري): معرف مزود الذكاء الاصطناعي المحدد
        
    العائد:
        str: إجابة المساعد الذكي
    """
    return assistant.get_response(question, provider_id)
