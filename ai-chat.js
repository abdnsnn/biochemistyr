/**
 * مساعد الكيمياء الحيوية CHAT
 * نظام الدردشة CHATة مع دعم لمزودي DeepSeek و Gamma AI
 */

// العناصر الرئيسية في واجهة المستخدم
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const loadingIndicator = document.getElementById('loading-indicator');

// مصفوفة لتخزين المحادثة
let conversationHistory = [];

/**
 * دالة لإضافة رسالة المستخدم للمحادثة
 * @param {string} message - رسالة المستخدم
 */
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-time">
            ${getCurrentTime()}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    // إضافة الرسالة إلى سجل المحادثة
    conversationHistory.push({ role: 'user', content: message });
}

/**
 * دالة لإضافة رسالة المساعد CHAT للمحادثة
 * @param {string} message - رسالة المساعد
 */
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${formatMessage(message)}</p>
        </div>
        <div class="message-time">
            ${getCurrentTime()}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    // إضافة الرسالة إلى سجل المحادثة
    conversationHistory.push({ role: 'assistant', content: message });
}

/**
 * دالة لتنسيق الرسالة وتحويل روابط URL إلى روابط فعلية
 * @param {string} message - الرسالة الأصلية
 * @returns {string} - الرسالة المنسقة
 */
function formatMessage(message) {
    // تحويل النص العادي إلى HTML مع الاحتفاظ بأسطر جديدة
    message = message.replace(/\n/g, '<br>');

    // تحويل عناصر ماركداون (مثل النص الغامق) إلى HTML
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // تحويل روابط URL إلى روابط قابلة للنقر
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    message = message.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);

    return message;
}

/**
 * دالة للحصول على الوقت الحالي بتنسيق مناسب
 * @returns {string} - الوقت الحالي بتنسيق ساعة:دقيقة
 */
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
}

/**
 * دالة لتمرير الشاشة إلى أسفل عند إضافة رسائل جديدة
 */
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * دالة لمعالجة الأسئلة السريعة المقترحة
 * @param {HTMLElement} element - عنصر السؤال السريع
 */
function askQuickQuestion(element) {
    const questionText = element.textContent;
    addUserMessage(questionText);
    sendMessage(questionText);
}

/**
 * دالة للحصول على استجابة محلية للأسئلة الشائعة
 * @param {string} question - سؤال المستخدم
 * @returns {string|null} - إجابة محلية أو null إذا لم تكن هناك إجابة محلية
 */
function getBiochemistryResponse(question) {
    // إجابات مخزنة مسبقًا للأسئلة الشائعة
    const responses = {
        'ما هي الإنزيمات؟': 'الإنزيمات هي جزيئات بروتينية تعمل كمحفزات حيوية، وهي تسرع التفاعلات الكيميائية في الخلايا الحية دون أن تستهلك في التفاعل. يمكن للإنزيمات أن تزيد سرعة التفاعلات بمعدل يصل إلى 10¹⁷ مرة. كل إنزيم له موقع نشط محدد يرتبط بالركيزة (المادة المتفاعلة) ويحفز تحويلها إلى منتج.',
        
        'كيف تعمل دورة كريبس؟': 'دورة كريبس (أو دورة حمض الستريك) هي سلسلة من التفاعلات الكيميائية المستخدمة في التنفس الخلوي الهوائي. تحدث في الميتوكوندريا وتتضمن 8 خطوات رئيسية تبدأ بدخول جزيء أسيتيل كو-إنزيم A (الناتج من تحلل السكر) وتحويله إلى ثاني أكسيد الكربون والطاقة على شكل GTP (أو ATP) و NADH و FADH₂. هذه الجزيئات الغنية بالطاقة تستخدم لاحقاً في سلسلة نقل الإلكترون لإنتاج المزيد من ATP.',
        
        'ما هو الفرق بين DNA و RNA؟': 'الفروق الرئيسية بين DNA و RNA تشمل:\n1. السكر: يحتوي DNA على سكر منقوص الأكسجين (ديوكسي ريبوز)، بينما يحتوي RNA على ريبوز.\n2. القواعد النيتروجينية: يستخدم DNA قواعد A, T, G, C بينما يستخدم RNA قواعد A, U, G, C (يستبدل U محل T).\n3. البنية: DNA عادة يكون ثنائي السلسلة ويتخذ شكل حلزون مزدوج، بينما RNA عادة يكون أحادي السلسلة.\n4. الوظيفة: DNA يخزن المعلومات الوراثية، بينما RNA له أدوار متعددة منها نقل المعلومات الوراثية (mRNA)، والمساعدة في تخليق البروتين (tRNA و rRNA).',
        
        'كيف تتكون الروابط الببتيدية؟': 'تتكون الروابط الببتيدية من خلال تفاعل تكثيف بين مجموعة الكربوكسيل (-COOH) من حمض أميني ومجموعة الأمين (-NH₂) من حمض أميني آخر، مما يؤدي إلى إطلاق جزيء ماء وتكوين رابطة كيميائية قوية. هذه العملية تحدث في الريبوسومات خلال عملية ترجمة البروتين، حيث تتم إضافة الأحماض الأمينية واحداً تلو الآخر وفقاً للشفرة الوراثية المحمولة على mRNA.',
        
        'ما هي وظائف البروتينات في الجسم؟': 'للبروتينات وظائف متعددة في الجسم تشمل:\n1. **الوظيفة البنائية**: تشكل البروتينات جزءاً من بنية الخلايا والأنسجة (مثل الكولاجين في الجلد والعظام).\n2. **الوظيفة الإنزيمية**: تعمل كمحفزات حيوية للتفاعلات الكيميائية.\n3. **النقل**: نقل المواد داخل الجسم (مثل الهيموغلوبين الذي ينقل الأكسجين).\n4. **المناعة**: الأجسام المضادة هي بروتينات تساعد في مكافحة العدوى.\n5. **التنظيم الهرموني**: العديد من الهرمونات هي بروتينات تنظم عمليات الجسم.\n6. **الانقباض العضلي**: بروتينات مثل الأكتين والميوسين ضرورية لانقباض العضلات.\n7. **التوازن الحمضي-القاعدي**: تعمل كمنظمات للرقم الهيدروجيني (pH) في الدم.',
        
        'شرح عملية بناء البروتين': 'عملية بناء البروتين (أو الاصطناع البروتيني) تتم على مرحلتين رئيسيتين:\n\n**1. النسخ (Transcription)**:\n- تحدث في نواة الخلية.\n- يتم فك جزء من شريط DNA الذي يحمل المورثة.\n- يقوم إنزيم RNA بوليميراز بإنشاء نسخة من RNA المرسال (mRNA) من الجين.\n- تتم معالجة mRNA (إزالة الإنترونات وإضافة غطاء وذيل) قبل خروجه من النواة.\n\n**2. الترجمة (Translation)**:\n- تحدث في الريبوسومات في السيتوبلازم.\n- يرتبط mRNA بالريبوسوم.\n- يتم قراءة شفرة mRNA (كودونات) بمساعدة RNA الناقل (tRNA).\n- يحمل كل tRNA حمضاً أمينياً محدداً.\n- تتكون روابط ببتيدية بين الأحماض الأمينية المتجاورة.\n- يستمر الريبوسوم في التحرك على طول mRNA حتى يصل إلى كودون التوقف.\n- ينتج سلسلة من الأحماض الأمينية (عديد الببتيد).\n- تطوى السلسلة لتكوين بروتين وظيفي ثلاثي الأبعاد.',
        
        'ما هي الأحماض الأمينية الأساسية؟': 'الأحماض الأمينية الأساسية هي الأحماض الأمينية التي لا يستطيع جسم الإنسان تصنيعها وبالتالي يجب الحصول عليها من الغذاء. يوجد 9 أحماض أمينية أساسية للبالغين وهي:\n\n1. الهيستيدين (Histidine)\n2. الإيزوليوسين (Isoleucine)\n3. الليوسين (Leucine)\n4. الليسين (Lysine)\n5. الميثيونين (Methionine)\n6. الفينيلألانين (Phenylalanine)\n7. الثريونين (Threonine)\n8. التريبتوفان (Tryptophan)\n9. الفالين (Valine)\n\nالأطفال يحتاجون أيضاً حمض الأرجينين (Arginine) كحمض أميني أساسي.'
    };
    
    // البحث عن إجابة جاهزة للسؤال
    for (const key in responses) {
        if (question.includes(key) || key.includes(question)) {
            return responses[key];
        }
    }
    
    // إذا لم يتم العثور على إجابة محلية
    return null;
}

/**
 * دالة لإرسال الرسالة والحصول على الرد من الخادم
 * مع دعم لنوع المزود المفضل
 * @param {string} message - سؤال المستخدم
 * @param {string|null} preferredProvider - نوع المزود المفضل (deepseek أو gamma)
 */

function sendMessage(message, preferredProvider = null) {
    // إظهار مؤشر التحميل
    loadingIndicator.style.display = 'flex';
    
    // تجهيز البيانات التي سيتم إرسالها
    const requestData = {
        question: message
    };
    
    // إضافة نوع المزود المفضل إذا تم تحديده
    if (preferredProvider) {
        requestData.provider_type = preferredProvider;
    }
    
    console.log('إرسال طلب:', requestData);
    
    // محاولة الحصول على إجابة محلية أولاً للأسئلة الشائعة
    const localResponse = getBiochemistryResponse(message);
    if (localResponse) {
        console.log('تم العثور على إجابة محلية');
        setTimeout(() => {
            // إخفاء مؤشر التحميل
            loadingIndicator.style.display = 'none';
            // إضافة الإجابة المحلية
            addBotMessage("(إجابة محلية) " + localResponse);
        }, 500);
        return;
    }
    
    // إذا لم تكن هناك إجابة محلية، اتصل بالخادم
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        credentials: 'same-origin' // لإرسال ملفات تعريف الارتباط مع الطلب
    })
    .then(response => {
        if (!response.ok) {
            console.error('استجابة الخادم غير ناجحة:', response.status, response.statusText);
            throw new Error(`فشل الاتصال بالخادم: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // إخفاء مؤشر التحميل
        loadingIndicator.style.display = 'none';
        console.log('بيانات الاستجابة:', data);
        
        if (data.success) {
            // إضافة رد المساعد
            addBotMessage(data.answer);
            
            // إظهار معلومات حول مصدر الإجابة (اختياري)
            if (data.source) {
                console.log('مصدر الإجابة:', data.source);
            }
        } else {
            // عرض رسالة الخطأ
            const errorMsg = data.message || 'حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى.';
            addBotMessage(errorMsg);
            console.error('خطأ في الاستجابة:', data);
        }
    })
    .catch(error => {
        console.error('خطأ في الاتصال:', error);
        // إخفاء مؤشر التحميل
        loadingIndicator.style.display = 'none';
        // عرض رسالة خطأ للمستخدم
        addBotMessage('حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى. إذا استمرت المشكلة، قد يكون الخادم غير متاح حالياً.');
        
        // محاولة استخدام الإجابة المحلية كبديل
        const fallbackResponse = '⚠️ تعذر الاتصال بالخادم. سأحاول الإجابة على سؤالك بناءً على معرفتي المحدودة عن الكيمياء الحيوية.';
        addBotMessage(fallbackResponse);
        
        // إضافة إجابة عامة ومفيدة
        setTimeout(() => {
            addBotMessage('يمكنك طرح أسئلة مثل "ما هي الإنزيمات؟" أو "كيف تعمل دورة كريبس؟" للحصول على معلومات محلية أساسية عن الكيمياء الحيوية حتى يعود الاتصال بالخادم.');
        }, 1000);
    });
}

// إعداد مستمعي الأحداث عند تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // عند الضغط على زر الإرسال
    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            sendMessage(message);
            chatInput.value = '';
        }
    });
    
    // الضغط على Enter لإرسال الرسالة
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                addUserMessage(message);
                sendMessage(message);
                chatInput.value = '';
            }
        }
    });
    
    // إضافة رسالة ترحيبية
    setTimeout(() => {
        addBotMessage('مرحباً بك في مساعد الكيمياء الحيوية CHAT! يمكنك طرح أي سؤال متعلق بالكيمياء الحيوية وسأحاول الإجابة عليه.');
    }, 500);
});
