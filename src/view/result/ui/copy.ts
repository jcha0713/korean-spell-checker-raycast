import { Action, Clipboard, Icon, Toast, showHUD, showToast } from "@raycast/api"

import { ResultManager } from "@view/result"

interface CopyProps {
  resultManager: ResultManager
}

export default function Copy({ resultManager }: CopyProps) {
  async function copy() {
    const content = resultManager.buildResult()
    try {
      await Clipboard.copy(content)
      await showHUD("Text copied!")
    } catch (_error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: "Please report this issue to raycast",
      })
    }
  }

  return (
    <Action
      icon={Icon.Clipboard}
      title="Copy Result to Clipboard"
      onAction={async () => copy()}
      shortcut={{ modifiers: ["ctrl"], key: "c" }}
    />
  )
}
