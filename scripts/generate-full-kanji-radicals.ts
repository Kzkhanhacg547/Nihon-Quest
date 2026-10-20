import fs from "fs";
import path from "path";

async function main() {
  console.log("=== NihonQuest Kanji & Radicals Data Generator ===");

  // 1. Load Han-Viet datasets
  const hvData = require("./hanvietData.cjs");
  let hvMap: Record<string, string> = {};
  try {
    hvMap = JSON.parse(fs.readFileSync(path.join(__dirname, "hanviet-map.json"), "utf8"));
  } catch (e) {
    console.warn("Could not read hanviet-map.json", e);
  }

  // 2. Fetch Wikipedia List_of_jōyō_kanji
  console.log("Fetching Jouyou Kanji from Wikipedia...");
  const resJoyo = await fetch(
    "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_j%C5%8Dy%C5%8D_kanji&prop=wikitext&section=1&format=json"
  );
  const dataJoyo = await resJoyo.json();
  const wtJoyo = dataJoyo.parse.wikitext["*"];
  const rowsJoyo = wtJoyo.split("\n|-");

  console.log(`Fetched Jouyou rows: ${rowsJoyo.length}`);

  // Manual fallback map for special / Kokuji / entity characters
  const OVERRIDES: Record<string, { hanViet: string; meaningVi?: string; jlpt?: string }> = {
    "脚": { hanViet: "CƯỚC", meaningVi: "Chân, cẳng chân" },
    "惧": { hanViet: "CỤ", meaningVi: "Lo sợ, e ngại" },
    "込": { hanViet: "DÃN", meaningVi: "Dồn vào, chen chúc, nhét vào (komu)" },
    "柵": { hanViet: "SÁCH", meaningVi: "Hàng rào, rào chắn" },
    "刹": { hanViet: "SÁT", meaningVi: "Chùa chiền, sát na (khoảnh khắc)" },
    "駄": { hanViet: "ĐÀ", meaningVi: "Thồ hàng, vô ích (muda)" },
    "峠": { hanViet: "ĐÈO", meaningVi: "Đỉnh đèo, con đèo (touge)" },
    "匂": { hanViet: "MÙI", meaningVi: "Hương thơm, mùi hương (nioi)" },
    "塀": { hanViet: "BÌNH", meaningVi: "Bức tường bao quanh, hàng rào" },
    "舗": { hanViet: "PHỐ", meaningVi: "Cửa hàng, tiệm buôn" },
    "枠": { hanViet: "KHUNG", meaningVi: "Khung gỗ, khuôn khổ, giới hạn (waku)" },
    "𠮟": { hanViet: "SẤT", meaningVi: "Quát mắng, la rầy" },
    "塡": { hanViet: "ĐIỀN", meaningVi: "Điền vào, lấp đầy" },
    "剝": { hanViet: "BÁC", meaningVi: "Bóc tách, lột vỏ" },
    "頰": { hanViet: "GIÁP", meaningVi: "Gò má, hai bên má" },
    "叱": { hanViet: "SẤT", meaningVi: "Quát mắng, la rầy" },
    "填": { hanViet: "ĐIỀN", meaningVi: "Điền vào, lấp đầy" },
    "剥": { hanViet: "BÁC", meaningVi: "Bóc tách, lột vỏ" },
    "頬": { hanViet: "GIÁP", meaningVi: "Gò má, hai bên má" },
    "働": { hanViet: "ĐỘNG", meaningVi: "Lao động, làm việc" },
    "畑": { hanViet: "ĐIỀN", meaningVi: "Cánh đồng khô, ruộng rẫy" },
  };

  // Grade to JLPT mapping heuristic (standard in Japanese education)
  function gradeToJlpt(grade: string, index: number): "N5" | "N4" | "N3" | "N2" | "N1" {
    if (grade === "1") return "N5";
    if (grade === "2") {
      return index < 180 ? "N5" : "N4";
    }
    if (grade === "3") return "N4";
    if (grade === "4") return "N3";
    if (grade === "5") return "N3";
    if (grade === "6") return "N2";
    // Grade S (Secondary school: 1,110 kanji)
    return index < 1500 ? "N2" : "N1";
  }

  const joyoList: any[] = [];
  let joyoIndex = 0;

  for (let i = 2; i < rowsJoyo.length; i++) {
    const row = rowsJoyo[i].trim();
    if (!row.startsWith("|")) continue;
    const cols = row.split("||");
    if (cols.length < 9) continue;

    // Col 0: number
    const num = parseInt(cols[0].replace(/^\|\s*/, "").trim(), 10) || (joyoIndex + 1);

    // Col 1: new kanji
    let kanji = "";
    const newMatch = cols[1].match(/\[\[wikt:([^#\|\]]+)/);
    if (newMatch) kanji = newMatch[1].trim();
    else {
      // try plain character
      const m = cols[1].match(/[\u4e00-\u9faf\u3400-\u4dbf\u{20000}-\u{2a6df}]/u);
      if (m) kanji = m[0];
    }
    if (!kanji) continue;

    // Col 2: old kanji
    let oldKanji = "";
    const oldMatch = cols[2].match(/\[\[wikt:([^#\|\]]+)/);
    if (oldMatch) oldKanji = oldMatch[1].trim();

    // Col 3: radical
    let radical = "";
    const radMatch = cols[3].match(/\[\[(?:Radical\s*\d+\|)?([^\]]+)\]\]/);
    if (radMatch) radical = radMatch[1].trim();

    // Col 4: strokes
    const strokes = parseInt(cols[4].trim(), 10) || 0;

    // Col 5: grade
    const grade = cols[5].trim();

    // Col 7: meaning
    const meaningEn = cols[7].trim();

    // Col 8: readings
    const rawReadings = cols[8].replace(/<[^>]+>/g, " ").replace(/\|\}$/, "").trim();
    // Split into kana and romaji
    const onyomi: string[] = [];
    const kunyomi: string[] = [];
    const tokens = rawReadings.split(/[、\s]+/).filter(Boolean);
    for (const tok of tokens) {
      if (/^[\u30A0-\u30FF\-・]+$/.test(tok)) {
        if (!onyomi.includes(tok)) onyomi.push(tok);
      } else if (/^[\u3040-\u309F\-・]+$/.test(tok)) {
        if (!kunyomi.includes(tok)) kunyomi.push(tok);
      }
    }

    // Determine Han-Viet
    let hanViet = "";
    if (OVERRIDES[kanji]?.hanViet) {
      hanViet = OVERRIDES[kanji].hanViet;
    } else if (oldKanji && OVERRIDES[oldKanji]?.hanViet) {
      hanViet = OVERRIDES[oldKanji].hanViet;
    } else if (hvData[kanji]) {
      const vals = Object.values(hvData[kanji]).flat().filter(Boolean);
      if (vals.length > 0) hanViet = String(vals[0]).toUpperCase();
    } else if (oldKanji && hvData[oldKanji]) {
      const vals = Object.values(hvData[oldKanji]).flat().filter(Boolean);
      if (vals.length > 0) hanViet = String(vals[0]).toUpperCase();
    } else if (hvMap[kanji]) {
      hanViet = hvMap[kanji].toUpperCase();
    } else if (oldKanji && hvMap[oldKanji]) {
      hanViet = hvMap[oldKanji].toUpperCase();
    }

    if (!hanViet) {
      hanViet = kanji;
    }

    const jlptLevel = gradeToJlpt(grade, joyoIndex);

    joyoList.push({
      num,
      character: kanji,
      oldCharacter: oldKanji || undefined,
      radical: radical || "一",
      strokeCount: strokes,
      grade: grade === "S" ? "S" : parseInt(grade, 10) || 1,
      jlptLevel,
      hanViet,
      onyomi,
      kunyomi,
      meaningEn,
      meaningVi: OVERRIDES[kanji]?.meaningVi || "",
    });

    joyoIndex++;
  }

  console.log(`Successfully parsed ${joyoList.length} Jouyou Kanji.`);

  // Write Jouyou Kanji Dataset
  const joyoCode = `// Generated standard Jouyou Kanji (2,136 characters)
// Official list issued by Japan's Ministry of Education, Culture, Sports, Science and Technology (MEXT).

export interface JouyouKanjiItem {
  num: number;
  character: string;
  oldCharacter?: string;
  radical: string;
  strokeCount: number;
  grade: number | "S"; // 1-6 for elementary school, "S" for secondary school
  jlptLevel: "N5" | "N4" | "N3" | "N2" | "N1";
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaningEn: string;
  meaningVi: string;
}

export const JOUYOU_KANJI_LIST: JouyouKanjiItem[] = ${JSON.stringify(joyoList, null, 2)};
`;

  const joyoPath = path.join(__dirname, "..", "lib", "jouyou-kanji-data.ts");
  fs.writeFileSync(joyoPath, joyoCode, "utf8");
  console.log(`Wrote ${joyoPath} (${joyoList.length} items)`);

  // 3. Generate Complete 214 Kangxi Radicals dataset
  console.log("Generating 214 Kangxi Radicals dataset...");

  // Full 214 Radicals with positions, meanings, examples and mnemonics
  const radicalsData = [
    // 1 Stroke (1 - 6)
    { num: 1, char: "一", variants: [], strokes: 1, hanViet: "NHẤT", jaName: "いち", romaji: "ichi", meaningVi: "Một, số một, khởi đầu", meaningEn: "One", pos: "shin", posName: "Độc lập / Lõi", examples: ["七", "三", "丈", "不", "丘", "世", "下", "上"], tip: "Biểu thị số lượng đơn nhất hoặc đường chân trời nằm ngang." },
    { num: 2, char: "丨", variants: [], strokes: 1, hanViet: "CỔN", jaName: "ぼう", romaji: "bou", meaningVi: "Nét sổ đứng, xuyên suốt", meaningEn: "Vertical line", pos: "shin", posName: "Độc lập / Lõi", examples: ["中", "串", "申", "旧", "甲", "十"], tip: "Vạch thẳng từ trên xuống dưới, chỉ sự kết nối và xuyên suốt tâm." },
    { num: 3, char: "丶", variants: [], strokes: 1, hanViet: "ĐIỂM", jaName: "てん", romaji: "ten", meaningVi: "Dấu chấm, đốm lửa nhỏ", meaningEn: "Dot", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["丸", "丹", "主", "丼"], tip: "Một giọt nước hoặc điểm chấm đánh dấu trọng tâm vật thể." },
    { num: 4, char: "丿", variants: [], strokes: 1, hanViet: "PHIỆT", jaName: "の", romaji: "no", meaningVi: "Nét phẩy, chém xéo sang trái", meaningEn: "Slash / Bend", pos: "shin", posName: "Độc lập", examples: ["久", "乏", "乗", "九", "丹"], tip: "Nét cong vút từ trên nghiêng về bên trái." },
    { num: 5, char: "乙", variants: ["⺄", "乚"], strokes: 1, hanViet: "ẤT", jaName: "おつ", romaji: "otsu", meaningVi: "Can thứ hai, uốn khúc mềm mại", meaningEn: "Second / Curved", pos: "shin", posName: "Độc lập", examples: ["九", "乞", "乳", "乾", "乱"], tip: "Hình tượng mầm non uốn cong hoặc chim én uốn lượn." },
    { num: 6, char: "亅", variants: [], strokes: 1, hanViet: "QUYẾT", jaName: "はねぼう", romaji: "hanebou", meaningVi: "Nét móc ngược lên", meaningEn: "Hook", pos: "shin", posName: "Độc lập", examples: ["了", "予", "争", "事"], tip: "Nét sổ có móc sắc nhọn ở cuối giống lưỡi câu giữ chặt." },

    // 2 Strokes (7 - 29)
    { num: 7, char: "二", variants: [], strokes: 2, hanViet: "NHỊ", jaName: "に", romaji: "ni", meaningVi: "Hai, đôi lứa, song hành", meaningEn: "Two", pos: "shin", posName: "Độc lập / Lõi", examples: ["于", "云", "互", "五", "井", "亜"], tip: "Hai nét song song tượng trưng cho trời và đất, âm và dương." },
    { num: 8, char: "亠", variants: [], strokes: 2, hanViet: "ĐẦU", jaName: "なべぶた", romaji: "nabebuta", meaningVi: "Nắp nồi, chóp trên cùng", meaningEn: "Lid / Top", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["亡", "交", "京", "享", "亭", "夜"], tip: "Nằm ở trên đỉnh của chữ, giống như chiếc nắp vung che chắn." },
    { num: 9, char: "人", variants: ["亻"], strokes: 2, hanViet: "NHÂN", jaName: "ひと / にんべん", romaji: "hito / ninben", meaningVi: "Con người, nhân cách, hành vi", meaningEn: "Human / Person", pos: "hen", posName: "Bên trái (Hen)", examples: ["休", "体", "作", "信", "使", "働", "他", "便", "何"], tip: "Cực kỳ phổ biến! Đứng bên trái viết thành Nhân đứng (亻), biểu thị người và hành vi con người." },
    { num: 10, char: "儿", variants: [], strokes: 2, hanViet: "NHI", jaName: "ひとあし", romaji: "hitoashi", meaningVi: "Đôi chân người, trẻ nhỏ", meaningEn: "Legs", pos: "ashi", posName: "Ở dưới (Ashi)", examples: ["元", "兄", "充", "兆", "先", "光", "免"], tip: "Hai chân người đang dang rộng hoặc bước đi thong dong." },
    { num: 11, char: "入", variants: [], strokes: 2, hanViet: "NHẬP", jaName: "いる", romaji: "iru", meaningVi: "Đi vào, thâm nhập", meaningEn: "Enter", pos: "shin", posName: "Độc lập", examples: ["内", "全", "両"], tip: "Hình dòng chảy hội tụ hoặc người bước chân vào ngưỡng cửa." },
    { num: 12, char: "八", variants: ["丷"], strokes: 2, hanViet: "BÁT", jaName: "はち / はちがしら", romaji: "hachi", meaningVi: "Số tám, chia rẽ hai hướng", meaningEn: "Eight / Divide", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["公", "六", "共", "兵", "具", "典"], tip: "Hai nét phân tách quay lưng về hai hướng đối lập." },
    { num: 13, char: "冂", variants: [], strokes: 2, hanViet: "QUYNH", jaName: "まきがまえ", romaji: "makigamae", meaningVi: "Biên cương, vùng ngoại ô xa", meaningEn: "Borders / Outskirts", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["円", "冊", "再", "冒"], tip: "Đường biên giới bao bọc xung quanh một vùng bờ cõi xa xôi." },
    { num: 14, char: "冖", variants: [], strokes: 2, hanViet: "MỊCH", jaName: "わかんむり", romaji: "wakanmuri", meaningVi: "Trùm khăn, che phủ lên trên", meaningEn: "Cover / Crown", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["冗", "写", "軍", "冠"], tip: "Tấm khăn voan trùm phủ lên đồ vật hay che chắn bí mật." },
    { num: 15, char: "冫", variants: [], strokes: 2, hanViet: "BĂNG", jaName: "にすい", romaji: "nisui", meaningVi: "Băng tuyết, giá lạnh, đông cứng", meaningEn: "Ice", pos: "hen", posName: "Bên trái (Hen)", examples: ["冬", "冷", "凍", "凄", "准", "涼", "次"], tip: "Hai giọt nước đông kết thành tinh thể đá buốt giá." },
    { num: 16, char: "几", variants: [], strokes: 2, hanViet: "KỶ", jaName: "きにょう", romaji: "kinyou", meaningVi: "Chiếc bàn trà nhỏ, ghế tựa", meaningEn: "Table / Stool", pos: "nyou", posName: "Bao dưới (Nyou)", examples: ["凡", "処", "凪", "凧"], tip: "Chiếc kỷ trà có chân uốn cong thời xưa." },
    { num: 17, char: "凵", variants: [], strokes: 2, hanViet: "KHẢM", jaName: "かんにょう", romaji: "kannyou", meaningVi: "Hố sâu, máng chứa há miệng", meaningEn: "Container / Pit", pos: "kamae", posName: "Bao dưới (Kamae)", examples: ["凶", "凸", "凹", "出", "函"], tip: "Một chiếc hố trũng hoặc lòng hộp đang há miệng lên trời." },
    { num: 18, char: "刀", variants: ["刂"], strokes: 2, hanViet: "ĐAO", jaName: "かたな / りっとう", romaji: "katana / rittou", meaningVi: "Dao, kiếm, chặt chém, chia cắt", meaningEn: "Knife / Sword", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["切", "刃", "分", "初", "別", "利", "制", "刻", "割", "列"], tip: "Ghép bên phải thành Đao đứng (刂), chỉ việc cắt, gọt, chia đôi, đao kiếm." },
    { num: 19, char: "力", variants: [], strokes: 2, hanViet: "LỰC", jaName: "ちから", romaji: "chikara", meaningVi: "Sức mạnh, năng lực, cơ bắp", meaningEn: "Power / Strength", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["加", "助", "勉", "動", "労", "勝", "勇", "勢"], tip: "Cánh tay gân guốc gồng cơ bắp tạo nên năng lượng và sức lực." },
    { num: 20, char: "勹", variants: [], strokes: 2, hanViet: "BAO", jaName: "つつみがまえ", romaji: "tsutsumigamae", meaningVi: "Bọc lại, ôm ấp, bao bọc", meaningEn: "Wrap / Enfold", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["勺", "勾", "匂", "包", "勿"], tip: "Tư thế hai cánh tay khum lại ôm chặt một bọc hàng." },
    { num: 21, char: "匕", variants: [], strokes: 2, hanViet: "CHỦY", jaName: "ひ", romaji: "hi", meaningVi: "Cái thìa, muỗng múc, dao găm", meaningEn: "Spoon / Dagger", pos: "shin", posName: "Độc lập", examples: ["化", "北", "匙"], tip: "Chiếc muỗng cong để nếm vị hoặc mũi găm nhỏ phòng thân." },
    { num: 22, char: "匚", variants: [], strokes: 2, hanViet: "PHƯƠNG", jaName: "はこがまえ", romaji: "hakogamae", meaningVi: "Chiếc tráp đựng đồ, hòm vuông", meaningEn: "Box", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["匠", "匡", "匣"], tip: "Chiếc hộp gỗ mở một nắp bên phải." },
    { num: 23, char: "匸", variants: [], strokes: 2, hanViet: "HỆ", jaName: "かくしがまえ", romaji: "kakushigamae", meaningVi: "Che giấu, cất giữ kín đáo", meaningEn: "Conceal / Hide", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["匹", "区", "医", "匿"], tip: "Hộc bí mật để cất giấu vàng ngọc thuốc thang." },
    { num: 24, char: "十", variants: [], strokes: 2, hanViet: "THẬP", jaName: "じゅう", romaji: "juu", meaningVi: "Số mười, hoàn hảo, thập toàn", meaningEn: "Ten / Complete", pos: "shin", posName: "Độc lập / Lõi", examples: ["千", "午", "升", "半", "卒", "協", "南", "博"], tip: "Bốn phương tám hướng hội tụ tại tâm, biểu thị trọn vẹn đầy đủ." },
    { num: 25, char: "卜", variants: [], strokes: 2, hanViet: "BỐC", jaName: "うらない", romaji: "uranai", meaningVi: "Bói toán, xem quẻ điềm báo", meaningEn: "Divination", pos: "shin", posName: "Độc lập", examples: ["占", "卦", "卡"], tip: "Vết rạn nứt trên mai rùa hay xương bả vai khi nung bói điềm lành dữ." },
    { num: 26, char: "卩", variants: ["㔾"], strokes: 2, hanViet: "TIẾT", jaName: "ふしづくり", romaji: "fushizukuri", meaningVi: "Đốt tre, con dấu ấn tín, quỳ gối", meaningEn: "Seal / Kneeling person", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["印", "危", "卵", "卷", "即", "卿"], tip: "Hình người đang quỳ gối phục vụ hoặc chiếc ấn tre tín nghĩa." },
    { num: 27, char: "厂", variants: [], strokes: 2, hanViet: "HÁN", jaName: "がんだれ", romaji: "gandare", meaningVi: "Vách đá dựng đứng, sườn núi dốc", meaningEn: "Cliff", pos: "tare", posName: "Rủ xuống (Tare)", examples: ["厄", "原", "厚", "圧", "歴"], tip: "Mỏm đá cheo leo chìa ra bên sườn núi." },
    { num: 28, char: "厶", variants: [], strokes: 2, hanViet: "KHỨU", jaName: "む", romaji: "mu", meaningVi: "Riêng tư, bản ngã, góc riêng", meaningEn: "Private", pos: "shin", posName: "Độc lập", examples: ["去", "参", "弁"], tip: "Bàn tay khép lại ôm vật vào lòng biểu thị sở hữu tư nhân." },
    { num: 29, char: "又", variants: [], strokes: 2, hanViet: "HỰU", jaName: "また", romaji: "mata", meaningVi: "Lại nữa, bàn tay nắm lấy", meaningEn: "Again / Right hand", pos: "shin", posName: "Độc lập", examples: ["反", "友", "取", "受", "双", "変"], tip: "Hình bàn tay phải xòe ra nắm bắt đồ vật lần nữa." },

    // 3 Strokes (30 - 60)
    { num: 30, char: "口", variants: [], strokes: 3, hanViet: "KHẨU", jaName: "くち / くちへん", romaji: "kuchi", meaningVi: "Miệng, cổng, ăn uống, lời nói", meaningEn: "Mouth / Opening", pos: "hen", posName: "Bên trái (Hen)", examples: ["古", "句", "叫", "可", "台", "史", "右", "吸", "味", "唱", "問", "鳴"], tip: "Hình dáng cái miệng. Chữ có Khẩu thường liên quan đến ăn, nói, nếm, kêu gào." },
    { num: 31, char: "囗", variants: [], strokes: 3, hanViet: "VI", jaName: "くにがまえ", romaji: "kunigamae", meaningVi: "Vây quanh, tường thành bốn phía", meaningEn: "Enclosure", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["四", "団", "回", "因", "国", "困", "圏", "園"], tip: "Tường thành bao trọn lấy không gian bên trong (khác Khẩu nhỏ)." },
    { num: 32, char: "土", variants: [], strokes: 3, hanViet: "THỔ", jaName: "つち / つちへん", romaji: "tsuchi", meaningVi: "Đất đai, thổ nhưỡng, bờ cõi", meaningEn: "Earth / Soil", pos: "hen", posName: "Bên trái (Hen)", examples: ["地", "坂", "坊", "均", "城", "域", "塔", "培", "増"], tip: "Mầm non nhú lên từ lòng đất. Chữ mang Thổ gắn liền với đất, tường, công trình." },
    { num: 33, char: "士", variants: [], strokes: 3, hanViet: "SĨ", jaName: "さむらい", romaji: "samurai", meaningVi: "Kẻ sĩ, người tài, trượng phu", meaningEn: "Scholar / Warrior", pos: "shin", posName: "Độc lập", examples: ["壮", "声", "壱"], tip: "Kẻ sĩ học rộng tài cao, nét trên dài hơn nét dưới." },
    { num: 34, char: "夂", variants: [], strokes: 3, hanViet: "TRĨ", jaName: "ふゆがしら", romaji: "fuyugashira", meaningVi: "Đi chậm theo sau", meaningEn: "Follow / Go slowly", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["各", "条", "処", "変"], tip: "Bước chân thong thả đi theo sau người khác." },
    { num: 35, char: "夊", variants: [], strokes: 3, hanViet: "TRUY", jaName: "すいにょう", romaji: "suinyou", meaningVi: "Đi chậm chạp, níu kéo", meaningEn: "Go slowly", pos: "nyou", posName: "Bao dưới (Nyou)", examples: ["夏", "愛"], tip: "Bàn chân dùng dằng quyến luyến không nỡ rời xa." },
    { num: 36, char: "夕", variants: [], strokes: 3, hanViet: "TỊCH", jaName: "ゆうべ", romaji: "yuube", meaningVi: "Chiều tà, hoàng hôn, bóng tối", meaningEn: "Evening", pos: "shin", posName: "Độc lập", examples: ["外", "夜", "夢", "多", "名"], tip: "Vầng trăng khuyết ló dạng trong buổi hoàng hôn." },
    { num: 37, char: "大", variants: [], strokes: 3, hanViet: "ĐẠI", jaName: "だい", romaji: "dai", meaningVi: "To lớn, vĩ đại, rộng mở", meaningEn: "Big / Great", pos: "shin", posName: "Độc lập", examples: ["天", "太", "夫", "央", "失", "頭", "奏"], tip: "Người lớn dang rộng cả hai tay hai chân hiên ngang." },
    { num: 38, char: "女", variants: [], strokes: 3, hanViet: "NỮ", jaName: "おんな / おんなへん", romaji: "onna", meaningVi: "Phụ nữ, thiếu nữ, mềm mại", meaningEn: "Woman / Female", pos: "hen", posName: "Bên trái (Hen)", examples: ["好", "妹", "姉", "始", "妻", "姓", "娘", "妙", "婦"], tip: "Người phụ nữ dịu dàng. Chữ chứa bộ này thường chỉ nữ giới, gia đình, tình cảm." },
    { num: 39, char: "子", variants: [], strokes: 3, hanViet: "TỬ", jaName: "こ / こへん", romaji: "ko", meaningVi: "Con cái, trẻ nhỏ, thế hệ sau", meaningEn: "Child / Seed", pos: "hen", posName: "Bên trái (Hen)", examples: ["孔", "字", "存", "学", "孫", "孤", "季"], tip: "Đứa bé sơ sinh giơ hai tay quẫy đạp đáng yêu." },
    { num: 40, char: "宀", variants: [], strokes: 3, hanViet: "MIÊN", jaName: "うかんむり", romaji: "ukanmuri", meaningVi: "Mái nhà, tổ ấm, che chở", meaningEn: "Roof", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["安", "宇", "守", "宅", "客", "室", "家", "宿", "富", "密"], tip: "Mái nhà che chở mưa nắng. Mọi chữ liên quan nhà cửa, chốn ở, an yên đều có Miên." },
    { num: 41, char: "寸", variants: [], strokes: 3, hanViet: "THỐN", jaName: "すん", romaji: "sun", meaningVi: "Tấc đất, gang tay, phép tắc", meaningEn: "Inch / Measure", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["寺", "封", "専", "射", "尋", "尊", "導"], tip: "Khoảng cách một tấc từ cổ tay đến huyệt mạch để đo lường chuẩn xác." },
    { num: 42, char: "小", variants: ["⺌", "⺍"], strokes: 3, hanViet: "TIỂU", jaName: "しょう", romaji: "shou", meaningVi: "Nhỏ bé, tinh vi, ít ỏi", meaningEn: "Small", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["少", "尖", "当", "光", "肖"], tip: "Vật thể bị phân thành các hạt nhỏ li ti." },
    { num: 43, char: "尢", variants: ["尣"], strokes: 3, hanViet: "UÔNG", jaName: "だいのまげあし", romaji: "dainomageashi", meaningVi: "Yếu ớt, tật nguyền", meaningEn: "Lame", pos: "shin", posName: "Độc lập", examples: ["尤", "就"], tip: "Người bị tật cong một bên chân yếu ớt." },
    { num: 44, char: "尸", variants: [], strokes: 3, hanViet: "THI", jaName: "しかばね", romaji: "shikabane", meaningVi: "Thân xác, nằm dài, nơi ở", meaningEn: "Corpse / Body", pos: "tare", posName: "Rủ xuống (Tare)", examples: ["尺", "尾", "居", "届", "屋", "局", "昼"], tip: "Thân thể người nằm nghỉ hoặc xác thân." },
    { num: 45, char: "屮", variants: [], strokes: 3, hanViet: "TRIỆT", jaName: "てつ", romaji: "tetsu", meaningVi: "Mầm cỏ non mới đâm chồi", meaningEn: "Sprout", pos: "shin", posName: "Độc lập", examples: ["屯"], tip: "Nhành cỏ non nhú khỏi mặt đất." },
    { num: 46, char: "山", variants: [], strokes: 3, hanViet: "SƠN", jaName: "やま / やまへん", romaji: "yama", meaningVi: "Ngọn núi, hiểm trở, cao vút", meaningEn: "Mountain", pos: "hen", posName: "Bên trái (Hen)", examples: ["岩", "岸", "崩", "島", "峡", "峠", "崎", "峰"], tip: "Ba đỉnh núi cao sừng sững giữa trời mây." },
    { num: 47, char: "巛", variants: ["川"], strokes: 3, hanViet: "XUYÊN", jaName: "かわ / まがりかわ", romaji: "kawa", meaningVi: "Dòng sông, suối chảy uốn lượn", meaningEn: "River", pos: "shin", posName: "Độc lập", examples: ["州", "順", "巡"], tip: "Ba dòng nước cuồn cuộn chảy xuôi theo khe núi." },
    { num: 48, char: "工", variants: [], strokes: 3, hanViet: "CÔNG", jaName: "たくみ", romaji: "takumi", meaningVi: "Thợ thủ công, kỹ nghệ, công trình", meaningEn: "Work / Craft", pos: "shin", posName: "Độc lập", examples: ["左", "巧", "巨", "差"], tip: "Chiếc thước đo góc hoặc cái đe của bác thợ rèn." },
    { num: 49, char: "己", variants: [], strokes: 3, hanViet: "KỶ", jaName: "おのれ", romaji: "onore", meaningVi: "Bản thân mình, can Kỷ", meaningEn: "Self", pos: "shin", posName: "Độc lập", examples: ["已", "巳", "巻", "巽"], tip: "Sợi dây uốn cong quay về chính bản thân mình." },
    { num: 50, char: "巾", variants: [], strokes: 3, hanViet: "CÂN", jaName: "はば / はばへん", romaji: "haba", meaningVi: "Khăn lau, vải vóc, màn che", meaningEn: "Towel / Cloth", pos: "hen", posName: "Bên trái (Hen)", examples: ["市", "布", "帆", "帳", "幕", "幅"], tip: "Tấm vải dệt buông rủ xuống từ cọc treo." },
    { num: 51, char: "干", variants: [], strokes: 3, hanViet: "CAN", jaName: "かん", romaji: "kan", meaningVi: "Lá chắn, khô ráo, can thiệp", meaningEn: "Shield / Dry", pos: "shin", posName: "Độc lập", examples: ["平", "年", "幸", "幹"], tip: "Chiếc khiên mộc chống đỡ gươm giáo." },
    { num: 52, char: "幺", variants: [], strokes: 3, hanViet: "YÊU", jaName: "いとがしら", romaji: "itogashira", meaningVi: "Nhỏ bé, ngắn ngủi, non nớt", meaningEn: "Short / Tiny", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["幻", "幼", "幽", "幾"], tip: "Một mẩu sợi tơ ngắn ngủi non nớt." },
    { num: 53, char: "广", variants: [], strokes: 3, hanViet: "QUẢNG", jaName: "まだれ", romaji: "madare", meaningVi: "Mái nhà bên sườn núi, kho bãi", meaningEn: "Dotted cliff / Shed", pos: "tare", posName: "Rủ xuống (Tare)", examples: ["庁", "広", "床", "店", "府", "度", "座", "庫", "庭"], tip: "Ngôi nhà rộng lớn xây tựa vào sườn đồi, thường là cửa hàng, kho bãi." },
    { num: 54, char: "廴", variants: [], strokes: 3, hanViet: "DẪN", jaName: "えんにょう", romaji: "ennyou", meaningVi: "Bước đi dài, sải bước kéo dài", meaningEn: "Long stride", pos: "nyou", posName: "Bao dưới (Nyou)", examples: ["廷", "延", "建"], tip: "Sải bước chân dài vươn tới tương lai." },
    { num: 55, char: "廾", variants: [], strokes: 3, hanViet: "CỦNG", jaName: "にじゅうあし", romaji: "nijuuashi", meaningVi: "Hai tay chắp lại dâng lên", meaningEn: "Two hands / Folded hands", pos: "ashi", posName: "Ở dưới (Ashi)", examples: ["弁", "弊"], tip: "Đôi bàn tay kính cẩn dâng đồ vật lên cao." },
    { num: 56, char: "弋", variants: [], strokes: 3, hanViet: "DẶC", jaName: "しきがまえ", romaji: "shikigamae", meaningVi: "Cọc gỗ cắm mốc, tên có dây", meaningEn: "Shoot / Arrow with string", pos: "shin", posName: "Độc lập", examples: ["式", "弐"], tip: "Mũi tên buộc dây để bắn chim rồi thu hồi lại." },
    { num: 57, char: "弓", variants: [], strokes: 3, hanViet: "CUNG", jaName: "ゆみ / ゆみへん", romaji: "yumi", meaningVi: "Cây cung, uốn cong", meaningEn: "Bow", pos: "hen", posName: "Bên trái (Hen)", examples: ["引", "弘", "弟", "弦", "弧", "弱", "張", "弾"], tip: "Cánh cung kéo căng dây sẵn sàng phát lực." },
    { num: 58, char: "彐", variants: ["彑"], strokes: 3, hanViet: "KỆ", jaName: "けいがしら", romaji: "keigashira", meaningVi: "Đầu con nhím, móng vuốt con heo", meaningEn: "Snout", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["当", "彗", "彙"], tip: "Mõm nhọn của loài thú hoang." },
    { num: 59, char: "彡", variants: [], strokes: 3, hanViet: "SÂM", jaName: "さんづくり", romaji: "sanzukuri", meaningVi: "Lông dài, hoa văn trang trí", meaningEn: "Bristle / Beard", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["形", "彦", "彩", "彫", "影"], tip: "Ba sợi râu dài hay những nét cọ vẽ hoa văn trang điểm." },
    { num: 60, char: "彳", variants: [], strokes: 3, hanViet: "XÍCH", jaName: "ぎょうにんべん", romaji: "gyouninben", meaningVi: "Bước chân trái, bước chậm", meaningEn: "Step / Stroll", pos: "hen", posName: "Bên trái (Hen)", examples: ["役", "彼", "往", "征", "待", "律", "後", "徐", "徒", "得", "御", "微", "徳"], tip: "Nửa bên trái của chữ Hành (行), chỉ việc rảo bước trên phố." },

    // Core high frequency radicals (61 - 214 highlights + full series)
    { num: 61, char: "心", variants: ["忄", "⺗"], strokes: 4, hanViet: "TÂM", jaName: "こころ / りっしんべん", romaji: "kokoro / risshinben", meaningVi: "Trái tim, tâm trí, cảm xúc", meaningEn: "Heart / Mind", pos: "hen", posName: "Bên trái (Hen)", examples: ["忙", "快", "怖", "性", "情", "想", "感", "息", "愛", "忘"], tip: "Tối quan trọng! Bên trái thành Tâm đứng (忄). Mọi cảm xúc hỷ nộ ái ố đều có Tâm." },
    { num: 62, char: "戈", variants: [], strokes: 4, hanViet: "QUA", jaName: "かのほこ", romaji: "kanohoko", meaningVi: "Cây giáo, vũ khí chiến đấu", meaningEn: "Spear / Halberd", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["戊", "成", "我", "戒", "戦"], tip: "Ngọn giáo sắt trong tay binh sĩ xông pha trận mạc." },
    { num: 63, char: "戶", variants: ["户", "戸"], strokes: 4, hanViet: "HỘ", jaName: "と / とかんむり", romaji: "to", meaningVi: "Cửa một cánh, hộ gia đình", meaningEn: "Door / Household", pos: "tare", posName: "Rủ xuống (Tare)", examples: ["戻", "房", "所", "扇", "扉"], tip: "Cánh cửa gỗ đơn khép mở một gian phòng." },
    { num: 64, char: "手", variants: ["扌"], strokes: 4, hanViet: "THỦ", jaName: "て / てへん", romaji: "te / tehen", meaningVi: "Bàn tay, thao tác bằng tay", meaningEn: "Hand", pos: "hen", posName: "Bên trái (Hen)", examples: ["打", "持", "指", "払", "拾", "推", "技", "折", "抜", "操"], tip: "Rất nhiều chữ! Khi ghép bên trái thành Tay gảy (扌), biểu thị hành động cầm, nắm, bẻ, kéo." },
    { num: 65, char: "支", variants: [], strokes: 4, hanViet: "CHI", jaName: "しにょう", romaji: "shinyou", meaningVi: "Cành cây, chi nhánh, nâng đỡ", meaningEn: "Branch / Support", pos: "shin", posName: "Độc lập", examples: ["攴", "枝"], tip: "Bàn tay cầm cành cây chống đỡ." },
    { num: 66, char: "攴", variants: ["攵"], strokes: 4, hanViet: "PHỘC", jaName: "ぼくづくり / のぶん", romaji: "nobun", meaningVi: "Đánh nhẹ, gõ, kỷ luật, hành động", meaningEn: "Strike / Action", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["收", "改", "攻", "放", "政", "故", "敏", "救", "敗", "教", "数"], tip: "Tay cầm roi gõ nhẹ để răn dạy, thúc đẩy hành động thực hiện." },
    { num: 67, char: "文", variants: [], strokes: 4, hanViet: "VĂN", jaName: "ぶん / ぶんにょう", romaji: "bun", meaningVi: "Văn chương, nét chữ, hoa văn", meaningEn: "Literature / Pattern", pos: "shin", posName: "Độc lập", examples: ["斉", "斌", "斐"], tip: "Hình xăm hoa văn trên ngực hoặc nét chữ bay bổng." },
    { num: 68, char: "斗", variants: [], strokes: 4, hanViet: "ĐẨU", jaName: "ますづくり", romaji: "masuzukuri", meaningVi: "Cái đấu đong gạo, sao Bắc Đẩu", meaningEn: "Dipper / Measure", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["料", "斜", "斡"], tip: "Cái muỗng lớn cán dài để múc rượu hoặc đong lường." },
    { num: 69, char: "斤", variants: [], strokes: 4, hanViet: "CÂN", jaName: "おの / おのづくり", romaji: "ono", meaningVi: "Cái rìu sắt, đơn vị cân", meaningEn: "Axe / Weight", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["斥", "斧", "断", "斯", "新"], tip: "Chiếc rìu chặt cây tạo nên cái mới (Tân = Lập + Mộc + Cân)." },
    { num: 70, char: "方", variants: [], strokes: 4, hanViet: "PHƯƠNG", jaName: "ほう / ほうへん", romaji: "hou", meaningVi: "Phương hướng, phương pháp, vuông", meaningEn: "Direction / Square", pos: "hen", posName: "Bên trái (Hen)", examples: ["於", "施", "旅", "旋", "族", "旗"], tip: "Hai thuyền ghép song song rẽ sóng theo bốn phương trời." },
    { num: 71, char: "无", variants: ["旡"], strokes: 4, hanViet: "VÔ", jaName: "なし", romaji: "nashi", meaningVi: "Không có, trống rỗng", meaningEn: "Not / Without", pos: "shin", posName: "Độc lập", examples: ["既"], tip: "Hư không, không tồn tại." },
    { num: 72, char: "日", variants: [], strokes: 4, hanViet: "NHẬT", jaName: "ひ / ひへん", romaji: "hi / hihen", meaningVi: "Mặt trời, ban ngày, thời gian", meaningEn: "Sun / Day", pos: "hen", posName: "Bên trái (Hen)", examples: ["明", "時", "映", "春", "昨", "晩", "晴", "昼", "景", "暗"], tip: "Mặt trời rực sáng. Mọi chữ liên quan ánh sáng, thời gian, ngày giờ đều có bộ Nhật." },
    { num: 73, char: "曰", variants: [], strokes: 4, hanViet: "VIẾT", jaName: "ひらび", romaji: "hirabi", meaningVi: "Nói rằng, thốt lời", meaningEn: "Say", pos: "shin", posName: "Độc lập", examples: ["曲", "更", "書", "曹"], tip: "Cái miệng mở rộng phát ra âm thanh lời nói (thấp bè hơn Nhật)." },
    { num: 74, char: "月", variants: [], strokes: 4, hanViet: "NGUYỆT", jaName: "つき / つきへん", romaji: "tsuki", meaningVi: "Mặt trăng, tháng, hoặc cơ thể (Nhục)", meaningEn: "Moon / Month / Flesh", pos: "hen", posName: "Bên trái (Hen)", examples: ["朝", "期", "服", "望", "朗", "肌", "肝", "肢", "育", "肺"], tip: "Đặc biệt chú ý: Khi đứng bên trái chỉ các bộ phận cơ thể (nhục = thịt), khi chỉ thời gian là vầng trăng." },
    { num: 75, char: "木", variants: [], strokes: 4, hanViet: "MỘC", jaName: "き / きへん", romaji: "ki / kihen", meaningVi: "Cây cối, gỗ, thực vật thân gỗ", meaningEn: "Tree / Wood", pos: "hen", posName: "Bên trái (Hen)", examples: ["本", "林", "森", "校", "村", "根", "植", "板", "橋", "机"], tip: "Cây cối đâm chồi bén rễ. Mọi loại cây, gỗ, đồ mộc, bàn ghế đều có bộ này." },
    { num: 76, char: "欠", variants: [], strokes: 4, hanViet: "KHIẾM", jaName: "あくび", romaji: "akubi", meaningVi: "Ngáp, thiếu thốn, há miệng thở", meaningEn: "Lack / Yawn", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["次", "欣", "欲", "欺", "款", "歓"], tip: "Người há to miệng ngáp vì thiếu năng lượng." },
    { num: 77, char: "止", variants: [], strokes: 4, hanViet: "CHỈ", jaName: "とめる", romaji: "tomeru", meaningVi: "Dừng lại, đứng yên, đình chỉ", meaningEn: "Stop", pos: "shin", posName: "Độc lập", examples: ["正", "歩", "武", "歴", "歳"], tip: "Dấu chân in xuống đất đứng sững lại không đi tiếp." },
    { num: 78, char: "歹", variants: ["歺"], strokes: 4, hanViet: "ĐÃI", jaName: "かばねへん / いちた", romaji: "kabanehen", meaningVi: "Xương tàn, chết chóc, tan rã", meaningEn: "Death / Decay", pos: "hen", posName: "Bên trái (Hen)", examples: ["死", "残", "殉", "殊", "殖"], tip: "Khúc xương gãy tàn tích của sự chết chóc." },
    { num: 79, char: "殳", variants: [], strokes: 4, hanViet: "THÙ", jaName: "ほこづくり", romaji: "hokozukuri", meaningVi: "Binh khí gỗ, gậy gộc, đánh đập", meaningEn: "Weapon / Beat", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["段", "殷", "殺", "殿"], tip: "Tay cầm chiếc gậy gỗ đánh mạnh tạo nên tiếng động." },
    { num: 80, char: "毋", variants: ["母"], strokes: 4, hanViet: "VÔ / MẪU", jaName: "ははのかん", romaji: "hahanokan", meaningVi: "Đừng, chớ, hoặc người mẹ hiền", meaningEn: "Mother / Do not", pos: "shin", posName: "Độc lập", examples: ["毎", "毒"], tip: "Người mẹ với bầu sữa ngọt lành nuôi nấng đàn con." },
    { num: 81, char: "比", variants: [], strokes: 4, hanViet: "BỈ", jaName: "くらべる", romaji: "kuraberu", meaningVi: "So sánh, kề vai sát cánh", meaningEn: "Compare", pos: "shin", posName: "Độc lập", examples: ["皆", "批", "琵"], tip: "Hai người đứng sát vai nhau để đo chiều cao so bì." },
    { num: 82, char: "毛", variants: [], strokes: 4, hanViet: "MAO", jaName: "け", romaji: "ke", meaningVi: "Lông thú, sợi tóc, tơ mỏng", meaningEn: "Hair / Fur", pos: "shin", posName: "Độc lập", examples: ["毫", "毯", "氈"], tip: "Những sợi lông vũ mềm mại uốn lượn." },
    { num: 83, char: "氏", variants: [], strokes: 4, hanViet: "THỊ", jaName: "うじ", romaji: "uji", meaningVi: "Dòng họ, thị tộc, quý tộc", meaningEn: "Clan / Family", pos: "shin", posName: "Độc lập", examples: ["民", "氓"], tip: "Cây gậy gia huy cắm mốc định vị thị tộc." },
    { num: 84, char: "气", variants: [], strokes: 4, hanViet: "KHÍ", jaName: "きがまえ", romaji: "kigamae", meaningVi: "Không khí, khí trời, hơi nước", meaningEn: "Air / Steam", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["気", "氛", "氧", "氫"], tip: "Hơi nước bốc lên thành từng làn mây khói bồng bềnh." },
    { num: 85, char: "水", variants: ["氵", "氺"], strokes: 4, hanViet: "THỦY", jaName: "みず / さんずい", romaji: "mizu / sanzui", meaningVi: "Nước, sông ngòi, chất lỏng", meaningEn: "Water / Liquid", pos: "hen", posName: "Bên trái (Hen)", examples: ["海", "泳", "江", "河", "洗", "洋", "流", "深", "温", "波", "液"], tip: "Bộ thủ hàng đầu! Ba chấm thủy (氵) bên trái chỉ mọi sự vật liên quan đến sông hồ biển, bơi, giặt, ướt." },
    { num: 86, char: "火", variants: ["灬"], strokes: 4, hanViet: "HỎA", jaName: "ひ / れっか", romaji: "hi / rekka", meaningVi: "Ngọn lửa, sức nóng, nấu chín", meaningEn: "Fire / Heat", pos: "ashi", posName: "Ở dưới (Ashi)", examples: ["灯", "炎", "焼", "照", "熟", "熱", "黒", "点", "焦"], tip: "Ngọn lửa thiêu đốt. Ở đáy viết thành bốn chấm (灬) như bếp than hồng nấu chín thức ăn." },
    { num: 87, char: "爪", variants: ["爫"], strokes: 4, hanViet: "TRẢO", jaName: "つめ / そうにょう", romaji: "tsume", meaningVi: "Móng vuốt, bàn tay chụp lấy", meaningEn: "Claw / Talon", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["采", "受", "爰", "争"], tip: "Móng vuốt chim ưng quắp lấy con mồi từ trên cao." },
    { num: 88, char: "父", variants: [], strokes: 4, hanViet: "PHỤ", jaName: "ちち", romaji: "chichi", meaningVi: "Người cha, gia trưởng cầm gậy", meaningEn: "Father", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["斧", "爸"], tip: "Bàn tay người cha nắm chặt cây quyền trượng bảo bọc đàn con." },
    { num: 89, char: "爻", variants: [], strokes: 4, hanViet: "HÀO", jaName: "こう", romaji: "kou", meaningVi: "Giao thoa, hào trong Kinh Dịch", meaningEn: "Cross / Trigram line", pos: "shin", posName: "Độc lập", examples: ["爽", "爾"], tip: "Hai thanh tre đan chéo bói toán âm dương biến dịch." },
    { num: 90, char: "爿", variants: ["丬"], strokes: 4, hanViet: "TƯỜNG", jaName: "しょうへん", romaji: "shouhen", meaningVi: "Tấm ván gỗ, chiếc giường", meaningEn: "Split wood / Bed", pos: "hen", posName: "Bên trái (Hen)", examples: ["牀", "牆"], tip: "Nửa thân cây gỗ xẻ dọc thành tấm ván giường nằm." },
    { num: 91, char: "片", variants: [], strokes: 4, hanViet: "PHIẾN", jaName: "かた / かたへん", romaji: "kata", meaningVi: "Mảnh mỏng, phiến đá, lát cắt", meaningEn: "Slice / Fragment", pos: "hen", posName: "Bên trái (Hen)", examples: ["版", "牌", "牒"], tip: "Nửa bên phải của thân cây gỗ xẻ mỏng như danh thiếp." },
    { num: 92, char: "牙", variants: [], strokes: 4, hanViet: "NHA", jaName: "きば / きばへん", romaji: "kiba", meaningVi: "Răng nanh, ngà voi sắc nhọn", meaningEn: "Fang / Tooth", pos: "hen", posName: "Bên trái (Hen)", examples: ["邪", "雅"], tip: "Chiếc răng nanh thú đan cài vào nhau." },
    { num: 93, char: "牛", variants: ["牜"], strokes: 4, hanViet: "NGƯU", jaName: "うし / うしへん", romaji: "ushi", meaningVi: "Con trâu, con bò, súc vật", meaningEn: "Cow / Bull", pos: "hen", posName: "Bên trái (Hen)", examples: ["牝", "牧", "物", "特", "犠", "牲"], tip: "Đầu con trâu với hai sừng cong vút và đôi tai vểnh." },
    { num: 94, char: "犬", variants: ["犭"], strokes: 4, hanViet: "KHUYỂN", jaName: "いぬ / けものへん", romaji: "inu / kemonohen", meaningVi: "Con chó, dã thú bốn chân", meaningEn: "Dog / Beast", pos: "hen", posName: "Bên trái (Hen)", examples: ["犯", "狂", "狙", "狛", "狩", "独", "狭", "猛", "獲"], tip: "Đứng bên trái thành Khuyển dạt (犭). Hầu như mọi dã thú hung dữ, săn bắn đều mang bộ này." },
    { num: 95, char: "玄", variants: [], strokes: 5, hanViet: "HUYỀN", jaName: "げん", romaji: "gen", meaningVi: "Màu đen huyền bí, sâu xa", meaningEn: "Dark / Mysterious", pos: "shin", posName: "Độc lập", examples: ["率"], tip: "Sợi tơ nhuộm sắc đen tuyền huyền bí." },
    { num: 96, char: "玉", variants: ["王"], strokes: 5, hanViet: "NGỌC / VƯƠNG", jaName: "たま / おうへん", romaji: "tama / ouhen", meaningVi: "Viên ngọc quý, vua chúa", meaningEn: "Jade / King", pos: "hen", posName: "Bên trái (Hen)", examples: ["玩", "珍", "珠", "理", "球", "望", "現", "環"], tip: "Ba miếng ngọc xâu qua một sợi dây chỉ. Khi đứng bên trái viết giống chữ Vương (王)." },
    { num: 97, char: "瓜", variants: [], strokes: 5, hanViet: "QUA", jaName: "うり", romaji: "uri", meaningVi: "Quả dưa, bầu bí dây leo", meaningEn: "Melon / Gourd", pos: "shin", posName: "Độc lập", examples: ["瓢", "瓣"], tip: "Dây leo trĩu nặng quả dưa tròn ở giữa." },
    { num: 98, char: "瓦", variants: [], strokes: 5, hanViet: "NGOẠC", jaName: "かわら", romaji: "kawara", meaningVi: "Ngói nung, gốm sứ đất sét", meaningEn: "Tile / Earthenware", pos: "shin", posName: "Độc lập", examples: ["瓶", "甕"], tip: "Viên ngói lợp mái nhà nung qua lò lửa đỏ." },
    { num: 99, char: "甘", variants: [], strokes: 5, hanViet: "CAM", jaName: "あまい", romaji: "amai", meaningVi: "Vị ngọt ngào, cam tâm", meaningEn: "Sweet", pos: "shin", posName: "Độc lập", examples: ["甚", "甜"], tip: "Cái miệng đang ngậm một viên kẹo ngọt lịm." },
    { num: 100, char: "生", variants: [], strokes: 5, hanViet: "SINH", jaName: "いきる / うまれる", romaji: "ikiru", meaningVi: "Sinh sôi, nảy nở, cuộc sống", meaningEn: "Life / Birth", pos: "shin", posName: "Độc lập", examples: ["産", "甥"], tip: "Mầm cây non vừa trỗi dậy tràn đầy nhựa sống." },
    { num: 101, char: "用", variants: [], strokes: 5, hanViet: "DỤNG", jaName: "もちいる", romaji: "mochiiru", meaningVi: "Sử dụng, ứng dụng, tác dụng", meaningEn: "Use", pos: "shin", posName: "Độc lập", examples: ["甫", "甬"], tip: "Cái xô cái chậu được đem ra dùng hữu ích." },
    { num: 102, char: "田", variants: [], strokes: 5, hanViet: "ĐIỀN", jaName: "た / たへん", romaji: "ta", meaningVi: "Ruộng lúa, ô vuông bờ cõi", meaningEn: "Rice field", pos: "hen", posName: "Bên trái (Hen)", examples: ["町", "画", "男", "界", "留", "略", "番", "畜"], tip: "Thửa ruộng bốn ô vuông thẳng tắp bờ đê." },
    { num: 103, char: "疋", variants: ["⽦"], strokes: 5, hanViet: "THẤT", jaName: "ひき / ひきへん", romaji: "hiki", meaningVi: "Cuộn vải, cẳng chân bước", meaningEn: "Bolt of cloth / Foot", pos: "shin", posName: "Độc lập", examples: ["疎", "疑"], tip: "Cẳng chân bước đi hoặc sấp vải cuộn tròn." },
    { num: 104, char: "疒", variants: [], strokes: 5, hanViet: "NẠCH", jaName: "やまいだれ", romaji: "yamaidare", meaningVi: "Bệnh tật, ốm đau, đau đớn", meaningEn: "Sickness", pos: "tare", posName: "Rủ xuống (Tare)", examples: ["病", "痛", "疲", "疾", "症", "疫", "療", "痴"], tip: "Cực kỳ dễ nhớ! Mọi chữ chỉ bệnh hoạn, mệt mỏi, đau đớn, điều trị đều mang Nạch." },
    { num: 105, char: "癶", variants: [], strokes: 5, hanViet: "BÁT", jaName: "はつがしら", romaji: "hatsugashira", meaningVi: "Hai chân giẫm bước ngược chiều", meaningEn: "Footsteps", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["発", "登"], tip: "Hai bàn chân giẫm lên đất mở màn bước khởi hành." },
    { num: 106, char: "白", variants: [], strokes: 5, hanViet: "BẠCH", jaName: "しろ / しろへん", romaji: "shiro", meaningVi: "Màu trắng, trong sáng, minh bạch", meaningEn: "White", pos: "hen", posName: "Bên trái (Hen)", examples: ["的", "皆", "皇", "皎"], tip: "Ánh sáng mặt trời chiếu rọi tia sáng trắng muốt." },
    { num: 107, char: "皮", variants: [], strokes: 5, hanViet: "BÌ", jaName: "けがわ", romaji: "kegawa", meaningVi: "Lớp da, vỏ bọc ngoài", meaningEn: "Skin / Hide", pos: "shin", posName: "Độc lập", examples: ["破", "彼", "波"], tip: "Bàn tay đang lột tấm da thú phơi khô." },
    { num: 108, char: "皿", variants: [], strokes: 5, hanViet: "MÃNH", jaName: "さら", romaji: "sara", meaningVi: "Bát đĩa, chén đựng thức ăn", meaningEn: "Dish / Plate", pos: "ashi", posName: "Ở dưới (Ashi)", examples: ["盆", "益", "盛", "盗", "盟"], tip: "Chiếc đĩa sâu lòng đựng hoa quả thức ăn thơm ngon." },
    { num: 109, char: "目", variants: ["⺫"], strokes: 5, hanViet: "MỤC", jaName: "め / めへん", romaji: "me", meaningVi: "Con mắt, nhìn ngắm, thị lực", meaningEn: "Eye", pos: "hen", posName: "Bên trái (Hen)", examples: ["見", "直", "相", "看", "省", "眠", "眼", "着"], tip: "Con mắt mở to nhìn thẳng. Liên quan đến nhìn, ngắm, chớp mắt, ngủ nghê." },
    { num: 110, char: "矛", variants: [], strokes: 5, hanViet: "MÂU", jaName: "ほこ / ほこへん", romaji: "hoko", meaningVi: "Cây giáo mâu sắc nhọn", meaningEn: "Spear", pos: "hen", posName: "Bên trái (Hen)", examples: ["矜", "柔"], tip: "Ngọn mâu dài đâm thủng chiếc khiên (trong Mâu Thuẫn)." },
    { num: 111, char: "矢", variants: [], strokes: 5, hanViet: "THỈ", jaName: "や / やへん", romaji: "ya", meaningVi: "Mũi tên bắn thẳng", meaningEn: "Arrow", pos: "hen", posName: "Bên trái (Hen)", examples: ["知", "矩", "短", "矯"], tip: "Mũi tên vút bay thẳng tắp tới hồng tâm." },
    { num: 112, char: "石", variants: [], strokes: 5, hanViet: "THẠCH", jaName: "いし / いしへん", romaji: "ishi", meaningVi: "Hòn đá, quặng đá cứng rắn", meaningEn: "Stone", pos: "hen", posName: "Bên trái (Hen)", examples: ["砂", "研", "破", "確", "磁", "磨", "礎"], tip: "Tảng đá rơi xuống từ sườn núi cao. Chữ mang Thạch đều chỉ đá, cát, mài dũa, cứng rắn." },
    { num: 113, char: "示", variants: ["礻"], strokes: 5, hanViet: "THỊ / KỲ", jaName: "しめす / しめすへん", romaji: "shimesu", meaningVi: "Thần linh, cúng tế, hiển thị", meaningEn: "Spirit / Show", pos: "hen", posName: "Bên trái (Hen)", examples: ["礼", "社", "祈", "祝", "神", "祥", "票", "禁", "福"], tip: "Bàn thờ cúng tế thần linh. Ghép bên trái thành (礻), chỉ mọi sự linh thiêng, lễ bái, chúc phúc." },
    { num: 114, char: "禸", variants: [], strokes: 5, hanViet: "NHỰU", jaName: "ぐうのあし", romaji: "guunoashi", meaningVi: "Vết chân thú hoang", meaningEn: "Track / Footprint", pos: "ashi", posName: "Ở dưới (Ashi)", examples: ["禹", "離"], tip: "Dấu chân thú in trên nền đất rừng." },
    { num: 115, char: "禾", variants: [], strokes: 5, hanViet: "HÒA", jaName: "のぎ / のぎへん", romaji: "nogi", meaningVi: "Cây lúa trĩu hạt, ngũ cốc", meaningEn: "Grain / Rice plant", pos: "hen", posName: "Bên trái (Hen)", examples: ["私", "秋", "科", "秒", "移", "程", "税", "種", "積", "稲"], tip: "Bông lúa mì trĩu hạt uốn cong đầu. Liên quan đến mùa màng, thu hoạch, hạt giống, thóc thuế." },
    { num: 116, char: "穴", variants: [], strokes: 5, hanViet: "HUYỆT", jaName: "あな / あなかんむり", romaji: "ana", meaningVi: "Hang động, hầm ngầm, lỗ thủng", meaningEn: "Cave / Hole", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["究", "空", "突", "窓", "窒", "窮"], tip: "Mái che của một hang đá sâu hun hút." },
    { num: 117, char: "立", variants: [], strokes: 5, hanViet: "LẬP", jaName: "たつ / たつへん", romaji: "tatsu", meaningVi: "Đứng thẳng, độc lập, dựng xây", meaningEn: "Stand", pos: "hen", posName: "Bên trái (Hen)", examples: ["音", "竜", "産", "章", "童", "端", "競"], tip: "Người đứng thẳng vững chãi hai chân trên mặt đất." },

    // 6 Strokes (118 - 146)
    { num: 118, char: "竹", variants: ["⺮"], strokes: 6, hanViet: "TRÚC", jaName: "たけ / たけかんむり", romaji: "take", meaningVi: "Cây tre, ống nứa, thẻ tre", meaningEn: "Bamboo", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["竿", "笑", "笛", "第", "等", "筋", "答", "策", "節", "簡"], tip: "Hai nhánh lá tre rủ xuống. Đồ đạc đan bằng tre, thẻ sách thời xưa đều mang Trúc đầu (⺮)." },
    { num: 119, char: "米", variants: [], strokes: 6, hanViet: "MỄ", jaName: "こめ / こめへん", romaji: "kome", meaningVi: "Hạt gạo, cơm, lương thực", meaningEn: "Rice", pos: "hen", posName: "Bên trái (Hen)", examples: ["料", "粉", "粒", "粗", "粘", "粧", "精", "糖", "糧"], tip: "Bốn hạt gạo bung nở từ tâm. Chỉ lương thực, bột ngũ cốc, tinh khiết." },
    { num: 120, char: "糸", variants: ["糹"], strokes: 6, hanViet: "MỊCH", jaName: "いと / いとへん", romaji: "ito / itohen", meaningVi: "Sợi tơ, dây, kết nối, dệt vải", meaningEn: "Thread / String", pos: "hen", posName: "Bên trái (Hen)", examples: ["約", "組", "終", "級", "線", "結", "続", "練", "編", "総"], tip: "Cuộn tơ tằm mềm mại. Dùng trong các chữ chỉ sự ràng buộc, dây nối, kết thúc, dệt." },
    { num: 121, char: "缶", variants: [], strokes: 6, hanViet: "PHẪU", jaName: "ほとぎ", romaji: "hotogi", meaningVi: "Đồ sành, vò đất, lon hộp", meaningEn: "Jar / Can", pos: "shin", posName: "Độc lập", examples: ["陶", "缸"], tip: "Chiếc bình đất nung đựng rượu quý." },
    { num: 122, char: "网", variants: ["罒", "⺲"], strokes: 6, hanViet: "VÕNG", jaName: "あみがしら", romaji: "amigashira", meaningVi: "Tấm lưới đánh cá, giăng bẫy", meaningEn: "Net", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["買", "罪", "置", "署", "罰"], tip: "Tấm lưới bủa vây gom gọn tôm cá hoặc tóm kẻ phạm tội." },
    { num: 123, char: "羊", variants: ["⺶"], strokes: 6, hanViet: "DƯƠNG", jaName: "ひつじ / ひつじへん", romaji: "hitsuji", meaningVi: "Con cừu, con dê, tốt lành", meaningEn: "Sheep / Good", pos: "hen", posName: "Bên trái (Hen)", examples: ["美", "着", "群", "義", "羨"], tip: "Đầu con cừu với hai sừng uốn đẹp đẽ tượng trưng cái Đẹp (Mỹ = Dương + Đại)." },
    { num: 124, char: "羽", variants: [], strokes: 6, hanViet: "VŨ", jaName: "はね", romaji: "hane", meaningVi: "Lông vũ, cánh chim bay lượn", meaningEn: "Feather / Wing", pos: "shin", posName: "Độc lập", examples: ["翁", "習", "翌", "翼"], tip: "Hai chiếc cánh chim với những sợi lông vũ xòe rộng tập bay." },
    { num: 125, char: "老", variants: ["耂"], strokes: 6, hanViet: "LÃO", jaName: "おい / おいかんむり", romaji: "oi", meaningVi: "Người già, trưởng thượng, sống lâu", meaningEn: "Old", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["考", "者", "耆"], tip: "Cụ già lưng còng tóc bạc chống gậy bước đi thong dong." },
    { num: 126, char: "而", variants: [], strokes: 6, hanViet: "NHI", jaName: "しかして", romaji: "shikashite", meaningVi: "Râu cằm, mà, lại nữa", meaningEn: "Beard / And yet", pos: "shin", posName: "Độc lập", examples: ["耐", "耍"], tip: "Chòm râu buông rủ dưới cằm." },
    { num: 127, char: "耒", variants: [], strokes: 6, hanViet: "LỖI", jaName: "らいすき", romaji: "raisuki", meaningVi: "Cái cày, bừa làm đất ruộng", meaningEn: "Plow", pos: "hen", posName: "Bên trái (Hen)", examples: ["耕", "耗", "耦"], tip: "Lưỡi cày bằng gỗ thô xới tơi từng luống đất." },
    { num: 128, char: "耳", variants: [], strokes: 6, hanViet: "NHĨ", jaName: "みみ / みみへん", romaji: "mimi", meaningVi: "Vành tai, lắng nghe âm thanh", meaningEn: "Ear", pos: "hen", posName: "Bên trái (Hen)", examples: ["耶", "恥", "耽", "聖", "聞", "職"], tip: "Vành tai lắng nghe tiếng nói khắp bốn phương." },
    { num: 129, char: "聿", variants: ["⺻"], strokes: 6, hanViet: "DUẬT", jaName: "ふでづくり", romaji: "fudezukuri", meaningVi: "Cây bút lông, ghi chép sách vở", meaningEn: "Brush / Write", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["建", "粛", "書", "肇"], tip: "Bàn tay cầm thẳng cây bút lông chấm mực viết chữ." },
    { num: 130, char: "肉", variants: ["⺼"], strokes: 6, hanViet: "NHỤC", jaName: "にく / にくづき", romaji: "nikuzuki", meaningVi: "Thịt, cơ bắp, bộ phận cơ thể", meaningEn: "Meat / Flesh", pos: "hen", posName: "Bên trái (Hen)", examples: ["肥", "肩", "背", "胸", "能", "脱", "脳", "腕", "腰", "腹"], tip: "Khi ghép bên trái viết giống hệt bộ Nguyệt (月), gọi là Nhục Nguyệt, chi phối toàn bộ cơ quan giải phẫu người." },
    { num: 131, char: "臣", variants: [], strokes: 6, hanViet: "THẦN", jaName: "しん", romaji: "shin", meaningVi: "Bầy tôi, quan thần trung nghĩa", meaningEn: "Minister / Official", pos: "shin", posName: "Độc lập", examples: ["臥", "臨", "蔵"], tip: "Mắt người bề tôi cúi đầu cung kính trước đức vua." },
    { num: 132, char: "自", variants: [], strokes: 6, hanViet: "TỰ", jaName: "みずから", romaji: "mizukara", meaningVi: "Tự mình, xuất phát, chiếc mũi", meaningEn: "Oneself / Nose", pos: "shin", posName: "Độc lập", examples: ["臭"], tip: "Ngón tay chỉ vào mũi mình để biểu thị 'chính tôi'." },
    { num: 133, char: "至", variants: [], strokes: 6, hanViet: "CHÍ", jaName: "いたる", romaji: "itaru", meaningVi: "Đến nơi, cực điểm, tối cao", meaningEn: "Arrive / Extreme", pos: "shin", posName: "Độc lập", examples: ["致", "到"], tip: "Mũi tên bay cắm ngập vào đích đến." },
    { num: 134, char: "臼", variants: [], strokes: 6, hanViet: "CỮU", jaName: "うす", romaji: "usu", meaningVi: "Cái cối đá giã gạo", meaningEn: "Mortar", pos: "shin", posName: "Độc lập", examples: ["毀", "舅", "興"], tip: "Lòng chiếc cối đá gồ ghề nghiền nát hạt gạo nếp." },
    { num: 135, char: "舌", variants: [], strokes: 6, hanViet: "THIỆT", jaName: "した", romaji: "shita", meaningVi: "Cái lưỡi, nếm vị, ăn nói", meaningEn: "Tongue", pos: "hen", posName: "Bên trái (Hen)", examples: ["乱", "辞", "舗"], tip: "Chiếc lưỡi thè ra khỏi vòm họng nếm vị ngọt cay." },
    { num: 136, char: "舛", variants: [], strokes: 6, hanViet: "SẬY", jaName: "まいあし", romaji: "maiashi", meaningVi: "Sai lệch, ngược chiều giẫm đạp", meaningEn: "Oppose / Flawed", pos: "shin", posName: "Độc lập", examples: ["舜", "舞"], tip: "Hai bàn chân bước chéo nhịp nhảy múa." },
    { num: 137, char: "舟", variants: [], strokes: 6, hanViet: "CHU", jaName: "ふね / ふねへん", romaji: "fune", meaningVi: "Thuyền buồm, bè trôi sông", meaningEn: "Boat / Ship", pos: "hen", posName: "Bên trái (Hen)", examples: ["航", "般", "船", "艇", "艦"], tip: "Chiếc thuyền nan độc mộc rẽ sóng trôi trên dòng nước." },
    { num: 138, char: "艮", variants: [], strokes: 6, hanViet: "CẤN", jaName: "うしとら / ごん", romaji: "ushitora", meaningVi: "Dừng lại, quẻ Cấn biểu tượng núi", meaningEn: "Stopping / Mountain", pos: "shin", posName: "Độc lập", examples: ["良", "艱"], tip: "Mắt ngoảnh đầu nhìn lại rồi dừng chân." },
    { num: 139, char: "色", variants: [], strokes: 6, hanViet: "SẮC", jaName: "いろ", romaji: "iro", meaningVi: "Màu sắc, sắc đẹp, vẻ mặt", meaningEn: "Color / Beauty", pos: "shin", posName: "Độc lập", examples: ["艶"], tip: "Sắc mặt biểu lộ tình cảm con người." },
    { num: 140, char: "艸", variants: ["艹"], strokes: 6, hanViet: "THẢO", jaName: "くさ / くさかんむり", romaji: "kusa / kusakanmuri", meaningVi: "Cỏ cây, thảo mộc, hoa lá", meaningEn: "Grass / Plant", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["花", "草", "茶", "苦", "若", "英", "荷", "薬", "落", "葉"], tip: "Bộ hoa cỏ cực kỳ phổ biến! Nằm ở đầu (艹), chi phối mọi loài thực vật, hoa, rau, dược liệu." },
    { num: 141, char: "虍", variants: [], strokes: 6, hanViet: "HỔ", jaName: "とらかんむり", romaji: "torakanmuri", meaningVi: "Vằn lông hổ, chúa sơn lâm", meaningEn: "Tiger stripes", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["虎", "虐", "虚", "虜"], tip: "Đầu và lớp lông vằn dũng mãnh của hổ dữ chốn rừng sâu." },
    { num: 142, char: "虫", variants: [], strokes: 6, hanViet: "TRÙNG", jaName: "むし / むしへん", romaji: "mushi", meaningVi: "Côn trùng, sâu bọ, rắn rết", meaningEn: "Insect / Bug", pos: "hen", posName: "Bên trái (Hen)", examples: ["蚊", "蚕", "蛇", "蛍", "蝶", "融", "蜜"], tip: "Hình con sâu uốn khúc bò trườn. Mọi loài côn trùng, bò sát, mật ong đều mang bộ này." },
    { num: 143, char: "血", variants: [], strokes: 6, hanViet: "HUYẾT", jaName: "ち", romaji: "chi", meaningVi: "Giọt máu tươi, dòng huyết mạch", meaningEn: "Blood", pos: "shin", posName: "Độc lập", examples: ["衆"], tip: "Chén tế thần hứng trọn từng giọt máu tế lễ." },
    { num: 144, char: "行", variants: [], strokes: 6, hanViet: "HÀNH", jaName: "ぎょう / ゆきがまえ", romaji: "gyou / yukigamae", meaningVi: "Đi lại, tiến hành, ngã tư phố", meaningEn: "Go / Conduct", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["術", "街", "衛", "衝"], tip: "Ngã tư đường phố tấp nập người xe qua lại." },
    { num: 145, char: "衣", variants: ["衤"], strokes: 6, hanViet: "Y", jaName: "ころも / ころもへん", romaji: "koromo / koromohen", meaningVi: "Áo quần, y phục, vải che", meaningEn: "Clothes", pos: "hen", posName: "Bên trái (Hen)", examples: ["初", "表", "被", "裂", "装", "裕", "補", "裸", "複"], tip: "Tà áo choàng khoác lên người. Khi ghép bên trái thành Y gập (衤), khác với Thị (礻 một chấm)." },
    { num: 146, char: "襾", variants: ["西", "覀"], strokes: 6, hanViet: "Á / TÂY", jaName: "おおいかんむり", romaji: "ooikanmuri", meaningVi: "Úp đậy, bao bọc, hướng tây", meaningEn: "Cover / West", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["要", "覆", "覇"], tip: "Tấm phên đậy kín chiếc bồ chứa thóc." },

    // 7 Strokes (147 - 166)
    { num: 147, char: "見", variants: [], strokes: 7, hanViet: "KIẾN", jaName: "みる", romaji: "miru", meaningVi: "Nhìn thấy, trông nom, kiến giải", meaningEn: "See", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["規", "視", "覚", "親", "観"], tip: "Con mắt Mục (目) đặt trên đôi chân Nhi (儿) ngước nhìn ra xa." },
    { num: 148, char: "角", variants: [], strokes: 7, hanViet: "GIÁC", jaName: "つの / つのへん", romaji: "tsuno", meaningVi: "Sừng thú, góc nhọn, ganh đua", meaningEn: "Horn / Angle", pos: "hen", posName: "Bên trái (Hen)", examples: ["触", "解", "觴"], tip: "Chiếc sừng hươu sắc bén mọc trên trán thú." },
    { num: 149, char: "言", variants: ["訁"], strokes: 7, hanViet: "NGÔN", jaName: "ことば / ごんべん", romaji: "kotoba / gonben", meaningVi: "Lời nói, ngôn ngữ, chuyện trò", meaningEn: "Speech / Word", pos: "hen", posName: "Bên trái (Hen)", examples: ["語", "話", "読", "訳", "計", "記", "調", "試", "謝", "論"], tip: "Cực kỳ nhiều chữ! Miệng thốt ra lời nói. Mọi chữ liên quan ngôn ngữ, học tập, dịch thuật mang Ngôn." },
    { num: 150, char: "谷", variants: [], strokes: 7, hanViet: "CỐC", jaName: "たに / たにへん", romaji: "tani", meaningVi: "Thung lũng, khe núi sâu", meaningEn: "Valley", pos: "hen", posName: "Bên trái (Hen)", examples: ["豁", "谿"], tip: "Dòng suối chảy tuôn ra từ lòng hang núi sâu." },
    { num: 151, char: "豆", variants: [], strokes: 7, hanViet: "ĐẬU", jaName: "まめ / まめへん", romaji: "mame", meaningVi: "Hạt đậu, đĩa đựng thịt cúng", meaningEn: "Bean / Vessel", pos: "hen", posName: "Bên trái (Hen)", examples: ["豊", "頭", "豌"], tip: "Chiếc chén chân cao đựng hạt đậu tế thần." },
    { num: 152, char: "豕", variants: [], strokes: 7, hanViet: "THỈ", jaName: "いのこ", romaji: "inoko", meaningVi: "Con lợn, con heo béo tốt", meaningEn: "Pig", pos: "hen", posName: "Bên trái (Hen)", examples: ["象", "豪", "豚"], tip: "Hình con heo béo với bốn chân ngắn và chiếc đuôi ngoe nguẩy." },
    { num: 153, char: "豸", variants: [], strokes: 7, hanViet: "TRĨ", jaName: "むじなへん", romaji: "mujinahen", meaningVi: "Loài thú săn mồi không chân, sâu dài", meaningEn: "Badger / Beast", pos: "hen", posName: "Bên trái (Hen)", examples: ["豹", "猫"], tip: "Con thú uốn mình rình bắt mồi thoăn thoắt." },
    { num: 154, char: "貝", variants: [], strokes: 7, hanViet: "BỐI", jaName: "かい / かいへん", romaji: "kai", meaningVi: "Vỏ sò tiền tệ, của cải, buôn bán", meaningEn: "Shell / Money", pos: "hen", posName: "Bên trái (Hen)", examples: ["財", "貧", "販", "責", "買", "貸", "貴", "費", "賀", "資", "賞"], tip: "Thời cổ dùng vỏ sò quý làm tiền tệ. Mọi chữ tiền tài, nghèo giàu, mua bán, học phí đều có Bối." },
    { num: 155, char: "赤", variants: [], strokes: 7, hanViet: "XÍCH", jaName: "あか / あかへん", romaji: "aka", meaningVi: "Màu đỏ thắm, trần trụi thuần khiết", meaningEn: "Red", pos: "shin", posName: "Độc lập", examples: ["赦", "赫"], tip: "Ngọn lửa nung đất tạo màu đỏ rực rỡ." },
    { num: 156, char: "走", variants: ["赱"], strokes: 7, hanViet: "TẨU", jaName: "はしる / そうにょう", romaji: "hashiru", meaningVi: "Chạy nhanh, tẩu thoát", meaningEn: "Run", pos: "nyou", posName: "Bao dưới (Nyou)", examples: ["赴", "起", "越", "超", "趣"], tip: "Người vung hai tay sải chân chạy như bay." },
    { num: 157, char: "足", variants: ["𧾷"], strokes: 7, hanViet: "TÚC", jaName: "あし / あしへん", romaji: "ashi", meaningVi: "Bàn chân, bước đi, đầy đủ", meaningEn: "Foot / Leg", pos: "hen", posName: "Bên trái (Hen)", examples: ["距", "跡", "跳", "路", "踊", "踏"], tip: "Cẳng chân và bàn chân dẫm xuống đất. Liên quan đến đá, nhảy, dấu vết, dẫm đạp." },
    { num: 158, char: "身", variants: [], strokes: 7, hanViet: "THÂN", jaName: "み / みへん", romaji: "mi", meaningVi: "Thân thể, vóc dáng con người", meaningEn: "Body", pos: "hen", posName: "Bên trái (Hen)", examples: ["射", "躯", "躾"], tip: "Thân người phụ nữ mang bầu vươn về phía trước." },
    { num: 159, char: "車", variants: [], strokes: 7, hanViet: "XA", jaName: "くるま / くるまへん", romaji: "kuruma", meaningVi: "Xe cộ, bánh xe lăn, vận tải", meaningEn: "Cart / Car", pos: "hen", posName: "Bên trái (Hen)", examples: ["軌", "軍", "軟", "転", "軸", "輪", "輸"], tip: "Chiếc xe ngựa thời xưa nhìn từ trên cao với hai bánh xe và thùng xe." },
    { num: 160, char: "辛", variants: [], strokes: 7, hanViet: "TÂN", jaName: "からい", romaji: "karai", meaningVi: "Vị cay đắng, vất vả, gian nan", meaningEn: "Spicy / Bitter", pos: "shin", posName: "Độc lập", examples: ["辜", "辟", "辣"], tip: "Chiếc kim xăm hình lên trán tội nhân thời xưa gây đau xót cay đắng." },
    { num: 161, char: "辰", variants: [], strokes: 7, hanViet: "THẦN", jaName: "しんのたつ", romaji: "shinnotatsu", meaningVi: "Sao Thần, thì giờ, rồng", meaningEn: "Dragon / Morning", pos: "shin", posName: "Độc lập", examples: ["辱", "農"], tip: "Lưỡi cuốc làm ruộng lúc rạng đông sớm mai." },
    { num: 162, char: "辵", variants: ["辶"], strokes: 7, hanViet: "XƯỚC", jaName: "しんにょう", romaji: "shinnyou", meaningVi: "Bước đi trên đường, tiến thoái", meaningEn: "Walk / Advance", pos: "nyou", posName: "Bao dưới (Nyou)", examples: ["道", "通", "進", "近", "遠", "速", "送", "運", "達", "選"], tip: "Cực kỳ thông dụng! Viết thành Quai Xước (辶), chỉ mọi sự di chuyển trên đường bộ, vận tải, đưa tiễn." },
    { num: 163, char: "邑", variants: ["阝"], strokes: 7, hanViet: "ẤP", jaName: "おおざと", romaji: "oozato", meaningVi: "Làng mạc, thôn ấp, thành lũy (bên phải)", meaningEn: "Town / Village", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["那", "邦", "邸", "郊", "郡", "部", "郭", "都"], tip: "Chú ý: Khi đứng BÊN PHẢI (阝) là bộ Ấp (Oozato), chỉ làng mạc, đất nước, thủ đô." },
    { num: 164, char: "酉", variants: [], strokes: 7, hanViet: "DẬU", jaName: "とりへん / ひよみのとり", romaji: "torihen", meaningVi: "Hũ rượu, lên men, chi Dậu", meaningEn: "Wine jar / Sake", pos: "hen", posName: "Bên trái (Hen)", examples: ["酌", "配", "酒", "酔", "酢", "酪", "酬", "酵", "酷"], tip: "Chiếc bình gốm ủ rượu quý lên men. Mọi chữ liên quan rượu, cồn, giấm, men bia đều có Dậu." },
    { num: 165, char: "釆", variants: [], strokes: 7, hanViet: "BIỆN", jaName: "のごめ", romaji: "nogome", meaningVi: "Phân biệt, móng vuốt thú in dấu", meaningEn: "Distinguish", pos: "shin", posName: "Độc lập", examples: ["釈"], tip: "Bàn tay phân tách từng hạt ngũ cốc." },
    { num: 166, char: "里", variants: [], strokes: 7, hanViet: "LÝ", jaName: "さと / さとへん", romaji: "sato", meaningVi: "Làng xóm, dặm đường dài", meaningEn: "Village / Mile", pos: "hen", posName: "Bên trái (Hen)", examples: ["重", "野", "量", "金"], tip: "Thửa ruộng (Điền) trên mảnh đất (Thổ) hình thành nên làng mạc bình yên." },

    // 8 Strokes (167 - 175)
    { num: 167, char: "金", variants: ["釒"], strokes: 8, hanViet: "KIM", jaName: "かね / かねへん", romaji: "kane / kanehen", meaningVi: "Kim loại, vàng bạc, chuông sắt", meaningEn: "Metal / Gold", pos: "hen", posName: "Bên trái (Hen)", examples: ["銀", "鉄", "銅", "針", "鋭", "鉱", "鋼", "銭", "録", "鑑"], tip: "Vàng bạc kim loại đúc trong lò đất. Mọi thứ làm bằng sắt, đồng, kẽm, bạc, kim loại đều có Kim." },
    { num: 168, char: "長", variants: ["镸"], strokes: 8, hanViet: "TRƯỜNG", jaName: "ながい", romaji: "nagai", meaningVi: "Dài rộng, người lớn tuổi, trưởng bối", meaningEn: "Long / Leader", pos: "shin", posName: "Độc lập", examples: ["肆"], tip: "Cụ già mái tóc dài buông rủ." },
    { num: 169, char: "門", variants: ["门"], strokes: 8, hanViet: "MÔN", jaName: "もん / もんがまえ", romaji: "mon / mongamae", meaningVi: "Hai cánh cửa lớn, cổng ngõ", meaningEn: "Gate / Door", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["閉", "開", "間", "関", "問", "聞", "防", "閣"], tip: "Hai cánh cửa thành đóng mở. Chữ mang Môn vây quanh như phòng ốc, hỏi han, nghe ngóng." },
    { num: 170, char: "阜", variants: ["阝"], strokes: 8, hanViet: "PHỤ", jaName: "こざとへん", romaji: "kozatohen", meaningVi: "Gò đất cao, bờ đê dốc (bên trái)", meaningEn: "Mound / Hill", pos: "hen", posName: "Bên trái (Hen)", examples: ["阪", "防", "阻", "阿", "附", "降", "限", "院", "陸", "陰", "陽"], tip: "Chú ý: Khi đứng BÊN TRÁI (阝) là bộ Phụ (Kozatohen), chỉ gò đất, đồi dốc, viện, ngăn chặn." },
    { num: 171, char: "隶", variants: [], strokes: 8, hanViet: "ĐÃI", jaName: "れいづくり", romaji: "reizukuri", meaningVi: "Bắt kịp, theo hầu, nô lệ", meaningEn: "Slave / Follow", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["隷"], tip: "Bàn tay túm lấy vạt áo kẻ theo hầu." },
    { num: 172, char: "隹", variants: [], strokes: 8, hanViet: "CHUY", jaName: "ふるとり", romaji: "furutori", meaningVi: "Loài chim đuôi ngắn, chim sẻ", meaningEn: "Short-tailed bird", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["隻", "雀", "雁", "雄", "雅", "集", "雇", "雑", "難"], tip: "Con chim nhỏ đuôi ngắn đậu trên cành cây hót líu lo." },
    { num: 173, char: "雨", variants: [], strokes: 8, hanViet: "VŨ", jaName: "あめ / あめかんむり", romaji: "ame / amekanmuri", meaningVi: "Cơn mưa rào, sấm sét, mây tuyết", meaningEn: "Rain / Weather", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["雪", "雲", "電", "雷", "震", "霧", "露", "霜", "霸"], tip: "Trời đổ từng giọt mưa sa. Mọi hiện tượng thời tiết mưa tuyết mây bão đều có Vũ đầu." },
    { num: 174, char: "靑", variants: ["青"], strokes: 8, hanViet: "THANH", jaName: "あお", romaji: "ao", meaningVi: "Màu xanh biếc, tươi trẻ thanh xuân", meaningEn: "Blue / Green", pos: "shin", posName: "Độc lập", examples: ["靖", "静", "靛"], tip: "Cỏ cây mọc tươi tốt dưới ánh mặt trời rạng rỡ." },
    { num: 175, char: "非", variants: [], strokes: 8, hanViet: "PHI", jaName: "あらず", romaji: "arazu", meaningVi: "Không phải, sai trái, trái ngược", meaningEn: "Wrong / Non-", pos: "shin", posName: "Độc lập", examples: ["悲", "斐", "靠"], tip: "Hai cánh chim dang sang hai hướng tương phản trái ngược." },

    // 9 Strokes (176 - 186)
    { num: 176, char: "面", variants: [], strokes: 9, hanViet: "DIỆN", jaName: "めん", romaji: "men", meaningVi: "Khuôn mặt, bề mặt, diện tích", meaningEn: "Face / Surface", pos: "shin", posName: "Độc lập", examples: ["靥"], tip: "Khuôn mặt người với đôi mắt và sống mũi thanh tú." },
    { num: 177, char: "革", variants: [], strokes: 9, hanViet: "CÁCH", jaName: "かわへん / つくりがわ", romaji: "kawahen", meaningVi: "Da thuộc đã qua xử lý, thay đổi cải cách", meaningEn: "Leather / Reform", pos: "hen", posName: "Bên trái (Hen)", examples: ["靴", "靶", "鞍", "鞭"], tip: "Bộ da thú lột bỏ lông mỡ, kéo căng đổi mới thành tấm da thuộc dẻo dai." },
    { num: 178, char: "韋", variants: [], strokes: 9, hanViet: "VI", jaName: "なめしがわ", romaji: "nameshigawa", meaningVi: "Da mềm cuộn tròn, vây quanh", meaningEn: "Soft leather", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["韓", "韜"], tip: "Hai người lính canh bước quanh thành lũy bảo vệ." },
    { num: 179, char: "韭", variants: [], strokes: 9, hanViet: "CỬU", jaName: "にら", romaji: "nira", meaningVi: "Rau hẹ xanh thơm", meaningEn: "Leek", pos: "shin", posName: "Độc lập", examples: ["韱"], tip: "Những bụi rau hẹ xanh mướt mọc từng khóm trên luống." },
    { num: 180, char: "音", variants: [], strokes: 9, hanViet: "ÂM", jaName: "おと / おとへん", romaji: "oto", meaningVi: "Âm thanh phát ra, tiếng nhạc", meaningEn: "Sound / Music", pos: "hen", posName: "Bên trái (Hen)", examples: ["韻", "響"], tip: "Miệng thốt lời ca và nốt nhạc bay bổng vang rền." },
    { num: 181, char: "頁", variants: [], strokes: 9, hanViet: "HIỆT", jaName: "おおがい", romaji: "oogai", meaningVi: "Trang giấy, đầu người, khuôn mặt", meaningEn: "Leaf / Page / Head", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["頂", "頃", "項", "順", "須", "領", "頭", "題", "額", "顔", "類", "願"], tip: "Rất hay gặp bên phải! Chỉ đầu người, trang sách, đỉnh trán, gật đầu, suy ngẫm." },
    { num: 182, char: "風", variants: ["凬"], strokes: 9, hanViet: "PHONG", jaName: "かぜ", romaji: "kaze", meaningVi: "Ngọn gió thổi mát, phong tục", meaningEn: "Wind", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["颱", "飄"], tip: "Gió luồn qua màn vải lay động vạn vật." },
    { num: 183, char: "飛", variants: [], strokes: 9, hanViet: "PHI", jaName: "とぶ", romaji: "tobu", meaningVi: "Bay lượn trên tầng không", meaningEn: "Fly", pos: "shin", posName: "Độc lập", examples: ["飜"], tip: "Cánh chim dang rộng vút bay lưng chừng mây gió." },
    { num: 184, char: "食", variants: ["飠", "𩙿"], strokes: 9, hanViet: "THỰC", jaName: "しょく / しょくへん", romaji: "shoku", meaningVi: "Thức ăn, ẩm thực, ăn uống", meaningEn: "Eat / Food", pos: "hen", posName: "Bên trái (Hen)", examples: ["飢", "飯", "飲", "飼", "飽", "飾", "養", "館"], tip: "Tối quan trọng! Bên trái thành Thực biến (飠), chi phối mọi chữ về đồ ăn, đồ uống, no đói, nhà hàng ăn quán." },
    { num: 185, char: "首", variants: [], strokes: 9, hanViet: "THỦ", jaName: "くび", romaji: "kubi", meaningVi: "Cái đầu, cổ, thủ lĩnh đứng đầu", meaningEn: "Head / Neck", pos: "shin", posName: "Độc lập", examples: ["馗"], tip: "Cái đầu với mái tóc búi cao của người thủ lĩnh dẫn đường." },
    { num: 186, char: "香", variants: [], strokes: 9, hanViet: "HƯƠNG", jaName: "かおり", romaji: "kaori", meaningVi: "Hương thơm dịu ngọt, mùi hương", meaningEn: "Fragrant / Incense", pos: "shin", posName: "Độc lập", examples: ["馨"], tip: "Hạt lúa chín tỏa hương thơm ngát khắp cánh đồng quê." },

    // 10 Strokes (187 - 194)
    { num: 187, char: "馬", variants: [], strokes: 10, hanViet: "MÃ", jaName: "うま / うまへん", romaji: "uma", meaningVi: "Con ngựa phi nhanh, tuấn mã", meaningEn: "Horse", pos: "hen", posName: "Bên trái (Hen)", examples: ["駅", "駄", "駆", "駐", "騎", "騒", "験"], tip: "Hình con ngựa với bờm dài tung bay trong gió và bốn vó phi nước đại." },
    { num: 188, char: "骨", variants: [], strokes: 10, hanViet: "CỐT", jaName: "ほね / ほねへん", romaji: "hone", meaningVi: "Xương cốt cơ thể, khung sườn", meaningEn: "Bone", pos: "hen", posName: "Bên trái (Hen)", examples: ["髄", "骸", "體"], tip: "Khung xương sườn vững chãi nâng đỡ toàn bộ thể xác con người." },
    { num: 189, char: "高", variants: [], strokes: 10, hanViet: "CAO", jaName: "たかい", romaji: "takai", meaningVi: "Cao ráo, chót vót, thanh cao", meaningEn: "Tall / High", pos: "shin", posName: "Độc lập", examples: ["敲"], tip: "Tòa tháp cao tầng vươn thẳng lên bầu trời mây trắng." },
    { num: 190, char: "髟", variants: [], strokes: 10, hanViet: "BƯU", jaName: "かみがしら", romaji: "kamigashira", meaningVi: "Tóc dài buông xõa", meaningEn: "Hair", pos: "kanmuri", posName: "Ở trên (Kanmuri)", examples: ["髪", "髭", "鬚"], tip: "Mái tóc dài thướt tha buông bay trong gió thu." },
    { num: 191, char: "鬥", variants: [], strokes: 10, hanViet: "ĐẤU", jaName: "とうがまえ", romaji: "tougamae", meaningVi: "Đánh nhau, tranh đấu, giao chiến", meaningEn: "Fight", pos: "kamae", posName: "Vây quanh (Kamae)", examples: ["鬨", "闘"], tip: "Hai dũng sĩ nắm chặt binh khí giáp chiến quyết liệt." },
    { num: 192, char: "鬯", variants: [], strokes: 10, hanViet: "SƯỞNG", jaName: "ちょう", romaji: "chou", meaningVi: "Rượu nghệ cúng tế thần", meaningEn: "Sacrificial wine", pos: "shin", posName: "Độc lập", examples: ["鬱"], tip: "Chum rượu thơm chế từ củ nghệ vàng cúng tế tổ tiên." },
    { num: 193, char: "鬲", variants: [], strokes: 10, hanViet: "CÁCH", jaName: "かなえ", romaji: "kanae", meaningVi: "Cái nồi đồng ba chân", meaningEn: "Cauldron", pos: "shin", posName: "Độc lập", examples: ["融"], tip: "Nồi đất ba chân rỗng đáy đun nước sôi sùng sục." },
    { num: 194, char: "鬼", variants: [], strokes: 10, hanViet: "QUỶ", jaName: "おに", romaji: "oni", meaningVi: "Ma quỷ, linh hồn, yêu quái", meaningEn: "Ghost / Demon", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["魂", "魁", "魅", "魔"], tip: "Bóng hình yêu ma đầu to sừng nhọn thoắt ẩn thoắt hiện." },

    // 11 Strokes (195 - 200)
    { num: 195, char: "魚", variants: [], strokes: 11, hanViet: "NGƯ", jaName: "うお / さかなへん", romaji: "sakana", meaningVi: "Con cá, loài thủy sinh", meaningEn: "Fish", pos: "hen", posName: "Bên trái (Hen)", examples: ["鮎", "鮮", "鯉", "鯖", "鯛", "鯨"], tip: "Hình con cá với đầu vẩy và đuôi quẫy nước bơi lội." },
    { num: 196, char: "鳥", variants: [], strokes: 11, hanViet: "ĐIỂU", jaName: "とり / とりへん", romaji: "tori", meaningVi: "Con chim đuôi dài, loài lông vũ", meaningEn: "Bird", pos: "tsukuri", posName: "Bên phải (Tsukuri)", examples: ["鳩", "鳴", "鴨", "鴻", "鶏", "鶴"], tip: "Hình dáng chú chim đuôi dài với chiếc mỏ nhọn và đôi mắt sáng." },
    { num: 197, char: "鹵", variants: [], strokes: 11, hanViet: "LỖ", jaName: "ろ", romaji: "ro", meaningVi: "Đất mặn pha cát, muối biển", meaningEn: "Salt / Saline", pos: "shin", posName: "Độc lập", examples: ["鹹"], tip: "Những hạt muối kết tinh trên đồng muối ven biển." },
    { num: 198, char: "鹿", variants: [], strokes: 11, hanViet: "LỘC", jaName: "しか", romaji: "shika", meaningVi: "Con hươu, con nai sừng đẹp", meaningEn: "Deer", pos: "shin", posName: "Độc lập", examples: ["麗", "麟"], tip: "Chú hươu sao với cặp sừng nhánh tuyệt đẹp trong rừng xanh." },
    { num: 199, char: "麥", variants: ["麦"], strokes: 11, hanViet: "MẠCH", jaName: "むぎ / むぎへん", romaji: "mugi", meaningVi: "Cây lúa mạch, lúa mì", meaningEn: "Wheat / Barley", pos: "hen", posName: "Bên trái (Hen)", examples: ["麩", "麺"], tip: "Cây lúa mạch đơm bông vàng rực rỡ dưới nắng ấm." },
    { num: 200, char: "麻", variants: [], strokes: 11, hanViet: "MA", jaName: "あさ / あさかんむり", romaji: "asa", meaningVi: "Cây gai dệt vải lanh, tê rần", meaningEn: "Hemp / Flax", pos: "tare", posName: "Rủ xuống (Tare)", examples: ["麿", "麼"], tip: "Vỏ cây gai phơi trong nhà kho để kéo sợi dệt áo." },

    // 12 Strokes (201 - 204)
    { num: 201, char: "黃", variants: ["黄"], strokes: 12, hanViet: "HOÀNG", jaName: "きいろ", romaji: "kiiro", meaningVi: "Màu vàng rực rỡ của đất đai", meaningEn: "Yellow", pos: "shin", posName: "Độc lập", examples: ["黌"], tip: "Mảnh ngọc bích màu vàng ấm áp đeo bên hông." },
    { num: 202, char: "黍", variants: [], strokes: 12, hanViet: "THỬ", jaName: "きび", romaji: "kibi", meaningVi: "Cây kê nếp dẻo thơm", meaningEn: "Millet", pos: "shin", posName: "Độc lập", examples: ["黎", "黏"], tip: "Hạt kê vàng nếp dính dùng nấu xôi rượu ngọt." },
    { num: 203, char: "黑", variants: ["黒"], strokes: 12, hanViet: "HẮC", jaName: "くろ", romaji: "kuro", meaningVi: "Màu đen muội than khói bếp", meaningEn: "Black", pos: "shin", posName: "Độc lập", examples: ["墨", "默", "黜"], tip: "Lửa nung bốc khói đen kịt đọng thành muội than đen tuyền." },
    { num: 204, char: "黹", variants: [], strokes: 12, hanViet: "CHỈ", jaName: "ぬいとり", romaji: "nuitori", meaningVi: "Thêu thùa, may vá hoa văn tinh xảo", meaningEn: "Embroidery", pos: "shin", posName: "Độc lập", examples: ["黼", "黻"], tip: "Đường kim mũi chỉ dệt nên họa tiết rồng phượng trên gấm vóc." },

    // 13 Strokes (205 - 208)
    { num: 205, char: "黽", variants: [], strokes: 13, hanViet: "MẪN", jaName: "べんあし", romaji: "benashi", meaningVi: "Con ếch nhái, cóc tía, nỗ lực", meaningEn: "Frog / Toad", pos: "ashi", posName: "Ở dưới (Ashi)", examples: ["鼈", "鼇"], tip: "Hình con ếch ngồi chồm hỗm bên bờ ao." },
    { num: 206, char: "鼎", variants: [], strokes: 13, hanViet: "ĐỈNH", jaName: "かなえ", romaji: "kanae", meaningVi: "Cái đỉnh đồng ba chân vững chãi", meaningEn: "Tripod / Cauldron", pos: "shin", posName: "Độc lập", examples: ["鼐"], tip: "Chiếc đỉnh đồng ba chân uy nghiêm nơi triều đình vững như kiềng ba chân." },
    { num: 207, char: "鼓", variants: [], strokes: 13, hanViet: "CỔ", jaName: "つづみ", romaji: "tsuzumi", meaningVi: "Chiếc trống gõ vang rền, thúc giục", meaningEn: "Drum", pos: "shin", posName: "Độc lập", examples: ["瞽"], tip: "Chiếc trống căng mặt da và bàn tay cầm dùi gõ vang khúc khải hoàn." },
    { num: 208, char: "鼠", variants: [], strokes: 13, hanViet: "THỬ", jaName: "ねずみ / ねずみへん", romaji: "nezumi", meaningVi: "Con chuột nhỏ nhanh thoăn thoắt", meaningEn: "Mouse / Rat", pos: "hen", posName: "Bên trái (Hen)", examples: ["鼬"], tip: "Hình con chuột với hai tai vểnh, răng gặm nhấm và chiếc đuôi dài." },

    // 14 Strokes (209 - 210)
    { num: 209, char: "鼻", variants: [], strokes: 14, hanViet: "TỊ", jaName: "はな / はなへん", romaji: "hana", meaningVi: "Chiếc mũi hít thở khí trời", meaningEn: "Nose", pos: "hen", posName: "Bên trái (Hen)", examples: ["鼾"], tip: "Bộ Tự (mũi) phía trên và cơ quan điều hòa hơi thở phía dưới." },
    { num: 210, char: "齊", variants: ["斉"], strokes: 14, hanViet: "TỀ", jaName: "せい", romaji: "sei", meaningVi: "Ngay ngắn, bằng nhau, tề chỉnh", meaningEn: "Even / Alike", pos: "shin", posName: "Độc lập", examples: ["齋", "齎"], tip: "Những bông lúa mì cắt đều nhau tăm tắp ngay hàng thẳng lối." },

    // 15 Strokes (211)
    { num: 211, char: "齒", variants: ["歯"], strokes: 15, hanViet: "XỈ", jaName: "は / はへん", romaji: "ha", meaningVi: "Hàm răng nhai, tuổi tác", meaningEn: "Tooth", pos: "hen", posName: "Bên trái (Hen)", examples: ["齢", "齧", "齲"], tip: "Hàm răng với những chiếc răng mọc đều đặn trong khoang miệng." },

    // 16 Strokes (212 - 213)
    { num: 212, char: "龍", variants: ["竜"], strokes: 16, hanViet: "LONG", jaName: "りゅう", romaji: "ryuu", meaningVi: "Con rồng thần thoại uy linh", meaningEn: "Dragon", pos: "shin", posName: "Độc lập", examples: ["龐"], tip: "Thân hình rồng uốn lượn chín khúc trên tầng mây sấm sét." },
    { num: 213, char: "龜", variants: ["亀"], strokes: 16, hanViet: "QUY", jaName: "かめ", romaji: "kame", meaningVi: "Con rùa mai rùa sống thọ ngàn năm", meaningEn: "Turtle", pos: "shin", posName: "Độc lập", examples: ["鼈"], tip: "Hình con rùa với chiếc mai cứng cáp, đầu ngẩng cao và bốn chân bơi lội." },

    // 17 Strokes (214)
    { num: 214, char: "龠", variants: [], strokes: 17, hanViet: "DƯỢC", jaName: "やく", romaji: "yaku", meaningVi: "Cây sáo trúc ba lỗ điều hòa âm thanh", meaningEn: "Flute", pos: "shin", posName: "Độc lập", examples: ["龡", "龢"], tip: "Cây sáo trúc cổ với ba lỗ thoát âm điều hòa nhịp điệu đất trời." }
  ];

  const radicalsCode = `// 214 Standard Kangxi Radicals (214 Bộ Thủ Khang Hy)
// Fully categorized with stroke count, positions, Sino-Vietnamese names, Japanese readings, examples and mnemonics.

export type RadicalPosition = "hen" | "tsukuri" | "kanmuri" | "ashi" | "tare" | "nyou" | "kamae" | "shin";

export interface KanjiRadicalItem {
  num: number;
  char: string;
  variants: string[];
  strokes: number;
  hanViet: string;
  jaName: string;
  romaji: string;
  meaningVi: string;
  meaningEn: string;
  pos: RadicalPosition;
  posName: string;
  examples: string[];
  tip: string;
}

export const KANJI_RADICALS_LIST: KanjiRadicalItem[] = ${JSON.stringify(radicalsData, null, 2)};
`;

  const radPath = path.join(__dirname, "..", "lib", "kanji-radicals-data.ts");
  fs.writeFileSync(radPath, radicalsCode, "utf8");
  console.log(`Wrote ${radPath} (${radicalsData.length} items)`);

  console.log("=== All data generation completed! ===");
}

main().catch((err) => {
  console.error("Data generation error:", err);
  process.exit(1);
});
