# -*- coding: utf-8 -*-
"""
Enrich OpenJLPT (N5, N4, N3) with high-quality Vietnamese definitions.
Prepares clean records ready for Prisma ingestion.
"""

import json
import os
import re

# Common English to Vietnamese translation dictionary for JLPT terms
EN_VI_COMMON = {
    # Pronouns & People
    "I": "Tôi",
    "me": "Tôi",
    "you": "Bạn / Anh / Chị",
    "he": "Anh ấy",
    "she": "Cô ấy",
    "we": "Chúng tôi",
    "they": "Họ / Chúng nó",
    "friend": "Bạn bè",
    "person": "Người",
    "people": "Mọi người",
    "teacher": "Thầy cô giáo / Giáo viên",
    "student": "Học sinh / Sinh viên",
    "doctor": "Bác sĩ",
    "child": "Trẻ em / Đứa trẻ",
    "children": "Trẻ em / Con cái",
    "man": "Người đàn ông",
    "woman": "Người phụ nữ",
    "father": "Bố / Cha",
    "mother": "Mẹ",
    "older brother": "Anh trai",
    "older sister": "Chị gái",
    "younger brother": "Em trai",
    "younger sister": "Em gái",
    "family": "Gia đình",
    "parents": "Bố mẹ / Phụ huynh",

    # Common Actions / Verbs
    "to meet": "Gặp gỡ",
    "to open": "Mở ra",
    "to give": "Cho / Tặng",
    "to play": "Chơi đùa / Vui chơi",
    "to wash": "Rửa / Giặt",
    "to say": "Nói",
    "to go": "Đi",
    "to be": "Có / Ở (tồn tại)",
    "to put": "Đặt / Để",
    "to send": "Gửi / Tiễn",
    "to push": "Ấn / Bấm / Đẩy",
    "to remember": "Nhớ lại / Ghi nhớ",
    "to swim": "Bơi",
    "to get off": "Xuống (tàu xe)",
    "to finish": "Kết thúc / Hoàn thành",
    "to buy": "Mua",
    "to return": "Trở về / Trả lại",
    "to write": "Viết",
    "to lend": "Cho vay / Cho mượn",
    "to listen": "Lắng nghe",
    "to hear": "Nghe thấy",
    "to cut": "Cắt",
    "to wear": "Mặc / Đội",
    "to come": "Đến / Tới",
    "to answer": "Trả lời",
    "to eat": "Ăn",
    "to drink": "Uống",
    "to read": "Đọc",
    "to see": "Nhìn / Xem",
    "to look": "Ngắm nhìn",
    "to watch": "Xem (phim, TV)",
    "to speak": "Nói chuyện / Trò chuyện",
    "to talk": "Trò chuyện",
    "to sleep": "Ngủ / Đi ngủ",
    "to wake up": "Thức dậy",
    "to stand": "Đứng dậy",
    "to sit": "Ngồi xuống",
    "to walk": "Đi bộ",
    "to run": "Chạy",
    "to work": "Làm việc",
    "to study": "Học tập",
    "to learn": "Học hỏi",
    "to teach": "Dạy dỗ / Chỉ dẫn",
    "to wait": "Chờ đợi",
    "to live": "Sinh sống / Trú ngụ",
    "to enter": "Bước vào",
    "to exit": "Đi ra",
    "to leave": "Rời đi",
    "to die": "Qua đời / Chết",
    "to know": "Biết",
    "to understand": "Hiểu",
    "to think": "Nghĩ / Suy nghĩ",
    "to make": "Làm / Chế tạo",
    "to take": "Cầm / Lấy / Chụp (ảnh)",
    "to hold": "Cầm / Nắm",
    "to use": "Sử dụng",
    "to help": "Giúp đỡ",
    "to call": "Gọi / Kêu gọi",
    "to show": "Cho xem / Cho thấy",
    "to ask": "Hỏi / Xin",
    "to find": "Tìm thấy",
    "to search": "Tìm kiếm",
    "to begin": "Bắt đầu",
    "to start": "Khởi đầu",
    "to stop": "Dừng lại",
    "to fly": "Bay",
    "to carry": "Mang vác / Vận chuyển",
    "to forget": "Quên",
    "to lose": "Đánh mất / Thua cuộc",
    "to win": "Chiến thắng",
    "to choose": "Lựa chọn",
    "to decide": "Quyết định",
    "to remember": "Nhớ lại",
    "to tell": "Kể lại / Truyền đạt",
    "to try": "Cố gắng / Thử",
    "to feel": "Cảm thấy",
    "to hope": "Hy vọng",
    "to wish": "Cầu chúc",

    # Adjectives
    "big": "To, lớn",
    "large": "Lớn, rộng",
    "small": "Nhỏ bé",
    "little": "Ít, nhỏ",
    "new": "Mới",
    "old": "Cũ, già",
    "good": "Tốt, hay",
    "bad": "Xấu, tồi",
    "hot": "Nóng",
    "cold": "Lạnh",
    "warm": "Ấm áp",
    "cool": "Mát mẻ",
    "high": "Cao",
    "tall": "Cao (dáng người)",
    "low": "Thấp",
    "expensive": "Đắt đỏ",
    "cheap": "Rẻ",
    "fast": "Nhanh",
    "quick": "Nhanh chóng",
    "slow": "Chậm chạp",
    "early": "Sớm",
    "late": "Muộn, trễ",
    "easy": "Dễ dàng",
    "difficult": "Khó khăn",
    "hard": "Khó / Cứng",
    "soft": "Mềm mại",
    "near": "Gần",
    "close": "Gần gũi",
    "far": "Xa xôi",
    "distant": "Xa xăm",
    "long": "Dài",
    "short": "Ngắn",
    "heavy": "Nặng",
    "light": "Nhẹ / Sáng",
    "bright": "Sáng sủa",
    "dark": "Tối tăm",
    "quiet": "Yên tĩnh",
    "noisy": "Ồn ào",
    "busy": "Bận rộn",
    "free": "Rảnh rỗi / Miễn phí",
    "happy": "Hạnh phúc / Vui vẻ",
    "sad": "Buồn bã",
    "fun": "Vui nhộn",
    "interesting": "Thú vị",
    "boring": "Nhàm chán",
    "delicious": "Ngon miệng",
    "tasty": "Ngon",
    "sweet": "Ngọt",
    "spicy": "Cay",
    "bitter": "Đắng",
    "salty": "Mặn",
    "sour": "Chua",
    "clean": "Sạch sẽ",
    "dirty": "Bẩn thỉu",
    "safe": "An toàn",
    "dangerous": "Nguy hiểm",
    "convenient": "Tiện lợi",
    "inconvenient": "Bất tiện",
    "famous": "Nổi tiếng",
    "kind": "Tử tế / Tốt bụng",
    "healthy": "Khỏe mạnh",
    "strong": "Mạnh mẽ",
    "weak": "Yếu ớt",
    "beautiful": "Đẹp / Xinh đẹp",
    "pretty": "Xinh xắn",
    "cute": "Dễ thương",

    # Common Nouns
    "water": "Nước",
    "tea": "Trà",
    "coffee": "Cà phê",
    "milk": "Sữa",
    "rice": "Cơm / Gạo",
    "bread": "Bánh mì",
    "meat": "Thịt",
    "fish": "Cá",
    "vegetable": "Rau củ",
    "fruit": "Trái cây",
    "apple": "Táo",
    "egg": "Trứng",
    "meal": "Bữa ăn",
    "breakfast": "Bữa sáng",
    "lunch": "Bữa trưa",
    "dinner": "Bữa tối",
    "school": "Trường học",
    "university": "Đại học",
    "classroom": "Phòng học",
    "station": "Nhà ga",
    "airport": "Sân bay",
    "hospital": "Bệnh viện",
    "bank": "Ngân hàng",
    "park": "Công viên",
    "library": "Thư viện",
    "shop": "Cửa hàng",
    "store": "Cửa tiệm",
    "restaurant": "Nhà hàng / Quán ăn",
    "hotel": "Khách sạn",
    "house": "Ngôi nhà",
    "home": "Nhà",
    "room": "Căn phòng",
    "car": "Xe hơi / Ô tô",
    "train": "Tàu hỏa / Tàu điện",
    "bus": "Xe buýt",
    "bicycle": "Xe đạp",
    "airplane": "Máy bay",
    "book": "Cuốn sách",
    "magazine": "Tạp chí",
    "newspaper": "Tờ báo",
    "letter": "Bức thư",
    "photo": "Bức ảnh",
    "music": "Âm nhạc",
    "movie": "Bộ phim",
    "time": "Thời gian",
    "hour": "Giờ",
    "minute": "Phút",
    "day": "Ngày",
    "week": "Tuần",
    "month": "Tháng",
    "year": "Năm",
    "today": "Hôm nay",
    "tomorrow": "Ngày mai",
    "yesterday": "Hôm qua",
    "morning": "Buổi sáng",
    "afternoon": "Buổi chiều",
    "evening": "Buổi tối",
    "night": "Ban đêm",
    "weather": "Thời tiết",
    "rain": "Mưa",
    "snow": "Tuyết",
    "sun": "Mặt trời",
    "moon": "Mặt trăng",
    "star": "Ngôi sao",
    "sky": "Bầu trời",
    "sea": "Biển",
    "mountain": "Núi",
    "river": "Dòng sông",
    "tree": "Cái cây",
    "flower": "Bông hoa",
    "cat": "Con mèo",
    "dog": "Con chó",
    "bird": "Con chim",
    "money": "Tiền bạc",
    "price": "Giá cả",
    "telephone": "Điện thoại",
    "computer": "Máy vi tính",
    "bag": "Túi xách / Cặp",
    "shoes": "Đôi giày",
    "clothes": "Quần áo",
    "hat": "Cái mũ / Nón",
    "umbrella": "Cái ô / Dù",
    "watch": "Đồng hồ",
    "clock": "Đồng hồ treo tường",
    "key": "Chìa khóa",
    "problem": "Vấn đề / Câu hỏi",
    "question": "Câu hỏi",
    "answer": "Câu trả lời",
    "accident": "Tai nạn",
    "meeting": "Cuộc họp",
    "plan": "Kế hoạch",
    "schedule": "Lịch trình",
    "company": "Công ty",
    "office": "Văn phòng",
    "job": "Công việc",
    "work": "Công việc",
    "business": "Kinh doanh",
    "economy": "Kinh tế",
    "society": "Xã hội",
    "culture": "Văn hóa",
    "history": "Lịch sử",
    "language": "Ngôn ngữ",
    "word": "Từ ngữ",
    "meaning": "Ý nghĩa",
}

def translate_meaning(meanings_list, word, pos_list):
    """Derive clean, accurate Vietnamese translation from English meanings and dictionary."""
    if not meanings_list:
        return "Từ vựng tiếng Nhật"
    
    first = meanings_list[0].strip()
    clean_first = re.sub(r'\(.*?\)', '', first).strip().lower()
    
    # 1. Exact match in dictionary
    if first in EN_VI_COMMON:
        return EN_VI_COMMON[first]
    if clean_first in EN_VI_COMMON:
        return EN_VI_COMMON[clean_first]
    
    # 2. Check for "to [verb]"
    if clean_first.startswith("to "):
        base_verb = clean_first[3:].strip()
        if base_verb in EN_VI_COMMON:
            return EN_VI_COMMON[base_verb]
        if f"to {base_verb}" in EN_VI_COMMON:
            return EN_VI_COMMON[f"to {base_verb}"]
    
    # 3. Clean up multiple meanings: join up to 2 items
    parts = []
    for m in meanings_list[:2]:
        m_clean = re.sub(r'\(.*?\)', '', m).strip()
        if m_clean.lower() in EN_VI_COMMON:
            parts.append(EN_VI_COMMON[m_clean.lower()])
        else:
            # Fallback to capitalized english gloss if not in dict
            parts.append(m_clean)
    
    res = ", ".join(parts) if parts else first
    # Clean redundant punctuation
    res = re.sub(r'\s+', ' ', res).strip()
    return res

def normalize_pos(pos_list):
    if not pos_list:
        return "noun"
    s = " ".join(pos_list).lower()
    if "adj-i" in s or "i-adjective" in s:
        return "adjective"
    if "adj-na" in s or "na-adjective" in s:
        return "na-adjective"
    if "v5" in s or "v1" in s or "vk" in s or "vs" in s or "verb" in s:
        return "verb"
    if "adv" in s:
        return "adverb"
    if "prt" in s or "particle" in s:
        return "particle"
    if "exp" in s or "expression" in s:
        return "expression"
    if "pn" in s or "pronoun" in s:
        return "pronoun"
    return "noun"

def main():
    data_dir = "scripts/data_openjlpt"
    out_file = "scripts/data_openjlpt/enriched_vocab_to_import.json"
    
    all_candidates = []
    for level in ["n5", "n4", "n3"]:
        path = os.path.join(data_dir, f"{level}.json")
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            items = json.load(f)
            for it in items:
                word = it.get("word") or it.get("reading")
                kana = it.get("reading") or it.get("word")
                kanji = it.get("word") if it.get("word") != it.get("reading") else None
                romaji = it.get("romaji") or ""
                meanings = it.get("meanings", [])
                pos = normalize_pos(it.get("pos", []))
                meaning_vi = translate_meaning(meanings, word, it.get("pos", []))
                
                # Check for example
                examples = it.get("examples", [])
                example_jp = examples[0].get("ja") if examples else None
                example_en = examples[0].get("en") if examples else None
                
                all_candidates.append({
                    "word": word,
                    "kana": kana,
                    "kanji": kanji,
                    "romaji": romaji,
                    "meaning": meaning_vi,
                    "meaningEn": "; ".join(meanings),
                    "partOfSpeech": pos,
                    "jlptLevel": it.get("level", level.upper()),
                    "tags": f"JLPT {it.get('level', level.upper())}",
                    "exampleJapanese": example_jp,
                    "exampleRomaji": "",
                    "exampleMeaning": example_en,
                })
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(all_candidates, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully processed {len(all_candidates)} words into {out_file}")

if __name__ == "__main__":
    main()

