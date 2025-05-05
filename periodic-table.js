/**
 * الجدول الدوري التفاعلي - ملف جافاسكريبت
 * Interactive Periodic Table - JavaScript file
 */

// قائمة العناصر الكيميائية
const elements = [
    // Row 1
    {
        number: 1,
        symbol: 'H',
        name: 'هيدروجين',
        name_en: 'Hydrogen',
        weight: 1.008,
        category: 'nonmetal',
        state: 'gas',
        group: 1,
        period: 1,
        valence: 1,
        electronegativity: 2.20,
        radius: 25,
        melting: -259.16,
        boiling: -252.87,
        electron_config: '1s¹',
        electrons: 1,
        ionization: 13.598,
        description: 'الهيدروجين هو العنصر الأخف والأكثر وفرة في الكون. يتكون من بروتون واحد وإلكترون واحد. يستخدم في إنتاج الأمونيا واستخراج المعادن.',
        uses: [
            'إنتاج الأمونيا',
            'تكرير النفط',
            'خلايا الوقود',
            'المفاعلات النووية'
        ]
    },
    // Empty cells
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {
        number: 2,
        symbol: 'He',
        name: 'هيليوم',
        name_en: 'Helium',
        weight: 4.0026,
        category: 'noble-gas',
        state: 'gas',
        group: 18,
        period: 1,
        valence: 0,
        electronegativity: 0,
        radius: 31,
        melting: -272.2,
        boiling: -268.93,
        electron_config: '1s²',
        electrons: 2,
        ionization: 24.587,
        description: 'الهيليوم هو ثاني أخف العناصر وثاني أكثر العناصر وفرة في الكون. إنه غاز نبيل، مما يعني أنه غير متفاعل تقريبًا. يستخدم في البالونات والمناطيد والغوص.',
        uses: [
            'المناطيد والبالونات',
            'التبريد الفائق للمغناطيسات',
            'الغوص العميق',
            'أجهزة الرنين المغناطيسي'
        ]
    },

    // Row 2
    {
        number: 3,
        symbol: 'Li',
        name: 'ليثيوم',
        name_en: 'Lithium',
        weight: 6.94,
        category: 'alkali-metal',
        state: 'solid',
        group: 1,
        period: 2,
        valence: 1,
        electronegativity: 0.98,
        radius: 145,
        melting: 180.54,
        boiling: 1342,
        electron_config: '[He] 2s¹',
        electrons: 3,
        ionization: 5.392,
        description: 'الليثيوم هو أخف معدن صلب. يستخدم في البطاريات القابلة لإعادة الشحن والأدوية النفسية.',
        uses: [
            'بطاريات الليثيوم',
            'الأدوية النفسية',
            'سبائك الألومنيوم',
            'الزجاج والسيراميك'
        ]
    },
    {
        number: 4,
        symbol: 'Be',
        name: 'بريليوم',
        name_en: 'Beryllium',
        weight: 9.0122,
        category: 'alkaline-earth-metal',
        state: 'solid',
        group: 2,
        period: 2,
        valence: 2,
        electronegativity: 1.57,
        radius: 105,
        melting: 1287,
        boiling: 2471,
        electron_config: '[He] 2s²',
        electrons: 4,
        ionization: 9.323,
        description: 'البريليوم هو معدن خفيف وقوي. يستخدم في صناعة الطائرات والأقمار الصناعية.',
        uses: [
            'صناعة الطائرات',
            'الأقمار الصناعية',
            'المفاعلات النووية',
            'الأشعة السينية'
        ]
    },
    // Empty cells
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {
        number: 5,
        symbol: 'B',
        name: 'بورون',
        name_en: 'Boron',
        weight: 10.81,
        category: 'metalloid',
        state: 'solid',
        group: 13,
        period: 2,
        valence: 3,
        electronegativity: 2.04,
        radius: 85,
        melting: 2075,
        boiling: 4000,
        electron_config: '[He] 2s² 2p¹',
        electrons: 5,
        ionization: 8.298,
        description: 'البورون هو شبه فلز يستخدم في صناعة الزجاج والسيراميك والمنظفات.',
        uses: [
            'صناعة الزجاج',
            'السيراميك',
            'المنظفات',
            'المبيدات الحشرية'
        ]
    },
    {
        number: 6,
        symbol: 'C',
        name: 'كربون',
        name_en: 'Carbon',
        weight: 12.011,
        category: 'nonmetal',
        state: 'solid',
        group: 14,
        period: 2,
        valence: 4,
        electronegativity: 2.55,
        radius: 70,
        melting: 3550,
        boiling: 4827,
        electron_config: '[He] 2s² 2p²',
        electrons: 6,
        ionization: 11.260,
        description: 'الكربون هو أساس الحياة على الأرض. يوجد في عدة أشكال مثل الماس والجرافيت.',
        uses: [
            'الوقود الأحفوري',
            'صناعة الصلب',
            'الماس الصناعي',
            'الجرافيت'
        ]
    },
    {
        number: 7,
        symbol: 'N',
        name: 'نيتروجين',
        name_en: 'Nitrogen',
        weight: 14.007,
        category: 'nonmetal',
        state: 'gas',
        group: 15,
        period: 2,
        valence: 3,
        electronegativity: 3.04,
        radius: 65,
        melting: -210.01,
        boiling: -195.79,
        electron_config: '[He] 2s² 2p³',
        electrons: 7,
        ionization: 14.534,
        description: 'النيتروجين هو غاز خامل يشكل 78% من الغلاف الجوي. يستخدم في صناعة الأسمدة.',
        uses: [
            'الأسمدة',
            'صناعة الأمونيا',
            'التبريد',
            'الحفظ بالتبريد'
        ]
    },
    {
        number: 8,
        symbol: 'O',
        name: 'أكسجين',
        name_en: 'Oxygen',
        weight: 15.999,
        category: 'nonmetal',
        state: 'gas',
        group: 16,
        period: 2,
        valence: 2,
        electronegativity: 3.44,
        radius: 60,
        melting: -218.79,
        boiling: -182.96,
        electron_config: '[He] 2s² 2p⁴',
        electrons: 8,
        ionization: 13.618,
        description: 'الأكسجين هو غاز ضروري للحياة. يشكل 21% من الغلاف الجوي.',
        uses: [
            'التنفس',
            'اللحام',
            'الطب',
            'معالجة المياه'
        ]
    },
    {
        number: 9,
        symbol: 'F',
        name: 'فلور',
        name_en: 'Fluorine',
        weight: 18.998,
        category: 'halogen',
        state: 'gas',
        group: 17,
        period: 2,
        valence: 1,
        electronegativity: 3.98,
        radius: 50,
        melting: -219.67,
        boiling: -188.11,
        electron_config: '[He] 2s² 2p⁵',
        electrons: 9,
        ionization: 17.423,
        description: 'الفلور هو أكثر العناصر تفاعلية. يستخدم في معجون الأسنان والتبريد.',
        uses: [
            'معجون الأسنان',
            'التبريد',
            'المبيدات الحشرية',
            'صناعة البلاستيك'
        ]
    },
    {
        number: 10,
        symbol: 'Ne',
        name: 'نيون',
        name_en: 'Neon',
        weight: 20.180,
        category: 'noble-gas',
        state: 'gas',
        group: 18,
        period: 2,
        valence: 0,
        electronegativity: 0,
        radius: 38,
        melting: -248.59,
        boiling: -246.08,
        electron_config: '[He] 2s² 2p⁶',
        electrons: 10,
        ionization: 21.565,
        description: 'النيون هو غاز نبيل يستخدم في الإضاءة والإعلانات.',
        uses: [
            'الإضاءة',
            'الإعلانات',
            'الليزر',
            'التبريد'
        ]
    },

    // Row 3
    {
        number: 11,
        symbol: 'Na',
        name: 'صوديوم',
        name_en: 'Sodium',
        weight: 22.990,
        category: 'alkali-metal',
        state: 'solid',
        group: 1,
        period: 3,
        valence: 1,
        electronegativity: 0.93,
        radius: 180,
        melting: 97.72,
        boiling: 883,
        electron_config: '[Ne] 3s¹',
        electrons: 1,
        ionization: 5.139,
        description: 'الصوديوم هو فلز قلوي ناعم فضي اللون. يتفاعل بشدة مع الماء والأكسجين. يوجد في ملح الطعام (كلوريد الصوديوم) ويستخدم في الإضاءة والمفاعلات النووية.',
        uses: [
            'ملح الطعام (كلوريد الصوديوم)',
            'مصابيح الصوديوم',
            'المبردات في المفاعلات النووية',
            'صناعة الصابون'
        ]
    },
    {
        number: 12,
        symbol: 'Mg',
        name: 'مغنيسيوم',
        name_en: 'Magnesium',
        weight: 24.305,
        category: 'alkaline-earth',
        state: 'solid',
        group: 2,
        period: 3,
        valence: 2,
        electronegativity: 1.31,
        radius: 150,
        melting: 650,
        boiling: 1090,
        electron_config: '[Ne] 3s²',
        electrons: 2,
        ionization: 7.646,
        description: 'المغنيسيوم هو فلز قلوي ترابي فضي أبيض، خفيف وقوي. يستخدم في السبائك الخفيفة والتطبيقات الهيكلية. يعتبر من العناصر الأساسية في جسم الإنسان.',
        uses: [
            'سبائك الألمنيوم في الطائرات والسيارات',
            'الألعاب النارية',
            'المكملات الغذائية',
            'بطاريات المغنيسيوم'
        ]
    },
    // Empty cells
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {
        number: 13,
        symbol: 'Al',
        name: 'ألمنيوم',
        name_en: 'Aluminium',
        weight: 26.982,
        category: 'post-transition-metal',
        state: 'solid',
        group: 13,
        period: 3,
        valence: 3,
        electronegativity: 1.61,
        radius: 125,
        melting: 660.32,
        boiling: 2519,
        electron_config: '[Ne] 3s² 3p¹',
        electrons: 3,
        ionization: 5.986,
        description: 'الألمنيوم هو فلز خفيف فضي-أبيض، وهو ثالث أكثر العناصر وفرة في القشرة الأرضية. يستخدم في صناعة الطائرات والسيارات والتعبئة.',
        uses: [
            'صناعة الطائرات والسيارات',
            'علب المشروبات ورقائق الطعام',
            'أسلاك نقل الكهرباء',
            'مواد البناء'
        ]
    },
    {
        number: 14,
        symbol: 'Si',
        name: 'سيليكون',
        name_en: 'Silicon',
        weight: 28.085,
        category: 'metalloid',
        state: 'solid',
        group: 14,
        period: 3,
        valence: 4,
        electronegativity: 1.90,
        radius: 110,
        melting: 1414,
        boiling: 3265,
        electron_config: '[Ne] 3s² 3p²',
        electrons: 4,
        ionization: 8.152,
        description: 'السيليكون هو شبه فلز أزرق-رمادي مع لمعان معدني. ثاني أكثر العناصر وفرة في القشرة الأرضية. يستخدم في أشباه الموصلات والرقائق الإلكترونية.',
        uses: [
            'الرقائق الإلكترونية وأشباه الموصلات',
            'الخلايا الشمسية',
            'السيليكون في الزجاج والسيراميك',
            'السيليكون المطاطي'
        ]
    },
    {
        number: 15,
        symbol: 'P',
        name: 'فوسفور',
        name_en: 'Phosphorus',
        weight: 30.974,
        category: 'nonmetal',
        state: 'solid',
        group: 15,
        period: 3,
        valence: 5,
        electronegativity: 2.19,
        radius: 100,
        melting: 44.15,
        boiling: 280.5,
        electron_config: '[Ne] 3s² 3p³',
        electrons: 5,
        ionization: 10.487,
        description: 'الفوسفور هو لافلز متعدد الأشكال يوجد في الطبيعة على شكل الفوسفور الأبيض (شديد السمية) والفوسفور الأحمر (أكثر استقرارًا). يستخدم في الأسمدة والمركبات العضوية.',
        uses: [
            'الأسمدة الفوسفاتية',
            'المنظفات',
            'أعواد الثقاب',
            'مركبات عضوية فسفورية للمبيدات'
        ]
    },
    {
        number: 16,
        symbol: 'S',
        name: 'كبريت',
        name_en: 'Sulfur',
        weight: 32.06,
        category: 'nonmetal',
        state: 'solid',
        group: 16,
        period: 3,
        valence: 6,
        electronegativity: 2.58,
        radius: 100,
        melting: 115.21,
        boiling: 444.61,
        electron_config: '[Ne] 3s² 3p⁴',
        electrons: 6,
        ionization: 10.36,
        description: 'الكبريت هو لافلز أصفر هش. يوجد بكثرة في المعادن والنفط. يستخدم في صناعة حمض الكبريتيك، والمطاط، والمبيدات الحشرية.',
        uses: [
            'إنتاج حمض الكبريتيك',
            'معالجة المطاط',
            'الأدوية والمطهرات',
            'المبيدات الحشرية'
        ]
    },
    {
        number: 17,
        symbol: 'Cl',
        name: 'كلور',
        name_en: 'Chlorine',
        weight: 35.45,
        category: 'nonmetal',
        state: 'gas',
        group: 17,
        period: 3,
        valence: 7,
        electronegativity: 3.16,
        radius: 100,
        melting: -101.5,
        boiling: -34.04,
        electron_config: '[Ne] 3s² 3p⁵',
        electrons: 7,
        ionization: 12.968,
        description: 'الكلور هو غاز أصفر-أخضر سام له رائحة نفاذة. يستخدم في تطهير المياه، وصناعة البلاستيك، والمبيدات.',
        uses: [
            'تطهير مياه الشرب وحمامات السباحة',
            'صناعة البلاستيك (PVC)',
            'المبيدات والمطهرات',
            'تبييض الورق'
        ]
    },
    {
        number: 18,
        symbol: 'Ar',
        name: 'أرغون',
        name_en: 'Argon',
        weight: 39.948,
        category: 'noble-gas',
        state: 'gas',
        group: 18,
        period: 3,
        valence: 0,
        electronegativity: 0,
        radius: 71,
        melting: -189.34,
        boiling: -185.85,
        electron_config: '[Ne] 3s² 3p⁶',
        electrons: 8,
        ionization: 15.760,
        description: 'الأرغون هو غاز نبيل عديم اللون والرائحة. ثالث أكثر الغازات وفرة في الغلاف الجوي الأرضي. يستخدم في المصابيح واللحام.',
        uses: [
            'المصابيح الفلورية والكهربائية',
            'اللحام في بيئة خاملة',
            'عزل النوافذ',
            'تطبيقات الليزر'
        ]
    },

    // Row 4 (selections)
    {
        number: 19,
        symbol: 'K',
        name: 'بوتاسيوم',
        name_en: 'Potassium',
        weight: 39.098,
        category: 'alkali-metal',
        state: 'solid',
        group: 1,
        period: 4,
        valence: 1,
        electronegativity: 0.82,
        radius: 220,
        melting: 63.38,
        boiling: 759,
        electron_config: '[Ar] 4s¹',
        electrons: 1,
        ionization: 4.341,
        description: 'البوتاسيوم هو فلز قلوي فضي ناعم. يتفاعل بشدة مع الماء. ضروري للنباتات والحيوانات، ويستخدم في الأسمدة والزجاج.',
        uses: [
            'الأسمدة',
            'بديل للملح (كلوريد البوتاسيوم)',
            'صناعة الصابون',
            'بطاريات البوتاسيوم الهوائية'
        ]
    },
    {
        number: 20,
        symbol: 'Ca',
        name: 'كالسيوم',
        name_en: 'Calcium',
        weight: 40.078,
        category: 'alkaline-earth',
        state: 'solid',
        group: 2,
        period: 4,
        valence: 2,
        electronegativity: 1.00,
        radius: 180,
        melting: 842,
        boiling: 1484,
        electron_config: '[Ar] 4s²',
        electrons: 2,
        ionization: 6.113,
        description: 'الكالسيوم هو فلز قلوي ترابي فضي ناعم. خامس أكثر العناصر وفرة في القشرة الأرضية. مكون أساسي للعظام والأسنان.',
        uses: [
            'مكملات غذائية للعظام',
            'مواد البناء (الأسمنت والجبس)',
            'إزالة الكبريت من الحديد',
            'المطهرات والمبيدات'
        ]
    },
    {
        number: 21,
        symbol: 'Sc',
        name: 'سكانديوم',
        name_en: 'Scandium',
        weight: 44.956,
        category: 'transition-metal',
        state: 'solid',
        group: 3,
        period: 4,
        valence: 3,
        electronegativity: 1.36,
        radius: 160,
        melting: 1541,
        boiling: 2830,
        electron_config: '[Ar] 3d¹ 4s²',
        electrons: 2,
        ionization: 6.561,
        description: 'السكانديوم هو فلز انتقالي فضي أبيض، خفيف وقوي. يستخدم في صناعة سبائك خفيفة عالية الأداء، خاصة في صناعة الطيران والرياضة.',
        uses: [
            'سبائك خفيفة الوزن للطائرات',
            'معدات رياضية',
            'مصابيح الهاليد المعدنية',
            'إضافة لبطاريات النيكل-هيدريد المعدنية'
        ]
    },
    {
        number: 22,
        symbol: 'Ti',
        name: 'تيتانيوم',
        name_en: 'Titanium',
        weight: 47.867,
        category: 'transition-metal',
        state: 'solid',
        group: 4,
        period: 4,
        valence: 4,
        electronegativity: 1.54,
        radius: 140,
        melting: 1668,
        boiling: 3287,
        electron_config: '[Ar] 3d² 4s²',
        electrons: 2,
        ionization: 6.828,
        description: 'التيتانيوم هو فلز انتقالي قوي خفيف الوزن، مقاوم للتآكل والصدأ. يستخدم في صناعة الطائرات والسفن والدراجات، وكذلك في الزراعات الطبية لقوته وتوافقه الحيوي.',
        uses: [
            'هياكل الطائرات والصواريخ',
            'زراعة الأسنان والعظام الصناعية',
            'معدات رياضية فاخرة',
            'صناعة السفن والغواصات'
        ]
    },
    {
        number: 23,
        symbol: 'V',
        name: 'فاناديوم',
        name_en: 'Vanadium',
        weight: 50.942,
        category: 'transition-metal',
        state: 'solid',
        group: 5,
        period: 4,
        valence: 5,
        electronegativity: 1.63,
        radius: 135,
        melting: 1910,
        boiling: 3407,
        electron_config: '[Ar] 3d³ 4s²',
        electrons: 2,
        ionization: 6.746,
        description: 'الفاناديوم هو فلز انتقالي فضي، صلب جداً ومقاوم للتآكل. يستخدم أساساً كعنصر سبائكي في صناعة الفولاذ لتحسين قوته والمقاومة.',
        uses: [
            'سبائك الفولاذ عالية القوة',
            'صناعة الأدوات والآلات',
            'صناعة السيارات والطائرات',
            'خلايا تخزين الطاقة'
        ]
    },
    {
        number: 24,
        symbol: 'Cr',
        name: 'كروم',
        name_en: 'Chromium',
        weight: 51.996,
        category: 'transition-metal',
        state: 'solid',
        group: 6,
        period: 4,
        valence: 6,
        electronegativity: 1.66,
        radius: 140,
        melting: 1907,
        boiling: 2671,
        electron_config: '[Ar] 3d⁵ 4s¹',
        electrons: 1,
        ionization: 6.767,
        description: 'الكروم هو فلز انتقالي رمادي لامع، صلب ومقاوم للتآكل. يستخدم في الطلاء للحماية والزينة، وفي صناعة الفولاذ المقاوم للصدأ.',
        uses: [
            'طلاء المعادن (الكروم)',
            'صناعة الفولاذ المقاوم للصدأ',
            'دباغة الجلود',
            'صناعة السبائك المقاومة للحرارة'
        ]
    },
    {
        number: 25,
        symbol: 'Mn',
        name: 'منغنيز',
        name_en: 'Manganese',
        weight: 54.938,
        category: 'transition-metal',
        state: 'solid',
        group: 7,
        period: 4,
        valence: 7,
        electronegativity: 1.55,
        radius: 140,
        melting: 1246,
        boiling: 2061,
        electron_config: '[Ar] 3d⁵ 4s²',
        electrons: 2,
        ionization: 7.434,
        description: 'المنغنيز هو فلز انتقالي فضي-رمادي، هش نسبياً. يستخدم بشكل رئيسي في صناعة الفولاذ وكعامل مؤكسد في الصناعات الكيميائية.',
        uses: [
            'إنتاج الفولاذ',
            'صناعة البطاريات الجافة',
            'ملونات للزجاج والسيراميك',
            'إضافات للوقود والأسمدة'
        ]
    },
    {
        number: 26,
        symbol: 'Fe',
        name: 'حديد',
        name_en: 'Iron',
        weight: 55.845,
        category: 'transition-metal',
        state: 'solid',
        group: 8,
        period: 4,
        valence: 3,
        electronegativity: 1.83,
        radius: 140,
        melting: 1538,
        boiling: 2861,
        electron_config: '[Ar] 3d⁶ 4s²',
        electrons: 2,
        ionization: 7.902,
        description: 'الحديد هو فلز انتقالي فضي، وهو رابع أكثر العناصر وفرة في القشرة الأرضية. يستخدم على نطاق واسع في الصناعة وهو المكون الرئيسي للفولاذ.',
        uses: [
            'صناعة الفولاذ والسبائك',
            'البناء والإنشاءات',
            'السيارات والآلات',
            'مكوّن أساسي للهيموغلوبين في الدم'
        ]
    },
    {
        number: 27,
        symbol: 'Co',
        name: 'كوبالت',
        name_en: 'Cobalt',
        weight: 58.933,
        category: 'transition-metal',
        state: 'solid',
        group: 9,
        period: 4,
        valence: 3,
        electronegativity: 1.88,
        radius: 135,
        melting: 1495,
        boiling: 2927,
        electron_config: '[Ar] 3d⁷ 4s²',
        electrons: 2,
        ionization: 7.881,
        description: 'الكوبالت هو فلز انتقالي فضي-رمادي مع مسحة زرقاء. يستخدم في المغناطيسات الدائمة والبطاريات القابلة للشحن وسبائك المقاومة للحرارة.',
        uses: [
            'بطاريات الليثيوم-أيون',
            'المغناطيسات القوية',
            'سبائك مقاومة للتآكل والحرارة',
            'الصبغات والأصباغ الزرقاء'
        ]
    },
    {
        number: 28,
        symbol: 'Ni',
        name: 'نيكل',
        name_en: 'Nickel',
        weight: 58.693,
        category: 'transition-metal',
        state: 'solid',
        group: 10,
        period: 4,
        valence: 2,
        electronegativity: 1.91,
        radius: 135,
        melting: 1455,
        boiling: 2913,
        electron_config: '[Ar] 3d⁸ 4s²',
        electrons: 2,
        ionization: 7.640,
        description: 'النيكل هو فلز انتقالي فضي-أبيض لامع، صلب ومرن. يستخدم في العملات المعدنية وفي سبائك عديدة مثل الفولاذ المقاوم للصدأ.',
        uses: [
            'العملات المعدنية',
            'الفولاذ المقاوم للصدأ',
            'بطاريات النيكل-هيدريد المعدنية',
            'طلاء المعادن للحماية من الصدأ'
        ]
    },
    {
        number: 29,
        symbol: 'Cu',
        name: 'نحاس',
        name_en: 'Copper',
        weight: 63.546,
        category: 'transition-metal',
        state: 'solid',
        group: 11,
        period: 4,
        valence: 2,
        electronegativity: 1.90,
        radius: 135,
        melting: 1084.6,
        boiling: 2562,
        electron_config: '[Ar] 3d¹⁰ 4s¹',
        electrons: 1,
        ionization: 7.726,
        description: 'النحاس هو فلز انتقالي أحمر-برتقالي، موصل ممتاز للكهرباء والحرارة. يستخدم في الأسلاك الكهربائية والسباكة وصناعة السبائك مثل البرونز والنحاس الأصفر.',
        uses: [
            'الأسلاك والكابلات الكهربائية',
            'أنابيب السباكة',
            'سبائك مثل البرونز والنحاس الأصفر',
            'الإلكترونيات والبطاريات'
        ]
    },
    {
        number: 30,
        symbol: 'Zn',
        name: 'زنك',
        name_en: 'Zinc',
        weight: 65.38,
        category: 'transition-metal',
        state: 'solid',
        group: 12,
        period: 4,
        valence: 2,
        electronegativity: 1.65,
        radius: 135,
        melting: 419.5,
        boiling: 907,
        electron_config: '[Ar] 3d¹⁰ 4s²',
        electrons: 2,
        ionization: 9.394,
        description: 'الزنك هو فلز انتقالي رمادي-أزرق، هش نسبياً عند درجة حرارة الغرفة. يستخدم في طلاء الحديد لمنع الصدأ (الجلفنة) وفي صناعة السبائك مثل النحاس الأصفر.',
        uses: [
            'طلاء الحديد (الجلفنة) للحماية من الصدأ',
            'سبائك مثل النحاس الأصفر',
            'البطاريات الجافة',
            'مكملات غذائية ومستحضرات طبية'
        ]
    },
    {
        number: 35,
        symbol: 'Br',
        name: 'بروم',
        name_en: 'Bromine',
        weight: 79.904,
        category: 'nonmetal',
        state: 'liquid',
        group: 17,
        period: 4,
        valence: 7,
        electronegativity: 2.96,
        radius: 115,
        melting: -7.3,
        boiling: 58.8,
        electron_config: '[Ar] 3d¹⁰ 4s² 4p⁵',
        electrons: 7,
        ionization: 11.814,
        description: 'البروم هو لافلز سائل أحمر-بني عند درجة حرارة الغرفة، له رائحة قوية. يستخدم كمبيد للآفات وفي مركبات إطفاء الحرائق والأدوية.',
        uses: [
            'مبيدات الآفات',
            'مركبات إطفاء الحرائق',
            'تنقية المياه',
            'صناعة الأدوية والمواد الكيميائية'
        ]
    },
    {
        number: 47,
        symbol: 'Ag',
        name: 'فضة',
        name_en: 'Silver',
        weight: 107.868,
        category: 'transition-metal',
        state: 'solid',
        group: 11,
        period: 5,
        valence: 1,
        electronegativity: 1.93,
        radius: 160,
        melting: 961.8,
        boiling: 2162,
        electron_config: '[Kr] 4d¹⁰ 5s¹',
        electrons: 1,
        ionization: 7.576,
        description: 'الفضة هي فلز انتقالي أبيض لامع، أفضل موصل للكهرباء والحرارة بين العناصر. تستخدم في العملات المعدنية والحلي والتصوير الفوتوغرافي والإلكترونيات.',
        uses: [
            'المجوهرات والحلي',
            'الإلكترونيات والدوائر الكهربائية',
            'التصوير الفوتوغرافي (تاريخياً)',
            'العملات المعدنية والميداليات'
        ]
    },
    {
        number: 79,
        symbol: 'Au',
        name: 'ذهب',
        name_en: 'Gold',
        weight: 196.967,
        category: 'transition-metal',
        state: 'solid',
        group: 11,
        period: 6,
        valence: 1,
        electronegativity: 2.54,
        radius: 135,
        melting: 1064.2,
        boiling: 2856,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
        electrons: 1,
        ionization: 9.226,
        description: 'الذهب هو فلز انتقالي أصفر، كثيف وناعم ومرن. لا يتفاعل مع معظم المواد الكيميائية. يستخدم في المجوهرات والعملات والإلكترونيات وطب الأسنان.',
        uses: [
            'المجوهرات والحلي',
            'العملات المعدنية والاحتياطي النقدي',
            'الإلكترونيات والموصلات',
            'طب الأسنان والتطبيقات الطبية'
        ]
    },
    {
        number: 80,
        symbol: 'Hg',
        name: 'زئبق',
        name_en: 'Mercury',
        weight: 200.59,
        category: 'transition-metal',
        state: 'liquid',
        group: 12,
        period: 6,
        valence: 2,
        electronegativity: 2.00,
        radius: 150,
        melting: -38.83,
        boiling: 356.73,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²',
        electrons: 2,
        ionization: 10.438,
        description: 'الزئبق هو فلز انتقالي فضي، سائل عند درجة حرارة الغرفة. سام جداً ويستخدم في موازين الحرارة (سابقاً) والمفاتيح الكهربائية وبعض الأدوية.',
        uses: [
            'موازين الحرارة والباروميترات (تاريخياً)',
            'مصابيح الفلورسنت',
            'أجهزة قياس الضغط',
            'حشوات الأسنان (أصبحت أقل استخداماً)'
        ]
    },
    {
        number: 82,
        symbol: 'Pb',
        name: 'رصاص',
        name_en: 'Lead',
        weight: 207.2,
        category: 'post-transition-metal',
        state: 'solid',
        group: 14,
        period: 6,
        valence: 4,
        electronegativity: 2.33,
        radius: 180,
        melting: 327.5,
        boiling: 1749,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',
        electrons: 4,
        ionization: 7.417,
        description: 'الرصاص هو فلز ما بعد انتقالي رمادي-أزرق، ناعم وكثيف. سام ويستخدم في البطاريات والدروع الواقية من الإشعاع وبعض الطلاءات.',
        uses: [
            'بطاريات الرصاص الحمضية',
            'الدروع الواقية من الإشعاع',
            'الذخيرة والأثقال',
            'لحام المعادن'
        ]
    },
    {
        number: 92,
        symbol: 'U',
        name: 'يورانيوم',
        name_en: 'Uranium',
        weight: 238.029,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.38,
        radius: 175,
        melting: 1135,
        boiling: 4131,
        electron_config: '[Rn] 5f³ 6d¹ 7s²',
        electrons: 2,
        ionization: 6.194,
        description: 'اليورانيوم هو فلز أكتينيدي فضي-أبيض، مشع وثقيل. يستخدم كوقود في المفاعلات النووية وفي الأسلحة النووية.',
        uses: [
            'وقود للمفاعلات النووية',
            'الأسلحة النووية',
            'درع للإشعاع',
            'موازنة وزن في الطائرات والقوارب'
        ]
    },
    {
        number: 31,
        symbol: 'Ga',
        name: 'غاليوم',
        name_en: 'Gallium',
        weight: 69.723,
        category: 'post-transition-metal',
        state: 'solid',
        group: 13,
        period: 4,
        valence: 3,
        electronegativity: 1.81,
        radius: 135,
        melting: 29.76,
        boiling: 2204,
        electron_config: '[Ar] 3d¹⁰ 4s² 4p¹',
        electrons: 3,
        ionization: 5.999,
        description: 'الغاليوم هو فلز فضي ناعم ينصهر قرب درجة حرارة الغرفة. يستخدم في أشباه الموصلات والإلكترونيات.',
        uses: [
            "أشباه الموصلات",
            "الديودات الباعثة للضوء (LED)",
            "المواد الحرارية",
            "السبائك المنخفضة الانصهار"
        ]
    },
    {
        number: 32,
        symbol: 'Ge',
        name: 'جرمانيوم',
        name_en: 'Germanium',
        weight: 72.630,
        category: 'metalloid',
        state: 'solid',
        group: 14,
        period: 4,
        valence: 4,
        electronegativity: 2.01,
        radius: 125,
        melting: 938.25,
        boiling: 2833,
        electron_config: '[Ar] 3d¹⁰ 4s² 4p²',
        electrons: 4,
        ionization: 7.900,
        description: 'الجرمانيوم شبه فلز هش يستخدم في الترانزستورات والألياف البصرية.',
        uses: [
            "الترانزستورات المبكرة",
            "الألياف البصرية",
            "الخلايا الشمسية",
            "السبائك الإلكترونية"
        ]
    },
    {
        number: 33,
        symbol: 'As',
        name: 'زرنيخ',
        name_en: 'Arsenic',
        weight: 74.922,
        category: 'metalloid',
        state: 'solid',
        group: 15,
        period: 4,
        valence: 5,
        electronegativity: 2.18,
        radius: 115,
        melting: 817,
        boiling: 614,
        electron_config: '[Ar] 3d¹⁰ 4s² 4p³',
        electrons: 5,
        ionization: 9.815,
        description: 'الزرنيخ شبه فلز سام يستخدم في المبيدات الحشرية وسبائك معينة.',
        uses: [
            "المبيدات الحشرية",
            "سبائك الرصاص",
            "أشباه الموصلات",
            "الزجاج الخاص"
        ]
    },
    {
        number: 34,
        symbol: 'Se',
        name: 'سيلينيوم',
        name_en: 'Selenium',
        weight: 78.971,
        category: 'nonmetal',
        state: 'solid',
        group: 16,
        period: 4,
        valence: 6,
        electronegativity: 2.55,
        radius: 115,
        melting: 221,
        boiling: 685,
        electron_config: '[Ar] 3d¹⁰ 4s² 4p⁴',
        electrons: 6,
        ionization: 9.752,
        description: 'السيلينيوم لافلز يستخدم في الخلايا الشمسية وفلاتر الألوان.',
        uses: [
            "الخلايا الشمسية",
            "فلاتر الزجاج الملون",
            "المكملات الغذائية",
            "مستحضرات التجميل"
        ]
    },
    {
        number: 36,
        symbol: 'Kr',
        name: 'كريبتون',
        name_en: 'Krypton',
        weight: 83.798,
        category: 'noble-gas',
        state: 'gas',
        group: 18,
        period: 4,
        valence: 0,
        electronegativity: 3.00,
        radius: 88,
        melting: -157.36,
        boiling: -153.22,
        electron_config: '[Ar] 3d¹⁰ 4s² 4p⁶',
        electrons: 8,
        ionization: 14.000,
        description: 'الكريبتون غاز نبيل يستخدم في الإضاءة والتصوير الطبي.',
        uses: [
            "مصابيح الفلاش",
            "الإضاءة الفلورية",
            "التصوير الطبي",
            "عزل نوافذ الزجاج المزدوج"
        ]
    },
    // Period 4 - Transition Metals (Continued)
    {
        number: 37,
        symbol: 'Rb',
        name: 'روبيديوم',
        name_en: 'Rubidium',
        weight: 85.468,
        category: 'alkali-metal',
        state: 'solid',
        group: 1,
        period: 5,
        valence: 1,
        electronegativity: 0.82,
        radius: 235,
        melting: 39.31,
        boiling: 688,
        electron_config: '[Kr] 5s¹',
        electrons: 1,
        ionization: 4.177,
        description: 'فلز قلوي ناعم فضي، شديد التفاعل مع الماء. يستخدم في الساعات الذرية وبحوث الفيزياء.',
        uses: [
            "الساعات الذرية",
            "أبحاث الفراغات المغناطيسية",
            "الكواشف الكيميائية"
        ]
    },
    {
        number: 38,
        symbol: 'Sr',
        name: 'سترونتيوم',
        name_en: 'Strontium',
        weight: 87.62,
        category: 'alkaline-earth',
        state: 'solid',
        group: 2,
        period: 5,
        valence: 2,
        electronegativity: 0.95,
        radius: 200,
        melting: 777,
        boiling: 1382,
        electron_config: '[Kr] 5s²',
        electrons: 2,
        ionization: 5.695,
        description: 'فلز قلوي ترابي فضي، يُستخدم في الألعاب النارية والسبائك الخاصة.',
        uses: [
            "الألعاب النارية (يُعطي لونًا أحمر)",
            "السبائك المغناطيسية",
            "معالجة هشاشة العظام"
        ]
    },
    {
        number: 39,
        symbol: 'Y',
        name: 'إتريوم',
        name_en: 'Yttrium',
        weight: 88.906,
        category: 'transition-metal',
        state: 'solid',
        group: 3,
        period: 5,
        valence: 3,
        electronegativity: 1.22,
        radius: 180,
        melting: 1526,
        boiling: 3336,
        electron_config: '[Kr] 4d¹ 5s²',
        electrons: 2,
        ionization: 6.217,
        description: 'فلز انتقالي فضي، مقاوم للتآكل. مكون رئيسي في الليزر والمواد الفلورية.',
        uses: [
            "ليزر الإتريوم-ألومنيوم",
            "المصابيح الفلورية",
            "السبائك الخفيفة"
        ]
    },
    {
        number: 40,
        symbol: 'Zr',
        name: 'زركونيوم',
        name_en: 'Zirconium',
        weight: 91.224,
        category: 'transition-metal',
        state: 'solid',
        group: 4,
        period: 5,
        valence: 4,
        electronegativity: 1.33,
        radius: 155,
        melting: 1855,
        boiling: 4409,
        electron_config: '[Kr] 4d² 5s²',
        electrons: 2,
        ionization: 6.634,
        description: 'فلز انتقالي رمادي فاتح، مقاوم للتآكل الإشعاعي. يُستخدم في المفاعلات النووية والمجوهرات.',
        uses: [
            "قضبان الوقود النووي",
            "المجوهرات الاصطناعية (الزركونيا)",
            "المعدات الجراحية"
        ]
    },
    {
        number: 41,
        symbol: 'Nb',
        name: 'نيوبيوم',
        name_en: 'Niobium',
        weight: 92.906,
        category: 'transition-metal',
        state: 'solid',
        group: 5,
        period: 5,
        valence: 5,
        electronegativity: 1.6,
        radius: 145,
        melting: 2477,
        boiling: 4744,
        electron_config: '[Kr] 4d⁴ 5s¹',
        electrons: 5,
        ionization: 6.759,
        description: 'النيوبيوم هو فلز انتقالي رمادي، مقاوم للتآكل. يستخدم في صناعة السبائك الفائقة والمواد المغناطيسية.',
        uses: [
            'السبائك الفائقة',
            'المواد المغناطيسية',
            'المفاعلات النووية',
            'المجوهرات'
        ]
    },
    {
        number: 42,
        symbol: 'Mo',
        name: 'موليبدنوم',
        name_en: 'Molybdenum',
        weight: 95.95,
        category: 'transition-metal',
        state: 'solid',
        group: 6,
        period: 5,
        valence: 6,
        electronegativity: 2.16,
        radius: 145,
        melting: 2623,
        boiling: 4639,
        electron_config: '[Kr] 4d⁵ 5s¹',
        electrons: 6,
        ionization: 7.092,
        description: 'الموليبدنوم هو فلز انتقالي فضي، صلب ومقاوم للحرارة. يستخدم في صناعة الفولاذ والسبائك.',
        uses: [
            'صناعة الفولاذ',
            'السبائك المقاومة للحرارة',
            'المحفزات الكيميائية',
            'المحركات النفاثة'
        ]
    },
    {
        number: 43,
        symbol: 'Tc',
        name: 'تكنيتيوم',
        name_en: 'Technetium',
        weight: 98,
        category: 'transition-metal',
        state: 'solid',
        group: 7,
        period: 5,
        valence: 7,
        electronegativity: 1.9,
        radius: 135,
        melting: 2157,
        boiling: 4265,
        electron_config: '[Kr] 4d⁵ 5s²',
        electrons: 7,
        ionization: 7.28,
        description: 'التكنيتيوم هو أول عنصر اصطناعي في الجدول الدوري. مشع ويستخدم في الطب النووي.',
        uses: [
            'التصوير الطبي',
            'الطب النووي',
            'البحوث العلمية'
        ]
    },
    {
        number: 44,
        symbol: 'Ru',
        name: 'روثينيوم',
        name_en: 'Ruthenium',
        weight: 101.07,
        category: 'transition-metal',
        state: 'solid',
        group: 8,
        period: 5,
        valence: 8,
        electronegativity: 2.2,
        radius: 130,
        melting: 2334,
        boiling: 4150,
        electron_config: '[Kr] 4d⁷ 5s¹',
        electrons: 8,
        ionization: 7.361,
        description: 'الروثينيوم هو فلز انتقالي أبيض فضي، نادر ومقاوم للتآكل. يستخدم في الإلكترونيات والمحفزات.',
        uses: [
            'المحفزات الكيميائية',
            'الإلكترونيات',
            'المجوهرات',
            'الخلايا الشمسية'
        ]
    },
    {
        number: 45,
        symbol: 'Rh',
        name: 'روديوم',
        name_en: 'Rhodium',
        weight: 102.91,
        category: 'transition-metal',
        state: 'solid',
        group: 9,
        period: 5,
        valence: 3,
        electronegativity: 2.28,
        radius: 135,
        melting: 1964,
        boiling: 3695,
        electron_config: '[Kr] 4d⁸ 5s¹',
        electrons: 9,
        ionization: 7.459,
        description: 'الروديوم هو فلز انتقالي فضي، نادر ومقاوم للتآكل. يستخدم في المحفزات والمجوهرات.',
        uses: [
            'المحفزات الكيميائية',
            'المجوهرات',
            'المصابيح الكهربائية',
            'المجاهر الإلكترونية'
        ]
    },
    {
        number: 46,
        symbol: 'Pd',
        name: 'بلاديوم',
        name_en: 'Palladium',
        weight: 106.42,
        category: 'transition-metal',
        state: 'solid',
        group: 10,
        period: 5,
        valence: 2,
        electronegativity: 2.2,
        radius: 140,
        melting: 1554.9,
        boiling: 2963,
        electron_config: '[Kr] 4d¹⁰',
        electrons: 10,
        ionization: 8.337,
        description: 'البلاديوم هو فلز انتقالي أبيض فضي، نادر ومقاوم للتآكل. يستخدم في المحفزات والمجوهرات.',
        uses: [
            'المحفزات الكيميائية',
            'المجوهرات',
            'طب الأسنان',
            'الإلكترونيات'
        ]
    },
    {
        number: 48,
        symbol: 'Cd',
        name: 'كادميوم',
        name_en: 'Cadmium',
        weight: 112.41,
        category: 'transition-metal',
        state: 'solid',
        group: 12,
        period: 5,
        valence: 2,
        electronegativity: 1.69,
        radius: 155,
        melting: 321.07,
        boiling: 767,
        electron_config: '[Kr] 4d¹⁰ 5s²',
        electrons: 12,
        ionization: 8.994,
        description: 'الكادميوم هو فلز انتقالي أبيض مزرق، سام. يستخدم في البطاريات والطلاء.',
        uses: [
            'البطاريات',
            'الطلاء الكهربائي',
            'الأصباغ',
            'السبائك'
        ]
    },
    {
        number: 49,
        symbol: 'In',
        name: 'إنديوم',
        name_en: 'Indium',
        weight: 114.82,
        category: 'post-transition-metal',
        state: 'solid',
        group: 13,
        period: 5,
        valence: 3,
        electronegativity: 1.78,
        radius: 155,
        melting: 156.6,
        boiling: 2072,
        electron_config: '[Kr] 4d¹⁰ 5s² 5p¹',
        electrons: 13,
        ionization: 5.786,
        description: 'الإنديوم هو فلز فضي ناعم، نادر. يستخدم في شاشات اللمس والسبائك.',
        uses: [
            'شاشات اللمس',
            'السبائك المنخفضة الانصهار',
            'الخلايا الشمسية',
            'الإلكترونيات'
        ]
    },
    {
        number: 50,
        symbol: 'Sn',
        name: 'قصدير',
        name_en: 'Tin',
        weight: 118.71,
        category: 'post-transition-metal',
        state: 'solid',
        group: 14,
        period: 5,
        valence: 4,
        electronegativity: 1.96,
        radius: 145,
        melting: 231.93,
        boiling: 2602,
        electron_config: '[Kr] 4d¹⁰ 5s² 5p²',
        electrons: 14,
        ionization: 7.344,
        description: 'القصدير هو فلز فضي ناعم، مقاوم للتآكل. يستخدم في صناعة العلب والسبائك.',
        uses: [
            'علب حفظ الطعام',
            'السبائك (البرونز)',
            'اللحام',
            'الزجاج'
        ]
    },
    {
        number: 51,
        symbol: 'Sb',
        name: 'إثمد',
        name_en: 'Antimony',
        weight: 121.76,
        category: 'metalloid',
        state: 'solid',
        group: 15,
        period: 5,
        valence: 5,
        electronegativity: 2.05,
        radius: 145,
        melting: 630.63,
        boiling: 1587,
        electron_config: '[Kr] 4d¹⁰ 5s² 5p³',
        electrons: 15,
        ionization: 8.64,
        description: 'الإثمد هو شبه فلز رمادي، هش. يستخدم في البطاريات والسبائك.',
        uses: [
            'البطاريات',
            'السبائك',
            'الزجاج',
            'المبيدات الحشرية'
        ]
    },
    {
        number: 52,
        symbol: 'Te',
        name: 'تيلوريوم',
        name_en: 'Tellurium',
        weight: 127.6,
        category: 'metalloid',
        state: 'solid',
        group: 16,
        period: 5,
        valence: 6,
        electronegativity: 2.1,
        radius: 140,
        melting: 221,
        boiling: 685,
        electron_config: '[Kr] 4d¹⁰ 5s² 5p⁴',
        electrons: 16,
        ionization: 9.01,
        description: 'التيلوريوم هو شبه فلز فضي، نادر. يستخدم في أشباه الموصلات والسبائك.',
        uses: [
            'أشب الموصلات',
            'السبائك',
            'الزجاج',
            'المطاط'
        ]
    },
    {
        number: 53,
        symbol: 'I',
        name: 'يود',
        name_en: 'Iodine',
        weight: 126.9,
        category: 'halogen',
        state: 'solid',
        group: 17,
        period: 5,
        valence: 7,
        electronegativity: 2.66,
        radius: 140,
        melting: 113.7,
        boiling: 184.3,
        electron_config: '[Kr] 4d¹⁰ 5s² 5p⁵',
        electrons: 17,
        ionization: 10.451,
        description: 'اليود هو هالوجين صلب بنفسجي، ضروري للحياة. يستخدم في الطب والتصوير.',
        uses: [
            'المطهرات',
            'الطب',
            'التصوير الفوتوغرافي',
            'المواد الغذائية'
        ]
    },
    {
        number: 54,
        symbol: 'Xe',
        name: 'زينون',
        name_en: 'Xenon',
        weight: 131.29,
        category: 'noble-gas',
        state: 'gas',
        group: 18,
        period: 5,
        valence: 0,
        electronegativity: 2.6,
        radius: 108,
        melting: -111.75,
        boiling: -108.12,
        electron_config: '[Kr] 4d¹⁰ 5s² 5p⁶',
        electrons: 18,
        ionization: 12.13,
        description: 'الزينون هو غاز نبيل عديم اللون، نادر. يستخدم في الإضاءة والتصوير الطبي.',
        uses: [
            'مصابيح التفريغ',
            'التخدير',
            'الدفع الفضائي',
            'التصوير الطبي'
        ]
    },
    {
        number: 55,
        symbol: 'Cs',
        name: 'سيزيوم',
        name_en: 'Cesium',
        weight: 132.91,
        category: 'alkali-metal',
        state: 'solid',
        group: 1,
        period: 6,
        valence: 1,
        electronegativity: 0.79,
        radius: 260,
        melting: 28.44,
        boiling: 671,
        electron_config: '[Xe] 6s¹',
        electrons: 1,
        ionization: 3.894,
        description: 'السيزيوم هو فلز قلوي فضي ذهبي، شديد التفاعل. يستخدم في الساعات الذرية والبحث العلمي.',
        uses: [
            'الساعات الذرية',
            'البحوث العلمية',
            'الزجاج البصري',
            'المحفزات الكيميائية'
        ]
    },
    {
        number: 56,
        symbol: 'Ba',
        name: 'باريوم',
        name_en: 'Barium',
        weight: 137.33,
        category: 'alkaline-earth-metal',
        state: 'solid',
        group: 2,
        period: 6,
        valence: 2,
        electronegativity: 0.89,
        radius: 215,
        melting: 727,
        boiling: 1897,
        electron_config: '[Xe] 6s²',
        electrons: 2,
        ionization: 5.212,
        description: 'الباريوم هو فلز قلوي ترابي فضي، شديد التفاعل. يستخدم في الأشعة السينية والزجاج.',
        uses: [
            'الأشعة السينية',
            'الزجاج والسيراميك',
            'المبيدات الحشرية',
            'الألعاب النارية'
        ]
    },
    {
        number: 57,
        symbol: 'La',
        name: 'لانثانوم',
        name_en: 'Lanthanum',
        weight: 138.91,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.1,
        radius: 195,
        melting: 920,
        boiling: 3464,
        electron_config: '[Xe] 5d¹ 6s²',
        electrons: 3,
        ionization: 5.577,
        description: 'اللانثانوم هو أول عنصر في سلسلة اللانثانيدات. يستخدم في البطاريات والزجاج.',
        uses: [
            'البطاريات القابلة لإعادة الشحن',
            'الزجاج البصري',
            'المحفزات الكيميائية',
            'السبائك'
        ]
    },
    {
        number: 58,
        symbol: 'Ce',
        name: 'سيريوم',
        name_en: 'Cerium',
        weight: 140.12,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 4,
        electronegativity: 1.12,
        radius: 185,
        melting: 795,
        boiling: 3443,
        electron_config: '[Xe] 4f¹ 5d¹ 6s²',
        electrons: 4,
        ionization: 5.539,
        description: 'السيريوم هو أكثر عناصر اللانثانيدات وفرة. يستخدم في المحفزات والزجاج.',
        uses: [
            'المحفزات الكيميائية',
            'الزجاج البصري',
            'الألعاب النارية',
            'السبائك'
        ]
    },
    {
        number: 59,
        symbol: 'Pr',
        name: 'براسيوديميوم',
        name_en: 'Praseodymium',
        weight: 140.91,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.13,
        radius: 185,
        melting: 935,
        boiling: 3520,
        electron_config: '[Xe] 4f³ 6s²',
        electrons: 5,
        ionization: 5.473,
        description: 'البراسيوديميوم هو عنصر لانثانيدي فضي. يستخدم في المغناطيسات والزجاج.',
        uses: [
            'المغناطيسات القوية',
            'الزجاج البصري',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 60,
        symbol: 'Nd',
        name: 'نيوديميوم',
        name_en: 'Neodymium',
        weight: 144.24,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.14,
        radius: 185,
        melting: 1021,
        boiling: 3074,
        electron_config: '[Xe] 4f⁴ 6s²',
        electrons: 6,
        ionization: 5.525,
        description: 'النيوديميوم هو عنصر لانثانيدي فضي. يستخدم في المغناطيسات القوية والليزر.',
        uses: [
            'المغناطيسات القوية',
            'الليزر',
            'الزجاج البصري',
            'السبائك'
        ]
    },
    {
        number: 61,
        symbol: 'Pm',
        name: 'بروميثيوم',
        name_en: 'Promethium',
        weight: 145,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.13,
        radius: 185,
        melting: 1042,
        boiling: 3000,
        electron_config: '[Xe] 4f⁵ 6s²',
        electrons: 7,
        ionization: 5.55,
        description: 'البروميثيوم هو عنصر لانثانيدي مشع. يستخدم في البطاريات والبحث العلمي.',
        uses: [
            'البطاريات النووية',
            'البحوث العلمية',
            'المصابيح الفلورية',
            'المواد المضيئة'
        ]
    },
    {
        number: 62,
        symbol: 'Sm',
        name: 'ساماريوم',
        name_en: 'Samarium',
        weight: 150.36,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.17,
        radius: 185,
        melting: 1072,
        boiling: 1900,
        electron_config: '[Xe] 4f⁶ 6s²',
        electrons: 8,
        ionization: 5.644,
        description: 'الساماريوم هو عنصر لانثانيدي فضي. يستخدم في المغناطيسات والليزر.',
        uses: [
            'المغناطيسات',
            'الليزر',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 63,
        symbol: 'Eu',
        name: 'يوروبيوم',
        name_en: 'Europium',
        weight: 151.96,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.2,
        radius: 185,
        melting: 822,
        boiling: 1597,
        electron_config: '[Xe] 4f⁷ 6s²',
        electrons: 9,
        ionization: 5.67,
        description: 'اليوروبيوم هو عنصر لانثانيدي فضي. يستخدم في المصابيح الفلورية والليزر.',
        uses: [
            'المصابيح الفلورية',
            'الليزر',
            'الزجاج البصري',
            'السبائك'
        ]
    },
    {
        number: 64,
        symbol: 'Gd',
        name: 'جادولينيوم',
        name_en: 'Gadolinium',
        weight: 157.25,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.2,
        radius: 180,
        melting: 1312,
        boiling: 3273,
        electron_config: '[Xe] 4f⁷ 5d¹ 6s²',
        electrons: 10,
        ionization: 6.15,
        description: 'الجادولينيوم هو عنصر لانثانيدي فضي. يستخدم في التصوير بالرنين المغناطيسي والسبائك.',
        uses: [
            'التصوير بالرنين المغناطيسي',
            'السبائك',
            'المحفزات',
            'الزجاج البصري'
        ]
    },
    {
        number: 65,
        symbol: 'Tb',
        name: 'تيربيوم',
        name_en: 'Terbium',
        weight: 158.93,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.2,
        radius: 175,
        melting: 1356,
        boiling: 3230,
        electron_config: '[Xe] 4f⁹ 6s²',
        electrons: 11,
        ionization: 5.864,
        description: 'التيربيوم هو عنصر لانثانيدي فضي. يستخدم في المصابيح الفلورية والليزر.',
        uses: [
            'المصابيح الفلورية',
            'الليزر',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 66,
        symbol: 'Dy',
        name: 'ديسبروسيوم',
        name_en: 'Dysprosium',
        weight: 162.5,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.22,
        radius: 175,
        melting: 1407,
        boiling: 2567,
        electron_config: '[Xe] 4f¹⁰ 6s²',
        electrons: 12,
        ionization: 5.939,
        description: 'الديسبروسيوم هو عنصر لانثانيدي فضي. يستخدم في المغناطيسات والليزر.',
        uses: [
            'المغناطيسات',
            'الليزر',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 67,
        symbol: 'Ho',
        name: 'هولميوم',
        name_en: 'Holmium',
        weight: 164.93,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.23,
        radius: 175,
        melting: 1470,
        boiling: 2720,
        electron_config: '[Xe] 4f¹¹ 6s²',
        electrons: 13,
        ionization: 6.022,
        description: 'الهولميوم هو عنصر لانثانيدي فضي. يستخدم في الليزر والمغناطيسات.',
        uses: [
            'الليزر',
            'المغناطيسات',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 68,
        symbol: 'Er',
        name: 'إربيوم',
        name_en: 'Erbium',
        weight: 167.26,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.24,
        radius: 175,
        melting: 1522,
        boiling: 2510,
        electron_config: '[Xe] 4f¹² 6s²',
        electrons: 14,
        ionization: 6.108,
        description: 'الإربيوم هو عنصر لانثانيدي فضي. يستخدم في الليزر والألياف البصرية.',
        uses: [
            'الليزر',
            'الألياف البصرية',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 69,
        symbol: 'Tm',
        name: 'ثوليوم',
        name_en: 'Thulium',
        weight: 168.93,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.25,
        radius: 175,
        melting: 1545,
        boiling: 1950,
        electron_config: '[Xe] 4f¹³ 6s²',
        electrons: 15,
        ionization: 6.184,
        description: 'الثوليوم هو عنصر لانثانيدي فضي. يستخدم في الليزر والأشعة السينية.',
        uses: [
            'الليزر',
            'الأشعة السينية',
            'السبائك',
            'المحفزات'
        ]
    },
    {
        number: 70,
        symbol: 'Yb',
        name: 'إتيربيوم',
        name_en: 'Ytterbium',
        weight: 173.05,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.1,
        radius: 175,
        melting: 824,
        boiling: 1196,
        electron_config: '[Xe] 4f¹⁴ 6s²',
        electrons: 16,
        ionization: 6.254,
        description: 'الإتيربيوم هو عنصر لانثانيدي فضي. يستخدم في الليزر والسبائك.',
        uses: [
            'الليزر',
            'السبائك',
            'المحفزات',
            'البحوث العلمية'
        ]
    },
    {
        number: 71,
        symbol: 'Lu',
        name: 'لوتيتيوم',
        name_en: 'Lutetium',
        weight: 174.97,
        category: 'lanthanide',
        state: 'solid',
        group: 3,
        period: 6,
        valence: 3,
        electronegativity: 1.27,
        radius: 175,
        melting: 1652,
        boiling: 3402,
        electron_config: '[Xe] 4f¹⁴ 5d¹ 6s²',
        electrons: 17,
        ionization: 5.426,
        description: 'اللوتيتيوم هو آخر عنصر في سلسلة اللانثانيدات. يستخدم في المحفزات والليزر.',
        uses: [
            'المحفزات الكيميائية',
            'الليزر',
            'السبائك',
            'البحوث العلمية'
        ]
    },
    {
        number: 72,
        symbol: 'Hf',
        name: 'هافنيوم',
        name_en: 'Hafnium',
        weight: 178.49,
        category: 'transition-metal',
        state: 'solid',
        group: 4,
        period: 6,
        valence: 4,
        electronegativity: 1.3,
        radius: 150,
        melting: 2233,
        boiling: 4603,
        electron_config: '[Xe] 4f¹⁴ 5d² 6s²',
        electrons: 72,
        ionization: 6.65,
        description: 'الهافنيوم هو فلز انتقالي فضي، مقاوم للتآكل. يستخدم في المفاعلات النووية والسبائك.',
        uses: [
            'المفاعلات النووية',
            'السبائك',
            'الإلكترونيات',
            'المجوهرات'
        ]
    },
    {
        number: 73,
        symbol: 'Ta',
        name: 'تانتالوم',
        name_en: 'Tantalum',
        weight: 180.95,
        category: 'transition-metal',
        state: 'solid',
        group: 5,
        period: 6,
        valence: 5,
        electronegativity: 1.5,
        radius: 145,
        melting: 3017,
        boiling: 5458,
        electron_config: '[Xe] 4f¹⁴ 5d³ 6s²',
        electrons: 73,
        ionization: 7.89,
        description: 'التانتالوم هو فلز انتقالي رمادي، مقاوم للتآكل. يستخدم في الإلكترونيات والسبائك.',
        uses: [
            'الإلكترونيات',
            'السبائك',
            'المجوهرات',
            'الجراحة'
        ]
    },
    {
        number: 74,
        symbol: 'W',
        name: 'تنجستن',
        name_en: 'Tungsten',
        weight: 183.84,
        category: 'transition-metal',
        state: 'solid',
        group: 6,
        period: 6,
        valence: 6,
        electronegativity: 2.36,
        radius: 140,
        melting: 3422,
        boiling: 5555,
        electron_config: '[Xe] 4f¹⁴ 5d⁴ 6s²',
        electrons: 74,
        ionization: 7.98,
        description: 'التنجستن هو فلز انتقالي رمادي، أعلى نقطة انصهار بين المعادن. يستخدم في المصابيح الكهربائية والسبائك.',
        uses: [
            'المصابيح الكهربائية',
            'السبائك',
            'الإلكترونيات',
            'الأدوات'
        ]
    },
    {
        number: 75,
        symbol: 'Re',
        name: 'رينيوم',
        name_en: 'Rhenium',
        weight: 186.21,
        category: 'transition-metal',
        state: 'solid',
        group: 7,
        period: 6,
        valence: 7,
        electronegativity: 1.9,
        radius: 135,
        melting: 3186,
        boiling: 5596,
        electron_config: '[Xe] 4f¹⁴ 5d⁵ 6s²',
        electrons: 75,
        ionization: 7.88,
        description: 'الرينيوم هو فلز انتقالي فضي، نادر. يستخدم في المحفزات والسبائك.',
        uses: [
            'المحفزات الكيميائية',
            'السبائك',
            'المحركات النفاثة',
            'الإلكترونيات'
        ]
    },
    {
        number: 76,
        symbol: 'Os',
        name: 'أوزميوم',
        name_en: 'Osmium',
        weight: 190.23,
        category: 'transition-metal',
        state: 'solid',
        group: 8,
        period: 6,
        valence: 8,
        electronegativity: 2.2,
        radius: 130,
        melting: 3033,
        boiling: 5012,
        electron_config: '[Xe] 4f¹⁴ 5d⁶ 6s²',
        electrons: 76,
        ionization: 8.7,
        description: 'الأوزميوم هو فلز انتقالي أزرق رمادي، أكثر المعادن كثافة. يستخدم في السبائك والمحفزات.',
        uses: [
            'السبائك',
            'المحفزات',
            'المجوهرات',
            'الإلكترونيات'
        ]
    },
    {
        number: 77,
        symbol: 'Ir',
        name: 'إيريديوم',
        name_en: 'Iridium',
        weight: 192.22,
        category: 'transition-metal',
        state: 'solid',
        group: 9,
        period: 6,
        valence: 3,
        electronegativity: 2.2,
        radius: 135,
        melting: 2446,
        boiling: 4428,
        electron_config: '[Xe] 4f¹⁴ 5d⁷ 6s²',
        electrons: 77,
        ionization: 9.1,
        description: 'الإيريديوم هو فلز انتقالي أبيض فضي، مقاوم للتآكل. يستخدم في المحفزات والمجوهرات.',
        uses: [
            'المحفزات الكيميائية',
            'المجوهرات',
            'الإلكترونيات',
            'السبائك'
        ]
    },
    {
        number: 78,
        symbol: 'Pt',
        name: 'بلاتين',
        name_en: 'Platinum',
        weight: 195.08,
        category: 'transition-metal',
        state: 'solid',
        group: 10,
        period: 6,
        valence: 2,
        electronegativity: 2.28,
        radius: 135,
        melting: 1768.3,
        boiling: 3825,
        electron_config: '[Xe] 4f¹⁴ 5d⁹ 6s¹',
        electrons: 78,
        ionization: 9.0,
        description: 'البلاتين هو فلز انتقالي فضي، ثمين ومقاوم للتآكل. يستخدم في المجوهرات والمحفزات.',
        uses: [
            'المجوهرات',
            'المحفزات الكيميائية',
            'الإلكترونيات',
            'طب الأسنان'
        ]
    },
    {
        number: 79,
        symbol: 'Au',
        name: 'ذهب',
        name_en: 'Gold',
        weight: 196.97,
        category: 'transition-metal',
        state: 'solid',
        group: 11,
        period: 6,
        valence: 1,
        electronegativity: 2.54,
        radius: 135,
        melting: 1064.18,
        boiling: 2856,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
        electrons: 79,
        ionization: 9.23,
        description: 'الذهب هو فلز انتقالي أصفر، ثمين ومقاوم للتآكل. يستخدم في المجوهرات والعملات.',
        uses: [
            'المجوهرات',
            'العملات',
            'الإلكترونيات',
            'طب الأسنان'
        ]
    },
    {
        number: 80,
        symbol: 'Hg',
        name: 'زئبق',
        name_en: 'Mercury',
        weight: 200.59,
        category: 'transition-metal',
        state: 'liquid',
        group: 12,
        period: 6,
        valence: 2,
        electronegativity: 2.0,
        radius: 150,
        melting: -38.83,
        boiling: 356.73,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²',
        electrons: 80,
        ionization: 10.44,
        description: 'الزئبق هو فلز انتقالي سائل فضي، سام. يستخدم في موازين الحرارة والبطاريات.',
        uses: [
            'موازين الحرارة',
            'الضواغط',
            'المصابيح',
            'البطاريات'
        ]
    },
    {
        number: 81,
        symbol: 'Tl',
        name: 'ثاليوم',
        name_en: 'Thallium',
        weight: 204.38,
        category: 'metal',
        state: 'solid',
        group: 13,
        period: 6,
        valence: 3,
        electronegativity: 1.62,
        radius: 190,
        melting: 304,
        boiling: 1473,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹',
        electrons: 81,
        ionization: 6.11,
        description: 'الثاليوم هو فلز رمادي، سام. يستخدم في الإلكترونيات والزجاج.',
        uses: [
            'الإلكترونيات',
            'الزجاج',
            'البطاريات',
            'البحوث'
        ]
    },
    {
        number: 82,
        symbol: 'Pb',
        name: 'رصاص',
        name_en: 'Lead',
        weight: 207.2,
        category: 'metal',
        state: 'solid',
        group: 14,
        period: 6,
        valence: 4,
        electronegativity: 2.33,
        radius: 180,
        melting: 327.46,
        boiling: 1749,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',
        electrons: 82,
        ionization: 7.42,
        description: 'الرصاص هو فلز رمادي، سام. يستخدم في البطاريات والبناء.',
        uses: [
            'البطاريات',
            'البناء',
            'الطلاء',
            'الدرع الواقي'
        ]
    },
    {
        number: 83,
        symbol: 'Bi',
        name: 'بزموت',
        name_en: 'Bismuth',
        weight: 208.98,
        category: 'metal',
        state: 'solid',
        group: 15,
        period: 6,
        valence: 5,
        electronegativity: 2.02,
        radius: 160,
        melting: 271.5,
        boiling: 1564,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³',
        electrons: 83,
        ionization: 7.29,
        description: 'البزموت هو فلز أبيض وردي، أقل المعادن سمية. يستخدم في الأدوية والسبائك.',
        uses: [
            'الأدوية',
            'السبائك',
            'المستحضرات التجميلية',
            'الإلكترونيات'
        ]
    },
    {
        number: 84,
        symbol: 'Po',
        name: 'بولونيوم',
        name_en: 'Polonium',
        weight: 209,
        category: 'metalloid',
        state: 'solid',
        group: 16,
        period: 6,
        valence: 6,
        electronegativity: 2.0,
        radius: 190,
        melting: 254,
        boiling: 962,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴',
        electrons: 84,
        ionization: 8.42,
        description: 'البولونيوم هو عنصر مشع، سام. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطاقة النووية'
        ]
    },
    {
        number: 85,
        symbol: 'At',
        name: 'أستاتين',
        name_en: 'Astatine',
        weight: 210,
        category: 'halogen',
        state: 'solid',
        group: 17,
        period: 6,
        valence: 7,
        electronegativity: 2.2,
        radius: 200,
        melting: 302,
        boiling: 337,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',
        electrons: 85,
        ionization: 9.3,
        description: 'الأستاتين هو عنصر مشع، نادر. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 86,
        symbol: 'Rn',
        name: 'رادون',
        name_en: 'Radon',
        weight: 222,
        category: 'noble-gas',
        state: 'gas',
        group: 18,
        period: 6,
        valence: 0,
        electronegativity: 2.2,
        radius: 120,
        melting: -71,
        boiling: -61.7,
        electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',
        electrons: 86,
        ionization: 10.75,
        description: 'الرادون هو غاز نبيل مشع، سام. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 87,
        symbol: 'Fr',
        name: 'فرانسيوم',
        name_en: 'Francium',
        weight: 223,
        category: 'alkali-metal',
        state: 'solid',
        group: 1,
        period: 7,
        valence: 1,
        electronegativity: 0.7,
        radius: 270,
        melting: 27,
        boiling: 677,
        electron_config: '[Rn] 7s¹',
        electrons: 87,
        ionization: 4.07,
        description: 'الفرانسيوم هو فلز قلوي مشع، نادر. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 88,
        symbol: 'Ra',
        name: 'راديوم',
        name_en: 'Radium',
        weight: 226,
        category: 'alkaline-earth-metal',
        state: 'solid',
        group: 2,
        period: 7,
        valence: 2,
        electronegativity: 0.9,
        radius: 215,
        melting: 700,
        boiling: 1737,
        electron_config: '[Rn] 7s²',
        electrons: 88,
        ionization: 5.28,
        description: 'الراديوم هو فلز قلوي ترابي مشع، سام. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 89,
        symbol: 'Ac',
        name: 'أكتينيوم',
        name_en: 'Actinium',
        weight: 227,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 3,
        electronegativity: 1.1,
        radius: 195,
        melting: 1050,
        boiling: 3200,
        electron_config: '[Rn] 6d¹ 7s²',
        electrons: 89,
        ionization: 5.17,
        description: 'الأكتينيوم هو عنصر أكتينيدي مشع، نادر. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 90,
        symbol: 'Th',
        name: 'ثوريوم',
        name_en: 'Thorium',
        weight: 232.04,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 4,
        electronegativity: 1.3,
        radius: 180,
        melting: 1750,
        boiling: 4790,
        electron_config: '[Rn] 6d² 7s²',
        electrons: 90,
        ionization: 6.08,
        description: 'الثوريوم هو عنصر أكتينيدي مشع، نادر. يستخدم في المفاعلات النووية.',
        uses: [
            'المفاعلات النووية',
            'البحوث العلمية',
            'الطاقة النووية'
        ]
    },
    {
        number: 91,
        symbol: 'Pa',
        name: 'بروتكتينيوم',
        name_en: 'Protactinium',
        weight: 231.04,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 5,
        electronegativity: 1.5,
        radius: 180,
        melting: 1572,
        boiling: 4000,
        electron_config: '[Rn] 5f² 6d¹ 7s²',
        electrons: 91,
        ionization: 5.89,
        description: 'البروتكتينيوم هو عنصر أكتينيدي مشع، نادر. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 92,
        symbol: 'U',
        name: 'يورانيوم',
        name_en: 'Uranium',
        weight: 238.03,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.38,
        radius: 175,
        melting: 1132.2,
        boiling: 4131,
        electron_config: '[Rn] 5f³ 6d¹ 7s²',
        electrons: 92,
        ionization: 6.19,
        description: 'اليورانيوم هو عنصر أكتينيدي مشع، يستخدم في المفاعلات النووية والأسلحة.',
        uses: [
            'المفاعلات النووية',
            'الطاقة النووية',
            'البحوث العلمية'
        ]
    },
    {
        number: 93,
        symbol: 'Np',
        name: 'نبتونيوم',
        name_en: 'Neptunium',
        weight: 237,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.36,
        radius: 175,
        melting: 640,
        boiling: 3902,
        electron_config: '[Rn] 5f⁴ 6d¹ 7s²',
        electrons: 93,
        ionization: 6.27,
        description: 'النبتونيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 94,
        symbol: 'Pu',
        name: 'بلوتونيوم',
        name_en: 'Plutonium',
        weight: 244,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.28,
        radius: 175,
        melting: 640,
        boiling: 3228,
        electron_config: '[Rn] 5f⁶ 7s²',
        electrons: 94,
        ionization: 6.06,
        description: 'البلوتونيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في المفاعلات النووية والبحوث.',
        uses: [
            'المفاعلات النووية',
            'البحوث العلمية',
            'الطاقة النووية'
        ]
    },
    {
        number: 95,
        symbol: 'Am',
        name: 'أمريسيوم',
        name_en: 'Americium',
        weight: 243,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 1176,
        boiling: 2607,
        electron_config: '[Rn] 5f⁷ 7s²',
        electrons: 95,
        ionization: 5.99,
        description: 'الأمريسيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في كاشفات الدخان والبحوث.',
        uses: [
            'كاشفات الدخان',
            'البحوث العلمية',
            'الطب النووي'
        ]
    },
    {
        number: 96,
        symbol: 'Cm',
        name: 'كوريوم',
        name_en: 'Curium',
        weight: 247,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 1345,
        boiling: 3110,
        electron_config: '[Rn] 5f⁷ 6d¹ 7s²',
        electrons: 96,
        ionization: 6.02,
        description: 'الكوريوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 97,
        symbol: 'Bk',
        name: 'بركيليوم',
        name_en: 'Berkelium',
        weight: 247,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 986,
        boiling: 2627,
        electron_config: '[Rn] 5f⁹ 7s²',
        electrons: 97,
        ionization: 6.23,
        description: 'البركيليوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 98,
        symbol: 'Cf',
        name: 'كاليفورنيوم',
        name_en: 'Californium',
        weight: 251,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 900,
        boiling: 1470,
        electron_config: '[Rn] 5f¹⁰ 7s²',
        electrons: 98,
        ionization: 6.30,
        description: 'الكاليفورنيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية والطب.',
        uses: [
            'البحوث العلمية',
            'الطب النووي',
            'الدراسات النووية'
        ]
    },
    {
        number: 99,
        symbol: 'Es',
        name: 'آينشتاينيوم',
        name_en: 'Einsteinium',
        weight: 252,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 860,
        boiling: 996,
        electron_config: '[Rn] 5f¹¹ 7s²',
        electrons: 99,
        ionization: 6.42,
        description: 'الآينشتاينيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 100,
        symbol: 'Fm',
        name: 'فيرميوم',
        name_en: 'Fermium',
        weight: 257,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 1527,
        boiling: 1527,
        electron_config: '[Rn] 5f¹² 7s²',
        electrons: 100,
        ionization: 6.50,
        description: 'الفيرميوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 101,
        symbol: 'Md',
        name: 'مندليفيوم',
        name_en: 'Mendelevium',
        weight: 258,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 827,
        boiling: 827,
        electron_config: '[Rn] 5f¹³ 7s²',
        electrons: 101,
        ionization: 6.58,
        description: 'المندليفيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 102,
        symbol: 'No',
        name: 'نوبليوم',
        name_en: 'Nobelium',
        weight: 259,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 827,
        boiling: 827,
        electron_config: '[Rn] 5f¹⁴ 7s²',
        electrons: 102,
        ionization: 6.65,
        description: 'النوبليوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 103,
        symbol: 'Lr',
        name: 'لورنسيوم',
        name_en: 'Lawrencium',
        weight: 262,
        category: 'actinide',
        state: 'solid',
        group: 3,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 175,
        melting: 1627,
        boiling: 1627,
        electron_config: '[Rn] 5f¹⁴ 6d¹ 7s²',
        electrons: 103,
        ionization: 4.9,
        description: 'اللورنسيوم هو عنصر أكتينيدي مشع، اصطناعي. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 104,
        symbol: 'Rf',
        name: 'رذرفورديوم',
        name_en: 'Rutherfordium',
        weight: 267,
        category: 'transition-metal',
        state: 'solid',
        group: 4,
        period: 7,
        valence: 4,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d² 7s²',
        electrons: 104,
        ionization: 6.0,
        description: 'الرذرفورديوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 105,
        symbol: 'Db',
        name: 'دوبنيوم',
        name_en: 'Dubnium',
        weight: 268,
        category: 'transition-metal',
        state: 'solid',
        group: 5,
        period: 7,
        valence: 5,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d³ 7s²',
        electrons: 105,
        ionization: 6.0,
        description: 'الدوبنيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 106,
        symbol: 'Sg',
        name: 'سيبورغيوم',
        name_en: 'Seaborgium',
        weight: 269,
        category: 'transition-metal',
        state: 'solid',
        group: 6,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d⁴ 7s²',
        electrons: 106,
        ionization: 6.0,
        description: 'السيبورغيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 107,
        symbol: 'Bh',
        name: 'بوريوم',
        name_en: 'Bohrium',
        weight: 270,
        category: 'transition-metal',
        state: 'solid',
        group: 7,
        period: 7,
        valence: 7,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d⁵ 7s²',
        electrons: 107,
        ionization: 6.0,
        description: 'البوريوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 108,
        symbol: 'Hs',
        name: 'هاسيوم',
        name_en: 'Hassium',
        weight: 277,
        category: 'transition-metal',
        state: 'solid',
        group: 8,
        period: 7,
        valence: 8,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d⁶ 7s²',
        electrons: 108,
        ionization: 6.0,
        description: 'الهاسيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 109,
        symbol: 'Mt',
        name: 'مايتنريوم',
        name_en: 'Meitnerium',
        weight: 278,
        category: 'transition-metal',
        state: 'solid',
        group: 9,
        period: 7,
        valence: 9,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d⁷ 7s²',
        electrons: 109,
        ionization: 6.0,
        description: 'المايتنريوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 110,
        symbol: 'Ds',
        name: 'دارمشتاتيوم',
        name_en: 'Darmstadtium',
        weight: 281,
        category: 'transition-metal',
        state: 'solid',
        group: 10,
        period: 7,
        valence: 10,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d⁸ 7s²',
        electrons: 110,
        ionization: 6.0,
        description: 'الدارمشتاتيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 111,
        symbol: 'Rg',
        name: 'روينتجينيوم',
        name_en: 'Roentgenium',
        weight: 282,
        category: 'transition-metal',
        state: 'solid',
        group: 11,
        period: 7,
        valence: 11,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s¹',
        electrons: 111,
        ionization: 6.0,
        description: 'الروينتجينيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 112,
        symbol: 'Cn',
        name: 'كوبرنيسيوم',
        name_en: 'Copernicium',
        weight: 285,
        category: 'transition-metal',
        state: 'solid',
        group: 12,
        period: 7,
        valence: 12,
        electronegativity: 1.3,
        radius: 150,
        melting: 2100,
        boiling: 5500,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²',
        electrons: 112,
        ionization: 6.0,
        description: 'الكوبرنيسيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 113,
        symbol: 'Nh',
        name: 'نيهونيوم',
        name_en: 'Nihonium',
        weight: 286,
        category: 'metal',
        state: 'solid',
        group: 13,
        period: 7,
        valence: 3,
        electronegativity: 1.3,
        radius: 170,
        melting: 700,
        boiling: 1400,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹',
        electrons: 113,
        ionization: 6.0,
        description: 'النيهونيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 114,
        symbol: 'Fl',
        name: 'فيليروفيوم',
        name_en: 'Flerovium',
        weight: 289,
        category: 'metal',
        state: 'solid',
        group: 14,
        period: 7,
        valence: 4,
        electronegativity: 1.3,
        radius: 170,
        melting: 340,
        boiling: 420,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²',
        electrons: 114,
        ionization: 6.0,
        description: 'الفيليروفيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 115,
        symbol: 'Mc',
        name: 'موسكوفيوم',
        name_en: 'Moscovium',
        weight: 290,
        category: 'metal',
        state: 'solid',
        group: 15,
        period: 7,
        valence: 5,
        electronegativity: 1.3,
        radius: 170,
        melting: 700,
        boiling: 1400,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³',
        electrons: 115,
        ionization: 6.0,
        description: 'الموسكوفيوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 116,
        symbol: 'Lv',
        name: 'ليفرموريوم',
        name_en: 'Livermorium',
        weight: 293,
        category: 'metal',
        state: 'solid',
        group: 16,
        period: 7,
        valence: 6,
        electronegativity: 1.3,
        radius: 170,
        melting: 700,
        boiling: 1400,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴',
        electrons: 116,
        ionization: 6.0,
        description: 'الليفرموريوم هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 117,
        symbol: 'Ts',
        name: 'تينيسين',
        name_en: 'Tennessine',
        weight: 294,
        category: 'halogen',
        state: 'solid',
        group: 17,
        period: 7,
        valence: 7,
        electronegativity: 1.3,
        radius: 170,
        melting: 700,
        boiling: 1400,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵',
        electrons: 117,
        ionization: 6.0,
        description: 'التينيسين هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    },
    {
        number: 118,
        symbol: 'Og',
        name: 'أوغانيسون',
        name_en: 'Oganesson',
        weight: 294,
        category: 'noble-gas',
        state: 'solid',
        group: 18,
        period: 7,
        valence: 0,
        electronegativity: 1.3,
        radius: 170,
        melting: 700,
        boiling: 1400,
        electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶',
        electrons: 118,
        ionization: 6.0,
        description: 'الأوغانيسون هو عنصر اصطناعي مشع. يستخدم في البحوث العلمية.',
        uses: [
            'البحوث العلمية',
            'الدراسات النووية',
            'الطب النووي'
        ]
    }
];

// إضافة المزيد من العناصر في المستقبل...
// The rest of the elements would be added following the same pattern

// تحديد موقع الجدول الدوري في الصفحة
const periodicTable = document.getElementById('periodic-table');
const elementModal = new bootstrap.Modal(document.getElementById('elementModal'));

// تهيئة الجدول الدوري عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء الجدول الدوري
    createPeriodicTable();
    
    // تهيئة أزرار الفلترة
    initializeFilters();
    
    // تهيئة حقل البحث
    initializeSearch();
    
    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();
});

// إنشاء الجدول الدوري
function createPeriodicTable() {
    // مسح الجدول الدوري الحالي
    periodicTable.innerHTML = '';
    
    // ترتيب العناصر حسب الدورة والمجموعة
    const tableMap = {};
    
    // تحديد عدد الصفوف والأعمدة
    const rows = 7; // عدد الدورات الرئيسية
    const cols = 18; // عدد المجموعات
    
    // إنشاء خريطة مواقع العناصر في الجدول
    for (let period = 1; period <= rows; period++) {
        tableMap[period] = {};
        for (let group = 1; group <= cols; group++) {
            tableMap[period][group] = null;
        }
    }
    
    // وضع العناصر في مواقعها الصحيحة
    elements.forEach(element => {
        if (element.number) {
            const period = element.period || Math.ceil(element.number / 32);
            const group = element.group || (element.number % 32);
            
            if (period && group) {
                tableMap[period][group] = element;
            }
        }
    });
    
    // إنشاء الخلايا في الجدول
    for (let period = 1; period <= rows; period++) {
        for (let group = 1; group <= cols; group++) {
            const element = tableMap[period][group];
            
            // إنشاء خلية
            const cell = document.createElement('div');
            
            if (element) {
                // إنشاء عنصر
                cell.className = `element ${element.category}`;
                cell.dataset.number = element.number;
                cell.dataset.category = element.category;
                cell.dataset.state = element.state;
                
                // إنشاء رمز العنصر ورقمه واسمه ووزنه
                cell.innerHTML = `
                    <div class="element-number">${element.number}</div>
                    <div class="element-symbol">${element.symbol}</div>
                    <div class="element-name">${element.name}</div>
                    <div class="element-weight">${element.weight}</div>
                    <div class="state-indicator state-${element.state}"></div>
                `;
                
                // إضافة مستمع الحدث للنقر
                cell.addEventListener('click', () => showElementDetails(element));
            } else {
                // خلية فارغة
                cell.className = 'empty-cell';
            }
            
            // إضافة الخلية إلى الجدول
            periodicTable.appendChild(cell);
        }
    }
    
    // إضافة مقسّم للانثانيدات والأكتينيدات
    const separator = document.createElement('div');
    separator.className = 'separator';
    periodicTable.appendChild(separator);
    
    // إضافة سطر للانثانيدات والأكتينيدات (سيتم تنفيذه في المستقبل)
    // ...
}

// عرض تفاصيل العنصر
function showElementDetails(element) {
    // تعيين المعلومات في النافذة المنبثقة
    document.getElementById('modal-element-symbol').textContent = element.symbol;
    document.getElementById('modal-element-number').textContent = element.number;
    document.getElementById('modal-element-name').textContent = element.name;
    document.getElementById('modal-element-weight').textContent = element.weight;
    
    // تعيين لون خلفية العنصر
    document.getElementById('modal-element-card').className = `element-card ${element.category}`;
    
    // تعيين الخصائص الفيزيائية
    document.getElementById('modal-element-state').textContent = getStateName(element.state);
    document.getElementById('modal-element-atomic-mass').textContent = `${element.weight} u`;
    document.getElementById('modal-element-radius').textContent = `${element.radius} بيكومتر`;
    document.getElementById('modal-element-melting').textContent = `${element.melting} °C`;
    document.getElementById('modal-element-boiling').textContent = `${element.boiling} °C`;
    
    // تعيين الخصائص الكيميائية
    document.getElementById('modal-element-valence').textContent = element.valence;
    document.getElementById('modal-element-electronegativity').textContent = element.electronegativity;
    document.getElementById('modal-element-ionization').textContent = `${element.ionization} eV`;
    
    // تعيين البنية الإلكترونية
    document.getElementById('modal-element-electron-config').textContent = element.electron_config;
    document.getElementById('modal-element-electrons').textContent = element.electrons;
    
    // تعيين المعلومات الإضافية
    document.getElementById('modal-element-description').textContent = element.description;
    
    // تعيين الاستخدامات
    const usesList = document.getElementById('modal-element-uses');
    usesList.innerHTML = '';
    if (element.uses && element.uses.length > 0) {
        element.uses.forEach(use => {
            const li = document.createElement('li');
            li.textContent = use;
            usesList.appendChild(li);
        });
    }
    
    // عرض النافذة المنبثقة
    elementModal.show();
}

// الحصول على اسم الحالة الفيزيائية
function getStateName(state) {
    switch (state) {
        case 'solid': return 'صلب';
        case 'liquid': return 'سائل';
        case 'gas': return 'غاز';
        case 'artificial': return 'اصطناعي';
        default: return 'غير معروف';
    }
}

// تهيئة أزرار الفلترة
function initializeFilters() {
    // فلترة حسب الفئة
    const categoryButtons = document.querySelectorAll('.btn-group button[data-filter]');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة إلى الزر المنقور
            this.classList.add('active');
            
            // تطبيق الفلتر
            const filter = this.dataset.filter;
            filterElements('category', filter);
        });
    });
    
    // فلترة حسب الحالة الفيزيائية
    const stateCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    stateCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // جمع جميع الحالات المحددة
            const selectedStates = [];
            if (document.getElementById('show-solid').checked) selectedStates.push('solid');
            if (document.getElementById('show-liquid').checked) selectedStates.push('liquid');
            if (document.getElementById('show-gas').checked) selectedStates.push('gas');
            if (document.getElementById('show-artificial').checked) selectedStates.push('artificial');
            
            // تطبيق الفلتر
            filterElementsByState(selectedStates);
        });
    });
}

// فلترة العناصر حسب الفئة
function filterElements(attribute, value) {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (value === 'all' || element.dataset[attribute] === value) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

// فلترة العناصر حسب الحالة الفيزيائية
function filterElementsByState(states) {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (states.includes(element.dataset.state)) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

// تهيئة حقل البحث
function initializeSearch() {
    const searchInput = document.getElementById('element-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        if (searchTerm === '') {
            // إعادة عرض جميع العناصر
            const elements = document.querySelectorAll('.element');
            elements.forEach(element => {
                element.classList.remove('hidden');
            });
            return;
        }
        
        // فلترة العناصر حسب كلمة البحث
        const allElements = document.querySelectorAll('.element');
        allElements.forEach(element => {
            const elementObj = elements.find(e => e.number === parseInt(element.dataset.number));
            if (elementObj) {
                const matchesSearch = 
                    elementObj.symbol.toLowerCase().includes(searchTerm) || 
                    elementObj.name.toLowerCase().includes(searchTerm) || 
                    elementObj.name_en.toLowerCase().includes(searchTerm) || 
                    elementObj.number.toString().includes(searchTerm);
                
                if (matchesSearch) {
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            }
        });
    });
}

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    fetch('/api/user-profile')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('غير مسجل الدخول');
            }
        })
        .then(data => {
            if (data.user_id) {
                // المستخدم مسجل الدخول
                document.getElementById('loginItem').style.display = 'none';
                document.getElementById('registerItem').style.display = 'none';
                document.getElementById('dashboardItem').style.display = 'block';
                document.getElementById('logoutItem').style.display = 'block';
            }
        })
        .catch(error => {
            // المستخدم غير مسجل الدخول
            document.getElementById('loginItem').style.display = 'block';
            document.getElementById('registerItem').style.display = 'block';
            document.getElementById('dashboardItem').style.display = 'none';
            document.getElementById('logoutItem').style.display = 'none';
        });
    
    // إضافة مستمع الحدث لزر تسجيل الخروج
    document.getElementById('logoutLink').addEventListener('click', function(e) {
        e.preventDefault();
        
        fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}
