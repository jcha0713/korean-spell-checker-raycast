import { ResultManager } from "@view/result/resultManager"
import { errInfosSamples } from "./samples"

describe("ResultManager", () => {
  errInfosSamples.forEach((sample) => {
    describe(`${sample.text}`, () => {
      const rm = new ResultManager(sample.text, sample.errInfos)
      sample.errInfos.forEach((errInfo) => {
        it(`update ${errInfo.orgStr}`, () => {
          rm.updateText(errInfo, errInfo.errorIdx, errInfo.candWords[0])
          const updatedText = rm.text.replace(errInfo.orgStr, errInfo.candWords[0])

          expect(rm.text).toBe(updatedText)
        })
      })
    })
  })
})
