import { useState, useEffect } from "react"
import { Form, ActionPanel, Action, useNavigation, getSelectedText } from "@raycast/api"

import { ResultView } from "@view/result"

export default function Command() {
  const { push } = useNavigation()

  const [text, setText] = useState("")
  const [charCount, setCharCount] = useState("0")
  const [textAreaError, setTextAreaError] = useState<string | undefined>()

  useEffect(() => {
    const setSelectedText = async () => {
      let selectedText
      try {
        selectedText = await getSelectedText()
      } catch (_error) {
        return
      }
      if (!selectedText) {
        return
      }
      handleChange(selectedText)
    }
    setSelectedText()
  }, [])

  function submitText(text: string) {
    if (text.length > 0) {
      push(<ResultView text={text} />)
    } else {
      setTextAreaError("This should not be empty")
    }
  }

  function handleChange(text: string) {
    setText(text)
    setCharCount(text.length.toString())
    if (text.length > 0) {
      setTextAreaError(undefined)
    }
  }

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit text"
            onSubmit={({ text }) => {
              submitText(text)
            }}
          />
        </ActionPanel>
      }
    >
      <Form.Description text="Korean Spelling Checker" />
      <Form.TextArea
        id="text"
        title="Text"
        placeholder="Enter your text here"
        storeValue={true}
        value={text}
        error={textAreaError}
        onChange={handleChange}
      />
      <Form.Description title="Characters:" text={charCount} />
    </Form>
  )
}
