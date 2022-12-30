import { ErrInfo } from "@type"

export class Formatter {

  public static handleNewlineChars(text: string) {
    return text.replaceAll(/[\n]/g, "\r\n")
  }

  public static splitText(text: string): string[] {
    const chunkSize = Formatter.chunkSize
    const numChunks = Math.ceil(text.length / chunkSize)
    const chunks = Array.from({ length: numChunks }, (_, idx) => text.substring(idx * chunkSize, (idx + 1) * chunkSize))
    return chunks
  }

  public text: string

  constructor(text: string) {
    this.text = text
  }

  public formatText(text: string, errInfo: ErrInfo, newWord = ""): string {
    const inlineCodeAdded = `${text.substring(0, errInfo.start)}\`${errInfo.orgStr.trim()}\`${text.substring(
      errInfo.end
    )}`

    return `
${this.shouldAddDots(text)}${inlineCodeAdded.substring(errInfo.start - 60, errInfo.end + 60)}${this.shouldAddDots(text)}

\`\`\`
${this.suggestWords(errInfo, newWord)}
\`\`\`

---

${this.formatHelpString(errInfo.help)}
`
  }

  private suggestWords(errInfo: ErrInfo, newWord: string) {
    const choices = errInfo.candWords.map((choice) => {
      if (choice === newWord) {
        return `${choice} [selected]`
      }
      return choice
    })
    return `${errInfo.orgStr} -> ${choices.join(" | ")}`
  }

  // TODO: 예가 중간에 나오는 경우 처리하기
  private formatHelpString(help: string) {
    if (!help.includes("(예)")) {
      return help
    }

    const lastMatch = help.lastIndexOf("(예)")
    const match = help.substring(lastMatch).match(/(\(예\).+)\([○XO×ox]\)/)?.[0]

    if (!match) {
      return help
    }

    const linesInExamples = match
      .replace("(예)", "")
      .split(/\([○XO×ox]\)/)
      .slice(0, -1)
    const formattedLines = linesInExamples.map(
      (line, index) => line.replace("->", "").trim() + (index % 2 === 0 ? "(X)" : "(O)\n")
    )
    const formattedHelpString = `
${help.replace(match, "")}

\`\`\`
(예)

${formattedLines.join("\r\n")}
\`\`\`
`
    return formattedHelpString
  }

  private shouldAddDots(text: string) {
    return text.length > 60 ? "…" : ""
  }
}
