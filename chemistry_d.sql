-- Script de inicialización de base de datos para el proyecto "الكيمياء الحيوية"
-- Este script crea la base de datos y todas las tablas necesarias

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS chemistry_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Seleccionar la base de datos
USE chemistry_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de experimentos
CREATE TABLE IF NOT EXISTS experiments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de progreso de usuarios
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    experiment_id INT NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    score INT DEFAULT 0,
    feedback TEXT,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (experiment_id) REFERENCES experiments(id) ON DELETE CASCADE,
    UNIQUE KEY user_experiment (user_id, experiment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de chat de preguntas y respuestas
CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo para experimentos
INSERT INTO `experiments` (`title`, `description`, `difficulty`, `category`, `image_url`, `created_at`) VALUES
('تقييم اختبار الذوبانية', 'اختبار الذوبانية هو طريقة أساسية للتمييز بين الكربوهيدرات المختلفة باستخدام الماء كمذيب.\n', 'easy', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
('تقييم اختبار موليش', 'اختبار موليش هو اختبار عام لجميع الكربوهيدرات، يعتمد على تفاعل الكربوهيدرات مع حمض الكبريتيك المركز لإنتاج مشتقات الفورفورال.', 'medium', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
('تقييم اختبار تولنز', 'اختبار تولنز (اختبار مرآة الفضة) يُستخدم للكشف عن السكريات المختزلة التي تحتوي على مجموعة ألدهيد.', 'easy', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
('قييم اختبار اليود', 'اختبار اليود يُستخدم بشكل خاص للكشف عن وجود النشا.', 'hard', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
('تقييم اختبار الذوبانية', 'اختبار الذوبانية هو طريقة أساسية للتمييز بين الكربوهيدرات المختلفة باستخدام الماء كمذيب.\n', 'medium', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
('تقييم اختبار موليش\n', 'اختبار موليش هو اختبار عام لجميع الكربوهيدرات، يعتمد على تفاعل الكربوهيدرات مع حمض الكبريتيك المركز لإنتاج مشتقات الفورفورال.\n', 'medium', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21');

