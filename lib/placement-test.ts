/**
 * Adaptive Placement Test Algorithm (Simplified IRT)
 *
 * Thuật toán này sử dụng mô hình lý thuyết đáp ứng khoản mục (Item Response Theory)
 * được đơn giản hóa để xếp lớp học viên (N5 -> N1).
 *
 * - Mỗi câu hỏi có một độ khó (difficulty) từ 0 đến 100.
 *   - N5: 0 - 20
 *   - N4: 21 - 40
 *   - N3: 41 - 60
 *   - N2: 61 - 80
 *   - N1: 81 - 100
 * - Học viên có một năng lực (ability / theta) tương ứng.
 * - Sau mỗi câu trả lời, năng lực được cập nhật dựa trên độ khó của câu hỏi.
 */

export type JLPTLevel = "BEGINNER" | "N5" | "N4" | "N3" | "N2" | "N1";

export interface PlacementQuestion {
  id: string;
  difficulty: number; // 0 - 100
  level: JLPTLevel;
  type: "VOCAB" | "GRAMMAR" | "KANJI" | "READING";
  question?: string;
  options?: string[];
  correctIndex?: number;
}

export interface PlacementState {
  estimatedAbility: number; // theta (0 - 100)
  questionsAsked: number;
  maxQuestions: number;
  history: Array<{ questionId: string; isCorrect: boolean; difficulty: number }>;
}

/**
 * Khởi tạo trạng thái ban đầu của bài kiểm tra.
 * Thường bắt đầu ở mốc N5/N4 (ability ~ 25)
 */
export function initPlacementTest(maxQuestions: number = 15): PlacementState {
  return {
    estimatedAbility: 25, // Bắt đầu ở ranh giới N5/N4
    questionsAsked: 0,
    maxQuestions,
    history: [],
  };
}

/**
 * Lựa chọn câu hỏi tiếp theo dựa trên năng lực hiện tại của người dùng.
 * @param state Trạng thái bài test hiện tại
 * @param availablePool Danh sách câu hỏi có sẵn trong DB
 * @returns Câu hỏi phù hợp nhất (chưa từng hỏi và có độ khó gần với estimatedAbility nhất)
 */
export function getNextQuestion(state: PlacementState, availablePool: PlacementQuestion[]): PlacementQuestion | null {
  if (state.questionsAsked >= state.maxQuestions) return null;

  const askedIds = new Set(state.history.map((h) => h.questionId));
  const unaskedPool = availablePool.filter((q) => !askedIds.has(q.id));

  if (unaskedPool.length === 0) return null;

  // Tìm câu hỏi có độ khó gần nhất với estimatedAbility
  return unaskedPool.reduce((closest, current) => {
    const currentDiff = Math.abs(current.difficulty - state.estimatedAbility);
    const closestDiff = Math.abs(closest.difficulty - state.estimatedAbility);
    return currentDiff < closestDiff ? current : closest;
  });
}

/**
 * Cập nhật năng lực (theta) sau khi người dùng trả lời.
 * Sử dụng ELO / IRT update rule cơ bản.
 * @param state Trạng thái hiện tại
 * @param question Câu hỏi vừa trả lời
 * @param isCorrect Đúng hay sai
 * @returns Trạng thái mới
 */
export function submitAnswer(state: PlacementState, question: PlacementQuestion, isCorrect: boolean): PlacementState {
  // Xác suất trả lời đúng dựa trên ability và difficulty (hàm Sigmoid)
  const probability = 1 / (1 + Math.pow(10, (question.difficulty - state.estimatedAbility) / 20));
  
  const actualScore = isCorrect ? 1 : 0;
  
  // Learning rate (K-factor) giảm dần khi số câu hỏi tăng lên để hội tụ
  const kFactor = Math.max(10, 30 - state.questionsAsked);
  
  // Cập nhật năng lực
  let newAbility = state.estimatedAbility + kFactor * (actualScore - probability);
  
  // Giới hạn ability trong khoảng 0 - 100
  newAbility = Math.max(0, Math.min(100, newAbility));

  return {
    estimatedAbility: newAbility,
    questionsAsked: state.questionsAsked + 1,
    maxQuestions: state.maxQuestions,
    history: [
      ...state.history,
      { questionId: question.id, isCorrect, difficulty: question.difficulty },
    ],
  };
}

/**
 * Kết luận cấp độ cuối cùng sau khi hoàn thành bài test.
 */
export function determineFinalLevel(state: PlacementState): JLPTLevel {
  const ability = state.estimatedAbility;
  
  if (ability < 10) return "BEGINNER";
  if (ability < 30) return "N5";
  if (ability < 50) return "N4";
  if (ability < 70) return "N3";
  if (ability < 85) return "N2";
  return "N1";
}



export const MOCK_PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  { id: "q1", difficulty: 10, level: "N5", type: "VOCAB", question: "Nghĩa của từ '水' (mizu) là gì?", options: ["Nước", "Lửa", "Đất", "Gió"], correctIndex: 0 },
  { id: "q2", difficulty: 15, level: "N5", type: "GRAMMAR", question: "Điền trợ từ: 私は学生＿＿です。", options: ["が", "は", "を", "に"], correctIndex: 1 },
  { id: "q3", difficulty: 25, level: "N4", type: "VOCAB", question: "Từ '一生懸命' (isshoukenmei) có nghĩa là gì?", options: ["Nghỉ ngơi", "Chăm chỉ hết sức", "Đi bộ", "Nhanh chóng"], correctIndex: 1 },
  { id: "q4", difficulty: 30, level: "N4", type: "GRAMMAR", question: "このケーキは甘＿＿すぎます。", options: ["い", "く", "∅ (bỏ い)", "な"], correctIndex: 2 },
  { id: "q5", difficulty: 45, level: "N3", type: "VOCAB", question: "Nghĩa của từ '延期' (enki) là gì?", options: ["Hoãn lại", "Bắt đầu", "Hủy bỏ", "Tham gia"], correctIndex: 0 },
  { id: "q6", difficulty: 55, level: "N3", type: "GRAMMAR", question: "環境問題＿＿関して、論文を書きました。", options: ["に", "を", "が", "で"], correctIndex: 0 },
  { id: "q7", difficulty: 65, level: "N2", type: "GRAMMAR", question: "彼は疲れている＿＿＿＿、休もうとしない。", options: ["にもかかわらず", "だけでなく", "にちがいない", "ばかりに"], correctIndex: 0 },
  { id: "q8", difficulty: 85, level: "N1", type: "GRAMMAR", question: "涙＿＿＿にはこの映画は見られない。", options: ["なし", "なく", "ない", "ず"], correctIndex: 0 },
];
