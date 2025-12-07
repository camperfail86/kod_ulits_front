// src/api/questApi.ts
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080"

// форматы ответов из README

export type CheckAnswerFinished = {
  status: string
  game_status: "finished"
  start_datetime: string
  end_datetime: string
  total_score: number
  hints: number
  registration_id: string
}

export type CheckAnswerActive = {
  status: string
  game_status: "active"
  start_datetime: string
  total_score: number
  hints: number
  registration_id: string
  correct: boolean
  question_score: number
}

export type CheckAnswerResponse = CheckAnswerFinished | CheckAnswerActive

export async function checkAnswerApi(
  answer: string,
  gameSessionId: string,
  questionId: string
): Promise<CheckAnswerResponse> {
  const res = await fetch(`${API_BASE_URL}/api/check_answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer,
      game_session_id: gameSessionId,
      question_id: questionId,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`check_answer ${res.status}: ${text}`)
  }

  const json = (await res.json()) as CheckAnswerResponse
  console.log("check_answer API result:", json)
  return json
}
