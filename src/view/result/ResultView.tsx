import { useMemo } from "react"
import { AxiosError } from "axios"
import { List, showToast, Toast } from "@raycast/api"
import { usePromise } from "@raycast/utils"

import { CheckerResponse } from "@type"
import { Checker } from "@api/checker"
import { NoErrorView } from "@view/no-error"
import { ErrorView } from "@view/server-error"
import { Details, Formatter } from "@view/result"

async function getResultFromChunks(chunks: string[]): Promise<CheckerResponse[] | AxiosError> {
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "fetching...",
    })
    const data = await Promise.all(
      chunks.map(async (chunk) => {
        const checker = new Checker()
        const response = await checker.submitText(chunk)
        return response
      })
    )
    return data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
}

export default function ResultView({ text }: { text: string }) {
  const textChunks = useMemo(() => {
    return Formatter.splitText(text)
  }, [text])

  const { isLoading, data } = usePromise(getResultFromChunks, [textChunks], {
    onData: async (data) => {
      if (data instanceof AxiosError) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Error",
        })
      } else {
        await showToast({
          style: Toast.Style.Success,
          title: "Success!",
        })
      }
    },
  })

  if (data instanceof AxiosError) {
    return <ErrorView errorCode={data.code} />
  }

  return (
    <List isLoading={isLoading} isShowingDetail={data && data[0].errInfos.length > 0}>
      {data && (data[0].errInfos.length === 0 ? <NoErrorView /> : <Details text={text} data={data} />)}
    </List>
  )
}
