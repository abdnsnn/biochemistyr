/**
 * ملف جافاسكريبت لإدارة اكتمال التجربة وعرض زر تقييم الذكاء الاصطناعي
 */

$(document).ready(function() {
    // إضافة زر التقييم (مخفي بشكل افتراضي)
    const evaluationButton = $('<button>')
        .attr('id', 'showAIEvaluation')
        .html('<i class="fas fa-brain"></i> عرض تقييم الذكاء الاصطناعي')
        .css({
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            padding: '10px 20px',
            background: 'linear-gradient(45deg, #3498db, #2980b9)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'none', // مخفي بشكل افتراضي
            transition: 'all 0.3s ease'
        })
        .hover(
            function() { $(this).css('transform', 'translateX(-50%) scale(1.05)'); },
            function() { $(this).css('transform', 'translateX(-50%)'); }
        )
        .click(function() {
            // إرسال رسالة إلى الصفحة الأم لعرض التقييم
            sendExperimentCompletion();
        })
        .appendTo('body');
    
    // إضافة الـ Font Awesome إذا لم يكن موجوداً
    if ($('head link[href*="font-awesome"]').length === 0) {
        $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">');
    }
    
    // متغير لتتبع اكتمال التجربة
    let experimentCompleted = false;
    
    // دالة لإظهار زر التقييم
    function showEvaluationButton() {
        if (!experimentCompleted) {
            experimentCompleted = true;
            $('#showAIEvaluation').fadeIn(500);
        }
    }
    
    // دالة لإرسال معلومات اكتمال التجربة إلى الصفحة الأم
    function sendExperimentCompletion() {
        // تجميع بيانات التجربة
        let testType = currentTest || 'Carbohydrate qualitative analysis';
        let observations = collectObservations();
        
        // إرسال البيانات إلى الصفحة الأم
        window.parent.postMessage({
            type: 'experimentComplete',
            testType: testType,
            observations: observations,
            explanation: getExplanationText(testType),
            scores: getScores(testType),
            notes: getNotesText(testType)
        }, '*');
    }
    
    // دالة لتجميع الملاحظات من التجربة
    function collectObservations() {
        // هذه مجرد أمثلة، يمكن تحسينها لتجميع الملاحظات الفعلية من واجهة المستخدم
        switch(currentTest) {
            case 'molisch':
                return "تم ملاحظة تكون حلقة بنفسجية-حمراء عند سطح التماس بين حمض الكبريتيك والمحلول، وهذا يدل على وجود كربوهيدرات.";
            case 'benedict':
            case 'benedicts':
                return "تم ملاحظة تكون راسب أحمر طوبي في أنابيب اختبار العينات التي تحتوي على سكريات مرجعة (جلوكوز، لاكتوز) بينما لم يتغير لون محلول العينات الأخرى.";
            case 'fehling':
            case 'fehlings':
                return "ظهر راسب أحمر طوبي في الأنابيب التي تحتوي على سكريات مرجعة (جلوكوز) بعد التسخين، بينما بقي محلول فهلنج أزرق في أنابيب العينات غير المرجعة (سكروز).";
            case 'iodine':
                return "ظهر لون أزرق-بنفسجي في الأنبوب الذي يحتوي على النشا، بينما بقي محلول اليود بني اللون في باقي الأنابيب.";
            case 'tollens':
                return "تكونت طبقة فضية لامعة على جدار الأنبوب مع العينات المحتوية على سكريات مرجعة (جلوكوز) بينما بقي محلول تولنز شفافاً مع السكريات غير المرجعة (سكروز).";
            case 'solubility':
                return "تمت إضافة الماء إلى العينات وتم تحريكها. لوحظ ذوبان جميع الكربوهيدرات في الماء مع اختلاف في سرعة وسهولة الذوبان.";
            default:
                return "تم إجراء اختبارات للكشف عن الكربوهيدرات المختلفة في العينات.";
        }
    }
    
    // دالة للحصول على نص التفسير بناءً على نوع الاختبار
    function getExplanationText(testType) {
        switch(testType) {
            case 'molisch':
                return "اختبار موليش هو اختبار عام للكربوهيدرات. يتفاعل حمض الكبريتيك المركز مع α-نافثول ليكون مركب فورفورال الذي يتفاعل مع الكربوهيدرات ليكون حلقة بنفسجية-حمراء.";
            case 'benedict':
            case 'benedicts':
                return "اختبار بندكت يكشف عن السكريات المرجعة. تقوم السكريات المرجعة باختزال أيونات النحاس الثنائية الموجودة في محلول بندكت إلى أكسيد النحاس الأحادي (Cu₂O) ذو اللون الأحمر الطوبي.";
            case 'fehling':
            case 'fehlings':
                return "اختبار فهلنج يستخدم للكشف عن السكريات المرجعة. تعمل السكريات المرجعة على اختزال أيونات النحاس الثنائية في محلول فهلنج إلى أكسيد النحاس الأحادي (راسب أحمر طوبي).";
            case 'iodine':
                return "اختبار اليود يستخدم للكشف عن النشا. يتفاعل اليود مع النشا لتكوين معقد ذو لون أزرق-بنفسجي مميز نتيجة امتصاص جزيئات اليود داخل لولب سلاسل الأميلوز.";
            case 'tollens':
                return "اختبار تولنز (المرآة الفضية) يستخدم للكشف عن السكريات المرجعة. تختزل السكريات المرجعة أيونات الفضة في محلول تولنز إلى فضة عنصرية تترسب على جدار الأنبوب مكونة طبقة فضية لامعة.";
            case 'solubility':
                return "اختبار الذوبانية يقيس قابلية الكربوهيدرات للذوبان في الماء. معظم السكريات الأحادية والثنائية تذوب بسهولة في الماء بسبب مجموعات الهيدروكسيل التي تكون روابط هيدروجينية مع الماء.";
            default:
                return "تستخدم اختبارات الكربوهيدرات للتمييز بين أنواع السكريات المختلفة: المرجعة وغير المرجعة والمتعددة.";
        }
    }
    
    // دالة للحصول على الدرجات بناءً على نوع الاختبار
    function getScores(testType) {
        switch(testType) {
            case 'molisch':
                return { finalGrade: 92, accuracy: 95, methodology: 88, observations: 93 };
            case 'benedict':
            case 'benedicts':
                return { finalGrade: 88, accuracy: 90, methodology: 85, observations: 89 };
            case 'fehling':
            case 'fehlings':
                return { finalGrade: 86, accuracy: 92, methodology: 83, observations: 84 };
            case 'iodine':
                return { finalGrade: 90, accuracy: 96, methodology: 88, observations: 87 };
            case 'tollens':
                return { finalGrade: 94, accuracy: 97, methodology: 90, observations: 95 };
            case 'solubility':
                return { finalGrade: 80, accuracy: 85, methodology: 78, observations: 82 };
            default:
                return { finalGrade: 85, accuracy: 90, methodology: 80, observations: 88 };
        }
    }
    
    // دالة للحصول على نص الملاحظات بناءً على نوع الاختبار
    function getNotesText(testType) {
        switch(testType) {
            case 'molisch':
                return "أجريت التجربة بدقة عالية. لاحظ أن جميع أنواع الكربوهيدرات (الأحادية، الثنائية والمتعددة) تعطي نتيجة إيجابية مع اختبار موليش.";
            case 'benedict':
            case 'benedicts':
                return "تمت ملاحظة الراسب الأحمر بوضوح في الأنابيب الحاوية على سكريات مرجعة. للتحسين، يمكن تسجيل كمية الراسب المتكون في كل أنبوب للمقارنة الكمية.";
            case 'fehling':
            case 'fehlings':
                return "أجريت التجربة بشكل صحيح، مع ملاحظة تسخين محلول فهلنج مع العينة وهي خطوة ضرورية. السكريات غير المرجعة مثل السكروز لا تعطي نتيجة إيجابية.";
            case 'iodine':
                return "نتائج الاختبار واضحة جداً مع تمييز دقيق للنشا. هذا الاختبار خاص بالنشا ولا يتفاعل مع السكريات الأحادية أو الثنائية.";
            case 'tollens':
                return "تم إجراء التجربة بدقة عالية وظهرت المرآة الفضية بوضوح. اختبار تولنز يعتبر أكثر حساسية من اختبارات بندكت وفهلنج للكشف عن السكريات المرجعة.";
            case 'solubility':
                return "تمت ملاحظة اختلاف درجات الذوبان بين العينات. للتحسين، يمكن قياس كمية الكربوهيدرات التي تذوب في حجم معين من الماء.";
            default:
                return "للحصول على نتائج أكثر دقة، يُنصح بإجراء جميع الاختبارات النوعية للكربوهيدرات والمقارنة بين نتائجها لتحديد نوع السكر بشكل قاطع.";
        }
    }
    
    // استمع للرسائل من الصفحة الأم
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'parentReady') {
            console.log('تم استلام رسالة من الصفحة الأم: الصفحة جاهزة');
        }
    });
    
    // ربط وظائف اختبارات محددة لعرض الزر
    // يمكنك تعديل هذه الأجزاء حسب هيكل واجهة المستخدم الحالية
    
    // مثال: عند النقر على زر إجراء الاختبار أو إضافة كاشف أو غيرها من العمليات المهمة
    $('#mainDiv').on('click', '.testButtons, .reagentButtons', function() {
        // التحقق مما إذا كان هناك إجراء حقيقي للتجربة قد حدث
        if ($(this).hasClass('activeButton') || $(this).hasClass('appliedReagent')) {
            // بعد عدد محدد من الإجراءات، اعتبر التجربة مكتملة
            setTimeout(showEvaluationButton, 3000); // عرض الزر بعد 3 ثوانٍ
        }
    });
    
    // تحديد متغير currentTest عند اختيار نوع الاختبار
    $('.testSelector').change(function() {
        currentTest = $(this).val();
    });
    
    // اختبار لإظهار الزر للعرض التوضيحي
    // يمكنك إزالة هذا الجزء في الإصدار النهائي
    setTimeout(function() {
        // للأغراض التجريبية فقط - يظهر الزر بعد 15 ثانية
        showEvaluationButton();
    }, 15000);
    
    // إضافة دعم لمحاكاة اكتمال التجربة
    window.completeExperiment = function(testType) {
        currentTest = testType || currentTest;
        showEvaluationButton();
    };
    
    // إضافة تحسينات مرئية لأزرار التجربة
    $('.testButtons, .reagentButtons').css({
        'transition': 'all 0.3s ease',
        'transform-origin': 'center',
        'box-shadow': '0 2px 4px rgba(0,0,0,0.2)'
    }).hover(
        function() { $(this).css('transform', 'scale(1.05)'); },
        function() { $(this).css('transform', 'scale(1)'); }
    );
});
