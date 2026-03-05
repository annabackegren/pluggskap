import type { RowDataPacket } from 'mysql2'

export interface Question extends RowDataPacket {
  questionId: number
  questionText: string
  questionImg: string
  questionAnswerC: string
  questionAnswerW1: string
  questionAnswerW2: string
  questionAnswerW3: string
  questionProvinceId: string
}
