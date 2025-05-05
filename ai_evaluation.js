/**
 * AI Evaluation System for Chemistry Experiments
 * This script evaluates the results of various chemical tests on carbohydrates
 * and provides professional explanations and evaluations.
 */

// Store evaluation data for all experiments
const experimentEvaluations = {
    // Solubility test
    0: {
        title: "تقييم اختبار الذوبانية",
        description: "اختبار الذوبانية هو طريقة أساسية للتمييز بين الكربوهيدرات المختلفة باستخدام الماء كمذيب.",
        results: {
            "A": {
                name: "الجلوكوز",
                result: "قابل للذوبان",
                evaluation: "يذوب الجلوكوز بشكل كامل في الماء مكوناً محلولاً شفافاً، وهذا يعود إلى وجود مجموعات الهيدروكسيل (-OH) التي تكوّن روابط هيدروجينية مع جزيئات الماء.",
                conclusion: "إيجابي"
            },
            "B": {
                name: "اللاكتوز",
                result: "قابل للذوبان",
                evaluation: "يذوب اللاكتوز في الماء بسهولة بسبب المجموعات الهيدروكسيلية المتعددة التي تكوّن روابط هيدروجينية مع الماء.",
                conclusion: "إيجابي"
            },
            "C": {
                name: "السكروز",
                result: "قابل للذوبان",
                evaluation: "يذوب السكروز بسرعة في الماء مكوناً محلولاً شفافاً بسبب وجود مجموعات الهيدروكسيل العديدة.",
                conclusion: "إيجابي"
            },
            "D": {
                name: "النشا",
                result: "غير قابل للذوبان",
                evaluation: "النشا غير قابل للذوبان في الماء البارد بسبب حجم جزيئاته الكبير وتكوين سلاسل طويلة من الجلوكوز، مما يشكل معلقاً حليبي اللون.",
                conclusion: "سلبي"
            }
        },
        scientificExplanation: "تعتمد ذوبانية الكربوهيدرات في الماء على حجم الجزيء وتركيبه. الكربوهيدرات الأحادية (مثل الجلوكوز) والثنائية (مثل اللاكتوز والسكروز) تذوب بسهولة في الماء بسبب قدرتها على تكوين روابط هيدروجينية مع جزيئات الماء. أما الكربوهيدرات متعددة السكريات مثل النشا، فهي غير قابلة للذوبان بسبب حجمها الكبير وتركيبها المعقد وترتيب السلاسل بشكل يصعب اختراقه بواسطة جزيئات الماء."
    },
    
    // Molisch's test
    1: {
        title: "تقييم اختبار موليش",
        description: "اختبار موليش هو اختبار عام لجميع الكربوهيدرات، يعتمد على تفاعل الكربوهيدرات مع حمض الكبريتيك المركز لإنتاج مشتقات الفورفورال.",
        results: {
            "A": {
                name: "الجلوكوز",
                result: "حلقة بنفسجية حمراء",
                evaluation: "تكونت حلقة أرجوانية-حمراء واضحة عند سطح التلامس، مما يشير إلى وجود كربوهيدرات.",
                conclusion: "إيجابي"
            },
            "B": {
                name: "اللاكتوز",
                result: "حلقة بنفسجية حمراء",
                evaluation: "تكونت حلقة أرجوانية-حمراء واضحة عند سطح التلامس، مما يشير إلى وجود كربوهيدرات.",
                conclusion: "إيجابي"
            },
            "C": {
                name: "السكروز",
                result: "حلقة بنفسجية حمراء",
                evaluation: "تكونت حلقة أرجوانية-حمراء واضحة عند سطح التلامس، مما يشير إلى وجود كربوهيدرات.",
                conclusion: "إيجابي"
            },
            "D": {
                name: "النشا",
                result: "حلقة بنفسجية حمراء",
                evaluation: "تكونت حلقة أرجوانية-حمراء واضحة عند سطح التلامس، مما يشير إلى وجود كربوهيدرات.",
                conclusion: "إيجابي"
            }
        },
        scientificExplanation: "في اختبار موليش، يتفاعل حمض الكبريتيك المركز مع الكربوهيدرات لإنتاج الفورفورال أو مشتقاته عن طريق نزع الماء. يتفاعل الفورفورال الناتج مع الألفا-نافثول الموجود في كاشف موليش لتكوين منتج ملون أرجواني-أحمر يظهر على شكل حلقة عند سطح التلامس بين طبقة الحمض وطبقة الاختبار. هذا الاختبار إيجابي مع جميع الكربوهيدرات ويُعد اختباراً أولياً للكشف عن وجود الكربوهيدرات."
    },
    
    // Fehling's test
    2: {
        title: "تقييم اختبار فهلنج",
        description: "اختبار فهلنج يُستخدم للكشف عن السكريات المختزلة التي تحتوي على مجموعة ألدهيد أو كيتون حرة.",
        results: {
            "A": {
                name: "الجلوكوز",
                result: "راسب أحمر",
                evaluation: "تكون راسب أحمر من أكسيد النحاس الأحادي (Cu₂O)، مما يشير إلى أن الجلوكوز سكر مختزل.",
                conclusion: "إيجابي"
            },
            "B": {
                name: "اللاكتوز",
                result: "راسب أحمر",
                evaluation: "تكون راسب أحمر من أكسيد النحاس الأحادي (Cu₂O)، مما يشير إلى أن اللاكتوز سكر مختزل.",
                conclusion: "إيجابي"
            },
            "C": {
                name: "السكروز",
                result: "لا تغير (أزرق)",
                evaluation: "لم يتكون راسب أحمر، وبقي المحلول أزرق اللون، مما يشير إلى أن السكروز ليس سكراً مختزلاً.",
                conclusion: "سلبي"
            },
            "D": {
                name: "النشا",
                result: "لا تغير (أزرق)",
                evaluation: "لم يتكون راسب أحمر، وبقي المحلول أزرق اللون، مما يشير إلى أن النشا ليس سكراً مختزلاً.",
                conclusion: "سلبي"
            }
        },
        scientificExplanation: "يعتمد اختبار فهلنج على قدرة السكريات المختزلة على أكسدة محلول فهلنج الأزرق (الذي يحتوي على أيونات النحاس الثنائي Cu²⁺) إلى راسب أحمر من أكسيد النحاس الأحادي (Cu₂O). السكريات التي تحتوي على مجموعة ألدهيد حرة أو كيتون قابل للتحول إلى ألدهيد (مثل الجلوكوز واللاكتوز) تُعطي نتيجة إيجابية. أما السكريات غير المختزلة مثل السكروز والكربوهيدرات متعددة السكريات مثل النشا، فلا تُعطي تفاعلاً."
    },
    
    // Benedict's test
    3: {
        title: "تقييم اختبار بينديكت",
        description: "اختبار بينديكت يُستخدم للكشف عن السكريات المختزلة، ويعمل بطريقة مشابهة لاختبار فهلنج.",
        results: {
            "A": {
                name: "الجلوكوز",
                result: "راسب أحمر-برتقالي",
                evaluation: "تكون راسب أحمر-برتقالي من أكسيد النحاس الأحادي (Cu₂O)، مما يشير إلى أن الجلوكوز سكر مختزل.",
                conclusion: "إيجابي"
            },
            "B": {
                name: "اللاكتوز",
                result: "راسب أحمر-برتقالي",
                evaluation: "تكون راسب أحمر-برتقالي من أكسيد النحاس الأحادي (Cu₂O)، مما يشير إلى أن اللاكتوز سكر مختزل.",
                conclusion: "إيجابي"
            },
            "C": {
                name: "السكروز",
                result: "لا تغير (أزرق)",
                evaluation: "لم يتكون راسب ملون، وبقي المحلول أزرق اللون، مما يشير إلى أن السكروز ليس سكراً مختزلاً.",
                conclusion: "سلبي"
            },
            "D": {
                name: "النشا",
                result: "لا تغير (أزرق)",
                evaluation: "لم يتكون راسب ملون، وبقي المحلول أزرق اللون، مما يشير إلى أن النشا ليس سكراً مختزلاً.",
                conclusion: "سلبي"
            }
        },
        scientificExplanation: "يحتوي كاشف بينديكت على أيونات النحاس الثنائي (Cu²⁺) التي تتفاعل مع السكريات المختزلة عند التسخين. السكريات المختزلة مثل الجلوكوز واللاكتوز تؤكسد وتختزل أيونات النحاس الثنائي إلى أكسيد النحاس الأحادي (Cu₂O) الذي يترسب بلون أحمر-برتقالي. السكريات غير المختزلة مثل السكروز والنشا لا تتفاعل مع الكاشف وتبقى المحاليل زرقاء اللون."
    },
    
    // Tollen's test
    4: {
        title: "تقييم اختبار تولنز",
        description: "اختبار تولنز (اختبار مرآة الفضة) يُستخدم للكشف عن السكريات المختزلة التي تحتوي على مجموعة ألدهيد.",
        results: {
            "A": {
                name: "الجلوكوز",
                result: "طبقة فضية لامعة",
                evaluation: "تكونت طبقة فضية لامعة على جدار أنبوب الاختبار، مما يشير إلى أن الجلوكوز سكر مختزل.",
                conclusion: "إيجابي"
            },
            "B": {
                name: "اللاكتوز",
                result: "طبقة فضية لامعة",
                evaluation: "تكونت طبقة فضية لامعة على جدار أنبوب الاختبار، مما يشير إلى أن اللاكتوز سكر مختزل.",
                conclusion: "إيجابي"
            },
            "C": {
                name: "السكروز",
                result: "لا تغير (محلول شفاف)",
                evaluation: "لم تتكون طبقة فضية، وبقي المحلول شفافاً، مما يشير إلى أن السكروز ليس سكراً مختزلاً.",
                conclusion: "سلبي"
            },
            "D": {
                name: "النشا",
                result: "لا تغير (محلول شفاف)",
                evaluation: "لم تتكون طبقة فضية، وبقي المحلول شفافاً، مما يشير إلى أن النشا ليس سكراً مختزلاً.",
                conclusion: "سلبي"
            }
        },
        scientificExplanation: "في اختبار تولنز، تختزل السكريات المختزلة أيونات الفضة الأمونية [Ag(NH₃)₂]⁺ الموجودة في كاشف تولنز إلى فضة حر (Ag) يترسب على سطح أنبوب الاختبار مكوناً طبقة لامعة تشبه المرآة. السكريات التي تحتوي على مجموعة ألدهيد حرة (مثل الجلوكوز) أو التي يمكن أن تتحول إلى صيغة ألدهيدية (مثل اللاكتوز) تُعطي نتيجة إيجابية. أما السكريات غير المختزلة مثل السكروز والنشا، فلا تُظهر هذا التفاعل."
    },
    
    // Iodine test
    5: {
        title: "تقييم اختبار اليود",
        description: "اختبار اليود يُستخدم بشكل خاص للكشف عن وجود النشا.",
        results: {
            "A": {
                name: "الجلوكوز",
                result: "لون أصفر-بني",
                evaluation: "بقي المحلول باللون الأصفر-البني لمحلول اليود، مما يشير إلى عدم وجود النشا.",
                conclusion: "سلبي"
            },
            "B": {
                name: "اللاكتوز",
                result: "لون أصفر-بني",
                evaluation: "بقي المحلول باللون الأصفر-البني لمحلول اليود، مما يشير إلى عدم وجود النشا.",
                conclusion: "سلبي"
            },
            "C": {
                name: "السكروز",
                result: "لون أصفر-بني",
                evaluation: "بقي المحلول باللون الأصفر-البني لمحلول اليود، مما يشير إلى عدم وجود النشا.",
                conclusion: "سلبي"
            },
            "D": {
                name: "النشا",
                result: "لون أزرق داكن",
                evaluation: "تحول لون المحلول إلى أزرق داكن مميز، مما يؤكد وجود النشا.",
                conclusion: "إيجابي"
            }
        },
        scientificExplanation: "اختبار اليود هو اختبار نوعي خاص بالنشا، حيث يتفاعل اليود (I₂) مع النشا لتكوين معقد نشا-يود ذو لون أزرق داكن مميز. يحدث هذا التفاعل بسبب قدرة سلاسل الأميلوز الحلزونية في النشا على احتواء جزيئات اليود داخلها. الكربوهيدرات الأخرى مثل الجلوكوز واللاكتوز والسكروز لا تكوّن هذا المعقد ولا تُظهر تغيراً في لون محلول اليود، حيث يبقى بلونه الأصفر-البني."
    }
};

// Function to get the experiment results and evaluation
function getExperimentEvaluation(testIndex) {
    if (testIndex >= 0 && testIndex < 6) {
        return experimentEvaluations[testIndex];
    }
    return null;
}

// Function to display the experiment evaluation in the AI evaluation panel
function displayExperimentEvaluation(testIndex) {
    const evaluation = getExperimentEvaluation(testIndex);
    if (!evaluation) return;
    
    // Check if evaluation panel exists in chemistry.html
    if (window.parent && window.parent.document) {
        const evaluationPanel = window.parent.document.getElementById('ai-evaluation-panel');
        if (evaluationPanel) {
            let htmlContent = `
                <div class="ai-evaluation-header">
                    <div class="ai-icon"><i class="fas fa-robot"></i></div>
                    <h3>${evaluation.title}</h3>
                </div>
                <div class="ai-evaluation-description">
                    <p>${evaluation.description}</p>
                </div>
                <div class="ai-evaluation-results">
                    <h4>نتائج التحليل</h4>
                    <div class="results-grid">
            `;
            
            // Add results for each sample
            for (const tube in evaluation.results) {
                const result = evaluation.results[tube];
                const conclusionClass = result.conclusion === "إيجابي" ? "positive" : "negative";
                
                htmlContent += `
                    <div class="result-card">
                        <div class="sample-label">${tube} - ${result.name}</div>
                        <div class="result-data">
                            <div class="result-value">النتيجة: <span>${result.result}</span></div>
                            <div class="result-conclusion ${conclusionClass}">
                                <i class="fas fa-${result.conclusion === "إيجابي" ? "check" : "times"}"></i>
                                ${result.conclusion}
                            </div>
                        </div>
                        <div class="result-explanation">${result.evaluation}</div>
                    </div>
                `;
            }
            
            // Add scientific explanation
            htmlContent += `
                    </div>
                </div>
                <div class="ai-scientific-explanation">
                    <h4>التفسير العلمي</h4>
                    <p>${evaluation.scientificExplanation}</p>
                </div>
            `;
            
            evaluationPanel.innerHTML = htmlContent;
         
        }
    }
}

// Listen for changes in test selection
function initAIEvaluation() {
    if (window.parent && window.parent.document) {
        const dropboxTest = document.getElementById('DropboxTest');
        if (dropboxTest) {
            // Immediately show evaluation for current test
            let currentTestIndex = dropboxTest.value;
            displayExperimentEvaluation(currentTestIndex);
            
            // Update evaluation when test changes
            dropboxTest.addEventListener('change', function() {
                const testIndex = this.value;
                displayExperimentEvaluation(testIndex);
            });
        }
        
        // Also add a button to show evaluation manually
        const showEvalButton = document.createElement('button');
        showEvalButton.id = 'showEvaluationBtn';
        showEvalButton.className = 'ai-eval-button';
        showEvalButton.innerHTML = '<i class="fas fa-robot"></i> عرض التقييم الذكي';
        showEvalButton.onclick = function() {
            const dropboxTest = document.getElementById('DropboxTest');
            if (dropboxTest) {
                displayExperimentEvaluation(dropboxTest.value);
            }
        };
        
        // Add the button to the page
        const mainDiv = document.getElementById('mainDiv');
        if (mainDiv) {
            mainDiv.appendChild(showEvalButton);
        }
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a slight delay to ensure the iframe is fully loaded
    setTimeout(initAIEvaluation, 1000);
});

// Function to manually trigger the evaluation from the parent window
window.showAIEvaluation = function() {
    const dropboxTest = document.getElementById('DropboxTest');
    if (dropboxTest) {
        displayExperimentEvaluation(dropboxTest.value);
    }
};
