// 'organizerName' will be replaced with 'organizerId'
// 'attendeeNames' will be replaced with 'attendeeIds'
// 'categoryNames' will be replaced with 'categoryIds'

const events = [
  // 1. Workshop Stadslab
  {
    organizerName: "Dutch Council for Refugees",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    status: "published",
    address: {
      city: "Rotterdam",
      street: "Wijnhaven",
      number: "99",
      postalCode: "3011 WN",
    },
    price: 0,
    capacity: 40,
    startDate: new Date("2022-12-01 12:00"),
    endDate: new Date("2022-12-01 14:00"),
    attendeeNames: [
      "Wyatt Dean",
      "Scott Lucas",
      "Harper Carroll",
      "Alex Thompson",
    ],
    categoryNames: ["Hobbies", "Technology"],
    languagesOfEvent: ["english", "dutch"],
    details: [
      {
        language: "english",
        title: "Workshop Stadslab",
        description:
          "Workshop in the Stadslab a workplace where you can make all kinds of personalized things (like a name tag or a textile bag) with INNOVATIVE TECHNOLOGY. \nMake your own  Keychain or design a 3D Object",
        toBring: ["Umbrella (Rain is expected)"],
        rules: [
          "This event will be organized every month. Each user can only attend for once.",
        ],
      },
      {
        language: "arabic",
        title: "ورشة ستادس معمل",
        description:
          "ورشة عمل في Stadslab مكان عمل حيث يمكنك صنع جميع أنواع الأشياء الشخصية (مثل بطاقة الاسم أو حقيبة النسيج) باستخدام التكنولوجيا المبتكرة.  n اصنع سلسلة مفاتيح خاصة بك أو صمم كائنًا ثلاثي الأبعاد",
        toBring: ["مظلة (المطر متوقع)"],
        rules: [
          "سيتم تنظيم هذا الحدث كل شهر. يمكن لكل مستخدم الحضور مرة واحدة فقط.",
        ],
      },
      {
        language: "turkish",
        title: "Stadslab Atolye",
        description:
          "Stadslab'daki atölye, YENİLİKÇİ TEKNOLOJİ ile her türlü kişiselleştirilmiş şeyi (isim etiketi veya tekstil çantası gibi) yapabileceğiniz bir işyeri. \nKendi Anahtarlığınızı yapın veya bir 3D Nesne tasarlayın",
        toBring: ["Semsiye (Yagmur bekleniyor)"],
        rules: [
          "Bu etkinlik her ay düzenlenecektir. Her kullanıcı sadece bir kez katılabilir.",
        ],
      },
    ],
  },
  // 2. Questions and Answers ROTTERDAMPAS workshop
  {
    organizerName: "Dutch Connections",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    status: "published",
    address: {
      city: "Rotterdam",
      street: "Pupillenstraat",
      number: "60",
      postalCode: "3023 VW",
    },
    price: 0,
    capacity: 30,
    startDate: new Date("2022-12-01 9:45"),
    endDate: new Date("2022-12-01 11:45"),
    attendeeNames: ["Beverly Little", "Wyatt Dean"],
    categoryNames: ["Community"],
    languagesOfEvent: ["english", "dutch"],
    details: [
      {
        language: "english",
        title: "Questions and Answers ROTTERDAMPAS workshop",
        description:
          "There is a site and an app available in Dutch, but it is a challenge to understand what is free, what is a discount, and the limited special deals. Therefore we have laptops available where you can search while we explain. We will also cover the app and how you can create an account. It is convenient if you already have your Rotterdam Pas (pass number), but not necessary to join the workshop.",
        toBring: ["Laptop (optional)", "Rotterdam Pas (pass number)"],
        rules: [],
      },
      {
        language: "arabic",
        title: "ورشة عمل أسئلة وأجوبة ROTTERDAMPAS",
        description:
          "يتوفر موقع وتطبيق باللغة الهولندية ، لكن من الصعب فهم ما هو مجاني وما هو الخصم والصفقات الخاصة المحدودة. لذلك لدينا أجهزة كمبيوتر محمولة متاحة حيث يمكنك البحث أثناء الشرح. سنغطي أيضًا التطبيق وكيف يمكنك إنشاء حساب. من الملائم أن يكون لديك بالفعل (رقم المرور) الخاص بك في روتردام ، ولكن ليس من الضروري الانضمام إلى ورشة العمل.",
        toBring: ["كمبيوتر محمول (اختياري) ", " ممر روتردام (رقم المرور)"],
        rules: [],
      },
      {
        language: "turkish",
        title: "Rotterdampas soru cevap etkinligi",
        description:
          "Felemenkçe bir site ve uygulama var, ancak neyin ücretsiz, neyin indirim ve sınırlı özel fırsatları anlamak zor. Bu nedenle, biz açıklarken arama yapabileceğiniz dizüstü bilgisayarlarımız var. Ayrıca uygulamayı ve nasıl hesap oluşturabileceğinizi de ele alacağız. Rotterdam Pas (geçiş numaranız) zaten varsa uygundur, ancak atölyeye katılmak için gerekli değildir.",
        toBring: ["Laptop (istege bagli)", "Rotterdam Pas (kart numarasi)"],
        rules: [],
      },
    ],
  },
  // 3. Games on a boat
  {
    organizerName: "Heart 4 Refugees",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1595744043037-68de3376ed59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1527&q=80",
    status: "draft",
    address: {
      city: "Rotterdam",
      street: "Pupillenstraat",
      number: "60",
      postalCode: "3023 VW",
    },
    price: 0,
    capacity: 30,
    startDate: new Date("2022-12-05 19:00"),
    endDate: new Date("2022-12-05 20:50"),
    attendeeNames: [],
    categoryNames: ["Games", "Language"],
    languagesOfEvent: ["dutch"],
    details: [
      {
        language: "english",
        title: "Dutch language games",
        description:
          "There are some volunteers coming to the boat to play Dutch language games with you guys, this is a fun and great opportunity to learn Dutch!! The games will take place on the boat, if you are on the boat at 19.00, come to the lobby and join the games!!",
        toBring: [],
        rules: [],
      },
      {
        language: "arabic",
        title: "ألعاب اللغة الهولندية",
        description:
          "هناك بعض المتطوعين يأتون إلى القارب للعب ألعاب اللغة الهولندية معكم يا رفاق ، هذه فرصة ممتعة ورائعة لتعلم اللغة الهولندية !! ستقام الألعاب على القارب ، إذا كنت على القارب الساعة 19.00 ، تعال إلى الردهة وانضم إلى الألعاب !!",
        toBring: [],
        rules: [],
      },
      {
        language: "turkish",
        title: "Hollandaca dil oyunlari",
        description:
          "Bu akşam saat 19.00da gemiye bazı gönullüler gelecekler. Sizlerle Hollandaca oyunlar oynayacaklar. Eğlenceli ve Hollandaca ogrenmek icin cok iyi bir fırsat!! Oyunlar gemide oynanacak. 19.00da eğer gemide olursanız kafeteryaya gelin ve oyuna katılın!!",
        toBring: [],
        rules: [],
      },
    ],
  },
  // 4. Cleaning Essenburgpark
  {
    organizerName: "Heart 4 Refugees",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1562684750-0553aea79845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    status: "published",
    address: {
      city: "Rotterdam",
      street: "RFC-Weg",
      number: "190",
      postalCode: "3022 EZ",
    },
    price: 0,
    capacity: 30,
    startDate: new Date("2022-12-05 15:00"),
    endDate: new Date("2022-12-05 16:50"),
    attendeeNames: ["Scott Lucas", "Alex Thompson", "Harper Carroll"],
    categoryNames: ["Outdoor", "Community", "Environment"],
    languagesOfEvent: ["dutch"],
    details: [
      {
        language: "english",
        title: "Cleaning the Essenburgpark",
        description:
          "You can help Dutch volunteers cleaning the Essenburgpark, this is a great way to interact with people from the neighborhood and improve your Dutch language! If you want to join, they are gathering at 'De Pluktuin'.",
        toBring: [],
        rules: [],
      },
      {
        language: "arabic",
        title: "تنظيف Essenburgpark",
        description:
          "يمكنك مساعدة المتطوعين الهولنديين في تنظيف Essenburgpark ، فهذه طريقة رائعة للتفاعل مع الناس من الحي وتحسين لغتك الهولندية! إذا كنت ترغب في الانضمام ، فهم يجتمعون في 'De Pluktuin'.",
        toBring: [],
        rules: [],
      },
      {
        language: "turkish",
        title: "Essenburgpark Temizligi",
        description:
          "Yarin saat 15.00'da Hollandali gonullulerin Essenburpark'i temizlemelerine yardimci olabilirsiniz. Bu mahallemizdeki insanlarla etkilesime gecmek icin ve Hollandacanizi gelistirmek muthis bir yol! Katilmak isterseniz, saat 15.00'da 'De Pluktin'de toplanacaklar. Herhangi bir kayit yaptirmaniza gerek yok, direkt gidebilirsiniz. Saat 17.00'a kadar surecek.",
        toBring: [],
        rules: [],
      },
    ],
  },
  // 5. Networking Meetup
  {
    organizerName: "Coolhaven Connect",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    status: "published",
    address: {
      city: "Rotterdam",
      street: "Willem Buytewechtstraat",
      number: "144",
      postalCode: "3012 XA",
    },
    price: 0,
    capacity: 40,
    startDate: new Date("2022-12-09 18:00"),
    endDate: new Date("2022-12-09 21:00"),
    attendeeNames: [
      "Abdullah Cavit",
      "Alex Thompson",
      "Faik Yilmaz",
      "Jonathan Rex",
    ],
    categoryNames: ["Career", "Business", "Community"],
    languagesOfEvent: ["dutch"],
    details: [
      {
        language: "english",
        title: "Networking Meetup",
        description:
          "Are you younger than 30 years and are you at least A1 Dutch level, then there is a meet up tonight where you can meet other young adults, my colleague will join also.",
        toBring: ["Dutch Dictionary"],
        rules: [
          "You should be younger than 30 years old to attend this event.",
        ],
      },
      {
        language: "turkish",
        title: "Baglanti Olusturma Bulusmasi",
        description:
          "30 yasinin altindasin ve en azindan A1 seviye Hollandaca mi biliyorsun, oyleyse bu gece bi bulusma olacak. Baska gecn yetiskinlerle tanisabileceksiniz, benim arkadaslarimdan da gelenler olacak.",
        toBring: ["Hollandaca sozluk"],
        rules: [
          "Bu etkinlige katilabilmek icin 30 yasindan kucuk olmalisiniz.",
        ],
      },
      {
        language: "arabic",
        title: "لقاء الشبكات",
        description:
          "هل أنت أصغر من 30 عامًا وأنت على الأقل في المستوى A1 الهولندي ، اذاً هناك لقاء الليلة حيث يمكنك مقابلة شباب ",
        toBring: ["القاموس الهولندي"],
        rules: ["يجب أن يكون عمرك أقل من 30 عامًا لحضور هذا الحدث."],
      },
    ],
  },

  // 6. Info Session About Integration
  {
    organizerName: "Stichting MANO",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    status: "published",
    address: {
      city: "Rotterdam",
      street: "Dorpshuis De Coolenkit Boomgaardsstraat",
      number: "189",
      postalCode: "3012 XC",
    },
    price: 0,
    capacity: 100,
    startDate: new Date("2022-12-18 10:30"),
    endDate: new Date("2022-12-18 12:00"),
    attendeeNames: [
      "Abdullah Cavit",
      "Alex Thompson",
      "Faik Yilmaz",
      "Jonathan Rex",
    ],
    categoryNames: ["Language"],
    languagesOfEvent: ["arabic"],
    details: [
      {
        language: "english",
        title: "Networking Meetup",
        description:
          "As a newcomer in the Netherlands, you must pass what is required of you in integration programs The Dutch government has changed this year's law on integration and participation -This is why Stichting MANO would like to invite you to attend a meeting and learn more about This law will be presented by: Amer Al-Omari An experienced specialist in integration programs and the Dutch labor market          The meeting will be joined four times, including The following topics: The new integration Law Participation           The Dutch labor market and the most important tips Social life in the Netherlands.",
        toBring: ["Notebook", "Pen/Pencil"],
        rules: [
          "It is mandatory for all residence permit holders to attend this meeting.",
        ],
      },

      {
        language: "arabic",
        title: "لقاء الشبكات",
        description:
          "و الحكومة الهولندية قامت بتعديل قانون الاندماج و المشاركة لهذا منظمة مانو تود دعوتك لحضور لقاء و التعرف اكثر على هذا القانون سيقدم اللقاء عامر العمري صاحب تجربة و مختص في برامج الاندماج وسوق العمل الهولندية اللقاء سوف يكون على عدة مراحل تتضمن المواضيع التالية: قانون الاندماج الجديد و المشاركة سوق العمل الهولندية و أهم النصائح الحياة الاجتماعية في هولندا مواعيد هذا اللقاء يوم الجمعة صباحا",
        toBring: [],
        rules: [],
      },
    ],
  },
];

export default events;
