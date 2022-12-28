import { ErrInfo } from "@type"

export class ResultManager {
  public originalText: string
  public text: string
  public errInfos: ErrInfo[]

  constructor(text: string, errInfos: ErrInfo[]) {
    this.originalText = text
    this.text = text
    this.errInfos = errInfos
  }

  public updateText(errInfo: ErrInfo, errorIdx: number, newWord: string) {
    this.updatePosition(errInfo, newWord)

    const newErrInfo = this.errInfos.find((errInfo) => errInfo.errorIdx === errorIdx)

    if (!newErrInfo) {
      throw new Error("Unexpected error")
    }

    const updatedText =
      this.text.substring(0, newErrInfo.start) + newWord + this.text.substring(newErrInfo.start + errInfo.orgStr.length)

    this.text = updatedText
  }

  private updatePosition(replacedErrInfo: ErrInfo, newWord: string) {
    const lengthOffset = newWord.length - replacedErrInfo.orgStr.length

    const updatedErrInfos = this.errInfos.map((errInfo) => {
      if (errInfo.start < replacedErrInfo.start) {
        return { ...errInfo }
      }

      if (errInfo.start === replacedErrInfo.start) {
        return { ...errInfo, orgStr: newWord, end: errInfo.start + lengthOffset }
      }

      return { ...errInfo, start: errInfo.start + lengthOffset, end: errInfo.end + lengthOffset }
    })

    this.errInfos = updatedErrInfos
  }
}
