import { Question } from "../components/Quest/QuestIntroPage/QuestIntroPage"

export type CheckAnswerMockResult =
  | {
  game_status: "active"
  correct: boolean
  question_score: number
  total_score: number
}
  | {
  game_status: "finished"
  total_score: number
}

export async function checkAnswerMock(
  answer: string,
  question: Question,
  currentScore: number,
  isLastQuestion: boolean
): Promise<CheckAnswerMockResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      const normalized = answer.trim().toLowerCase()

      const correct = normalized === "1"
      const delta = correct ? question.score : -question.penalty
      const total = currentScore + delta

      if (isLastQuestion && correct) {
        resolve({
          game_status: "finished",
          total_score: total,
        })
      } else {
        resolve({
          game_status: "active",
          correct,
          question_score: delta,
          total_score: total,
        })
      }
    }, 400)
  })
}
