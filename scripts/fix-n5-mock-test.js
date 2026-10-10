const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../prisma/seed-data/lessons.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace Question 3 (一生懸命 -> たくさん)
content = content.replace(
  /'あした テストが ありますから、今夜は \[ \? \] 勉強します。'/g,
  "'あした テストが ありますから、今夜は [ ? ] 勉強します。'"
);
content = content.replace(
  /"一生懸命 \(いっしょうけんめい - chăm chỉ hết sức\)"/g,
  '"たくさん (takusan - nhiều)"'
);

// Replace Question 4 (Trợ từ -> と)
content = content.replace(
  /'私は 毎朝 パン \[ \? \] コーヒーを 飲みます。'/g,
  "'私は 毎朝 パン [ ? ] コーヒーを 飲みます。'"
);
// This question actually says "I drink bread and coffee". A better N5 sentence: '毎朝 パン [ ? ] 卵を 食べます。'
content = content.replace(
  /私は 毎朝 パン \[ \? \] コーヒーを 飲みます。/g,
  '毎朝 パン [ ? ] 卵を 食べます。'
);
content = content.replace(
  /"を食べ、 \/ を食べて、"/g,
  '"と (to - và)"'
);

// Replace Question 8 (大きすぎる -> 大きくて)
content = content.replace(
  /'この シャツは \[ \? \] すぎますから、着られません。'/g,
  "'この シャツは [ ? ]、着られません。'"
);
content = content.replace(
  /"大き \(ooki - 大きすぎます: quá to\)"/g,
  '"大きくて (ookikute - vì to nên)"'
);

// Question 15: Meta question. Let's replace it with a real reading question.
// Actually it's better to just leave the last question or replace it entirely.
// Let's replace question 15 text:
content = content.replace(
  /"Mục tiêu đạt được cấp chứng chỉ JLPT N5 chứng nhận điều gì\?"/g,
  '"Chọn câu đúng: 「きのうは ＿＿＿＿＿。」"'
);
content = content.replace(
  /"Khả năng hiểu và sử dụng tiếng Nhật căn bản \(bảng chữ cái Kana, ~100 Kanji, ~800 từ vựng và ngữ pháp sơ cấp cơ bản\)"/g,
  '"あめでした (ame deshita - hôm qua trời đã mưa)"'
);
content = content.replace(
  /"Giao tiếp thành thạo công sở"/g,
  '"あめだ (ame da)"'
);
content = content.replace(
  /"Đọc báo kinh tế chuyên ngành"/g,
  '"あめです (ame desu)"'
);
content = content.replace(
  /"Dịch cabin hội nghị quốc tế"/g,
  '"あめ ではありません (ame dewa arimasen)"'
);

// Also fix the N5 kanji '会' in n4-data.ts
const n4FilePath = path.join(__dirname, '../prisma/seed-data/n4-data.ts');
let n4Content = fs.readFileSync(n4FilePath, 'utf-8');
// Actually wait, JLPT Sensei and Jisho say 会 is N4! So I won't change it.

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed lessons.ts mock test N5!');

