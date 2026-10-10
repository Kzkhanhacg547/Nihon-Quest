"use client";

import { useState } from "react";
import { initPlacementTest, getNextQuestion, submitAnswer, determineFinalLevel, PlacementState, MOCK_PLACEMENT_QUESTIONS, JLPTLevel } from "@/lib/placement-test";
import "./PlacementTestModal.css";

export default function PlacementTestModal({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (level: JLPTLevel) => void;
}) {
  const [state, setState] = useState<PlacementState>(() => initPlacementTest(5)); // Quick test: 5 questions
  const [currentQuestion, setCurrentQuestion] = useState(() => getNextQuestion(initPlacementTest(5), MOCK_PLACEMENT_QUESTIONS));

  if (!currentQuestion) {
    const finalLevel = determineFinalLevel(state);
    return (
      <div className="pt-modal-overlay">
        <div className="pt-modal-content pt-result">
          <h2>Hoàn thành bài đánh giá!</h2>
          <p>Năng lực ước tính của bạn: <strong>{Math.round(state.estimatedAbility)} / 100</strong></p>
          <p>Trình độ đề xuất: <strong>{finalLevel}</strong></p>
          <button className="pt-btn-primary" onClick={() => onComplete(finalLevel)}>Cập nhật trình độ</button>
        </div>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    const isCorrect = index === currentQuestion.correctIndex;
    const newState = submitAnswer(state, currentQuestion, isCorrect);
    setState(newState);
    setCurrentQuestion(getNextQuestion(newState, MOCK_PLACEMENT_QUESTIONS));
  };

  return (
    <div className="pt-modal-overlay">
      <div className="pt-modal-content">
        <button className="pt-close-btn" onClick={onClose}>×</button>
        <div className="pt-header">
          <span>Câu hỏi {state.questionsAsked + 1} / {state.maxQuestions}</span>
          <span className="pt-badge">{currentQuestion.type}</span>
        </div>
        <h2 className="pt-question">{currentQuestion.question}</h2>
        <div className="pt-options">
          {currentQuestion.options?.map((opt, i) => (
            <button key={i} className="pt-option-btn" onClick={() => handleAnswer(i)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

