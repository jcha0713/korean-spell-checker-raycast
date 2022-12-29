import { List, Icon } from "@raycast/api"

type ErrorCode = "ECONNABORTED" | "ERR_BAD_RESPONSE" | "ECONNRESET" | "ENETDOWN"

function getErrorMessage(errorCode: string | undefined) {
  const errorMessage: Record<ErrorCode, { title: string; description: string }> = {
    ECONNABORTED: {
      title: "Request Timeout",
      description:
        "This might happen when the text contains a large amount of complex language or formatting. Please try splitting the text into smaller chunks and submitting them separately.",
    },
    ERR_BAD_RESPONSE: {
      title: "Invalid Response from Server",
      description:
        "The server did not provide a valid response. This could be due to a network issue, a server-side error, or an issue with the request itself. Please reload the extension and try again.",
    },
    ECONNRESET: {
      title: "Invalid Response from Server",
      description:
        "The server did not provide a valid response. This could be due to a network issue, a server-side error, or an issue with the request itself. Please reload the extension and try again.",
    },
    ENETDOWN: {
      title: "Sever is currently down",
      description:
        "The server did not provide a valid response. This happens when server is not responsive. Please try again later.",
    },
  }

  if (!errorCode) {
    return {
      title: "Unexpected Error",
      description: "Unexpected error has occured. Please try again in a few minutes.",
    }
  }

  const { title, description } = errorMessage[errorCode as ErrorCode]

  return { title, description }
}

export default function ErrorView({ errorCode }: { errorCode: string | undefined }) {
  // TODO: Remove this cl
  console.log(errorCode)
  const { title, description } = getErrorMessage(errorCode)

  return (
    <List>
      <List.EmptyView
        title={title}
        description={description}
        icon={{
          source: Icon.ExclamationMark,
          tintColor: { light: "#f9645a", dark: "#71262c", adjustContrast: true },
        }}
      />
    </List>
  )
}