import { useState } from "react"
import { List, Icon, ActionPanel, Action, Keyboard } from "@raycast/api"
import { List, Icon, ActionPanel, Action, Keyboard, showToast, Toast } from "@raycast/api"

import { ErrInfo } from "@type"
import { Formatter, ResultManager } from "@view/result"

interface ListItemProps {
  text: string
  errInfo: ErrInfo
  resultManager: ResultManager
  onErrInfosChange: (errInfo: ErrInfo, errorIdx: number, newWord: string) => void
}

export default function ListItem({ text, errInfo, resultManager, onErrInfosChange }: ListItemProps) {
  const formatter = new Formatter(text)
  const [markdown, setMarkdown] = useState(formatter.formatText(text, errInfo))

  async function set(errorIdx: number, newWord: string) {
    setMarkdown(formatter.formatText(text, errInfo, newWord))
    onErrInfosChange(errInfo, errorIdx, newWord)

    await showToast({
      style: Toast.Style.Success,
      title: `New Word Selected`,
      message: `${errInfo.orgStr} -> ${newWord}`,
    })
  }

  return (
    <List.Item
      title={`${errInfo.orgStr}`}
      icon={{
        source: Icon.Warning,
        tintColor: {
          light: "#171717",
          dark: "#eeeeee",
          adjustContrast: true,
        },
      }}
      actions={
        <ActionPanel title={`Edit ${errInfo.orgStr}`}>
          <ActionPanel.Section>
            <Action
              title={`Select ${errInfo.orgStr}`}
              onAction={async () => set(errInfo.errorIdx, errInfo.orgStr)}
              shortcut={{ modifiers: ["ctrl"], key: (0).toString() as Keyboard.KeyEquivalent }}
            />
            {errInfo.candWords.map((word, idx) => (
              <Action
                key={word}
                title={`Select ${word}`}
                onAction={async () => set(errInfo.errorIdx, word)}
                shortcut={{ modifiers: ["ctrl"], key: (idx + 1).toString() as Keyboard.KeyEquivalent }}
              />
            ))}
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard title="Copy Corrected Text" content={resultManager.text} />
            <Action.CopyToClipboard title="Copy Original Text" content={resultManager.originalText} />
          </ActionPanel.Section>
          <Action.OpenInBrowser url="http://speller.cs.pusan.ac.kr" />
        </ActionPanel>
      }
      detail={<List.Item.Detail markdown={markdown}></List.Item.Detail>}
    />
  )
}
