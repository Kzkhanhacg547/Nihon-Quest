import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchGoogleTranslate(texts: string[], targetLang = "vi", sourceLang = "en"): Promise<string[]> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
    texts.join("\n")
  )}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`Translate error: ${res.statusText}`);
  const data = await res.json();
  const fullText = (data[0] || []).map((chunk: any) => chunk[0]).filter(Boolean).join("");
  return fullText.split("\n").map((s: string) => s.trim());
}

async function main() {
  console.log("=== Enriching Jouyou Kanji with Authentic Vietnamese Meanings ===");

  // 1. Load curated DB kanji
  const dbKanji = await prisma.kanji.findMany();
  const dbMap = new Map<string, string>();
  for (const k of dbKanji) {
    dbMap.set(k.character, k.meaning);
  }
  console.log(`Loaded ${dbMap.size} curated kanji from Database.`);

  // 2. Load Jouyou Kanji JSON
  const jsonPath = path.join(__dirname, "..", "lib", "jouyou-kanji-data.json");
  const jouyouList: any[] = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  console.log(`Loaded ${jouyouList.length} Jouyou Kanji from JSON.`);

  // Manual high quality overrides for core kanji
  const MANUAL_OVERRIDES: Record<string, string> = {
    "亜": "Châu Á, thứ hai (Á)",
    "哀": "Bi ai, thương xót, đau buồn",
    "挨": "Chen lấn, chào hỏi (trong 挨拶 aisatsu)",
    "愛": "Tình yêu, yêu thương, ái mộ",
    "曖": "Mơ hồ, mờ mịt (trong 曖昧 aimai)",
    "悪": "Xấu xa, ác độc, ghét bỏ",
    "握": "Nắm chặt, cầm lấy, bắt tay",
    "圧": "Áp lực, đè nén, áp bức",
    "扱": "Đối xử, xử lý, thao tác",
    "宛": "Gửi tới, nơi nhận, uyển chuyển",
    "嵐": "Cơn bão, giông bão",
    "安": "An toàn, yên ổn, rẻ",
    "案": "Đề án, phương án, suy nghĩ",
    "暗": "Tối tăm, u ám, mù mịt",
    "以": "Lấy làm mốc, dĩ vãng, trở lên/trở xuống",
    "衣": "Áo quần, y phục",
    "位": "Vị trí, địa vị, ngôi thứ",
    "囲": "Vây quanh, bao bọc, chu vi",
    "医": "Bác sĩ, y học, chữa bệnh",
    "依": "Dựa vào, ỷ lại, nương tựa",
    "委": "Ủy thác, giao phó, ủy ban",
    "威": "Uy quyền, oai phong, đe dọa",
    "為": "Vì, làm, hành vi",
    "畏": "Kính sợ, e dè, sợ hãi",
    "胃": "Dạ dày, bao tử",
    "尉": "Cấp úy, võ quan",
    "異": "Khác biệt, dị thường, kỳ lạ",
    "移": "Di chuyển, dời đổi, lây lan",
    "萎": "Héo hon, tàn tạ, teo tóp",
    "偉": "Vĩ đại, xuất chúng, to lớn",
    "椅": "Cái ghế ngồi",
    "彙": "Thu thập, phân loại (trong 語彙 goi - từ vựng)",
    "意": "Ý nghĩa, ý chí, tâm ý",
    "違": "Sai khác, khác nhau, vi phạm",
    "維": "Duy trì, gìn giữ, sợi dây buộc",
    "慰": "An ủi, giải khuây, vỗ về",
    "遺": "Để lại, di sản, di tích",
    "緯": "Đường vĩ tuyến, sợi ngang dệt vải",
    "域": "Khu vực, lãnh vực, địa hạt",
    "育": "Nuôi nấng, dạy dỗ, giáo dục",
    "一": "Một, số một, khởi đầu (Nhất)",
    "壱": "Số một (chữ viết hoa trang trọng trên văn bản)",
    "逸": "Ẩn dật, trốn thoát, xuất sắc khác thường",
    "茨": "Cây gai, bụi gai (trong tỉnh Ibaraki)",
    "芋": "Củ khoai, khoai sọ/khoai lang",
    "引": "Kéo, rút ra, dẫn dắt",
    "印": "Con dấu, in ấn, ấn tượng",
    "因": "Nguyên nhân, duyên cớ",
    "咽": "Cổ họng, yết hầu",
    "姻": "Thông gia, hôn nhân",
    "員": "Thành viên, nhân viên, số người",
    "院": "Học viện, bệnh viện, cơ quan lớn",
    "隠": "Ẩn giấu, che khuất, giấu kín",
    "飲": "Uống nước, nuốt",
    "右": "Bên phải (Hữu)",
    "宇": "Vũ trụ, khoảng không bao la",
    "雨": "Cơn mưa, mưa rơi",
    "羽": "Lông vũ, cánh chim (đơn vị đếm loài chim)",
    "雲": "Mây trời, đám mây",
    "運": "Vận chuyển, may mắn, số phận",
    "営": "Kinh doanh, doanh nghiệp, điều hành",
    "泳": "Bơi lội dưới nước",
    "駅": "Nhà ga xe lửa",
    "円": "Đồng Yên Nhật, hình tròn",
    "園": "Khu vườn, công viên, nhà trẻ",
    "演": "Diễn xuất, diễn thuyết, biểu diễn",
    "遠": "Xa xôi, xa cách",
    "塩": "Muối ăn",
    "汚": "Bẩn thỉu, ô nhiễm, dơ dáy",
    "黄": "Màu vàng",
    "屋": "Cửa hàng, mái nhà, người bán",
    "億": "Một trăm triệu (100.000.000)",
    "温": "Ấm áp, nhiệt độ ôn hòa",
    "音": "Âm thanh, tiếng nhạc",
    "下": "Dưới, phía dưới, thấp",
    "化": "Biến hóa, hóa học, thay đổi",
    "何": "Cái gì, mấy, bao nhiêu (Hà)",
    "花": "Bông hoa, hoa nở",
    "夏": "Mùa hè, mùa hạ",
    "家": "Ngôi nhà, gia đình, chuyên gia",
    "歌": "Bài hát, ca hát",
    "画": "Bức tranh, nét vẽ, kế hoạch (Họa)",
    "会": "Gặp gỡ, hội họp, công ty",
    "回": "Lần, vòng quanh, quay trở lại",
    "海": "Biển, đại dương",
    "界": "Thế giới, ranh giới, phạm vi",
    "開": "Mở cửa, khai mạc, bắt đầu",
    "楽": "Vui vẻ, thoải mái, âm nhạc (Lạc/Nhạc)",
    "活": "Hoạt động, sinh hoạt, sống động",
    "寒": "Lạnh lẽo, buốt giá (mùa đông)",
    "漢": "Chữ Hán, người Hán, sông Ngân Hán",
    "間": "Khoảng cách, thời gian, ở giữa (Gian)",
    "関": "Liên quan, cửa ải, mối quan hệ",
    "館": "Tòa nhà lớn, thư viện, bảo tàng",
    "顔": "Khuôn mặt, nét mặt",
    "願": "Cầu mong, nguyện ước, xin nhờ",
    "気": "Khí chất, tinh thần, không khí",
    "期": "Kỳ hạn, thời kỳ, mong đợi",
    "機": "Máy móc, cơ hội, máy bay",
    "帰": "Trở về, quay về nhà",
    "気": "Tinh thần, khí trời, cảm giác",
    "記": "Ghi chép, ký ức, nhật ký",
    "起": "Thức dậy, khởi xướng, bắt đầu",
    "休": "Nghỉ ngơi, nghỉ phép, ngừng (Hưu)",
    "急": "Khẩn cấp, gấp gáp, vội vã",
    "泣": "Khóc, rơi lệ",
    "究": "Nghiên cứu, tìm hiểu sâu xa",
    "牛": "Con bò, con trâu",
    "去": "Đã qua, quá khứ, rời đi",
    "強": "Mạnh mẽ, kiên cường, cưỡng bức",
    "教": "Dạy dỗ, giáo dục, tôn giáo",
    "橋": "Cây cầu bắc qua sông",
    "業": "Công nghiệp, nghề nghiệp, sự nghiệp",
    "近": "Gần, lân cận, thân cận",
    "金": "Vàng, tiền bạc, kim loại (Kim)",
    "銀": "Bạc (kim loại), ngân hàng",
    "空": "Bầu trời, trống rỗng, không gian",
    "見": "Nhìn, xem, thấy, kiến giải",
    "犬": "Con chó (Khuyển)",
    "言": "Lời nói, ngôn ngữ, nói rằng",
    "古": "Cũ, cổ xưa, đồ cổ",
    "語": "Ngôn ngữ, từ ngữ, kể chuyện",
    "後": "Phía sau, sau này, hậu thế",
    "午": "Buổi trưa, giờ Ngọ",
    "校": "Trường học, hiệu đính",
    "好": "Thích, yêu mến, tốt lành (Hảo)",
    "行": "Đi lại, tiến hành, ngân hàng",
    "降": "Rơi xuống (mưa/tuyết), bước xuống xe",
    "高": "Cao lớn, đắt tiền, thanh cao",
    "合": "Hợp lại, phù hợp, gặp gỡ",
    "国": "Đất nước, quốc gia",
    "黒": "Màu đen, hắc ám",
    "今": "Bây giờ, hiện tại, năm nay",
    "左": "Bên trái (Tả)",
    "作": "Làm ra, chế tác, tác phẩm",
    "昨": "Hôm qua, năm ngoái (Tác)",
    "山": "Ngọn núi (Sơn)",
    "子": "Đứa con, trẻ nhỏ (Tử)",
    "市": "Thành phố, chợ buôn bán",
    "仕": "Phục vụ, làm việc (trong 仕事 shigoto)",
    "死": "Chết chóc, tử vong",
    "私": "Tôi, bản thân, riêng tư (Tư)",
    "紙": "Tờ giấy viết",
    "思": "Suy nghĩ, tưởng nhớ (Tư)",
    "姉": "Chị gái (Tỷ)",
    "使": "Sử dụng, sứ giả, sai khiến",
    "始": "Bắt đầu, khởi đầu",
    "視": "Nhìn ngắm, thị lực, thị sát",
    "歯": "Răng, hàm răng",
    "字": "Chữ viết, ký tự",
    "寺": "Ngôi chùa thờ Phật",
    "持": "Cầm, giữ, sở hữu",
    "時": "Thời gian, giờ giấc, thời khắc",
    "自": "Tự mình, tự bản thân",
    "七": "Số bảy (Thất)",
    "車": "Chiếc xe, xe cộ (Xa)",
    "手": "Bàn tay (Thủ)",
    "主": "Chủ nhân, chủ yếu, chúa",
    "首": "Cái đầu, chiếc cổ, thủ lĩnh",
    "秋": "Mùa thu",
    "週": "Tuần lễ",
    "十": "Số mười (Thập)",
    "春": "Mùa xuân",
    "出": "Rời khỏi, xuất phát, đi ra",
    "書": "Viết, sách vở, thư từ",
    "女": "Phụ nữ, con gái (Nữ)",
    "小": "Nhỏ bé, tiểu học (Tiểu)",
    "少": "Ít ỏi, một chút, thiếu niên",
    "上": "Phía trên, ở trên, tốt hơn (Thượng)",
    "色": "Màu sắc, sắc thái",
    "食": "Ăn uống, thức ăn, món ăn (Thực)",
    "信": "Tin tưởng, tín nhiệm, thư từ",
    "親": "Cha mẹ, thân thiết, gần gũi",
    "心": "Trái tim, tâm trí, tấm lòng (Tâm)",
    "新": "Mới mẻ, tươi mới, tân tiến",
    "森": "Rừng rậm rạp um tùm (Sâm)",
    "真": "Chân thật, đúng đắn, thuần túy",
    "神": "Thần linh, thần thánh",
    "水": "Nước uống, chất lỏng (Thủy)",
    "生": "Sống, sinh ra, sinh viên (Sinh)",
    "青": "Màu xanh biếc, tươi trẻ (Thanh)",
    "正": "Chính xác, ngay thẳng, đúng đắn",
    "西": "Hướng Tây",
    "席": "Chỗ ngồi, ghế ngồi, phòng họp",
    "昔": "Ngày xưa, thuở trước",
    "石": "Hòn đá, sỏi đá (Thạch)",
    "赤": "Màu đỏ tươi (Xích)",
    "切": "Cắt, chặt, chia cắt, gấp gáp",
    "雪": "Bông tuyết trắng rơi",
    "先": "Trước, tiên tiến, giáo viên (Tiên)",
    "線": "Đường dây, tuyến đường ray",
    "前": "Phía trước, trước đây (Tiền)",
    "早": "Sớm, nhanh chóng (Tảo)",
    "走": "Chạy nhanh, tẩu thoát",
    "送": "Gửi đi, tiễn đưa",
    "族": "Gia tộc, bộ tộc, dòng họ",
    "村": "Ngôi làng quê, thôn bản",
    "多": "Nhiều, phong phú (Đa)",
    "太": "Béo, mập mạp, to lớn (Thái)",
    "待": "Chờ đợi, trông chờ",
    "体": "Thân thể, cơ thể, vóc dáng",
    "台": "Cái đài, bệ đỡ, chiếc xe máy móc",
    "男": "Đàn ông, con trai (Nam)",
    "知": "Biết, tri thức, hiểu rõ",
    "地": "Mặt đất, đất đai, địa phương",
    "池": "Cái ao nước",
    "茶": "Trà, chè xanh",
    "昼": "Buổi trưa, ban ngày (Trú)",
    "町": "Thị trấn, khu phố",
    "長": "Dài, trưởng bối, đứng đầu (Trường)",
    "鳥": "Con chim (Điểu)",
    "朝": "Buổi sáng, triều đình (Triều)",
    "通": "Đi qua, thông suốt, thông báo",
    "弟": "Em trai (Đệ)",
    "低": "Thấp, hèn mọn, giảm bớt",
    "店": "Cửa hàng, tiệm buôn",
    "転": "Lăn tròn, chuyển động, ngã",
    "田": "Ruộng đồng, ruộng lúa (Điền)",
    "冬": "Mùa đông",
    "東": "Hướng Đông",
    "答": "Trả lời, đáp án, câu trả lời",
    "頭": "Cái đầu, người đứng đầu",
    "同": "Giống nhau, cùng nhau (Đồng)",
    "道": "Con đường, đạo lý (Đạo)",
    "読": "Đọc sách, đọc chữ (Độc)",
    "内": "Bên trong, nội bộ (Nội)",
    "南": "Hướng Nam",
    "二": "Số hai (Nhị)",
    "肉": "Thịt động vật, cơ bắp (Nhục)",
    "日": "Mặt trời, ngày (Nhật)",
    "入": "Đi vào, bước vào (Nhập)",
    "年": "Năm, tuổi tác (Niên)",
    "買": "Mua hàng, mua sắm",
    "売": "Bán hàng, thương mại",
    "白": "Màu trắng (Bạch)",
    "八": "Số tám (Bát)",
    "発": "Phát xuất, khởi hành, phát minh",
    "半": "Một nửa, rưỡi (Bán)",
    "百": "Một trăm (Bách)",
    "父": "Người cha, người bố (Phụ)",
    "文": "Văn chương, câu văn, nét chữ",
    "聞": "Nghe thấy, hỏi thăm (Văn)",
    "母": "Người mẹ (Mẫu)",
    "方": "Hướng đi, phương pháp, vị ngài",
    "北": "Hướng Bắc",
    "木": "Cây cối, gỗ (Mộc)",
    "本": "Quyển sách, gốc rễ, nguồn gốc (Bản)",
    "毎": "Mỗi một, hàng ngày/tuần (Mỗi)",
    "万": "Mười nghìn (Vạn)",
    "名": "Tên gọi, danh tiếng (Danh)",
    "明": "Sáng sủa, minh bạch, ngày mai (Minh)",
    "目": "Con mắt, nhìn ngắm (Mục)",
    "夜": "Ban đêm, buổi tối (Dạ)",
    "野": "Cánh đồng hoang dã, lĩnh vực",
    "友": "Bạn bè, bằng hữu",
    "話": "Nói chuyện, câu chuyện (Thoại)",
  };

  // 3. Batch translate any missing kanji
  const pendingIndices: number[] = [];
  const pendingEnglish: string[] = [];

  for (let i = 0; i < jouyouList.length; i++) {
    const k = jouyouList[i];
    if (MANUAL_OVERRIDES[k.character]) {
      k.meaningVi = MANUAL_OVERRIDES[k.character];
    } else if (dbMap.has(k.character)) {
      k.meaningVi = dbMap.get(k.character)!;
    } else if (!k.meaningVi) {
      pendingIndices.push(i);
      pendingEnglish.push(k.meaningEn || k.hanViet);
    }
  }

  console.log(`Need translation for ${pendingIndices.length} remaining kanji...`);

  // Translate in batches of 70 with 800ms delay to respect rate limit
  const BATCH_SIZE = 70;
  for (let i = 0; i < pendingIndices.length; i += BATCH_SIZE) {
    const batchIdx = pendingIndices.slice(i, i + BATCH_SIZE);
    const batchTexts = pendingEnglish.slice(i, i + BATCH_SIZE);

    try {
      const translated = await fetchGoogleTranslate(batchTexts, "vi", "en");
      for (let j = 0; j < batchIdx.length; j++) {
        const item = jouyouList[batchIdx[j]];
        const viMeaning = translated[j] || item.meaningEn;
        const clean = viMeaning.charAt(0).toUpperCase() + viMeaning.slice(1);
        item.meaningVi = clean;
      }
      process.stdout.write(`Translated ${Math.min(i + BATCH_SIZE, pendingIndices.length)} / ${pendingIndices.length}\r`);
    } catch (e: any) {
      console.warn(`Translation batch failed at ${i}:`, e.message);
      for (let j = 0; j < batchIdx.length; j++) {
        const item = jouyouList[batchIdx[j]];
        item.meaningVi = `${item.hanViet} (${item.meaningEn})`;
      }
    }
    // Rate limit delay
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log("\nAll 2,136 Jouyou Kanji enriched with Vietnamese meanings!");

  // Save back to JSON
  fs.writeFileSync(jsonPath, JSON.stringify(jouyouList, null, 2), "utf8");
  console.log(`Saved enriched JSON to ${jsonPath}`);

  // 4. Upsert all 2,136 Jouyou Kanji into Prisma Database
  console.log("Upserting all 2,136 Jouyou Kanji into Prisma database...");
  let upsertedCount = 0;

  for (const item of jouyouList) {
    const strokeCount = item.strokeCount || 1;
    const grade = typeof item.grade === "number" ? item.grade : null;
    const meaning = item.meaningVi ? `${item.meaningVi} (${item.hanViet})` : item.hanViet;

    const kanjiRecord = await prisma.kanji.upsert({
      where: { character: item.character },
      create: {
        character: item.character,
        meaning,
        strokeCount,
        jlptLevel: item.jlptLevel || "N2",
        grade,
      },
      update: {
        meaning,
        strokeCount,
        jlptLevel: item.jlptLevel || "N2",
        grade,
      },
    });

    // Add readings if empty
    const existingReadings = await prisma.kanjiReading.findMany({
      where: { kanjiId: kanjiRecord.id },
    });

    if (existingReadings.length === 0) {
      const readingCreates = [
        ...item.onyomi.map((r: string) => ({
          kanjiId: kanjiRecord.id,
          reading: r,
          type: "ONYOMI",
        })),
        ...item.kunyomi.map((r: string) => ({
          kanjiId: kanjiRecord.id,
          reading: r,
          type: "KUNYOMI",
        })),
      ];

      if (readingCreates.length > 0) {
        await prisma.kanjiReading.createMany({
          data: readingCreates,
          skipDuplicates: true,
        });
      }
    }

    upsertedCount++;
    if (upsertedCount % 200 === 0 || upsertedCount === jouyouList.length) {
      process.stdout.write(`Upserted ${upsertedCount} / ${jouyouList.length} kanji to DB\r`);
    }
  }

  console.log(`\nSuccessfully upserted all ${upsertedCount} kanji into Database!`);
}

main()
  .catch((e) => {
    console.error("Enrich error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
