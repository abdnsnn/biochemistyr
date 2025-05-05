/**
 * اختبارات الجدول الدوري - Periodic Table Tests
 */

// وظيفة لتشغيل الاختبارات التلقائية للجدول الدوري
function runPeriodicTableTests() {
    console.log('بدء اختبارات الجدول الدوري...');
    const testResults = {
        passed: 0,
        failed: 0,
        tests: []
    };

    // اختبار 1: التحقق من وجود جميع العناصر في الجدول
    const test1 = () => {
        const elementCells = document.querySelectorAll('.element');
        const elementsWithNumbers = window.elements.filter(e => e.number).length;
        const result = {
            name: 'اختبار وجود جميع العناصر',
            passed: elementCells.length === elementsWithNumbers,
            message: ''
        };

        if (result.passed) {
            result.message = `نجح: تم العثور على ${elementCells.length} عنصر في الجدول`;
        } else {
            result.message = `فشل: تم العثور على ${elementCells.length} عنصر، بينما يجب أن يكون ${elementsWithNumbers}`;
        }

        return result;
    };

    // اختبار 2: التحقق من عمل الفلترة حسب الفئة
    const test2 = () => {
        // حفظ حالة الفلتر الحالية
        const activeBtn = document.querySelector('.btn-group button.active');
        const originalFilter = activeBtn ? activeBtn.dataset.filter : 'all';
        
        // تطبيق فلتر لاختبار (المعادن القلوية)
        if (typeof filterElements === 'function') {
            filterElements('category', 'alkali-metal');
            
            const visibleElements = document.querySelectorAll('.element:not(.hidden)');
            const alkaliMetals = window.elements.filter(e => e.number && e.category === 'alkali-metal').length;
            
            // استعادة الفلتر الأصلي
            filterElements('category', originalFilter);
            
            const result = {
                name: 'اختبار وظيفة الفلترة حسب الفئة',
                passed: visibleElements.length === alkaliMetals,
                message: ''
            };

            if (result.passed) {
                result.message = `نجح: تم فلترة ${visibleElements.length} من المعادن القلوية بشكل صحيح`;
            } else {
                result.message = `فشل: تم عرض ${visibleElements.length} عنصر، بينما يجب أن يكون ${alkaliMetals}`;
            }

            return result;
        } else {
            return {
                name: 'اختبار وظيفة الفلترة حسب الفئة',
                passed: false,
                message: 'فشل: وظيفة الفلترة غير موجودة'
            };
        }
    };

    // اختبار 3: التحقق من عمل البحث
    const test3 = () => {
        const searchInput = document.getElementById('element-search');
        if (!searchInput) {
            return {
                name: 'اختبار وظيفة البحث',
                passed: false,
                message: 'فشل: لم يتم العثور على حقل البحث'
            };
        }

        // حفظ قيمة البحث الحالية
        const originalValue = searchInput.value;
        
        // اختبار البحث باسم عنصر
        searchInput.value = 'هيدروجين';
        searchInput.dispatchEvent(new Event('input'));
        
        // التحقق من النتائج
        const visibleElements = document.querySelectorAll('.element:not(.hidden)');
        
        // استعادة قيمة البحث الأصلية
        searchInput.value = originalValue;
        searchInput.dispatchEvent(new Event('input'));
        
        const result = {
            name: 'اختبار وظيفة البحث',
            passed: visibleElements.length > 0,
            message: ''
        };

        if (result.passed) {
            result.message = `نجح: تم العثور على ${visibleElements.length} نتيجة للبحث عن "هيدروجين"`;
        } else {
            result.message = 'فشل: لم يتم العثور على نتائج للبحث';
        }

        return result;
    };

    // اختبار 4: التحقق من عرض التفاصيل عند النقر
    const test4 = () => {
        // محاكاة النقر على عنصر
        const hydrogenElement = document.querySelector('.element[data-number="1"]');
        if (!hydrogenElement) {
            return {
                name: 'اختبار عرض تفاصيل العنصر',
                passed: false,
                message: 'فشل: لم يتم العثور على عنصر الهيدروجين'
            };
        }

        // التأكد من أن الموديل مغلق في البداية
        const modalElement = document.getElementById('elementModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }

        // محاكاة النقر
        hydrogenElement.click();
        
        // التحقق مما إذا كان الموديل يعرض معلومات الهيدروجين
        const modalTitle = document.getElementById('modal-element-symbol');
        const modalNumber = document.getElementById('modal-element-number');
        
        const result = {
            name: 'اختبار عرض تفاصيل العنصر',
            passed: modalTitle && modalTitle.textContent === 'H' && modalNumber && modalNumber.textContent === '1',
            message: ''
        };

        if (result.passed) {
            result.message = 'نجح: تم عرض تفاصيل عنصر الهيدروجين بشكل صحيح';
        } else {
            result.message = 'فشل: لم يتم عرض معلومات الهيدروجين بشكل صحيح';
        }

        // إغلاق الموديل
        if (modalInstance) {
            modalInstance.hide();
        }

        return result;
    };

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

    console.log(`انتهت الاختبارات: ${testResults.passed} ناجح، ${testResults.failed} فاشل`);
    return testResults;
}

// إضافة زر لتشغيل الاختبارات في وضع التطوير
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء زر الاختبارات في وضع التطوير فقط
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testsButton = document.createElement('button');
        testsButton.className = 'btn btn-info mt-3 mb-2';
        testsButton.textContent = 'تشغيل الاختبارات التلقائية';
        testsButton.id = 'run-tests-button';
        testsButton.style.display = 'block';
        testsButton.style.margin = '10px auto';
        testsButton.addEventListener('click', runPeriodicTableTests);
        
        // إضافة الزر بعد إنشاء الجدول الدوري
        document.addEventListener('periodicTableCreated', function() {
            const container = document.querySelector('.periodic-table-container');
            if (container) {
                container.insertAdjacentElement('afterend', testsButton);
            }
        });
    }
});
