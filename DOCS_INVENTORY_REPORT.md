# BÁO CÁO KIỂM KÊ TÀI LIỆU & ĐỐI CHIẾU CHỐNG TRÙNG TRƯỚC KHI IMPORT (PRE-IMPORT INVENTORY REPORT)

**Dự án:** `D:\Projects\NIHONWUEST\`
**Thư mục nguồn:** `D:\Projects\NIHONWUEST\unitcuments\`
**Database hiện hành:** PostgreSQL (Neon Serverless) qua Prisma ORM (`prisma/schema.prisma`)

---

## 1. Hiện trạng Database trước khi Import (Baseline)

| Bảng dữ liệu | N5 | N4 | N3 | Tổng cộng | Ghi chú |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Lesson (Bài học)** | 50 | 25 | 25 | **100** | Đang theo khung Minna no Nihongo, chưa có bài học riêng cho FPT JPD113–126 |
| **Exercise (Bài tập)** | 750 | 375 | 375 | **1.500** | 15 câu/bài học |
| **Kanji (Hán tự)** | 144 | 53 | 65 | **262** | Thiếu nhiều Kanji N4 (Flashcard 180) và N3 (292 thẻ Kanji N3) |
| **Vocabulary (Từ vựng)** | 271 | 224 | 156 | **651** | Chưa gắn nhãn FPT JPD113–126 và thiếu từ vựng Mimi kara N5–N3 / Từ láy / Tính từ N3 |
| **Grammar (Ngữ pháp)** | 38 | 32 | 29 | **99** | Thiếu các mẫu chuyên biệt trong 63 mẫu câu N4, Shinkanzen N3 và Dekiru Nihongo Part 1–9 |
| **User / Progress / SRS** | - | - | - | **3 Users / 2 Progress / 7 SRS** | Bảo toàn tuyệt đối 100% khi chạy pipeline import |

---

## 2. Thống kê tổng quan 249 tài liệu trong `unitcuments/`

- **Tổng số tệp tin đã quét:** **249 files**
- **Phân loại theo định dạng:** `.mp3`: **144**, `.mp4`: **25**, `.pdf`: **75**, `.pptx`: **2**, `.rar`: **1**, `.xlsx`: **1**, `.zip`: **1**
- **Phân loại theo cấp độ:** `FPT`: **2**, `N3`: **173**, `N4`: **17**, `N5`: **57**
- **Phân loại theo nhóm nội dung:** `ANSWER_KEY`: **1**, `AUDIO`: **144**, `EXAM`: **14**, `REFERENCE`: **43**, `TEXTBOOK`: **22**, `VIDEO`: **25**
- **Phân loại trạng thái trước khi Import:** `DUPLICATE`: **8**, `NOT_IMPORTED`: **221**, `PARTIALLY_IMPORTED`: **20**
- **Chính sách quyền truy cập Kho tài liệu:** `AUDIO_STREAM`: **144**, `DOWNLOADABLE`: **54**, `METADATA_ONLY`: **28**, `VIEW_ONLY`: **23**

---

## 3. Phân tích chuyên sâu 2 tài liệu trọng tâm FPT (`JPD113-123-133-116-126`)

1. **`JPD113-123-133-116 -126-VOCABULARY_PART 1-8.pdf`** (38 trang scan, SHA-256: `b3211b77...`):
   - Nguồn gốc: Giáo trình **『初級 できる日本語 わたしのことばノート』 (Dekiru Nihongo Shokyuu - Watashi no Kotoba Note)**.
   - Cấu trúc: Trang 4–6 là ma trận đề cương 15 bài; Trang 7–38 là Từ vựng theo chủ đề của **Part 1 đến Part 8 (第1課〜第8課)**:
     - **Part 1 (JPD113):** はじめまして (Chào hỏi, quốc gia, nghề nghiệp, danh thiếp `名刺`, `社会人`, `公務員`, tuổi tác, sở thích).
     - **Part 2 (JPD113):** 買い物・食事 (Tòa nhà `建物`, tầng hầm `地下`, đồ điện gia dụng `炊飯器`, `電子レンジ`, `冷蔵庫`, `扇風機`, cơm suất `定食`).
     - **Part 3 (JPD113):** スケジュール (Thời gian, địa điểm `美術館`, `体育館`, `動物園`, `植物園`, `再来週`, `再来月`).
     - **Part 4 (JPD123):** 私の国・町 (Phương hướng, bốn mùa `四季`, mùa mưa `雨季`, mùa khô `乾季`, vị giác `塩辛い`, `しょっぱい`, `酸っぱい`, `苦い`, `盛ん`).
     - **Part 5 (JPD123):** 休みの日 (`温泉`, `遊園地`, `残念`, `つまらない`, chia quá khứ tính từ/danh từ).
     - **Part 6 (JPD123):** 一緒に！ (`居酒屋`, `お花見`, `歌舞伎`, `用事`, `都合`, lượng từ `枚`).
     - **Part 7 (JPD133):** 友達の家で (Chỉ đường `交差点`, `信号`, `横断歩道`, `角`, văn phòng phẩm `ホッチキス`, `セロテープ`).
     - **Part 8 (JPD133):** 大切な人 (`両親`, `兄弟`, `指輪`, `花束`, trang phục & tặng nhận).
   - Trạng thái trước Import: `PARTIALLY_IMPORTED` (các từ N5 chung với Minna đã có trong DB nhưng thiếu tag `FPT,JPD113..133` và thiếu 28+ từ đặc thù của Dekiru Nihongo; ngoài ra file `extracted_vocab_ocr.json` trước đây bị lỗi nhận diện ký tự tiếng Trung `ch_PP-OCRv3` nên đã được chuẩn hóa lại 100% sang Unicode tiếng Nhật chuẩn).

2. **`JPD113-123-133-116 -126-GRAMMAR_PART 1-9.pdf`** (63 trang scan, SHA-256: `e3c01e62...`):
   - Nguồn gốc: Giáo trình **『初級 できる日本語 わたしの文法ノート』 (Dekiru Nihongo Shokyuu - Watashi no Bunpou Note)**.
   - Cấu trúc: Bao gồm toàn bộ ngữ pháp từ **Part 1 đến Part 9 (第1課〜第9課)**, bổ sung thêm **Part 9 (第9課: 私の趣味)**: Động từ Thể từ điển (`辞書形`), `Vることが好きです`, `Vることができます`, `まだ〜ていません`, tần suất `[期間]に[回数]`, liệt kê hành động `VたりVたりする`, và `Vてから`.
   - Trạng thái trước Import: `PARTIALLY_IMPORTED` -> Chuẩn hóa thành 9 mục ngữ pháp tổng hợp FPT JPD Part 1–9, 9 bài học chuyên biệt (`fpt-jpd113-part-01` .. `fpt-jpd133-part-09`) và 3 bộ đề kiểm tra học phần FPT (`FPT_JPD113`, `FPT_JPD123`, `FPT_JPD133_126`).

---

## 4. Kết quả Phát hiện Trùng Đa Cấp (Multi-Level Deduplication)

### 4.1. Cấp File (SHA-256 Exact Byte Duplicates — 6 nhóm / 7 file trùng)

| SHA-256 (16 ký tự đầu) | Bản gốc (Canonical) | Các bản sao trùng 100% byte (Đánh dấu `DUPLICATE`) |
| :--- | :--- | :--- |
| `8d39324a648f2049` | `Kho tài liệu N5/214 bộ thủ bằng hình ảnh.pdf` | `Kho tài liệu N4 miễn phí Mika/214 bộ thủ bằng hình ảnh.pdf`, `Kho Tài liệu N3 miễn phí Mika/214 bộ thủ bằng hình ảnh.pdf` |
| `ec89aa1f91547c18` | `Kho tài liệu N5/Khái quát về Kanji cần biết.pptx` | `Kho Tài liệu N3 miễn phí Mika/Khái quát về Kanji cần biết.pptx` |
| `020543a35dc96365` | `Kho tài liệu N5/Từ vựng N5.pdf` | `Kho tài liệu N5/Đề thi N5_2017/Bản sao của Từ vựng N5.pdf` |
| `a5a4ac8c6998d840` | `Kho tài liệu N4 miễn phí Mika/Minna no Nihongo II - Bunkei Renshuuchou.pdf` | `Kho tài liệu N4 miễn phí Mika/Minna no Nihongo II - Kaite Oboeru.pdf` (2 file khác tên nhưng cùng 1 nội dung PDF 185 trang) |
| `aaa93148cb8c3221` | `Kho Tài liệu N3 miễn phí Mika/Mimi_Kara_Oboeru_N3-Bunpou.pdf` | `Kho Tài liệu N3 miễn phí Mika/Mimikara N3- BT ngữ pháp.pdf` (Cùng 1 file 134 trang) |
| `d6f06b3e0b844769` | `Kho Tài liệu N3 miễn phí Mika/Mimi_Kara_Oboeru_N3-Goi.pdf` | `Kho Tài liệu N3 miễn phí Mika/Từ vựng shinkanzen n3.pdf` (Đặt nhầm tên Shinkanzen nhưng thực chất là Mimi kara Goi N3 236 trang) |

### 4.2. Cấp Nội dung, Ngữ nghĩa & Cấu trúc (Content / Semantic / Structural Deduplication)

| Loại dữ liệu | Đã có trong DB | `NEW` (Nhập mới) | `UPDATE_CANDIDATE` (Bổ sung/Làm giàu) | `DUPLICATE` (Bỏ qua, không tạo trùng) | `REVIEW_REQUIRED` (Cần lưu ý) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Kanji** | 262 | **180** | 0 | 190 | 0 |
| **Vocabulary** | 651 | **537** | **83** | 625 | 2 |
| **Grammar** | 99 | **112** | 0 | 34 | 1 |
| **Lesson (FPT JPD)** | 100 | **9** | 0 | 0 | 0 |
| **Dynamic Exams** | 4 (Hardcoded) | **12 đề mới (Tổng 16 đề DB)** | 4 (Chuyển từ tĩnh sang DB) | 3 đề trùng trong 26 Đề N3 | 1 |

### 4.3. Danh sách các trường hợp `REVIEW_REQUIRED` & Quyết định xử lý an toàn

1. **[VOCABULARY] `辛い (からい vs つらい)`**
   - Nguồn phát hiện: DB N5 (からい - cay), tinh-tu-thuong-xuat-hien-trong-jlpt-n3.pdf (つらい - vất vả, đau khổ)
   - Quyết định xử lý: Không gộp tự động vì khác cách đọc (kana) và khác nghĩa dù cùng chữ Hán 辛い.
2. **[VOCABULARY] `表 (おもて vs ひょう)`**
   - Nguồn phát hiện: DB N5/N4, Tổng hợp thẻ học kanji N3.pdf (おもて: mặt ngoài / ひょう: bảng biểu)
   - Quyết định xử lý: Giữ tách biệt theo từng cách đọc kana để tránh ghi đè nghĩa.
3. **[GRAMMAR] `〜うちに vs 〜間に`**
   - Nguồn phát hiện: ngu-phap-shinkanzen-n3. Tieng Viet.pdf, Thẻ ghi nhớ_ Shinkanzen - N3 - Bunpou - 260 _ Quizlet.pdf
   - Quyết định xử lý: Gộp bản Quizlet vào bản Shinkanzen N3 gốc vì trùng 100% ví dụ và giải thích tiếng Việt.
4. **[EXAM] `FULL - 26 DE - 日本語能力試験N3.pdf (Đề N3-1 vs N3-2, N3-16 vs N3-16b, N3-15 vs ĐỀ-N3-7-2010.pdf)`**
   - Nguồn phát hiện: FULL - 26 DE - 日本語能力試験N3.pdf, ĐỀ-N3-7-2010.pdf
   - Quyết định xử lý: Phát hiện trùng cấp cấu trúc bộ đề: N3-2 trùng hoàn toàn N3-1; N3-16b trùng N3-16; N3-15 trùng ĐỀ-N3-7-2010.pdf. Chỉ nhập 1 bản duy nhất cho mỗi bộ đề gốc.
5. **[OCR_NORMALIZATION] `JPD113-123-133-116 -126-VOCABULARY_PART 1-8.pdf & GRAMMAR_PART 1-9.pdf`**
   - Nguồn phát hiện: extracted_vocab_ocr.json, extracted_grammar_ocr.json
   - Quyết định xử lý: Bản OCR thô trước đây dùng model tiếng Trung (ch_PP-OCRv3) làm biến dạng chữ Kana/Kanji. Đã chuẩn hóa lại 100% theo Unicode tiếng Nhật chuẩn của giáo trình Dekiru Nihongo Shokyuu Bài 1–9 trước khi nhập.

---

## 5. Bảng Kiểm Kê Chi Tiết Toàn Bộ 249 Tài Liệu (`unitcuments/`)

| # | Đường dẫn tương đối (`unitcuments/`) | Định dạng | Cấp độ | Nhóm | Dung lượng (KB) | Trạng thái trước Import | Trạng thái sau Import | Quyền truy cập |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | `JPD113-123-133-116 -126-GRAMMAR_PART 1-9.pdf` | `.pdf` | FPT | TEXTBOOK | 9724.6 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 2 | `JPD113-123-133-116 -126-VOCABULARY_PART 1-8.pdf` | `.pdf` | FPT | TEXTBOOK | 7922.1 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 3 | `Kho tài liệu N4 miễn phí Mika/214 bộ thủ bằng hình ảnh.pdf` | `.pdf` | N4 | REFERENCE | 12981.4 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 4 | `Kho tài liệu N4 miễn phí Mika/70 cặp tha động từ- tự động từ n4.pdf` | `.pdf` | N4 | REFERENCE | 1520.2 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 5 | `Kho tài liệu N4 miễn phí Mika/Goukaku_Dekiru_N4.5 (Đề thi).zip` | `.zip` | N4 | EXAM | 267113.0 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 6 | `Kho tài liệu N4 miễn phí Mika/Goukaku_Dekiru_N4.5.pdf` | `.pdf` | N4 | EXAM | 198623.1 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 7 | `Kho tài liệu N4 miễn phí Mika/Kanji Master N4.pdf` | `.pdf` | N4 | REFERENCE | 39807.1 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 8 | `Kho tài liệu N4 miễn phí Mika/Kanji look and learn.pdf` | `.pdf` | N4 | REFERENCE | 75885.8 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 9 | `Kho tài liệu N4 miễn phí Mika/Luyện Dịch Minna no II - Topikku 25..pdf` | `.pdf` | N4 | TEXTBOOK | 37461.3 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 10 | `Kho tài liệu N4 miễn phí Mika/Minna no Nihongo II -  Bunkei Renshuuchou.pdf` | `.pdf` | N4 | TEXTBOOK | 23082.4 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 11 | `Kho tài liệu N4 miễn phí Mika/Minna no Nihongo II -  Kaite Oboeru.pdf` | `.pdf` | N4 | TEXTBOOK | 23082.4 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 12 | `Kho tài liệu N4 miễn phí Mika/N4R.pdf` | `.pdf` | N4 | REFERENCE | 2712.1 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 13 | `Kho tài liệu N4 miễn phí Mika/So tay tu vung N4.pdf` | `.pdf` | N4 | REFERENCE | 15753.9 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 14 | `Kho tài liệu N4 miễn phí Mika/Sách Minnano 2. GIẢI THÍCH NGỮ PHÁP N4.pdf` | `.pdf` | N4 | TEXTBOOK | 61683.6 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 15 | `Kho tài liệu N4 miễn phí Mika/[Tailieutiengnhat.net]_63-mau-cau-ngu-phap-n4.pdf` | `.pdf` | N4 | REFERENCE | 469.8 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 16 | `Kho tài liệu N4 miễn phí Mika/bo_de_thi_thu_ky_thi_nang_luc_tieng_nhat_n4_2984.pdf` | `.pdf` | N4 | REFERENCE | 33235.9 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 17 | `Kho tài liệu N4 miễn phí Mika/flashcard-kanji-n4.pdf` | `.pdf` | N4 | REFERENCE | 2314.3 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 18 | `Kho tài liệu N4 miễn phí Mika/Đề thi  N4 (2).pdf` | `.pdf` | N4 | EXAM | 1672.3 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 19 | `Kho tài liệu N4 miễn phí Mika/Đề thi N4 .pdf` | `.pdf` | N4 | EXAM | 1319.0 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 20 | `Kho Tài liệu N3 miễn phí Mika/20日で合格N3 Live tháng 11(Hà Tuyền).pdf` | `.pdf` | N3 | REFERENCE | 13810.5 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 21 | `Kho Tài liệu N3 miễn phí Mika/2136-kanji-thuong-dung.pdf` | `.pdf` | N3 | REFERENCE | 3574.8 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 22 | `Kho Tài liệu N3 miễn phí Mika/214 bộ thủ bằng hình ảnh.pdf` | `.pdf` | N3 | REFERENCE | 12981.4 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 23 | `Kho Tài liệu N3 miễn phí Mika/FULL - 26 DE - 日本語能力試験N3.pdf` | `.pdf` | N3 | EXAM | 15139.2 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 24 | `Kho Tài liệu N3 miễn phí Mika/Giáo án ngữ pháp N3 mimikara.pdf` | `.pdf` | N3 | TEXTBOOK | 2365.8 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 25 | `Kho Tài liệu N3 miễn phí Mika/Kanji master N3.pdf` | `.pdf` | N3 | REFERENCE | 23134.6 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 26 | `Kho Tài liệu N3 miễn phí Mika/Khái quát về Kanji cần biết.pptx` | `.pptx` | N3 | REFERENCE | 798.4 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 27 | `Kho Tài liệu N3 miễn phí Mika/Mimi_Kara_Oboeru_N3-Bunpou.pdf` | `.pdf` | N3 | TEXTBOOK | 38247.4 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 28 | `Kho Tài liệu N3 miễn phí Mika/Mimi_Kara_Oboeru_N3-Goi.pdf` | `.pdf` | N3 | TEXTBOOK | 63324.8 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 29 | `Kho Tài liệu N3 miễn phí Mika/Mimikara N3- BT ngữ pháp.pdf` | `.pdf` | N3 | TEXTBOOK | 38247.4 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 30 | `Kho Tài liệu N3 miễn phí Mika/Power doriru từ vựng n3 (Hà Tuyền).pdf` | `.pdf` | N3 | REFERENCE | 13307.8 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 31 | `Kho Tài liệu N3 miễn phí Mika/Shin_Kanzen_Master_N3-Bunpou & 宿題pdf.pdf` | `.pdf` | N3 | REFERENCE | 235819.7 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 32 | `Kho Tài liệu N3 miễn phí Mika/Shin_Kanzen_Master_N3-Dokkai.pdf` | `.pdf` | N3 | REFERENCE | 198871.5 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 33 | `Kho Tài liệu N3 miễn phí Mika/Soumatome N3 Kanji.pdf` | `.pdf` | N3 | REFERENCE | 46575.9 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 34 | `Kho Tài liệu N3 miễn phí Mika/Tailieuhoctiengnhat.com_tu-vung-shinkanzen-n3.pdf` | `.pdf` | N3 | TEXTBOOK | 4048.4 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 35 | `Kho Tài liệu N3 miễn phí Mika/Thẻ ghi nhớ_ Shinkanzen - N3 - Bunpou - 260 _ Quizlet.pdf` | `.pdf` | N3 | TEXTBOOK | 493.2 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 36 | `Kho Tài liệu N3 miễn phí Mika/Tổng hợp 1000 Kanji thông dụng N5-N3 .pdf` | `.pdf` | N5 | REFERENCE | 7414.6 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 37 | `Kho Tài liệu N3 miễn phí Mika/Tổng hợp 125_NGỮ PHÁP N3.pdf` | `.pdf` | N3 | REFERENCE | 26749.8 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 38 | `Kho Tài liệu N3 miễn phí Mika/Tổng hợp 191 động từ N3.pdf` | `.pdf` | N3 | REFERENCE | 4958.2 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 39 | `Kho Tài liệu N3 miễn phí Mika/Tổng hợp 50 mẫu NP thường xuyên xuất hiện trong đề thi JLPT.pdf` | `.pdf` | N3 | EXAM | 2337.0 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 40 | `Kho Tài liệu N3 miễn phí Mika/Tổng hợp Mondai 4 trong JLPT N3. Tìm từ đồng nghĩapdf.pdf` | `.pdf` | N3 | EXAM | 5696.0 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 41 | `Kho Tài liệu N3 miễn phí Mika/Tổng hợp thẻ học kanji N3.pdf` | `.pdf` | N3 | REFERENCE | 4396.6 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 42 | `Kho Tài liệu N3 miễn phí Mika/Từ vựng Mimikara N3.pdf` | `.pdf` | N3 | TEXTBOOK | 19216.0 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 43 | `Kho Tài liệu N3 miễn phí Mika/Từ vựng shinkanzen n3.pdf` | `.pdf` | N3 | TEXTBOOK | 63324.8 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 44 | `Kho Tài liệu N3 miễn phí Mika/[Tailieutiengnhat.net]_367-kanji-n3.pdf` | `.pdf` | N3 | REFERENCE | 895.4 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 45 | `Kho Tài liệu N3 miễn phí Mika/[Tailieutiengnhat.net]_80-tu-kanji-de-nham-lan-trong-de-thi-jlpt.pdf` | `.pdf` | N3 | REFERENCE | 2864.4 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 46 | `Kho Tài liệu N3 miễn phí Mika/ngu-phap-shinkanzen-n3. Tieng Viet.pdf` | `.pdf` | N3 | TEXTBOOK | 668.4 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 47 | `Kho Tài liệu N3 miễn phí Mika/power doriru bunnpou-rotated.pdf` | `.pdf` | N3 | REFERENCE | 12732.7 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 48 | `Kho Tài liệu N3 miễn phí Mika/tan go.pdf` | `.pdf` | N3 | REFERENCE | 1029.4 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 49 | `Kho Tài liệu N3 miễn phí Mika/tinh-tu-thuong-xuat-hien-trong-jlpt-n3.pdf` | `.pdf` | N3 | REFERENCE | 426.4 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 50 | `Kho Tài liệu N3 miễn phí Mika/từ vựng try.pdf` | `.pdf` | N3 | TEXTBOOK | 1064.1 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 51 | `Kho Tài liệu N3 miễn phí Mika/ĐỀ-N3-7-2010.pdf` | `.pdf` | N3 | EXAM | 743.3 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 52 | `Kho Tài liệu N3 miễn phí Mika/đề thi.pdf` | `.pdf` | N3 | EXAM | 34849.1 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 53 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai.pdf` | `.pdf` | N3 | TEXTBOOK | 5044.2 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 54 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/01 - Track 01.mp3` | `.mp3` | N3 | AUDIO | 339.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 55 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/02 - Track 02.mp3` | `.mp3` | N3 | AUDIO | 2916.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 56 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/03 - Track 03.mp3` | `.mp3` | N3 | AUDIO | 2089.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 57 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/04 - Track 04.mp3` | `.mp3` | N3 | AUDIO | 2246.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 58 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/05 - Track 05.mp3` | `.mp3` | N3 | AUDIO | 2175.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 59 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/06 - Track 06.mp3` | `.mp3` | N3 | AUDIO | 2157.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 60 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/07 - Track 07.mp3` | `.mp3` | N3 | AUDIO | 2453.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 61 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/08 - Track 08.mp3` | `.mp3` | N3 | AUDIO | 2648.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 62 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/09 - Track 09.mp3` | `.mp3` | N3 | AUDIO | 2716.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 63 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/10 - Track 10.mp3` | `.mp3` | N3 | AUDIO | 2181.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 64 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/11 - Track 11.mp3` | `.mp3` | N3 | AUDIO | 2494.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 65 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/12 - Track 12.mp3` | `.mp3` | N3 | AUDIO | 2405.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 66 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/13 - Track 13.mp3` | `.mp3` | N3 | AUDIO | 3137.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 67 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/14 - Track 14.mp3` | `.mp3` | N3 | AUDIO | 3267.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 68 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/15 - Track 15.mp3` | `.mp3` | N3 | AUDIO | 2950.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 69 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/16 - Track 16.mp3` | `.mp3` | N3 | AUDIO | 3563.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 70 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/17 - Track 17.mp3` | `.mp3` | N3 | AUDIO | 3064.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 71 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/18 - Track 18.mp3` | `.mp3` | N3 | AUDIO | 3177.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 72 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/19 - Track 19.mp3` | `.mp3` | N3 | AUDIO | 2875.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 73 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/20 - Track 20.mp3` | `.mp3` | N3 | AUDIO | 2497.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 74 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/21 - Track 21.mp3` | `.mp3` | N3 | AUDIO | 2694.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 75 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/22 - Track 22.mp3` | `.mp3` | N3 | AUDIO | 2533.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 76 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/23 - Track 23.mp3` | `.mp3` | N3 | AUDIO | 2884.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 77 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/24 - Track 24.mp3` | `.mp3` | N3 | AUDIO | 3478.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 78 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/25 - Track 25.mp3` | `.mp3` | N3 | AUDIO | 2876.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 79 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/26 - Track 26.mp3` | `.mp3` | N3 | AUDIO | 2921.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 80 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/27 - Track 27.mp3` | `.mp3` | N3 | AUDIO | 3085.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 81 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/28 - Track 28.mp3` | `.mp3` | N3 | AUDIO | 3147.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 82 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/29 - Track 29.mp3` | `.mp3` | N3 | AUDIO | 4211.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 83 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/30 - Track 30.mp3` | `.mp3` | N3 | AUDIO | 4806.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 84 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/31 - Track 31.mp3` | `.mp3` | N3 | AUDIO | 2908.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 85 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/32 - Track 32.mp3` | `.mp3` | N3 | AUDIO | 3102.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 86 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/33 - Track 33.mp3` | `.mp3` | N3 | AUDIO | 3615.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 87 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/34 - Track 34.mp3` | `.mp3` | N3 | AUDIO | 4033.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 88 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/35 - Track 35.mp3` | `.mp3` | N3 | AUDIO | 3355.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 89 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/36 - Track 36.mp3` | `.mp3` | N3 | AUDIO | 2571.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 90 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/37 - Track 37.mp3` | `.mp3` | N3 | AUDIO | 2479.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 91 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/38 - Track 38.mp3` | `.mp3` | N3 | AUDIO | 2873.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 92 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/39 - Track 39.mp3` | `.mp3` | N3 | AUDIO | 2862.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 93 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/40 - Track 40.mp3` | `.mp3` | N3 | AUDIO | 2784.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 94 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/41 - Track 41.mp3` | `.mp3` | N3 | AUDIO | 2955.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 95 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/42 - Track 42.mp3` | `.mp3` | N3 | AUDIO | 3754.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 96 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/43 - Track 43.mp3` | `.mp3` | N3 | AUDIO | 2707.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 97 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/44 - Track 44.mp3` | `.mp3` | N3 | AUDIO | 3846.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 98 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/45 - Track 45.mp3` | `.mp3` | N3 | AUDIO | 3716.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 99 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/46 - Track 46.mp3` | `.mp3` | N3 | AUDIO | 3802.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 100 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/47 - Track 47.mp3` | `.mp3` | N3 | AUDIO | 3666.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 101 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/48 - Track 48.mp3` | `.mp3` | N3 | AUDIO | 3457.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 102 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/49 - Track 49.mp3` | `.mp3` | N3 | AUDIO | 2865.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 103 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/50 - Track 50.mp3` | `.mp3` | N3 | AUDIO | 3101.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 104 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/51 - Track 51.mp3` | `.mp3` | N3 | AUDIO | 1853.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 105 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/52 - Track 52.mp3` | `.mp3` | N3 | AUDIO | 1192.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 106 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/53 - Track 53.mp3` | `.mp3` | N3 | AUDIO | 1113.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 107 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/54 - Track 54.mp3` | `.mp3` | N3 | AUDIO | 1290.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 108 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/55 - Track 55.mp3` | `.mp3` | N3 | AUDIO | 1482.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 109 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/56 - Track 56.mp3` | `.mp3` | N3 | AUDIO | 1289.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 110 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/57 - Track 57.mp3` | `.mp3` | N3 | AUDIO | 1293.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 111 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/58 - Track 58.mp3` | `.mp3` | N3 | AUDIO | 1262.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 112 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/59 - Track 59.mp3` | `.mp3` | N3 | AUDIO | 1368.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 113 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/60 - Track 60.mp3` | `.mp3` | N3 | AUDIO | 1276.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 114 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/61 - Track 61.mp3` | `.mp3` | N3 | AUDIO | 1190.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 115 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/62 - Track 62.mp3` | `.mp3` | N3 | AUDIO | 1385.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 116 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/63 - Track 63.mp3` | `.mp3` | N3 | AUDIO | 1332.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 117 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/64 - Track 64.mp3` | `.mp3` | N3 | AUDIO | 1251.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 118 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/65 - Track 65.mp3` | `.mp3` | N3 | AUDIO | 1128.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 119 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/66 - Track 66.mp3` | `.mp3` | N3 | AUDIO | 1160.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 120 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/67 - Track 67.mp3` | `.mp3` | N3 | AUDIO | 1450.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 121 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/68 - Track 68.mp3` | `.mp3` | N3 | AUDIO | 1663.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 122 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/69 - Track 69.mp3` | `.mp3` | N3 | AUDIO | 1570.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 123 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/70 - Track 70.mp3` | `.mp3` | N3 | AUDIO | 713.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 124 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/71 - Track 71.mp3` | `.mp3` | N3 | AUDIO | 799.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 125 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/72 - Track 72.mp3` | `.mp3` | N3 | AUDIO | 792.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 126 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/73 - Track 73.mp3` | `.mp3` | N3 | AUDIO | 803.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 127 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/74 - Track 74.mp3` | `.mp3` | N3 | AUDIO | 849.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 128 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/75 - Track 75.mp3` | `.mp3` | N3 | AUDIO | 793.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 129 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/76 - Track 76.mp3` | `.mp3` | N3 | AUDIO | 758.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 130 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/77 - Track 77.mp3` | `.mp3` | N3 | AUDIO | 827.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 131 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/78 - Track 78.mp3` | `.mp3` | N3 | AUDIO | 762.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 132 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/79 - Track 79.mp3` | `.mp3` | N3 | AUDIO | 769.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 133 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/80 - Track 80.mp3` | `.mp3` | N3 | AUDIO | 792.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 134 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/81 - Track 81.mp3` | `.mp3` | N3 | AUDIO | 934.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 135 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD1/82 - Track 82.mp3` | `.mp3` | N3 | AUDIO | 1029.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 136 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/01 - Track 01.mp3` | `.mp3` | N3 | AUDIO | 4566.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 137 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/02 - Track 02.mp3` | `.mp3` | N3 | AUDIO | 7792.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 138 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/03 - Track 03.mp3` | `.mp3` | N3 | AUDIO | 3449.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 139 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/04 - Track 04.mp3` | `.mp3` | N3 | AUDIO | 2396.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 140 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/05 - Track 05.mp3` | `.mp3` | N3 | AUDIO | 3850.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 141 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/06 - Track 06.mp3` | `.mp3` | N3 | AUDIO | 3058.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 142 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/07 - Track 07.mp3` | `.mp3` | N3 | AUDIO | 3020.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 143 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/08 - Track 08.mp3` | `.mp3` | N3 | AUDIO | 3375.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 144 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/09 - Track 09.mp3` | `.mp3` | N3 | AUDIO | 4179.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 145 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/10 - Track 10.mp3` | `.mp3` | N3 | AUDIO | 3438.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 146 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/11 - Track 11.mp3` | `.mp3` | N3 | AUDIO | 3844.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 147 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/12 - Track 12.mp3` | `.mp3` | N3 | AUDIO | 3933.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 148 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/13 - Track 13.mp3` | `.mp3` | N3 | AUDIO | 3900.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 149 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/14 - Track 14.mp3` | `.mp3` | N3 | AUDIO | 4149.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 150 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/15 - Track 15.mp3` | `.mp3` | N3 | AUDIO | 4473.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 151 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/16 - Track 16.mp3` | `.mp3` | N3 | AUDIO | 4050.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 152 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/17 - Track 17.mp3` | `.mp3` | N3 | AUDIO | 4464.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 153 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/18 - Track 18.mp3` | `.mp3` | N3 | AUDIO | 2102.3 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 154 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/19 - Track 19.mp3` | `.mp3` | N3 | AUDIO | 1379.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 155 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/20 - Track 20.mp3` | `.mp3` | N3 | AUDIO | 1569.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 156 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/21 - Track 21.mp3` | `.mp3` | N3 | AUDIO | 1651.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 157 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/22 - Track 22.mp3` | `.mp3` | N3 | AUDIO | 2161.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 158 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/23 - Track 23.mp3` | `.mp3` | N3 | AUDIO | 1370.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 159 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/24 - Track 24.mp3` | `.mp3` | N3 | AUDIO | 1324.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 160 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/25 - Track 25.mp3` | `.mp3` | N3 | AUDIO | 1139.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 161 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/26 - Track 26.mp3` | `.mp3` | N3 | AUDIO | 1184.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 162 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/27 - Track 27.mp3` | `.mp3` | N3 | AUDIO | 1248.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 163 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/28 - Track 28.mp3` | `.mp3` | N3 | AUDIO | 1090.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 164 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/29 - Track 29.mp3` | `.mp3` | N3 | AUDIO | 1320.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 165 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/30 - Track 30.mp3` | `.mp3` | N3 | AUDIO | 1272.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 166 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/31 - Track 31.mp3` | `.mp3` | N3 | AUDIO | 3524.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 167 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/32 - Track 32.mp3` | `.mp3` | N3 | AUDIO | 2913.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 168 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/33 - Track 33.mp3` | `.mp3` | N3 | AUDIO | 3194.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 169 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/34 - Track 34.mp3` | `.mp3` | N3 | AUDIO | 2895.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 170 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/35 - Track 35.mp3` | `.mp3` | N3 | AUDIO | 3607.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 171 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/36 - Track 36.mp3` | `.mp3` | N3 | AUDIO | 3164.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 172 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/37 - Track 37.mp3` | `.mp3` | N3 | AUDIO | 4457.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 173 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/38 - Track 38.mp3` | `.mp3` | N3 | AUDIO | 3699.2 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 174 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/39 - Track 39.mp3` | `.mp3` | N3 | AUDIO | 3382.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 175 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/40 - Track 40.mp3` | `.mp3` | N3 | AUDIO | 4065.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 176 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/41 - Track 41.mp3` | `.mp3` | N3 | AUDIO | 4158.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 177 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/42 - Track 42.mp3` | `.mp3` | N3 | AUDIO | 4440.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 178 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/43 - Track 43.mp3` | `.mp3` | N3 | AUDIO | 5060.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 179 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/44 - Track 44.mp3` | `.mp3` | N3 | AUDIO | 4795.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 180 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/45 - Track 45.mp3` | `.mp3` | N3 | AUDIO | 4390.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 181 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/46 - Track 46.mp3` | `.mp3` | N3 | AUDIO | 2579.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 182 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/47 - Track 47.mp3` | `.mp3` | N3 | AUDIO | 1508.4 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 183 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/48 - Track 48.mp3` | `.mp3` | N3 | AUDIO | 1591.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 184 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/49 - Track 49.mp3` | `.mp3` | N3 | AUDIO | 1793.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 185 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/50 - Track 50.mp3` | `.mp3` | N3 | AUDIO | 2185.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 186 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/51 - Track 51.mp3` | `.mp3` | N3 | AUDIO | 1013.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 187 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/52 - Track 52.mp3` | `.mp3` | N3 | AUDIO | 1178.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 188 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/53 - Track 53.mp3` | `.mp3` | N3 | AUDIO | 1288.0 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 189 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/54 - Track 54.mp3` | `.mp3` | N3 | AUDIO | 1120.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 190 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/55 - Track 55.mp3` | `.mp3` | N3 | AUDIO | 1082.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 191 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/56 - Track 56.mp3` | `.mp3` | N3 | AUDIO | 1179.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 192 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/57 - Track 57.mp3` | `.mp3` | N3 | AUDIO | 1285.9 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 193 | `Kho Tài liệu N3 miễn phí Mika/Speed_Master_N3-Choukai/Speed_Master_N3-Choukai-AudioCD2/58 - Track 58.mp3` | `.mp3` | N3 | AUDIO | 1465.5 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 194 | `Kho tài liệu N5/120 Kanji cơ bản sơ cấp.pdf` | `.pdf` | N5 | REFERENCE | 2725.6 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 195 | `Kho tài liệu N5/160-kanji-n5-n4　(kèm luyện viết, minh họa).pdf` | `.pdf` | N5 | REFERENCE | 14566.6 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 196 | `Kho tài liệu N5/214 bộ thủ bằng hình ảnh.pdf` | `.pdf` | N5 | REFERENCE | 12981.4 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 197 | `Kho tài liệu N5/Bài tập tiếng Nhật sơ cấp 1.pdf` | `.pdf` | N5 | REFERENCE | 9562.3 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 198 | `Kho tài liệu N5/Khái quát về Kanji cần biết.pptx` | `.pptx` | N5 | REFERENCE | 798.4 KB | `DUPLICATE` | `DUPLICATE` | `METADATA_ONLY` |
| 199 | `Kho tài liệu N5/Luyen-viet-Kanji-N5.pdf` | `.pdf` | N5 | REFERENCE | 4924.3 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 200 | `Kho tài liệu N5/Minna No Nihongo I - Honsatsu.pdf` | `.pdf` | N5 | TEXTBOOK | 7990.2 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 201 | `Kho tài liệu N5/Minna no Nihongo I - Shokyuu de Yomeru Topikku 25.pdf` | `.pdf` | N5 | TEXTBOOK | 16302.9 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 202 | `Kho tài liệu N5/Minna_No_Nihongo_I-Sach_dich_Tieng_Viet.pdf` | `.pdf` | N5 | TEXTBOOK | 46421.3 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 203 | `Kho tài liệu N5/Sách tập viết Hiragana _  Katakana.pdf` | `.pdf` | N5 | REFERENCE | 4360.6 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 204 | `Kho tài liệu N5/Sách Kanji Master N5.pdf` | `.pdf` | N5 | REFERENCE | 14952.3 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 205 | `Kho tài liệu N5/Tong-hop-tu-vung-N5.pdf` | `.pdf` | N5 | REFERENCE | 14516.2 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 206 | `Kho tài liệu N5/Từ vựng N5.pdf` | `.pdf` | N5 | REFERENCE | 50158.9 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 207 | `Kho tài liệu N5/Tổng hợp kanji N5.pdf` | `.pdf` | N5 | REFERENCE | 11772.3 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 208 | `Kho tài liệu N5/Tổng hợp ngữ pháp N5.pdf` | `.pdf` | N5 | REFERENCE | 23318.9 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 209 | `Kho tài liệu N5/[LUYỆN ĐỀ TỔNG HỢP] - [N4-N5 GOUKAKU DEKIRU] - [ĐẠI HOÀ JA].pdf` | `.pdf` | N5 | EXAM | 9075.4 KB | `NOT_IMPORTED` | `IMPORTED` | `VIEW_ONLY` |
| 210 | `Kho tài liệu N5/[Tailieutiengnhat.net]_8-de-thi-thu-jlpt-n5.pdf` | `.pdf` | N5 | REFERENCE | 14970.2 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 211 | `Kho tài liệu N5/[Tailieutiengnhat.net]_pho-tu-tu-dong-tu-tha-dong-tu-trong-tieng-nhat.pdf` | `.pdf` | N5 | REFERENCE | 1695.7 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 212 | `Kho tài liệu N5/Đếm tiếng nhật.pdf` | `.pdf` | N5 | REFERENCE | 195.8 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 213 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_01.mp4` | `.mp4` | N5 | VIDEO | 7877.2 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 214 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_02.mp4` | `.mp4` | N5 | VIDEO | 13403.8 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 215 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_03.mp4` | `.mp4` | N5 | VIDEO | 22487.2 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 216 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_04.mp4` | `.mp4` | N5 | VIDEO | 22244.1 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 217 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_05.mp4` | `.mp4` | N5 | VIDEO | 23000.6 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 218 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_06.mp4` | `.mp4` | N5 | VIDEO | 10478.0 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 219 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_07.mp4` | `.mp4` | N5 | VIDEO | 19784.9 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 220 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_08.mp4` | `.mp4` | N5 | VIDEO | 17418.8 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 221 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_09.mp4` | `.mp4` | N5 | VIDEO | 20465.2 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 222 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_10.mp4` | `.mp4` | N5 | VIDEO | 25974.2 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 223 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_11.mp4` | `.mp4` | N5 | VIDEO | 14783.5 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 224 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_12.mp4` | `.mp4` | N5 | VIDEO | 11468.7 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 225 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_13.mp4` | `.mp4` | N5 | VIDEO | 24932.7 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 226 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_14.mp4` | `.mp4` | N5 | VIDEO | 28447.5 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 227 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_15.mp4` | `.mp4` | N5 | VIDEO | 16282.0 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 228 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_16.mp4` | `.mp4` | N5 | VIDEO | 30133.3 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 229 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_17.mp4` | `.mp4` | N5 | VIDEO | 29257.7 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 230 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_18.mp4` | `.mp4` | N5 | VIDEO | 11479.3 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 231 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_19.mp4` | `.mp4` | N5 | VIDEO | 24480.6 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 232 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_20.mp4` | `.mp4` | N5 | VIDEO | 13208.0 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 233 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_21.mp4` | `.mp4` | N5 | VIDEO | 14655.7 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 234 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_22.mp4` | `.mp4` | N5 | VIDEO | 26355.8 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 235 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_23.mp4` | `.mp4` | N5 | VIDEO | 29332.6 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 236 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_24.mp4` | `.mp4` | N5 | VIDEO | 26613.0 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 237 | `Kho tài liệu N5/Video kaiwa/Minna_Shokyuu_Kaiwa_25.mp4` | `.mp4` | N5 | VIDEO | 9613.6 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 238 | `Kho tài liệu N5/Đề thi N5_2017/Bản sao của Từ vựng N5.pdf` | `.pdf` | N5 | REFERENCE | 50158.9 KB | `DUPLICATE` | `DUPLICATE` | `VIEW_ONLY` |
| 239 | `Kho tài liệu N5/Đề thi N5_2017/GIÁO ÁN 26-50 minna.rar` | `.rar` | N5 | TEXTBOOK | 407705.7 KB | `NOT_IMPORTED` | `IMPORTED` | `METADATA_ONLY` |
| 240 | `Kho tài liệu N5/Đề thi N5_2017/N5Q1.mp3` | `.mp3` | N5 | AUDIO | 2852.8 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 241 | `Kho tài liệu N5/Đề thi N5_2017/N5Q2.mp3` | `.mp3` | N5 | AUDIO | 2659.7 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 242 | `Kho tài liệu N5/Đề thi N5_2017/N5Q3.mp3` | `.mp3` | N5 | AUDIO | 1185.6 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 243 | `Kho tài liệu N5/Đề thi N5_2017/N5Q4.mp3` | `.mp3` | N5 | AUDIO | 1156.1 KB | `NOT_IMPORTED` | `IMPORTED` | `AUDIO_STREAM` |
| 244 | `Kho tài liệu N5/Đề thi N5_2017/N5_Listening.pdf` | `.pdf` | N5 | EXAM | 1565.1 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 245 | `Kho tài liệu N5/Đề thi N5_2017/N5_ListeningScript.pdf` | `.pdf` | N5 | EXAM | 254.7 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 246 | `Kho tài liệu N5/Đề thi N5_2017/N5_Reading.pdf` | `.pdf` | N5 | EXAM | 710.0 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 247 | `Kho tài liệu N5/Đề thi N5_2017/N5_Vocabulary.pdf` | `.pdf` | N5 | EXAM | 1243.7 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 248 | `Kho tài liệu N5/Đề thi N5_2017/N5sheet.pdf` | `.pdf` | N5 | ANSWER_KEY | 1094.0 KB | `NOT_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
| 249 | `Kho tài liệu N5/Đề thi N5_2017/[Tailieutiengnhat.net]_tu-vung-mimi-kara-n5-n1.xlsx` | `.xlsx` | N5 | TEXTBOOK | 824.5 KB | `PARTIALLY_IMPORTED` | `IMPORTED` | `DOWNLOADABLE` |
