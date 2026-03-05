import type { RowDataPacket } from 'mysql2'

export interface Result extends RowDataPacket {
  resultId: number,
  resultScore: string,
  resultUserId: number,
  resultProvinceId: string
}

export interface AddResultDTO {
  resultId: number,
  resultScore: string,
  resultUserId: number,
  resultProvinceId: string
}
