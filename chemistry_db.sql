-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05 مايو 2025 الساعة 05:51
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chemistry_db`
--

-- --------------------------------------------------------

--
-- بنية الجدول `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `chat_history`
--

INSERT INTO `chat_history` (`id`, `user_id`, `question`, `answer`, `created_at`) VALUES
(1, 3, 'كيف تتكون الروابط الببتيدية؟', 'الروابط الببتيدية هي روابط كيميائية تتكون بين مجموعة الكربوكسيل لحمض أميني ومجموعة الأمين لحمض أميني آخر، مع فقدان جزيء ماء. هذه الروابط هي الأساس في تكوين البروتينات.', '2025-05-03 22:59:33'),
(2, 3, 'ما هي وظائف البروتينات في الجسم؟', 'البروتينات هي جزيئات كبيرة مكونة من سلاسل من الأحماض الأمينية. تقوم بوظائف متعددة في الجسم مثل الإنزيمات، النقل، الدعم الهيكلي، والمناعة.', '2025-05-03 23:03:45'),
(3, 3, 'ما هو الفرق بين DNA و RNA؟', 'الحمض النووي الريبوزي منقوص الأكسجين (DNA) هو جزيء يحمل المعلومات الوراثية لجميع الكائنات الحية. يتكون من شريطين ملتفين في شكل حلزوني مزدوج.', '2025-05-03 23:03:50'),
(4, 3, 'كيف تتكون الروابط الببتيدية؟', 'الروابط الببتيدية هي روابط كيميائية تتكون بين مجموعة الكربوكسيل لحمض أميني ومجموعة الأمين لحمض أميني آخر، مع فقدان جزيء ماء. هذه الروابط هي الأساس في تكوين البروتينات.', '2025-05-03 23:03:55'),
(5, 3, 'هلا', 'نظراً لحدوث مشكلة في الاتصال بالخادم، لا يمكنني الإجابة على سؤالك بشكل كامل الآن. يرجى إعادة المحاولة لاحقاً أو طرح سؤال آخر يتعلق بالكيمياء الحيوية.', '2025-05-03 23:04:07'),
(6, 3, 'ما هو الفرق بين DNA و RNA؟', 'الحمض النووي الريبوزي منقوص الأكسجين (DNA) هو جزيء يحمل المعلومات الوراثية لجميع الكائنات الحية. يتكون من شريطين ملتفين في شكل حلزوني مزدوج.', '2025-05-03 23:06:46'),
(7, 3, 'ما هي الإنزيمات؟', 'الإنزيمات هي بروتينات تعمل كمحفزات حيوية تسرع التفاعلات الكيميائية في الخلايا الحية. تقوم بخفض طاقة التنشيط للتفاعلات دون أن تستهلك أثناء التفاعل.', '2025-05-04 02:07:03'),
(8, 3, 'هلا', 'نظراً لحدوث مشكلة في الاتصال بالخادم، لا يمكنني الإجابة على سؤالك بشكل كامل الآن. يرجى إعادة المحاولة لاحقاً أو طرح سؤال آخر يتعلق بالكيمياء الحيوية.', '2025-05-04 02:07:22');

-- --------------------------------------------------------

--
-- بنية الجدول `experiments`
--

CREATE TABLE `experiments` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') DEFAULT 'medium',
  `category` varchar(50) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `experiments`
--

INSERT INTO `experiments` (`id`, `title`, `description`, `difficulty`, `category`, `image_url`, `created_at`) VALUES
(1, 'تقييم اختبار الذوبانية', 'اختبار الذوبانية هو طريقة أساسية للتمييز بين الكربوهيدرات المختلفة باستخدام الماء كمذيب.\n', 'easy', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
(2, 'تقييم اختبار موليش', 'اختبار موليش هو اختبار عام لجميع الكربوهيدرات، يعتمد على تفاعل الكربوهيدرات مع حمض الكبريتيك المركز لإنتاج مشتقات الفورفورال.', 'medium', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
(3, 'تقييم اختبار تولنز', 'اختبار تولنز (اختبار مرآة الفضة) يُستخدم للكشف عن السكريات المختزلة التي تحتوي على مجموعة ألدهيد.', 'easy', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
(4, 'قييم اختبار اليود', 'اختبار اليود يُستخدم بشكل خاص للكشف عن وجود النشا.', 'hard', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
(5, 'تقييم اختبار الذوبانية', 'اختبار الذوبانية هو طريقة أساسية للتمييز بين الكربوهيدرات المختلفة باستخدام الماء كمذيب.\n', 'medium', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21'),
(6, 'تقييم اختبار موليش\n', 'اختبار موليش هو اختبار عام لجميع الكربوهيدرات، يعتمد على تفاعل الكربوهيدرات مع حمض الكبريتيك المركز لإنتاج مشتقات الفورفورال.\n', 'medium', 'الكيمياء الحيوية', './images/experiments/1.png', '2025-05-03 22:09:21');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `role` enum('student','teacher','admin') DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive','banned') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fullname`, `role`, `created_at`, `last_login`, `status`) VALUES
(1, 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin@chemistry.edu', 'مدير النظام', 'admin', '2025-05-03 22:09:21', NULL, 'active'),
(2, 'student', '19b58543c85b97c5498edfd89c12f6093a6e3e2597c0c83426c651211432a42d', 'student@chemistry.edu', 'طالب نموذجي', 'student', '2025-05-03 22:09:21', NULL, 'active'),
(3, 'my', 'd688e7f05e8dba5bfd1973a591b602218be93e46a2eb045418b29c6bbc26c8e3', 'mo@gmail.com', 'mo', 'student', '2025-05-03 22:15:25', '2025-05-04 06:55:01', 'active'),
(4, 'mm', 'd688e7f05e8dba5bfd1973a591b602218be93e46a2eb045418b29c6bbc26c8e3', 'momopp2025@gmail.com', 'mm', 'student', '2025-05-04 23:42:39', '2025-05-05 03:39:44', 'active');

-- --------------------------------------------------------

--
-- بنية الجدول `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `experiment_id` int(11) NOT NULL,
  `status` enum('not_started','in_progress','completed') DEFAULT 'not_started',
  `score` int(11) DEFAULT 0,
  `feedback` text DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `experiments`
--
ALTER TABLE `experiments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_experiment` (`user_id`,`experiment_id`),
  ADD KEY `experiment_id` (`experiment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `experiments`
--
ALTER TABLE `experiments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `chat_history`
--
ALTER TABLE `chat_history`
  ADD CONSTRAINT `chat_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`experiment_id`) REFERENCES `experiments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
