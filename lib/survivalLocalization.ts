/**
 * Survival Mode Internationalization Engine
 *
 * Preserves 100% authentic Japanese target dialogue (Kanji, Kana, Romaji, Audio).
 * Translates scenario titles, descriptions, locations, NPC roles, meanings, and
 * choices explanations dynamically into the user's native language.
 */

import type { NativeLanguage } from "@/components/LanguageContext";

export interface LocalizedScenarioText {
  title: string;
  locationName: string;
  description: string;
  stepLabels?: string[];
  steps?: Array<{
    npcSpeaker: string;
    npcMeaning: string;
    choices: Array<{
      textNative: string;
      npcFeedback: string;
      knowledgeNote?: string;
    }>;
  }>;
}

export const SCENARIO_I18N: Record<
  string,
  Partial<Record<NativeLanguage, LocalizedScenarioText>>
> = {
  "ordering-ramen": {
    fr: {
      title: "Commander dans un restaurant de Ramen à Shibuya",
      locationName: "Restaurant Ramen Ichiran Shibuya, Tokyo",
      description: "Entrez dans un restaurant traditionnel animé. Répondez au nombre de personnes, choisissez la texture des nouilles et remerciez chaleureusement le chef !",
      stepLabels: ["Entrée & Nombre de personnes", "Choix du bouillon & Nouilles", "Remerciements & Fin de repas"],
      steps: [
        {
          npcSpeaker: "LE CHEF DU RESTAURANT",
          npcMeaning: "Bienvenue ! Vous êtes combien de personnes ?",
          choices: [
            {
              textNative: "Une personne s'il vous plaît. Est-ce possible au comptoir ?",
              npcFeedback: "Le chef sourit et vous installe immédiatement au siège numéro 3 du comptoir !",
              knowledgeNote: "Vous employez la forme polie standard (です/ます), idéale et respectueuse dans les commerces.",
            },
            {
              textNative: "Une personne. (Ton trop familier)",
              npcFeedback: "Le chef est un peu surpris par ce ton sec, mais vous indique une place.",
              knowledgeNote: "Forme familière (タメ口) un peu abrupte avec un commerçant inconnu.",
            },
            {
              textNative: "Deux bols de ramen ! (Erreur de nombre)",
              npcFeedback: "Le chef rigole : 'Vous êtes seul ou deux pour commander deux bols d'un coup ?'",
            },
          ],
        },
        {
          npcSpeaker: "LE CHEF DU RESTAURANT",
          npcMeaning: "Quel type de ramen désirez-vous ? Et quelle fermeté pour les nouilles ?",
          choices: [
            {
              textNative: "Un Tonkotsu Ramen s'il vous plaît ! Avec des nouilles fermes (Katame) !",
              npcFeedback: "Le chef crie énergiquement 'Aiyo!' et commence la préparation avec brio !",
            },
            {
              textNative: "De l'eau s'il vous plaît. (Hors sujet)",
              npcFeedback: "Le chef verse un verre d'eau et répète gentiment sa question sur le ramen.",
            },
          ],
        },
      ],
    },
    en: {
      title: "Ordering at a Shibuya Ramen Shop",
      locationName: "Ichiran Ramen Shibuya, Tokyo",
      description: "Step into a bustling traditional ramen shop. State your party size, choose noodle firmness, and thank the chef after your meal!",
      stepLabels: ["Greeting & Party Size", "Soup & Noodle Choice", "Finishing & Compliments"],
      steps: [
        {
          npcSpeaker: "RAMEN MASTER",
          npcMeaning: "Welcome! How many people in your party?",
          choices: [
            {
              textNative: "Just one person. Is counter seating okay?",
              npcFeedback: "The chef nods warmly and directs you to counter seat #3!",
              knowledgeNote: "Polite speech (Desu/Masu) creates a wonderful impression with Japanese hosts.",
            },
            {
              textNative: "Just one. (Too blunt)",
              npcFeedback: "The chef is slightly surprised by the abrupt tone but guides you to a seat.",
            },
            {
              textNative: "Two bowls of ramen! (Wrong party count)",
              npcFeedback: "The chef chuckles: 'Are you dining alone or ordering for two?'",
            },
          ],
        },
        {
          npcSpeaker: "RAMEN MASTER",
          npcMeaning: "Which ramen would you like? How firm do you want your noodles?",
          choices: [
            {
              textNative: "Tonkotsu Ramen, please! With firm noodles (Katame)!",
              npcFeedback: "The master calls out 'Aiyo!' and expertly starts boiling the noodles!",
            },
          ],
        },
      ],
    },
    "zh-CN": {
      title: "在涉谷拉面馆点餐",
      locationName: "涉谷一兰拉面馆，东京",
      description: "走进热闹的传统日式拉面馆。自信回答用餐人数，定制面条硬度，并在餐后地道表达感谢！",
      stepLabels: ["入店报人数", "选择汤底与面条硬度", "餐后致谢"],
      steps: [
        {
          npcSpeaker: "拉面店主",
          npcMeaning: "热烈欢迎！请问几位用餐？",
          choices: [
            {
              textNative: "一位。请问吧台位可以吗？",
              npcFeedback: "店主热情点头，引你入座3号吧台座！",
              knowledgeNote: "使用标准礼貌体 (丁寧語)，得体且尊重店员。",
            },
            {
              textNative: "一个人。（语气生硬单调）",
              npcFeedback: "店主略显诧异，但依然指引你入座。",
            },
          ],
        },
      ],
    },
    "zh-TW": {
      title: "在涉谷拉麵館點餐",
      locationName: "涉谷一蘭拉麵館，東京",
      description: "走進熱鬧的傳統日式拉麵館。自信回答用餐人數，客製麵條硬度，並在餐後道地表達感謝！",
      stepLabels: ["入店報人數", "選擇湯底與麵條硬度", "餐後致謝"],
    },
    es: {
      title: "Pedir en una tienda de Ramen en Shibuya",
      locationName: "Ichiran Ramen Shibuya, Tokio",
      description: "Entra a un animado local tradicional. Indica cuántas personas son, elige la dureza de los fideos y agradece al chef.",
      stepLabels: ["Entrada y número de personas", "Elección de sopa y fideos", "Agradecimiento al terminar"],
    },
    de: {
      title: "Bestellen in einer Ramen-Bar in Shibuya",
      locationName: "Ichiran Ramen Shibuya, Tokio",
      description: "Treten Sie in eine lebhafte Ramen-Bar ein. Nennen Sie die Personenzahl, wählen Sie die Nudelfestigkeit und bedanken Sie sich beim Koch.",
      stepLabels: ["Begrüßung & Personenzahl", "Nudel- & Suppenwahl", "Abschluss & Dank"],
    },
  },

  "shinjuku-station": {
    fr: {
      title: "Demander son chemin & Correspondance à Shinjuku",
      locationName: "Gare JR de Shinjuku, Tokyo",
      description: "Naviguez dans la plus grande gare du monde. Demandez à un agent la direction de la ligne Yamanote et confirmez le quai.",
      stepLabels: ["Demande de direction", "Confirmation du quai", "Remerciements"],
      steps: [
        {
          npcSpeaker: "AGENT DE GARE JR",
          npcMeaning: "Bonjour, comment puis-je vous renseigner ?",
          choices: [
            {
              textNative: "Excusez-moi, où se trouve le quai de la ligne Yamanote ?",
              npcFeedback: "L'agent vous montre aimablement les panneaux verts du quai 14 et 15 !",
            },
            {
              textNative: "Où est le train ? (Trop vague)",
              npcFeedback: "L'agent vous demande poliment quelle ligne vous souhaitez emprunter.",
            },
          ],
        },
      ],
    },
    en: {
      title: "Asking for Directions at Shinjuku Station",
      locationName: "JR Shinjuku Station, Tokyo",
      description: "Navigate the world's busiest station. Ask station staff for the Yamanote Line platform and confirm the track number.",
      stepLabels: ["Asking for Direction", "Track Confirmation", "Thanking Staff"],
    },
    "zh-CN": {
      title: "在新宿站问路与换乘地下铁",
      locationName: "JR 新宿站，东京",
      description: "置身于世界最繁忙的交通枢纽。向站务员礼貌询问山手线乘车月台与行车方向。",
      stepLabels: ["询问路线", "确认站台", "礼貌致谢"],
    },
    "zh-TW": {
      title: "在新宿站問路與換乘地下鐵",
      locationName: "JR 新宿站，東京",
      description: "置身於世界最繁忙的交通樞紐。向站務員禮貌詢問山手線乘車月台與行車方向。",
      stepLabels: ["詢問路線", "確認站台", "禮貌致謝"],
    },
  },

  "konbini-shopping": {
    fr: {
      title: "Payer et commander au Konbini 7-Eleven",
      locationName: "Supérette 7-Eleven, Roppongi, Tokyo",
      description: "Achetez un bento et des snacks. Demandez à réchauffer le plat, acceptez ou refusez le sac plastique et payez sans hésitation.",
      stepLabels: ["Passage en caisse", "Réchauffer le bento & Sac", "Paiement"],
      steps: [
        {
          npcSpeaker: "VENDEUR DU KONBINI",
          npcMeaning: "Bonjour ! Souhaitez-vous faire chauffer ce bento au micro-ondes ?",
          choices: [
            {
              textNative: "Oui s'il vous plaît, faites-le réchauffer !",
              npcFeedback: "L'employé place immédiatement votre bento dans le micro-ondes professionnel !",
            },
            {
              textNative: "Non merci, ça ira très bien.",
              npcFeedback: "L'employé continue à scanner vos articles avec le sourire.",
            },
          ],
        },
      ],
    },
    en: {
      title: "Checkout & Bento Warming at 7-Eleven",
      locationName: "7-Eleven Roppongi, Tokyo",
      description: "Buy a bento and drinks. Answer whether you want it warmed up, decline or accept a bag, and complete payment smoothly.",
      stepLabels: ["At the Register", "Bento Warming & Bag", "Payment Method"],
    },
    "zh-CN": {
      title: "在便利店结账与便当加热",
      locationName: "7-Eleven 便利店，六本木，东京",
      description: "选购日式便当与饮料。从容应对店员是否加热便当、是否需要塑料袋的提问并顺畅付款。",
      stepLabels: ["收银结账", "加热便当与塑料袋", "选择支付方式"],
    },
    "zh-TW": {
      title: "在便利店結帳與便當加熱",
      locationName: "7-Eleven 便利店，六本木，東京",
      description: "選購日式便當與飲料。從容應對店員是否加熱便當、是否需要塑膠袋的提問並順暢付款。",
      stepLabels: ["收銀結帳", "加熱便當與塑膠袋", "選擇支付方式"],
    },
  },

  "akihabara-anime": {
    fr: {
      title: "Recherche de figurines & Produits dérivés à Akihabara",
      locationName: "Magasin Radio Kaikan, Akihabara, Tokyo",
      description: "Cherchez un article rare dans la capitale mondiale de l'animation. Renseignez-vous sur le stock et demandez à voir une vitrine.",
      stepLabels: ["Demande de figurine", "Ouverture de vitrine", "Achat"],
    },
    en: {
      title: "Hunting Anime Figures in Akihabara",
      locationName: "Radio Kaikan, Akihabara, Tokyo",
      description: "Explore the mecca of anime culture. Ask shop staff to check inventory and open display cases to inspect collectables.",
      stepLabels: ["Inquiring for Goods", "Showcase Inspection", "Purchase"],
    },
    "zh-CN": {
      title: "在秋叶原动漫店寻找手办与周边",
      locationName: "秋叶原无线电会馆，东京",
      description: "漫步世界动漫之都。向店员咨询限定手办库存，申请打开玻璃展示柜验货。",
      stepLabels: ["寻找特定周边", "申请开启展柜", "前往结账"],
    },
    "zh-TW": {
      title: "在秋葉原動漫店尋找手辦與周邊",
      locationName: "秋葉原無線電會館，東京",
      description: "漫步世界動漫之都。向店員諮詢限定手辦庫存，申請打開玻璃展示櫃驗貨。",
      stepLabels: ["尋找特定周邊", "申請開啟展櫃", "前往結帳"],
    },
  },

  "hakone-ryokan": {
    fr: {
      title: "Check-in au Ryokan & Bain Onsen à Hakone",
      locationName: "Auberge thermale traditionnelle, Hakone",
      description: "Vivez l'hospitalité traditionnelle japonaise (Omotenashi). Faites votre enregistrement, vérifiez les horaires du dîner Kaiseki et les règles de l'Onsen.",
      stepLabels: ["Accueil & Enregistrement", "Horaires du repas & Onsen", "Arrivée en chambre"],
      steps: [
        {
          npcSpeaker: "HÔTESSE D'ACCUEIL (OKAMI)",
          npcMeaning: "Bienvenue à Hakone Onsen ! Puis-je vous demander le nom de votre réservation ?",
          choices: [
            {
              textNative: "J'ai réservé au nom de Nguyen. Je viens pour le check-in s'il vous plaît.",
              npcFeedback: "L'hôtesse s'incline respectueusement et vous invite au salon de thé !",
            },
          ],
        },
      ],
    },
    en: {
      title: "Ryokan Check-in & Onsen Etiquette in Hakone",
      locationName: "Traditional Onsen Ryokan, Hakone",
      description: "Experience authentic Japanese hospitality. Check in, confirm Kaiseki dinner timing, and learn hot spring etiquette.",
      stepLabels: ["Welcome & Check-in", "Dinner & Onsen Rules", "Entering Room"],
    },
    "zh-CN": {
      title: "箱根日式温泉旅馆入住与泡汤礼仪",
      locationName: "箱根传统温泉旅馆，神奈川",
      description: "体验日式至臻待客之道 (Omotenashi)。在前台办理入住手续，确认怀石料理用餐时间与温泉开放守则。",
      stepLabels: ["前台入住登记", "确认晚餐与汤泉须知", "领钥匙进房"],
    },
    "zh-TW": {
      title: "箱根日式溫泉旅館入住與泡湯禮儀",
      locationName: "箱根傳統溫泉旅館，神奈川",
      description: "體驗日式至臻待客之道 (Omotenashi)。在前台辦理入住手續，確認懷石料理用餐時間與溫泉開放守則。",
      stepLabels: ["前台入住登記", "確認晚餐與湯泉須知", "領鑰匙進房"],
    },
  },

  "japanese-pharmacy": {
    fr: {
      title: "Acheter des médicaments dans une pharmacie japonaise",
      locationName: "Pharmacie Matsumoto Kiyoshi, Tokyo",
      description: "Décrivez vos symptômes de maux de tête et de fièvre légère lors d'un voyage pour obtenir le médicament adapté.",
      stepLabels: ["Description des symptômes", "Conseil posologique", "Achat"],
    },
    en: {
      title: "Buying Cold Medicine at a Japanese Pharmacy",
      locationName: "Matsumoto Kiyoshi Pharmacy, Tokyo",
      description: "Explain mild symptoms like headache or fever while traveling and ask the pharmacist for safe dosage instructions.",
      stepLabels: ["Describing Symptoms", "Dosage Instructions", "Payment"],
    },
    "zh-CN": {
      title: "在药妆店购买感冒退烧药与咨询用量",
      locationName: "松本清药妆店，东京",
      description: "向药剂师准确描述头痛、低烧等突发旅行不适症状，确认每日服用次数与用药禁忌。",
      stepLabels: ["描述病情症状", "咨询服用剂量", "结账购买"],
    },
    "zh-TW": {
      title: "在藥妝店購買感冒退燒藥與諮詢用量",
      locationName: "松本清藥妝店，東京",
      description: "向藥劑師準確描述頭痛、低燒等突發旅行不適症狀，確認每日服用次數與用藥禁忌。",
      stepLabels: ["描述病情症狀", "諮詢服用劑量", "結帳購買"],
    },
  },

  "kyoto-taxi": {
    fr: {
      title: "Prendre un taxi & Demander le trajet à Kyoto",
      locationName: "Station de taxi, Gare de Kyoto",
      description: "Donnez votre destination touristique au chauffeur de taxi, demandez le temps estimé et réglez la course poliment.",
      stepLabels: ["Destination", "Demande d'itinéraire", "Règlement"],
    },
    en: {
      title: "Taking a Taxi to Kinkaku-ji in Kyoto",
      locationName: "Taxi Stand, Kyoto Station",
      description: "State your sightseeing destination to the driver, inquire about estimated time, and pay courteously.",
      stepLabels: ["Stating Destination", "Route Inquiry", "Fare Payment"],
    },
    "zh-CN": {
      title: "在京都搭乘出租车前往金阁寺",
      locationName: "京都站出租车乘车点",
      description: "清晰告知司机著名景点目的地，询问预计到达时间与费用并在到达时礼貌付款。",
      stepLabels: ["告知目的地", "询问所需时间", "结账下车"],
    },
    "zh-TW": {
      title: "在京都搭乘計程車前往金閣寺",
      locationName: "京都站計程車乘車點",
      description: "清晰告知司機著名景點目的地，詢問預計到達時間與費用並在到達時禮貌付款。",
      stepLabels: ["告知目的地", "詢問所需時間", "結帳下車"],
    },
  },

  "n4-baito-interview": {
    fr: {
      title: "Entretien d'embauche pour un petit boulot (Baito)",
      locationName: "Café Doutor, Shinjuku, Tokyo",
      description: "Passez votre premier entretien en japonais : présentez votre parcours, vos disponibilités et votre motivation avec politesse.",
      stepLabels: ["Salutations & Présentation", "Disponibilités hebdomadaires", "Motivation & Clôture"],
    },
    en: {
      title: "Part-time Job Interview (Baito N4)",
      locationName: "Doutor Coffee Shinjuku, Tokyo",
      description: "Undergo a Japanese part-time job interview: introduce yourself, state working hours, and express enthusiasm respectfully.",
      stepLabels: ["Greeting & Introduction", "Availability & Shifts", "Motivation & Wrap-up"],
    },
    "zh-CN": {
      title: "日本咖啡馆兼职面试实战 (Baito N4)",
      locationName: "Doutor 咖啡馆，新宿，东京",
      description: "体验标准日式打工面试。使用谦恭体介绍经历、排班意愿与工作热情。",
      stepLabels: ["入室礼仪与自我介绍", "出勤时间与排班", "志望动机与致谢"],
    },
    "zh-TW": {
      title: "日本咖啡館兼職面試實戰 (Baito N4)",
      locationName: "Doutor 咖啡館，新宿，東京",
      description: "體驗標準日式打工面試。使用謙恭體介紹經歷、排班意願與工作熱情。",
      stepLabels: ["入室禮儀與自我介紹", "出勤時間與排班", "志望動機與致謝"],
    },
  },

  "n4-apartment-leasing": {
    fr: {
      title: "Visite & Location d'appartement en agence immobilière",
      locationName: "Agence immobilière Chintai, Tokyo",
      description: "Précisez votre budget, la distance souhaitée de la gare et demandez les détails des charges et de la caution.",
      stepLabels: ["Critères de recherche", "Visite & Frais annexes", "Décision"],
    },
    en: {
      title: "Apartment Hunting at a Real Estate Agency",
      locationName: "Chintai Real Estate, Tokyo",
      description: "Specify budget, walking distance to station, and ask about deposit (Shikikin) and key money (Reikin).",
      stepLabels: ["Housing Requirements", "Viewing & Fees", "Next Steps"],
    },
    "zh-CN": {
      title: "日本不动产房屋租赁咨询实战",
      locationName: "Chintai 房屋中介，东京",
      description: "向中介顾问阐述预算、户型与距车站步行时间要求，详细了解敷金礼金与解约条款。",
      stepLabels: ["阐述找房条件", "看房与确认杂费", "预约签约"],
    },
    "zh-TW": {
      title: "日本不動產房屋租賃諮詢實戰",
      locationName: "Chintai 房屋仲介，東京",
      description: "向仲介顧問闡述預算、戶型與距車站步行時間要求，詳細了解敷金禮金與解約條款。",
      stepLabels: ["闡述找房條件", "看房與確認雜費", "預約簽約"],
    },
  },

  "n4-hospital-visit": {
    fr: {
      title: "Consultation médicale & Accueil à la clinique",
      locationName: "Clinique générale de Shibuya, Tokyo",
      description: "Remplissez la fiche médicale, décrivez la douleur et posez vos questions sur la prise en charge de l'assurance.",
      stepLabels: ["Accueil & Formulaire", "Examen du médecin", "Pharmacie & Ordonnance"],
    },
    en: {
      title: "Clinic Reception & Doctor Consultation",
      locationName: "Shibuya General Clinic, Tokyo",
      description: "Present health insurance, fill in the medical questionnaire, and describe symptoms clearly to the doctor.",
      stepLabels: ["Reception & Questionnaire", "Doctor Consultation", "Prescription & Payment"],
    },
    "zh-CN": {
      title: "日本综合诊所挂号与医生问诊",
      locationName: "涉谷综合门诊部，东京",
      description: "出示健康保险证，填写初诊问诊单，向主治医师准确描述疼痛部位与持续时间。",
      stepLabels: ["前台挂号与填写问诊单", "医生问诊检查", "开药与医保结算"],
    },
    "zh-TW": {
      title: "日本綜合診所掛號與醫生問診",
      locationName: "涉谷綜合門診部，東京",
      description: "出示健康保險證，填寫初診問診單，向主治醫師準確描述疼痛部位與持續時間。",
      stepLabels: ["前台掛號與填寫問診單", "醫生問診檢查", "開藥與醫保結算"],
    },
  },

  "n4-office-reporting": {
    fr: {
      title: "Rapport d'avancement de projet en entreprise (Hō-Ren-Sō)",
      locationName: "Bureau d'entreprise, Marunouchi, Tokyo",
      description: "Pratiquez le Hōrensō : informez votre supérieur de l'avancée d'un dossier, formulez un problème et proposez une solution.",
      stepLabels: ["Prise de contact", "Rapport de situation", "Consultation & Action"],
    },
    en: {
      title: "Business Progress Reporting (Hō-Ren-Sō N4)",
      locationName: "Corporate Office, Marunouchi, Tokyo",
      description: "Practice workplace reporting (Hō-Ren-Sō): brief your manager, identify a bottleneck, and seek guidance respectfully.",
      stepLabels: ["Requesting Time", "Progress Briefing", "Advice & Next Steps"],
    },
    "zh-CN": {
      title: "日企职场工作进度汇报 (报联商 Hō-Ren-Sō)",
      locationName: "丸之内商务中心办公室，东京",
      description: "演练日企核心「报联商」原则：向主管部长汇报项目进度，报告突发变动并商讨对策。",
      stepLabels: ["预约请示时间", "业务进度汇报", "协商决策与执行"],
    },
    "zh-TW": {
      title: "日企職場工作進度匯報 (報聯商 Hō-Ren-Sō)",
      locationName: "丸之內商務中心辦公室，東京",
      description: "演練日企核心「報聯商」原則：向主管部長匯報項目進度，報告突發變動並商討對策。",
      stepLabels: ["預約請示時間", "業務進度匯報", "協商決策與執行"],
    },
  },

  "koban-lost-wallet": {
    fr: {
      title: "Déclaration d'objet perdu au poste de police (Kōban)",
      locationName: "Poste de police Kōban, Shibuya Hachiko",
      description: "Signalez la perte de votre portefeuille : décrivez la couleur, le contenu, l'heure probable et remplissez la déposition.",
      stepLabels: ["Signalement de l'objet", "Détails & Contenu", "Numéro de dossier"],
    },
    en: {
      title: "Reporting a Lost Wallet at the Kōban Police Box",
      locationName: "Shibuya Hachiko Police Box, Tokyo",
      description: "Report a lost wallet: describe color, brand, contents, estimated time of loss, and file an official lost property report.",
      stepLabels: ["Initial Report", "Item Description", "Filing & Contact Info"],
    },
    "zh-CN": {
      title: "在交番 (派出所) 报案遗失钱包",
      locationName: "涉谷八公前交番派出所，东京",
      description: "向警官详细说明钱包遗失的地点、时间，描述颜色特征与证件现金，完成遗失物申报。",
      stepLabels: ["说明报案事项", "详细描述失物特征", "填写遗失届登记"],
    },
    "zh-TW": {
      title: "在交番 (派出所) 報案遺失錢包",
      locationName: "涉谷八公前交番派出所，東京",
      description: "向警官詳細說明錢包遺失的地點、時間，描述顏色特徵與證件現金，完成遺失物申報。",
      stepLabels: ["說明報案事項", "詳細描述失物特徵", "填寫遺失屆登記"],
    },
  },

  "n3-workplace-reporting": {
    fr: {
      title: "Rapport d'activité professionnel N3 & Négociation",
      locationName: "Siège de société, Toranomon, Tokyo",
      description: "Utilisez le Keigo et les formules professionnelles pour négocier un délai et présenter les résultats au chef de département.",
      stepLabels: ["Ouverture formelle", "Présentation des résultats", "Négociation & Accord"],
    },
    en: {
      title: "Business Client Negotiation & Keigo (N3)",
      locationName: "Corporate HQ, Toranomon, Tokyo",
      description: "Use advanced business Japanese and Keigo to negotiate timelines and present quarterly milestones.",
      stepLabels: ["Formal Opening", "Milestone Review", "Timeline Adjustment"],
    },
    "zh-CN": {
      title: "日企高阶商务汇报与商务敬语沟通 (N3)",
      locationName: "虎之门总部大楼，东京",
      description: "熟练运用敬语体系 (尊敬语与谦让语)，向部门长汇报季度成果并协商调整交货排期。",
      stepLabels: ["正式礼貌开场", "项目里程碑陈述", "协商调整方案"],
    },
    "zh-TW": {
      title: "日企高階商務匯報與商務敬語溝通 (N3)",
      locationName: "虎之門總部大樓，東京",
      description: "熟練運用敬語體系 (尊敬語與謙讓語)，向部門長匯報季度成果並協商調整交貨排期。",
      stepLabels: ["正式禮貌開場", "項目里程碑陳述", "協商調整方案"],
    },
  },

  "n3-medical-clinic": {
    fr: {
      title: "Consultation médicale détaillée & Explications N3",
      locationName: "Hôpital universitaire de Tokyo",
      description: "Exprimez des nuances précises sur l'évolution de vos symptômes, vos antécédents et comprenez les recommandations du spécialiste.",
      stepLabels: ["Antécédents médicaux", "Évolution des symptômes", "Diagnostic & Traitement"],
    },
    en: {
      title: "Specialist Medical Consultation (N3)",
      locationName: "University of Tokyo Hospital",
      description: "Communicate nuanced health histories, symptom duration, and understand medical guidance from specialists.",
      stepLabels: ["Medical History", "Symptom Progression", "Diagnosis & Plan"],
    },
    "zh-CN": {
      title: "日本大学附属医院专科深度问诊 (N3)",
      locationName: "东京大学医学部附属医院",
      description: "用进阶日语表达病症演变、既往病史，准确理解专科主任医生的诊断意见与疗程安排。",
      stepLabels: ["陈述既往病史", "病情演变阶段", "诊断意见与医嘱"],
    },
    "zh-TW": {
      title: "日本大學附屬醫院專科深度問診 (N3)",
      locationName: "東京大學醫學部附屬醫院",
      description: "用進階日語表達病症演變、既往病史，準確理解專科主任醫生的診斷意見與療程安排。",
      stepLabels: ["陳述既往病史", "病情演變階段", "診斷意見與醫囑"],
    },
  },

  "osaka-takoyaki-kansai": {
    fr: {
      title: "Commander des Takoyaki & Parler le dialecte d'Osaka (Kansai-ben)",
      locationName: "Échoppe de rue Dotonbori, Osaka",
      description: "Goûtez à la convivialité d'Osaka. Commandez vos takoyaki bien chauds et échangez quelques répliques en dialecte Kansai !",
      stepLabels: ["Commande avec gouaille", "Sauce & Garniture", "Échange chaleureux"],
    },
    en: {
      title: "Ordering Takoyaki & Kansai Dialect in Osaka",
      locationName: "Dotonbori Street Stall, Osaka",
      description: "Experience Osaka's warm, lively culture. Order sizzling takoyaki and enjoy friendly banter using Kansai dialect phrases!",
      stepLabels: ["Placing Order", "Toppings & Sauces", "Friendly Banter"],
    },
    "zh-CN": {
      title: "在大阪道顿堀点章鱼烧与体验关西腔 (Kansai-ben)",
      locationName: "道顿堀风味档口，大阪",
      description: "感受关西人的爽朗热情。现场选购刚出锅的章鱼烧，互动运用地道关西腔句尾词！",
      stepLabels: ["热闹点餐", "选酱料与木鱼花", "关西腔热情互动"],
    },
    "zh-TW": {
      title: "在大阪道頓堀點章魚燒與體驗關西腔 (Kansai-ben)",
      locationName: "道頓堀風味檔口，大阪",
      description: "感受關西人的爽朗熱情。現場選購剛出鍋的章魚燒，互動運用道地關西腔句尾詞！",
      stepLabels: ["熱鬧點餐", "選醬料與木魚花", "關西腔熱情互動"],
    },
  },
};

export function getLocalizedScenarioMeta(
  slug: string,
  lang: NativeLanguage,
  fallback: { title: string; locationName: string; description: string }
): LocalizedScenarioText {
  const match = SCENARIO_I18N[slug]?.[lang];
  if (match) {
    return {
      title: match.title || fallback.title,
      locationName: match.locationName || fallback.locationName,
      description: match.description || fallback.description,
      stepLabels: match.stepLabels,
      steps: match.steps,
    };
  }

  // Fallback to English if not Vietnamese and not matching
  if (lang !== "vi") {
    const enMatch = SCENARIO_I18N[slug]?.en;
    if (enMatch) {
      return {
        title: enMatch.title || fallback.title,
        locationName: enMatch.locationName || fallback.locationName,
        description: enMatch.description || fallback.description,
        stepLabels: enMatch.stepLabels,
        steps: enMatch.steps,
      };
    }
  }

  return {
    title: fallback.title,
    locationName: fallback.locationName,
    description: fallback.description,
  };
}

