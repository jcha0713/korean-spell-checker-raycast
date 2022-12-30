import { Action, Clipboard, Icon, Toast, open, showHUD, showToast } from "@raycast/api"

import { ResultManager } from "@view/result"

interface CopyProps {
  resultManager: ResultManager
}

export default function Browser({ resultManager }: CopyProps) {
  async function openInBrowser() {
    const content = resultManager.buildResult()
    try {
      await open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`)
      await showHUD("Opening browser...")
    } catch (_error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: "Please report this issue to raycast",
      })
    }
  }

  return <Action title="Open in Twitter with corrected text" onAction={async () => openInBrowser()} />
}
