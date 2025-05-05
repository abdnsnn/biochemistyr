/**
 * Authentication Module - auth.js
 * Handles user authentication, session management and password reset
 */

// Session management variables
let currentUser = null;
let sessionTimeout = null;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Initialize the authentication system
document.addEventListener('DOMContentLoaded', function() {
    // Check login status when page loads
    checkLoginStatus();
    
    // Set up event listeners for auth forms if they exist
    setupLoginForm();
    setupRegisterForm();
    setupPasswordResetForm();
    setupLogoutButton();
});

/**
 * التحقق من حالة تسجيل دخول المستخدم وتحديث واجهة المستخدم وفقًا لذلك
 */
function checkLoginStatus() {
    console.log("التحقق من حالة تسجيل الدخول...");
    
    // مسح أي مؤقت جلسة موجود
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
    }
    
    // التحقق من وجود رمز التوثيق في التخزين المحلي
    const authToken = localStorage.getItem('authToken');
    const authStatus = localStorage.getItem('authStatus');
    
    // إذا كان لدينا حالة توثيق محفوظة، نستخدمها أولاً لتحديث الواجهة بشكل سريع
    if (authStatus === 'success' && authToken) {
        console.log("تم العثور على بيانات توثيق محلية صالحة");
        try {
            // محاولة استرداد بيانات المستخدم من التخزين المحلي
            const storedUser = JSON.parse(localStorage.getItem('userData'));
            if (storedUser) {
                currentUser = storedUser;
                updateAuthUI(true);
            }
        } catch (e) {
            console.warn("خطأ في تحليل بيانات المستخدم المخزنة:", e);
        }
    }
    
    // استخدام بيانات مستخدم افتراضية للتطوير المحلي (بدون خادم)
    // في البيئة الإنتاجية، ستحتاج إلى استبدال هذا بطلب API حقيقي
    if (authStatus === 'success' && authToken && currentUser) {
        console.log("تم استخدام بيانات المستخدم المحلية");
        // نحن بالفعل قمنا بتحديث واجهة المستخدم أعلاه
        // تعيين مؤقت الجلسة
        startSessionTimer();
        
        // إطلاق حدث تسجيل الدخول
        document.dispatchEvent(new CustomEvent('auth:login', { 
            detail: { user: currentUser } 
        }));
    } else if (authToken) {
        // محاكاة استجابة API ناجحة باستخدام بيانات افتراضية للتطوير
        console.log("إنشاء جلسة مستخدم افتراضية للتطوير");
        
        // إنشاء مستخدم افتراضي للتطوير المحلي
        const mockUser = {
            id: "user123",
            name: "مستخدم الكيمياء",
            username: "chemistry_user",
            email: "user@chemistry.example",
            role: "student",
            createdAt: new Date().toISOString()
        };
        
        // حفظ بيانات المستخدم
        currentUser = mockUser;
        localStorage.setItem('userData', JSON.stringify(mockUser));
        localStorage.setItem('authStatus', 'success');
        
        // تحديث واجهة المستخدم
        updateAuthUI(true);
        
        // تعيين مؤقت الجلسة
        startSessionTimer();
        
        // إطلاق حدث تسجيل الدخول
        document.dispatchEvent(new CustomEvent('auth:login', { 
            detail: { user: currentUser } 
        }));
    } else {
        // المستخدم غير مسجل دخول
        handleLogout();
    }
}

/**
 * تحديث واجهة المستخدم بناءً على حالة التوثيق
 * @param {boolean} isAuthenticated - ما إذا كان المستخدم مسجل دخول أم لا
 */
function updateAuthUI(isAuthenticated) {
    console.log("تحديث واجهة المستخدم:", isAuthenticated ? "مسجل دخول" : "غير مسجل دخول");
    
    // العناصر التي تُظهر عندما يكون المستخدم مسجل دخول
    const authenticatedElements = document.querySelectorAll('.auth-authenticated');
    // العناصر التي تُظهر عندما يكون المستخدم غير مسجل دخول
    const unauthenticatedElements = document.querySelectorAll('.auth-unauthenticated');
    
    // تحديث العناصر بناءً على حالة التوثيق
    authenticatedElements.forEach(el => {
        el.style.display = isAuthenticated ? '' : 'none';
    });
    
    unauthenticatedElements.forEach(el => {
        el.style.display = isAuthenticated ? 'none' : '';
    });
    
    // تحديث عناصر إضافية إذا كان المستخدم مسجل دخول
    if (isAuthenticated && currentUser) {
        // تحديث عناصر اسم المستخدم
        const usernameElements = document.querySelectorAll('.user-name');
        usernameElements.forEach(el => {
            el.textContent = currentUser.name || currentUser.username || currentUser.email || 'المستخدم';
        });
        
        // تحديث عناصر صورة المستخدم
        const userAvatarElements = document.querySelectorAll('.user-avatar');
        userAvatarElements.forEach(el => {
            if (currentUser.avatar) {
                // إذا كان لدى المستخدم صورة، نستخدمها
                if (el.tagName === 'IMG') {
                    el.src = currentUser.avatar;
                } else {
                    el.style.backgroundImage = `url(${currentUser.avatar})`;
                }
            } else {
                // إذا لم يكن لدى المستخدم صورة، نستخدم الحرف الأول من اسمه
                const initial = (currentUser.name || currentUser.username || currentUser.email || 'م').charAt(0).toUpperCase();
                if (el.tagName === 'IMG') {
                    // عرض صورة افتراضية
                    el.src = `https://ui-avatars.com/api/?name=${initial}&background=random`;
                } else {
                    el.textContent = initial;
                }
            }
        });
    }
}

/**
 * معالجة تسجيل الخروج من حساب المستخدم
 */
function handleLogout() {
    console.log("معالجة تسجيل الخروج...");
    
    // مسح بيانات المستخدم من الذاكرة وتخزين المتصفح
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('authStatus');
    localStorage.removeItem('userData');
    
    // مسح مؤقت الجلسة
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
        sessionTimeout = null;
    }
    
    // تحديث واجهة المستخدم لحالة عدم تسجيل الدخول
    updateAuthUI(false);
    
    // إطلاق حدث تسجيل الخروج
    document.dispatchEvent(new CustomEvent('auth:logout'));
    
    // التوجيه إلى صفحة تسجيل الدخول إذا كانت الصفحة الحالية تتطلب تسجيل دخول
    const requiresAuth = document.body.hasAttribute('data-requires-auth');
    if (requiresAuth) {
        window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
}

/**
 * بدء مؤقت جلسة المستخدم
 */
function startSessionTimer() {
    console.log("بدء مؤقت الجلسة:", SESSION_DURATION / 1000, "ثانية");
    
    // مسح أي مؤقت موجود
    if (sessionTimeout) {
        clearTimeout(sessionTimeout);
    }
    
    // تعيين مؤقت جديد
    sessionTimeout = setTimeout(() => {
        console.log("انتهت صلاحية الجلسة!");
        // إظهار رسالة للمستخدم
        showSessionTimeoutModal();
        // تسجيل الخروج تلقائيًا
        handleLogout();
    }, SESSION_DURATION);
}

/**
 * إظهار نافذة منبثقة لإعلام المستخدم بانتهاء الجلسة
 */
function showSessionTimeoutModal() {
    // البحث عن العنصر المنبثق في DOM أو إنشائه
    let modal = document.getElementById('sessionTimeoutModal');
    
    if (!modal) {
        // إنشاء العنصر المنبثق ديناميكيًا
        modal = document.createElement('div');
        modal.id = 'sessionTimeoutModal';
        modal.className = 'modal fade';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'sessionTimeoutModalTitle');
        modal.setAttribute('aria-hidden', 'true');
        
        // إضافة محتوى النافذة المنبثقة
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="sessionTimeoutModalTitle">انتهاء الجلسة</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>لقد تم تسجيل خروجك تلقائيًا لأسباب أمنية نتيجة لعدم النشاط. يرجى تسجيل الدخول مرة أخرى للمتابعة.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">فهمت</button>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة النافذة المنبثقة إلى DOM
        document.body.appendChild(modal);
    }
    
    // استخدام Bootstrap لإظهار النافذة المنبثقة
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

/**
 * إعداد استماع أحداث نموذج تسجيل الدخول
 */
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        console.log("إعداد نموذج تسجيل الدخول...");
        
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // استخراج بيانات الدخول
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe')?.checked || false;
            
            // تنفيذ طلب تسجيل الدخول
            login(email, password, rememberMe);
        });
    }
}

/**
 * إعداد استماع أحداث نموذج التسجيل
 */
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        console.log("إعداد نموذج التسجيل...");
        
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // استخراج بيانات التسجيل
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
            
            // التحقق من تطابق كلمات المرور
            if (password !== passwordConfirm) {
                showError('كلمات المرور غير متطابقة!');
                return;
            }
            
            // تنفيذ طلب التسجيل
            register(name, email, password);
        });
    }
}

/**
 * إعداد استماع أحداث نموذج إعادة تعيين كلمة المرور
 */
function setupPasswordResetForm() {
    const resetForm = document.getElementById('resetPasswordForm');
    
    if (resetForm) {
        console.log("إعداد نموذج إعادة تعيين كلمة المرور...");
        
        resetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // استخراج البريد الإلكتروني
            const email = document.getElementById('resetEmail').value;
            
            // تنفيذ طلب إعادة تعيين كلمة المرور
            resetPassword(email);
        });
    }
}

/**
 * إعداد استماع أحداث زر تسجيل الخروج
 */
function setupLogoutButton() {
    const logoutButtons = document.querySelectorAll('.logout-btn');
    
    if (logoutButtons.length > 0) {
        console.log("إعداد أزرار تسجيل الخروج...");
        
        logoutButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                logout();
            });
        });
    }
}

/**
 * تسجيل دخول المستخدم
 * @param {string} email - البريد الإلكتروني للمستخدم
 * @param {string} password - كلمة المرور
 * @param {boolean} rememberMe - ما إذا كان يجب تذكر تسجيل الدخول
 */
function login(email, password, rememberMe = false) {
    console.log("محاولة تسجيل دخول:", email);
    
    // إظهار مؤشر التحميل
    showLoading('جاري تسجيل الدخول...');
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        // للتطوير المحلي، سنقبل أي بريد إلكتروني وكلمة مرور
        // في البيئة الإنتاجية، ستحتاج إلى التحقق من البريد الإلكتروني وكلمة المرور بشكل صحيح
        
        hideLoading();
        
        // إنشاء مستخدم افتراضي
        const mockUser = {
            id: "user123",
            name: email.split('@')[0], // استخدام جزء البريد الإلكتروني قبل @ كاسم
            username: email.split('@')[0],
            email: email,
            role: "student",
            createdAt: new Date().toISOString()
        };
        
        // إنشاء رمز توثيق عشوائي
        const mockToken = 'mock_token_' + Math.random().toString(36).substring(2);
        
        // حفظ بيانات التوثيق
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('authStatus', 'success');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        // تحديث المتغيرات
        currentUser = mockUser;
        
        // تحديث واجهة المستخدم
        updateAuthUI(true);
        
        // تعيين مؤقت الجلسة
        startSessionTimer();
        
        // إطلاق حدث تسجيل الدخول
        document.dispatchEvent(new CustomEvent('auth:login', { 
            detail: { user: currentUser } 
        }));
        
        console.log("تم تسجيل الدخول بنجاح باستخدام المحاكاة المحلية");
        
        // التوجيه إذا كان هناك مسار إعادة توجيه
        const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            // إعادة تحميل الصفحة الحالية أو التوجيه إلى الصفحة الرئيسية
            if (window.location.pathname.includes('login.html')) {
                window.location.href = '/index.html';
            } else {
                window.location.reload();
            }
        }
        
        // عرض رسالة نجاح
        showSuccess('تم تسجيل الدخول بنجاح!');
    }, 1000); // تأخير لمحاكاة مدة الاتصال بالخادم
}

/**
 * تسجيل مستخدم جديد
 * @param {string} name - اسم المستخدم
 * @param {string} email - البريد الإلكتروني
 * @param {string} password - كلمة المرور
 */
function register(name, email, password) {
    console.log("محاولة تسجيل مستخدم جديد:", email);
    
    // إظهار مؤشر التحميل
    showLoading('جاري إنشاء الحساب...');
    
    // إرسال طلب إلى API
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        // إخفاء مؤشر التحميل
        hideLoading();
        
        // التحقق من استجابة الخادم
        if (response.ok) {
            return response.json();
        } else {
            // معالجة أخطاء الاستجابة
            if (response.status === 409) {
                throw new Error('البريد الإلكتروني مستخدم بالفعل');
            } else {
                throw new Error('حدث خطأ أثناء إنشاء الحساب');
            }
        }
    })
    .then(data => {
        console.log("تم إنشاء الحساب بنجاح:", data);
        
        // عرض رسالة نجاح
        showSuccess('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
        
        // الانتقال إلى شاشة تسجيل الدخول بعد إنشاء الحساب
        // يمكن القيام بذلك من خلال تبديل العرض أو التوجيه
        const registerContainer = document.querySelector('.register-container');
        const loginContainer = document.querySelector('.login-container');
        
        if (registerContainer && loginContainer) {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        } else {
            // إذا كنا في صفحة منفصلة، قم بالتوجيه
            window.location.href = '/login.html';
        }
    })
    .catch(error => {
        // معالجة أخطاء الشبكة أو التحليل
        console.error('خطأ في التسجيل:', error);
        showError(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    });
}

/**
 * إعادة تعيين كلمة المرور
 * @param {string} email - البريد الإلكتروني للمستخدم
 */
function resetPassword(email) {
    console.log("طلب إعادة تعيين كلمة المرور:", email);
    
    // إظهار مؤشر التحميل
    showLoading('جاري إرسال طلب إعادة تعيين كلمة المرور...');
    
    // إرسال طلب إلى API
    fetch('/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        // إخفاء مؤشر التحميل
        hideLoading();
        
        // التحقق من استجابة الخادم
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('حدث خطأ أثناء طلب إعادة تعيين كلمة المرور');
        }
    })
    .then(data => {
        console.log("تم إرسال طلب إعادة تعيين كلمة المرور بنجاح");
        
        // عرض رسالة نجاح
        showSuccess('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من بريدك الإلكتروني واتباع التعليمات.');
        
        // الانتقال إلى شاشة تسجيل الدخول بعد طلب إعادة تعيين كلمة المرور
        const resetContainer = document.querySelector('.reset-container');
        const loginContainer = document.querySelector('.login-container');
        
        if (resetContainer && loginContainer) {
            resetContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    })
    .catch(error => {
        // معالجة أخطاء الشبكة أو التحليل
        console.error('خطأ في إعادة تعيين كلمة المرور:', error);
        showError(error.message || 'حدث خطأ أثناء طلب إعادة تعيين كلمة المرور');
    });
}

/**
 * تسجيل خروج المستخدم
 */
function logout() {
    console.log("طلب تسجيل الخروج...");
    
    // إظهار مؤشر التحميل
    showLoading('جاري تسجيل الخروج...');
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        // إخفاء مؤشر التحميل
        hideLoading();
        
        // تسجيل الخروج محليًا
        handleLogout();
        
        // عرض رسالة نجاح
        showSuccess('تم تسجيل خروجك بنجاح!');
    }, 500); // تأخير بسيط لمحاكاة شبكة
}

/**
 * وظائف مساعدة لإظهار وإخفاء مؤشر التحميل
 */
function showLoading(message = 'جاري التحميل...') {
    // البحث عن مؤشر التحميل الحالي أو إنشاء واحد جديد
    let loadingIndicator = document.getElementById('authLoadingIndicator');
    
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'authLoadingIndicator';
        loadingIndicator.className = 'loading-overlay';
        loadingIndicator.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">جاري التحميل...</span>
                </div>
                <p class="loading-message">${message}</p>
            </div>
        `;
        document.body.appendChild(loadingIndicator);
    } else {
        // تحديث رسالة التحميل إذا كان المؤشر موجودًا
        const messageElement = loadingIndicator.querySelector('.loading-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        loadingIndicator.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingIndicator = document.getElementById('authLoadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

/**
 * وظائف مساعدة لإظهار رسائل النجاح والخطأ
 */
function showSuccess(message) {
    // عرض رسالة نجاح بشكل أنيق (يمكن استخدام مكتبة مثل toastr أو sweetalert2)
    if (window.toastr) {
        toastr.success(message);
    } else {
        alert(message); // بدلاً من ذلك، استخدم alert بسيطة
    }
}

function showError(message) {
    // عرض رسالة خطأ بشكل أنيق
    if (window.toastr) {
        toastr.error(message);
    } else {
        alert('خطأ: ' + message);
    }
}

/**
 * العودة مستخدم متصل حاليًا
 * @returns {Object|null} كائن بيانات المستخدم أو null إذا لم يكن متصلًا
 */
function getCurrentUser() {
    return currentUser;
}

/**
 * التحقق ما إذا كان المستخدم متصل
 * @returns {boolean} صح إذا كان المستخدم متصل
 */
function isAuthenticated() {
    return currentUser !== null && localStorage.getItem('authToken') !== null;
}

/**
 * تصدير الوظائف العامة للاستخدام في الوحدات الأخرى
 */
const Auth = {
    checkLoginStatus,
    login,
    register,
    resetPassword,
    logout,
    isAuthenticated,
    getCurrentUser
};

// تصدير الكائن للوصول العام
window.Auth = Auth;