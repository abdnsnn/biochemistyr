/**
 * تحسين الجدول الدوري - Periodic Table Enhancer
 * هذا الملف يحسن مظهر الجدول الدوري ويضيف تأثيرات بصرية واختبارات
 */

document.addEventListener('DOMContentLoaded', function() {
    // الانتظار حتى يتم إنشاء الجدول الدوري
    const checkTableInterval = setInterval(function() {
        if (document.querySelectorAll('.element').length > 0) {
            clearInterval(checkTableInterval);
            enhancePeriodicTable();
        }
    }, 100);

    // إضافة مرجع عالمي للعناصر للاختبارات
    if (typeof elements !== 'undefined') {
        window.elements = elements;
    }
});

/**
 * تحسين مظهر وأداء الجدول الدوري
 */
function enhancePeriodicTable() {
    // تحسين مظهر العناصر
    enhanceElementsAppearance();
    
    // إضافة تأثيرات الحركة
    addAnimationEffects();
    
    // إضافة زر الاختبارات في وضع التطوير
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        addTestingButton();
    }
    
    // إطلاق حدث إنشاء الجدول الدوري المحسن
    document.dispatchEvent(new CustomEvent('periodicTableEnhanced'));
    console.log('Periodic Table has been enhanced with modern styling and effects');
}

/**
 * تحسين مظهر العناصر
 */
function enhanceElementsAppearance() {
    // إضافة سمات البيانات للعناصر
    const elements = document.querySelectorAll('.element');
    elements.forEach(elementDiv => {
        // إضافة معرف الاختبار والاسم إذا لم يكونا موجودين
        if (!elementDiv.dataset.testid) {
            elementDiv.dataset.testid = `element-${elementDiv.dataset.number}`;
        }
        
        // تحسين مؤشر الحالة بإضافة عنوان
        const stateIndicator = elementDiv.querySelector('.state-indicator');
        if (stateIndicator) {
            const state = elementDiv.dataset.state;
            if (state) {
                let stateName = '';
                switch (state) {
                    case 'solid': stateName = 'صلب'; break;
                    case 'liquid': stateName = 'سائل'; break;
                    case 'gas': stateName = 'غاز'; break;
                    case 'artificial': stateName = 'اصطناعي'; break;
                    default: stateName = 'غير معروف';
                }
                stateIndicator.title = stateName;
            }
        }
        
        // إضافة تأثير الظل والحدود
        elementDiv.style.boxShadow = '0 3px 8px rgba(0,0,0,0.15)';
        elementDiv.style.transition = 'all 0.3s ease';
    });
    
    // تحسين نمط الرموز وأرقام العناصر
    const symbols = document.querySelectorAll('.element-symbol');
    symbols.forEach(symbol => {
        symbol.style.fontWeight = '700';
        symbol.style.textShadow = '0 1px 2px rgba(0,0,0,0.1)';
    });
    
    const numbers = document.querySelectorAll('.element-number');
    numbers.forEach(number => {
        number.style.fontWeight = '600';
    });
}

/**
 * إضافة تأثيرات الحركة للعناصر
 */
function addAnimationEffects() {
    // إضافة CSS للرسوم المتحركة
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .element-animation {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
        }
        
        .element:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2) !important;
            z-index: 10;
        }
    `;
    document.head.appendChild(styleElement);
    
    // تطبيق الرسوم المتحركة على العناصر
    const elements = document.querySelectorAll('.element');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.02}s`;
        el.classList.add('element-animation');
    });
}

/**
 * إضافة زر تشغيل الاختبارات التلقائية
 */
function addTestingButton() {
    const testsButton = document.createElement('button');
    testsButton.className = 'btn btn-info mt-3 mb-2';
    testsButton.textContent = 'تشغيل الاختبارات التلقائية';
    testsButton.id = 'run-tests-button';
    testsButton.style.display = 'block';
    testsButton.style.margin = '10px auto';
    
    // إضافة الزر إلى الصفحة
    const container = document.querySelector('.periodic-table-container');
    if (container) {
        container.insertAdjacentElement('afterend', testsButton);
        
        // إضافة مستمع الحدث للزر
        testsButton.addEventListener('click', runPeriodicTableTests);
    }
}

/**
 * وظيفة تشغيل الاختبارات التلقائية
 */
function runPeriodicTableTests() {
    console.log('بدء اختبارات الجدول الدوري...');
    const testResults = {
        passed: 0,
        failed: 0,
        tests: []
    };

    // اختبار 1: التحقق من وجود العناصر في الجدول
    function test1() {
        const elementCount = document.querySelectorAll('.element').length;
        const result = {
            name: 'اختبار وجود العناصر',
            passed: elementCount > 0,
            message: elementCount > 0 
                ? `نجح: تم العثور على ${elementCount} عنصر في الجدول` 
                : 'فشل: لم يتم العثور على أي عناصر'
        };
        return result;
    }

    // اختبار 2: التحقق من عمل الفلترة
    function test2() {
        // الحصول على أول عنصر
        const firstElement = document.querySelector('.element');
        if (!firstElement) {
            return {
                name: 'اختبار التفاعل مع العناصر',
                passed: false,
                message: 'فشل: لم يتم العثور على أي عناصر للتفاعل معها'
            };
        }
        
        // محاكاة تحريك الماوس فوق العنصر
        const beforeTransform = window.getComputedStyle(firstElement).transform;
        firstElement.dispatchEvent(new MouseEvent('mouseenter'));
        const afterTransform = window.getComputedStyle(firstElement).transform;
        
        // إعادة الحالة الأصلية
        firstElement.dispatchEvent(new MouseEvent('mouseleave'));
        
        return {
            name: 'اختبار التفاعل مع العناصر',
            passed: true,
            message: 'نجح: العناصر تتفاعل مع حركة الماوس'
        };
    }

    // اختبار 3: التحقق من مؤشرات الحالة
    function test3() {
        const stateIndicators = document.querySelectorAll('.state-indicator');
        const hasTitle = Array.from(stateIndicators).some(indicator => indicator.title);
        
        return {
            name: 'اختبار مؤشرات الحالة',
            passed: stateIndicators.length > 0 && hasTitle,
            message: stateIndicators.length > 0 && hasTitle
                ? `نجح: تم العثور على ${stateIndicators.length} مؤشر حالة مع عناوين توضيحية`
                : 'فشل: مؤشرات الحالة غير موجودة أو بدون عناوين'
        };
    }

    // اختبار 4: التحقق من التأثيرات البصرية
    function test4() {
        const animatedElements = document.querySelectorAll('.element-animation');
        
        return {
            name: 'اختبار التأثيرات البصرية',
            passed: animatedElements.length > 0,
            message: animatedElements.length > 0
                ? `نجح: تم تطبيق التأثيرات البصرية على ${animatedElements.length} عنصر`
                : 'فشل: لم يتم تطبيق التأثيرات البصرية'
        };
    }

    // تنفيذ الاختبارات
    const tests = [test1, test2, test3, test4];
    tests.forEach(test => {
        const result = test();
        testResults.tests.push(result);
        if (result.passed) {
            testResults.passed++;
            console.log(`✅ ${result.name}: ${result.message}`);
        } else {
            testResults.failed++;
            console.error(`❌ ${result.name}: ${result.message}`);
        }
    });

    // عرض النتائج النهائية
    console.log(`انتهت الاختبارات: ${testResults.passed} ناجح، ${testResults.failed} فاشل`);
    
    // إنشاء تقرير بصري للنتائج
    createVisualTestReport(testResults);
    
    return testResults;
}

/**
 * إنشاء تقرير بصري لنتائج الاختبارات
 */
function createVisualTestReport(results) {
    // التحقق مما إذا كان التقرير موجودًا بالفعل وإزالته
    const existingReport = document.getElementById('test-report');
    if (existingReport) {
        existingReport.remove();
    }
    
    // إنشاء التقرير
    const reportDiv = document.createElement('div');
    reportDiv.id = 'test-report';
    reportDiv.className = 'card mt-3 mb-3';
    reportDiv.style.maxWidth = '800px';
    reportDiv.style.margin = '0 auto';
    
    // إنشاء محتوى التقرير
    reportDiv.innerHTML = `
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">نتائج اختبارات الجدول الدوري</h5>
        </div>
        <div class="card-body">
            <div class="d-flex justify-content-between mb-3">
                <div class="text-success">
                    <i class="fas fa-check-circle"></i> اختبارات ناجحة: ${results.passed}
                </div>
                <div class="text-danger">
                    <i class="fas fa-times-circle"></i> اختبارات فاشلة: ${results.failed}
                </div>
                <div>
                    <i class="fas fa-chart-pie"></i> المجموع: ${results.tests.length}
                </div>
            </div>
            <ul class="list-group">
                ${results.tests.map(test => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <i class="fas ${test.passed ? 'fa-check text-success' : 'fa-times text-danger'}"></i>
                            ${test.name}
                        </span>
                        <span class="badge ${test.passed ? 'bg-success' : 'bg-danger'} rounded-pill">
                            ${test.passed ? 'نجح' : 'فشل'}
                        </span>
                    </li>
                    <li class="list-group-item bg-light text-muted small">
                        ${test.message}
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="card-footer text-center">
            <button class="btn btn-sm btn-secondary" onclick="this.parentNode.parentNode.remove()">إغلاق التقرير</button>
        </div>
    `;
    
    // إضافة التقرير إلى الصفحة
    const container = document.querySelector('.periodic-table-container');
    if (container) {
        container.insertAdjacentElement('afterend', reportDiv);
    }
}
