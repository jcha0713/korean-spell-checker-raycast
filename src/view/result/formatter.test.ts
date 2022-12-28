import { Formatter } from "@view/result/formatter"

describe("Formatter", () => {
  describe("tests static methods", () => {
    it("handles newline characters", () => {
      const text = "hi\nhello\nhow\r\nare\nyou\n"
      const handled = Formatter.handleNewlineChars(text)
      expect(handled).toBe("hi\r\nhello\r\nhow\r\nare\r\nyou\r\n")
    })

    it("splits large text into chunks", () => {
      let largeText = ""
      const word = "large"

      for (let i = 0; i < Formatter.chunkSize; i++) {
        largeText += word
      }

      expect(largeText.length).toBe(Formatter.chunkSize * word.length)
      const textChunks = Formatter.splitText(largeText)
      expect(textChunks.length).toBe(word.length)
    })
  })
})
