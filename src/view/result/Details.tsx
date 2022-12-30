import { useMemo } from "react"

import { CheckerResponse } from "@type"
import { ListItem, Formatter, ResultManager } from "@view/result"

interface DetailsProps {
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

export default function Details({ data }: DetailsProps) {
  const errInfos = useMemo(() => {
    return getFlattedErrInfos(data)
  }, [data])

  const newText = data.reduce((text, curr): string => {
    return text + curr.userText
  }, "")

  const resultManager = new ResultManager(newText, errInfos)

  function onErrInfosChange(errorIdx: number, newWord: string) {
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
