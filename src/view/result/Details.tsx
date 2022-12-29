import { useState } from "react"

import { CheckerResponse } from "@type"
import { ListItem, Formatter, ResultManager } from "@view/result"
import { ErrInfo } from "@type"

interface DetailsProps {
  text: string
  data: CheckerResponse[]
}

function getFlattedErrInfos(data: CheckerResponse[]) {
  let key = 0
  let textLength = 0
  const flattedErrInfos = data.flatMap((checkerResponse, index) => {
    textLength += index !== 0 ? Formatter.chunkSize : 0
    return checkerResponse.errInfos.map((errInfo) => {
      return {
        ...errInfo,
        errorIdx: key++,
        start: errInfo.start + textLength,
        end: errInfo.end + textLength,
      }
    })
  })
  return flattedErrInfos
}

export default function Details({ text, data }: DetailsProps) {
  const [errInfos, setErrInfos] = useState(getFlattedErrInfos(data))
  const newText = data.reduce((text, curr): string => {
    return text + curr.userText
  }, "")

  const resultManager = new ResultManager(newText, errInfos)

  function onErrInfosChange(errInfo: ErrInfo, errorIdx: number, newWord: string) {
    resultManager.updateWordList(errorIdx, newWord)
  }

  return (
    <>
      {errInfos.map((errInfo) => {
        return (
          <ListItem
            key={errInfo.errorIdx}
            text={newText}
            errInfo={errInfo}
            resultManager={resultManager}
            onErrInfosChange={onErrInfosChange}
          />
        )
      })}
    </>
  )
}
