export interface ErrInfo {
  errorIdx: number
  orgStr: string
  help: string
  start: number
  end: number
  candWords: string[]
}

export interface CheckerResponse {
  userText: string
  errInfos: ErrInfo[]
}
