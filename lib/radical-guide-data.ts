// Guide data for Radical Decomposition and Kanji Meaning Inference
// "Phương pháp ghép các bộ thủ để đoán nghĩa của một chữ Kanji mới"

export interface DeconstructionExample {
  kanji: string;
  hanViet: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  formula: Array<{ part: string; role: string; name: string }>;
  mnemonic: string;
  vocabulary: Array<{ word: string; reading: string; meaning: string }>;
}

export interface QuizQuestion {
  id: number;
  kanji: string;
  hanViet: string;
  breakdown: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SIX_FORMATIONS = [
  {
    name: "Tượng hình (象形 - Shōkei)",
    desc: "Mô phỏng hình dáng cụ thể của vật thể trong tự nhiên ngoài đời thực.",
    percent: "~3%",
    examples: [
      { char: "日", meaning: "Mặt trời tròn với một chấm ở tâm" },
      { char: "月", meaning: "Vầng trăng khuyết mềm mại trên cao" },
      { char: "木", meaning: "Cây cối có cành lá vươn lên và rễ cắm sâu" },
      { char: "山", meaning: "Ba đỉnh núi cao sừng sững nhấp nhô" },
      { char: "川", meaning: "Ba dòng nước uốn lượn chảy xuôi khe núi" },
      { char: "門", meaning: "Hai cánh cổng lớn mở ra khép vào" },
    ]
  },
  {
    name: "Chỉ sự (指事 - Shiji)",
    desc: "Dùng các ký hiệu, vạch nét ước lệ để diễn đạt những khái niệm trừu tượng không có hình dáng cố định.",
    percent: "~2%",
    examples: [
      { char: "上", meaning: "Một vạch mốc và một điểm nằm ở PHÍA TRÊN vạch" },
      { char: "下", meaning: "Một vạch mốc và một điểm chỉ PHÍA DƯỚI vạch" },
      { char: "一 / 二 / 三", meaning: "Số que gậy nằm ngang chỉ số đếm 1, 2, 3" },
      { char: "本", meaning: "Gốc cây 木 có thêm vạch ngang dưới gốc chỉ GỐC RỄ, căn nguyên" },
      { char: "末", meaning: "Cây 木 có vạch dài trên ngọn chỉ NGỌN CÂY, tận cùng" },
      { char: "刃", meaning: "Con dao 刀 có dấu chấm trên lưỡi chỉ LƯỠI DAO sắc bén" },
    ]
  },
  {
    name: "Hội ý (会意 - Kaii)",
    desc: "Ghép 2 hay nhiều bộ thủ mang ý nghĩa độc lập lại với nhau để sản sinh ra một ý niệm, nghĩa mới giàu tính triết lý.",
    percent: "~13%",
    examples: [
      { char: "休 (Hưu)", meaning: "亻 (người) tựa vào 木 (gốc cây) => Nghỉ ngơi" },
      { char: "明 (Minh)", meaning: "日 (mặt trời) + 月 (mặt trăng) hợp lực tỏa sáng => Sáng sủa, thông minh" },
      { char: "林 (Lâm)", meaning: "木 (cây) + 木 (cây) => Rừng nhỏ, rừng thưa" },
      { char: "森 (Sâm)", meaning: "Ba cây 木 chụm lại => Rừng rậm rạp nguyên sinh" },
      { char: "男 (Nam)", meaning: "田 (ruộng lúa) + 力 (sức mạnh) => Người bỏ sức làm ruộng là đàn ông" },
      { char: "好 (Hảo)", meaning: "女 (người mẹ) + 子 (đứa con) => Mẹ âu yếm con là điều tuyệt vời, yêu thích" },
    ]
  },
  {
    name: "Hình thanh (形声 - Keisei) ★ QUAN TRỌNG NHẤT",
    desc: "Phương pháp đỉnh cao chiếm > 80% Kanji! Một phần là HÌNH BỘ (Bộ thủ cho biết trường nghĩa), một phần là THANH BỘ (gợi ý âm đọc Onyomi).",
    percent: ">80%",
    examples: [
      { char: "清 (Thanh)", meaning: "氵(nước) + 青(xanh) => Nước trong xanh, thanh khiết (Âm on: SEI)" },
      { char: "晴 (Tình)", meaning: "日(mặt trời) + 青(xanh) => Trời xanh nắng đẹp, tạnh ráo (Âm on: SEI)" },
      { char: "請 (Thỉnh)", meaning: "言(lời nói) + 青(thanh) => Cầu xin, thỉnh cầu lời nói (Âm on: SEI)" },
      { char: "情 (Tình)", meaning: "忄(trái tim) + 青(thanh) => Tâm tình, tình cảm trong lòng (Âm on: JOU)" },
      { char: "精 (Tinh)", meaning: "米(hạt gạo) + 青(thanh) => Hạt gạo trắng nõn, tinh túy, tinh thần (Âm on: SEI)" },
      { char: "鯖 (Bá)", meaning: "魚(con cá) + 青(xanh) => Cá thu lưng xanh biếc (saba)" },
    ]
  },
  {
    name: "Chuyển chú (転注 - Tenchū)",
    desc: "Mượn chữ đã có sẵn và mở rộng, chuyển biến ngữ nghĩa sang một lĩnh vực liên quan tương đồng.",
    percent: "~1%",
    examples: [
      { char: "楽 (Lạc/Nhạc)", meaning: "Ban đầu là nhạc cụ phát ra âm thanh vui vẻ, sau mở rộng thành vui vẻ, an lạc" },
      { char: "令 (Lệnh)", meaning: "Mệnh lệnh của cấp trên, mở rộng thành điều tốt lành, người đứng đầu" },
    ]
  },
  {
    name: "Giả tá (仮借 - Kasha)",
    desc: "Mượn một chữ có âm đọc tương đồng để biểu thị một từ vựng mới hoàn toàn không liên quan về mặt nghĩa gốc.",
    percent: "~1%",
    examples: [
      { char: "自 (Tự)", meaning: "Gốc là vẽ cái mũi người, sau được mượn làm từ 'chính mình' (tự mình)" },
      { char: "万 (Vạn)", meaning: "Ban đầu vẽ con bọ cạp, sau mượn làm con số mười nghìn (10.000)" },
    ]
  }
];

export const SEVEN_POSITIONS = [
  {
    code: "hen",
    nameJa: "へん (偏 - Hen)",
    nameVi: "Bên trái của chữ",
    diagram: "[ BỘ THỦ | Phụ tố ]",
    desc: "Vị trí bộ thủ xuất hiện nhiều nhất trong Kanji. Đóng vai trò làm Hình bộ xác định lĩnh vực hoặc chủ đề.",
    radicals: [
      { char: "亻", name: "Nhân đứng", meaning: "Người, hành vi con người (休, 体, 信)" },
      { char: "氵", name: "Ba chấm thủy", meaning: "Nước, sông hồ, chất lỏng (海, 泳, 洗)" },
      { char: "扌", name: "Tay gảy (Thủ)", meaning: "Động tác bằng tay (持, 打, 指)" },
      { char: "木", name: "Mộc", meaning: "Cây cối, gỗ, bàn ghế (校, 林, 村)" },
      { char: "言", name: "Ngôn", meaning: "Lời nói, ngôn ngữ (語, 話, 訳)" },
      { char: "金", name: "Kim", meaning: "Kim loại, vàng bạc, sắt thép (銀, 鉄, 銭)" },
      { char: "忄", name: "Tâm đứng", meaning: "Cảm xúc, tâm trạng (忙, 快, 情)" },
    ]
  },
  {
    code: "tsukuri",
    nameJa: "つくり (旁 - Tsukuri)",
    nameVi: "Bên phải của chữ",
    diagram: "[ Phụ tố | BỘ THỦ ]",
    desc: "Nằm ở nửa bên phải, thường đóng vai trò là Thanh bộ (chỉ âm đọc) hoặc hành động tác động.",
    radicals: [
      { char: "刂", name: "Đao đứng", meaning: "Cắt gọt, dao kiếm, phân chia (切, 別, 判)" },
      { char: "力", name: "Lực", meaning: "Sức mạnh, cơ bắp, vận động (動, 助, 勉)" },
      { char: "欠", name: "Khiếm", meaning: "Há miệng, thiếu thốn, thở (歌, 欲, 次)" },
      { char: "頁", name: "Hiệt", meaning: "Đầu người, trang giấy, nhìn ngắm (頭, 題, 顔)" },
      { char: "攴/攵", name: "Phộc/Nô-bun", meaning: "Đánh nhẹ, răn dạy, hành động (教, 数, 改)" },
      { char: "鳥", name: "Điểu", meaning: "Loài chim lông vũ (鳴, 鴨, 鶴)" },
    ]
  },
  {
    code: "kanmuri",
    nameJa: "かんむり (冠 - Kanmuri)",
    nameVi: "Ở trên đầu chữ",
    diagram: "┌─ BỘ THỦ ─┐\n│  Phần dưới  │",
    desc: "Nằm bao chụp phía trên như chiếc vương miện hay mái che, xác định môi trường tổng quan.",
    radicals: [
      { char: "艹", name: "Thảo đầu", meaning: "Cỏ cây, hoa lá, thực vật, thảo dược (花, 茶, 薬)" },
      { char: "宀", name: "Miên (Mái nhà)", meaning: "Nhà cửa, chỗ trú ngụ, an yên (家, 安, 室)" },
      { char: "雨", name: "Vũ đầu", meaning: "Thời tiết, mưa tuyết, sấm sét (雪, 電, 雲)" },
      { char: "⺮", name: "Trúc đầu", meaning: "Ống tre, dụng cụ đan lát, thẻ sách (筆, 答, 等)" },
      { char: "穴", name: "Huyệt đầu", meaning: "Hang động, lỗ hổng, vòm trời (空, 窓, 究)" },
    ]
  },
  {
    code: "ashi",
    nameJa: "あし (脚 - Ashi)",
    nameVi: "Ở dưới đáy chữ",
    diagram: "│  Phần trên  │\n└─ BỘ THỦ ─┘",
    desc: "Nằm nâng đỡ dưới chân chữ, thường biểu thị chân bước, ngọn lửa nung hay lòng đĩa chứa đựng.",
    radicals: [
      { char: "灬", name: "Bốn chấm hỏa", meaning: "Lửa nung ở dưới bếp, nhiệt lượng (熱, 焦, 煮)" },
      { char: "心", name: "Tâm đáy", meaning: "Lòng dạ, suy ngẫm, cảm xúc (思, 忘, 息)" },
      { char: "儿", name: "Nhi (Chân người)", meaning: "Đôi chân bước đi (先, 元, 光)" },
      { char: "皿", name: "Mãnh (Đĩa)", meaning: "Bát đĩa, đồ đựng chứa thức ăn (盛, 盆, 益)" },
    ]
  },
  {
    code: "tare",
    nameJa: "たれ (垂 - Tare)",
    nameVi: "Rủ xuống từ trên xuống trái",
    diagram: "┌─ BỘ THỦ ─┐\n│  (Rủ trái) │\n│  Nội dung   │",
    desc: "Bao bọc góc trên và chạy dài xuống sườn bên trái, gợi cảm giác mái hiên che hoặc vách núi.",
    radicals: [
      { char: "广", name: "Quảng (Mái hiên)", meaning: "Nhà kho, cửa hàng, công thự (店, 広, 庫)" },
      { char: "疒", name: "Nạch (Bệnh tật)", meaning: "Ốm đau, bệnh tật, đau đớn (病, 痛, 疲)" },
      { char: "尸", name: "Thi (Thân xác)", meaning: "Nơi cư ngụ, cơ thể, che chắn (屋, 居, 局)" },
      { char: "厂", name: "Hán (Vách đá)", meaning: "Mỏm đá, sườn núi cao (原, 圧, 歴)" },
    ]
  },
  {
    code: "nyou",
    nameJa: "にょう (繞 - Nyou)",
    nameVi: "Bao quanh từ trái sang dưới đáy",
    diagram: "│             │\n│ BỘ THỦ      │\n└─────────────┘",
    desc: "Chạy dọc sườn trái rồi ôm trọn phần đáy phía dưới, hầu hết liên quan đến bước đi và đường sá.",
    radicals: [
      { char: "辶", name: "Quai xước (Xước)", meaning: "Đi lại, di chuyển trên đường bộ (道, 通, 進)" },
      { char: "廴", name: "Dẫn", meaning: "Sải bước dài, xây dựng kéo dài (建, 延)" },
      { char: "走", name: "Tẩu (Chạy)", meaning: "Chạy nhanh, vội vã, vượt qua (起, 超, 越)" },
    ]
  },
  {
    code: "kamae",
    nameJa: "かまえ (構 - Kamae)",
    nameVi: "Khung vây quanh 3 hoặc 4 phía",
    diagram: "┌───────────┐\n│ [BÊN TRONG]│\n└───────────┘",
    desc: "Bao bọc hoàn toàn bên ngoài hoặc 3 phía, mang tính chất ngăn cách, bảo vệ hoặc cửa ngõ.",
    radicals: [
      { char: "囗", name: "Vi (Vây quanh)", meaning: "Biên giới, tường bao bốn phía (国, 団, 園)" },
      { char: "門", name: "Môn (Cổng)", meaning: "Cổng lớn, phòng ốc, hỏi han (開, 閉, 問)" },
      { char: "勹", name: "Bao (Bọc lại)", meaning: "Ôm ấp, bao bọc một kiện hàng (包, 匂)" },
      { char: "行", name: "Hành (Ngã tư)", meaning: "Đường sá hai bên, đi lại (街, 術, 衛)" },
    ]
  }
];

export const FOUR_STEPS_HACKER = [
  {
    step: 1,
    title: "Nhận diện Bộ Thủ Chủ Đạo (Hình bộ)",
    desc: "Quan sát xem chữ Kanji có mang một trong 7 vị trí (Hen, Kanmuri, Nyou, Kamae...) không. Bộ thủ chính sẽ lập tức khóa chặt 'Họ' và trường nghĩa của chữ:",
    tip: "Thấy 氵 chắc chắn liên quan nước; thấy 扌 chắc chắn là thao tác tay; thấy 言 là chuyện trò phát ngôn; thấy 疒 là bệnh tật!"
  },
  {
    step: 2,
    title: "Phân rã Phần Phụ Tố Còn Lại (Thanh bộ hoặc Phụ ý)",
    desc: "Bóc tách phần còn lại ra. Xem phần này là một chữ Kanji bạn đã biết hay một ký hiệu hình tượng:",
    tip: "Nếu là chữ quen thuộc, hãy kiểm tra xem nó có gợi ý Âm đọc On (Thanh bộ) không, hoặc mang ý niệm bổ trợ gì."
  },
  {
    step: 3,
    title: "Dệt Câu Chuyện Liên Tưởng (Visual Mnemonic)",
    desc: "Ghép nghĩa của Bộ thủ chính và Phụ tố thành một bức tranh sống động, có cảm xúc hoặc chút hài hước:",
    tip: "Não bộ nhớ hình ảnh và câu chuyện cảm xúc gấp 10 lần việc học vẹt nét chữ khô khan!"
  },
  {
    step: 4,
    title: "Đối chiếu Ngữ Cảnh và Khóa Nghĩa Chuẩn Xác",
    desc: "Đặt chữ Kanji vừa suy luận vào từ ghép (Jukugo) hoặc câu văn thực tế để xác nhận lại trường nghĩa:",
    tip: "Ví dụ: Biết chữ có nghĩa là 'nước' + 'mắt' => Trong ngữ cảnh khóc thì chắc chắn là LỆ (nước mắt)!"
  }
];

export const DECONSTRUCTION_EXAMPLES: DeconstructionExample[] = [
  {
    kanji: "休",
    hanViet: "HƯU",
    onyomi: "キュウ (kyuu)",
    kunyomi: "やす・む (yasumu)",
    meaning: "Nghỉ ngơi, ngừng làm việc",
    formula: [
      { part: "亻", role: "Bộ thủ (Hình bộ)", name: "Nhân đứng (Người)" },
      { part: "木", role: "Phụ tố (Ý niệm)", name: "Mộc (Cây cối)" }
    ],
    mnemonic: "Con người (亻) sau nhiều giờ làm lụng vất vả ra tựa lưng vào gốc cây to (木) để hóng gió nghỉ mệt => Nghỉ ngơi (Hưu).",
    vocabulary: [
      { word: "休み", reading: "やすみ (yasumi)", meaning: "Kỳ nghỉ, ngày nghỉ" },
      { word: "休日", reading: "きゅうじつ (kyuujitsu)", meaning: "Ngày nghỉ lễ" },
      { word: "休憩", reading: "きゅうけい (kyuukei)", meaning: "Nghỉ giải lao" }
    ]
  },
  {
    kanji: "明",
    hanViet: "MINH",
    onyomi: "メイ、ミョウ (mei, myou)",
    kunyomi: "あか・るい (akarui)",
    meaning: "Sáng sủa, thông minh, minh bạch",
    formula: [
      { part: "日", role: "Bộ thủ (Hình bộ)", name: "Nhật (Mặt trời)" },
      { part: "月", role: "Phụ tố (Ý niệm)", name: "Nguyệt (Mặt trăng)" }
    ],
    mnemonic: "Hai nguồn sáng vĩ đại nhất của vũ trụ: Mặt trời ban ngày (日) và Mặt trăng ban đêm (月) cùng soi rọi => Ánh sáng ngập tràn, sáng rõ, minh bạch.",
    vocabulary: [
      { word: "明るい", reading: "あかるい (akarui)", meaning: "Tươi sáng, tính cách vui vẻ" },
      { word: "明日", reading: "あした / みょうにち", meaning: "Ngày mai" },
      { word: "説明", reading: "せつめい (setsumei)", meaning: "Thuyết minh, giải thích rõ ràng" }
    ]
  },
  {
    kanji: "語",
    hanViet: "NGỮ",
    onyomi: "ゴ (go)",
    kunyomi: "かた・る (kataru)",
    meaning: "Ngôn ngữ, lời nói, chuyện trò",
    formula: [
      { part: "言", role: "Bộ thủ (Hình bộ)", name: "Ngôn (Lời nói)" },
      { part: "五", role: "Thanh bộ (Âm đọc)", name: "Ngũ (Số 5 - đọc là go)" },
      { part: "口", role: "Phụ tố (Ý niệm)", name: "Khẩu (Cái miệng)" }
    ],
    mnemonic: "Hình thanh phối hợp: Bộ Ngôn (言) chỉ lời nói, phần Ngũ (五) + Khẩu (口) gợi âm GO. Năm cái miệng cùng trao đổi lời nói tạo nên Ngôn ngữ.",
    vocabulary: [
      { word: "日本語", reading: "にほんご (nihongo)", meaning: "Tiếng Nhật" },
      { word: "言語", reading: "げんご (gengo)", meaning: "Ngôn ngữ" },
      { word: "単語", reading: "たんご (tango)", meaning: "Từ vựng" }
    ]
  },
  {
    kanji: "働",
    hanViet: "ĐỘNG",
    onyomi: "ドウ (dou)",
    kunyomi: "はたら・く (hataraku)",
    meaning: "Lao động, làm việc (Chữ Kokuji do người Nhật sáng tạo)",
    formula: [
      { part: "亻", role: "Bộ thủ (Hình bộ)", name: "Nhân đứng (Người)" },
      { part: "動", role: "Thanh bộ (Gợi âm)", name: "Động (Chuyển động, vận động - dou)" }
    ],
    mnemonic: "Con người (亻) vận động tay chân di chuyển liên tục (動) chính là đang làm việc chăm chỉ => Lao động (働く - hataraku).",
    vocabulary: [
      { word: "働く", reading: "はたらく (hataraku)", meaning: "Làm việc, lao động" },
      { word: "労働", reading: "ろうどう (roudou)", meaning: "Lao động" },
      { word: "共働き", reading: "ともばたらき (tomobataraki)", meaning: "Cả hai vợ chồng cùng đi làm" }
    ]
  },
  {
    kanji: "鮮",
    hanViet: "TIÊN",
    onyomi: "セン (sen)",
    kunyomi: "あざ・やか (azayaka)",
    meaning: "Tươi mới, tươi rói, sống động",
    formula: [
      { part: "魚", role: "Bộ thủ (Hình bộ)", name: "Ngư (Con cá dưới nước)" },
      { part: "羊", role: "Phụ tố (Ý niệm)", name: "Dương (Con dê trên núi)" }
    ],
    mnemonic: "Thịt cá (魚) vừa quẫy đuôi bắt dưới suối và thịt dê tươi (羊) vừa mổ trên núi là hai món tươi ngon bậc nhất thiên hạ => Tươi sống (Tiên).",
    vocabulary: [
      { word: "新鮮", reading: "しんせん (shinsen)", meaning: "Tươi mới (thực phẩm, không khí)" },
      { word: "鮮やか", reading: "あざやか (azayaka)", meaning: "Rực rỡ, sắc sảo" },
      { word: "海鮮", reading: "かいせん (kaisen)", meaning: "Hải sản tươi sống" }
    ]
  },
  {
    kanji: "涙",
    hanViet: "LỆ",
    onyomi: "ルイ (rui)",
    kunyomi: "なみだ (namida)",
    meaning: "Nước mắt, giọt lệ",
    formula: [
      { part: "氵", role: "Bộ thủ (Hình bộ)", name: "Ba chấm thủy (Nước)" },
      { part: "戻", role: "Phụ tố (Ý niệm)", name: "Lệ / Quay lại (U uất kìm nén)" }
    ],
    mnemonic: "Dòng nước (氵) dâng ngược trào ra từ khóe mi khi cảm xúc nghẹn ngào kìm nén vỡ òa => Giọt nước mắt (Lệ).",
    vocabulary: [
      { word: "涙", reading: "なみだ (namida)", meaning: "Nước mắt" },
      { word: "涙声", reading: "なみだごえ (namidagoe)", meaning: "Giọng nói nghẹn ngào nước mắt" },
      { word: "感涙", reading: "かんるい (kanrui)", meaning: "Giọt nước mắt cảm động" }
    ]
  },
  {
    kanji: "鉄",
    hanViet: "THIẾT",
    onyomi: "テツ (tetsu)",
    kunyomi: "くろがね (kurogane)",
    meaning: "Sắt, gang thép kim loại",
    formula: [
      { part: "金", role: "Bộ thủ (Hình bộ)", name: "Kim (Kim loại)" },
      { part: "失", role: "Phụ tố (Ý niệm)", name: "Thất (Mất đi, rơi mất)" }
    ],
    mnemonic: "Thứ kim loại (金) để ngoài trời lâu ngày bị rỉ sét ăn mòn mục nát mất dần (失) chính là sắt thép => Kim loại Sắt (Thiết).",
    vocabulary: [
      { word: "地下鉄", reading: "ちかてつ (chikatetsu)", meaning: "Tàu điện ngầm" },
      { word: "鉄道", reading: "てつどう (tetsudou)", meaning: "Đường sắt" },
      { word: "鉄鋼", reading: "てっこう (tekkou)", meaning: "Sắt thép công nghiệp" }
    ]
  },
  {
    kanji: "忘",
    hanViet: "VONG",
    onyomi: "ボウ (bou)",
    kunyomi: "わす・れる (wasureru)",
    meaning: "Quên, lãng quên",
    formula: [
      { part: "亡", role: "Thanh bộ (Gợi âm)", name: "Vong (Mất mát, tan biến - bou)" },
      { part: "心", role: "Bộ thủ (Hình bộ)", name: "Tâm (Trái tim, trí nhớ)" }
    ],
    mnemonic: "Ký ức trong tâm trí (心) bị đánh mất đi (亡) không còn tìm lại được nữa => Quên lãng (忘れる - wasureru).",
    vocabulary: [
      { word: "忘れる", reading: "わすれる (wasureru)", meaning: "Quên đi" },
      { word: "忘れ物", reading: "わすれもの (wasuremono)", meaning: "Đồ đạc bỏ quên" },
      { word: "忘年会", reading: "ぼうねんかい (bounenkai)", meaning: "Tiệc tất niên (quên đi nỗi vất vả năm cũ)" }
    ]
  },
  {
    kanji: "安",
    hanViet: "AN",
    onyomi: "アン (an)",
    kunyomi: "やす・い (yasui)",
    meaning: "An toàn, yên ổn, rẻ (giá cả dễ chịu)",
    formula: [
      { part: "宀", role: "Bộ thủ (Hình bộ)", name: "Miên (Mái nhà tổ ấm)" },
      { part: "女", role: "Phụ tố (Ý niệm)", name: "Nữ (Người phụ nữ)" }
    ],
    mnemonic: "Người phụ nữ (女) được ở yên dưới mái nhà (宀) che chở ấm êm, không phải dãi dầu sương gió ngoài đường => Yên bình, an toàn.",
    vocabulary: [
      { word: "安心", reading: "あんしん (anshin)", meaning: "An tâm, yên tâm" },
      { word: "安全", reading: "あんぜん (anzen)", meaning: "An toàn" },
      { word: "安い", reading: "やすい (yasui)", meaning: "Rẻ (giá thành an tâm vừa túi tiền)" }
    ]
  },
  {
    kanji: "晴",
    hanViet: "TÌNH",
    onyomi: "セイ (sei)",
    kunyomi: "は・れる (hareru)",
    meaning: "Trời quang mây tạnh, nắng ráo",
    formula: [
      { part: "日", role: "Bộ thủ (Hình bộ)", name: "Nhật (Mặt trời)" },
      { part: "青", role: "Thanh bộ (Gợi âm)", name: "Thanh (Màu xanh biếc - sei)" }
    ],
    mnemonic: "Mặt trời (日) chiếu rọi trên nền trời xanh biếc không một gợn mây đen (青) => Thời tiết quang đãng, tạnh ráo (晴れ - hare).",
    vocabulary: [
      { word: "晴れ", reading: "はれ (hare)", meaning: "Trời nắng đẹp" },
      { word: "晴天", reading: "せいてん (seiten)", meaning: "Trời quang mây tạnh" },
      { word: "見晴らし", reading: "みはらし (miharashi)", meaning: "Tầm nhìn xa thoáng đãng" }
    ]
  },
  {
    kanji: "薬",
    hanViet: "DƯỢC",
    onyomi: "ヤク (yaku)",
    kunyomi: "くすり (kusuri)",
    meaning: "Thuốc thang, dược phẩm",
    formula: [
      { part: "艹", role: "Bộ thủ (Hình bộ)", name: "Thảo đầu (Cỏ cây, thảo mộc)" },
      { part: "楽", role: "Thanh bộ (Gợi âm)", name: "Lạc (Vui vẻ, an lạc, thoải mái)" }
    ],
    mnemonic: "Loài thảo mộc cỏ cây (艹) uống vào khiến thân thể nhẹ nhõm, vui vẻ, tan biến đau nhức (楽) chính là Thuốc thang (Dược).",
    vocabulary: [
      { word: "薬", reading: "くすり (kusuri)", meaning: "Thuốc uống" },
      { word: "薬局", reading: "やっきょく (yakkyoku)", meaning: "Hiệu thuốc" },
      { word: "風邪薬", reading: "かぜぐすり (kazegusuri)", meaning: "Thuốc cảm cúm" }
    ]
  },
  {
    kanji: "鳴",
    hanViet: "MINH",
    onyomi: "メイ (mei)",
    kunyomi: "な・く (naku)",
    meaning: "Hót, kêu, gáy, reo vang",
    formula: [
      { part: "口", role: "Bộ thủ (Hình bộ)", name: "Khẩu (Cái miệng)" },
      { part: "鳥", role: "Phụ tố (Ý niệm)", name: "Điểu (Con chim)" }
    ],
    mnemonic: "Chú chim (鳥) mở chiếc mỏ nhọn (口) cất tiếng hót líu lo buổi sớm mai => Tiếng chim kêu, hót vang.",
    vocabulary: [
      { word: "鳴く", reading: "なく (naku)", meaning: "Động vật hót, kêu, gáy" },
      { word: "悲鳴", reading: "ひめい (himei)", meaning: "Tiếng kêu thét kinh hãi" },
      { word: "雷鳴", reading: "らいめい (raimei)", meaning: "Tiếng sấm sét rền vang" }
    ]
  }
];

export const RADICAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    kanji: "泳",
    hanViet: "VỊNH",
    breakdown: "Bộ Thủy (氵) + Vĩnh (永 - dài lâu)",
    question: "Chữ 泳 có bộ Thủy (氵 - nước). Theo bạn chữ này mang nghĩa gì?",
    options: ["Rửa chén", "Bơi lội dưới nước", "Khóc lóc", "Uống rượu"],
    correctIndex: 1,
    explanation: "Bộ Thủy (氵) biểu thị môi trường nước, kết hợp với 永 (dài lâu - vẫy vùng lâu dưới nước) tạo thành động từ 泳ぐ (oyogu - bơi lội)."
  },
  {
    id: 2,
    kanji: "指",
    hanViet: "CHỈ",
    breakdown: "Bộ Thủ (扌 - bàn tay) + Chỉ (旨 - ngon lành, ý chỉ)",
    question: "Chữ 指 có bộ Thủ (扌 - bàn tay). Nó chỉ bộ phận hoặc hành động nào?",
    options: ["Ngón tay / Chỉ trỏ", "Đôi chân / Bước chạy", "Đôi mắt / Nhìn ngắm", "Cái miệng / Ca hát"],
    correctIndex: 0,
    explanation: "Bộ Thủ (扌) chỉ bàn tay thao tác. 指 (yubi) là ngón tay, dùng ngón tay để chỉ trỏ, hướng dẫn (chỉ thị - 指示)."
  },
  {
    id: 3,
    kanji: "痛",
    hanViet: "THỐNG",
    breakdown: "Bộ Nạch (疒 - bệnh tật ốm đau) + Dũng (甬)",
    question: "Chữ 痛 có bộ Nạch (疒). Nghĩa của chữ này gần với khái niệm nào nhất?",
    options: ["Khỏe mạnh", "Đau đớn, nhức nhối", "Nấu nướng thức ăn", "Đi du lịch"],
    correctIndex: 1,
    explanation: "Bộ Nạch (疒) luôn chi phối các trạng thái ốm đau bệnh tật. 痛い (itai) nghĩa là đau buốt, nhức nhối (đau đầu - 頭痛)."
  },
  {
    id: 4,
    kanji: "話",
    hanViet: "THOẠI",
    breakdown: "Bộ Ngôn (言 - lời nói) + Thiệt (舌 - cái lưỡi)",
    question: "Chữ 話 kết hợp giữa Ngôn (言) và Thiệt (舌). Nghĩa chính xác là gì?",
    options: ["Ăn kẹo ngọt", "Nói chuyện, đàm thoại", "Đọc sách thầm", "Hôn môi"],
    correctIndex: 1,
    explanation: "Cái lưỡi (舌) uốn lượn phát ra lời nói (言) tạo nên cuộc trò chuyện đàm thoại => 話す (hanasu - nói chuyện)."
  },
  {
    id: 5,
    kanji: "銀",
    hanViet: "NGÂN",
    breakdown: "Bộ Kim (金 - kim loại) + Cấn (艮 - cứng cỏi)",
    question: "Chữ 銀 có bộ Kim (金). Nó biểu thị loại vật chất nào?",
    options: ["Gỗ quý lim sến", "Kim loại Bạc, tiền bạc", "Vải tơ lụa", "Nước suối khoáng"],
    correctIndex: 1,
    explanation: "Bộ Kim (金) chỉ khoáng sản kim loại. 銀 (gin) là Bạc (ngân lượng, ngân hàng 銀行)."
  },
  {
    id: 6,
    kanji: "雪",
    hanViet: "TUYẾT",
    breakdown: "Bộ Vũ (雨 - mưa trời) + Kệ (彐 - bàn tay gạt)",
    question: "Chữ 雪 mang bộ Vũ (雨) ở phía trên. Đây là hiện tượng thiên nhiên nào?",
    options: ["Ánh nắng gay gắt", "Bông tuyết trắng rơi", "Gió lốc bụi", "Động đất rung chuyển"],
    correctIndex: 1,
    explanation: "Bộ Vũ (雨) chi phối hiện tượng thời tiết từ trên trời rơi xuống. 雪 (yuki) là tuyết rơi."
  },
  {
    id: 7,
    kanji: "草",
    hanViet: "THẢO",
    breakdown: "Bộ Thảo (艹 - cỏ cây) + Sớm (早 - sớm mai)",
    question: "Chữ 草 có bộ Thảo đầu (艹). Nó mang nghĩa là gì?",
    options: ["Cỏ cây dại", "Con thú rừng", "Đá cuội", "Bát sứ"],
    correctIndex: 0,
    explanation: "Bộ Thảo (艹) luôn chỉ thực vật hoa cỏ. 草 (kusa) là cỏ dại mọc vào sớm mai."
  },
  {
    id: 8,
    kanji: "道",
    hanViet: "ĐẠO",
    breakdown: "Bộ Quai xước (辶 - bước đi) + Thủ (首 - cái đầu)",
    question: "Chữ 道 có bộ Quai xước (辶). Nghĩa mở rộng của nó là gì?",
    options: ["Con đường, đạo lý", "Ngôi nhà gỗ", "Chiếc áo ấm", "Món súp ngon"],
    correctIndex: 0,
    explanation: "Bộ Quai xước (辶) chỉ bước đi trên đường. Cái đầu dẫn lối đôi chân bước đi tạo thành Con đường, Đạo lý (道 - michi)."
  },
  {
    id: 9,
    kanji: "男",
    hanViet: "NAM",
    breakdown: "Bộ Điền (田 - ruộng) + Lực (力 - cơ bắp)",
    question: "Chữ 男 ghép giữa Điền (田) và Lực (力). Chữ này chỉ ai?",
    options: ["Người già", "Đàn ông, con trai", "Phụ nữ", "Trẻ sơ sinh"],
    correctIndex: 1,
    explanation: "Người bỏ sức lực cơ bắp (力) cày cấy trên ruộng đồng (田) thời cổ là phái mạnh => Đàn ông (男 - otoko)."
  },
  {
    id: 10,
    kanji: "飯",
    hanViet: "PHẠN",
    breakdown: "Bộ Thực (飠 - ăn uống) + Phản (反)",
    question: "Chữ 飯 có bộ Thực (飠) bên trái. Nó liên quan đến cái gì?",
    options: ["Cơm, bữa ăn", "Quần áo mặc", "Chiếc giường ngủ", "Tiền vàng bạc"],
    correctIndex: 0,
    explanation: "Bộ Thực (飠) chỉ ăn uống lương thực. ご飯 (gohan) là cơm, bữa ăn hàng ngày."
  }
];
