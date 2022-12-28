import { List, Icon } from "@raycast/api"

export default function NoErrorView() {
  return (
    <List.EmptyView
      title="Great, we didn't detect any errors in your input."
      description="Just a reminder that our system may not be able to catch every error, so it's always a good idea to double-check your work before submitting"
      icon={{ source: Icon.Checkmark, tintColor: { light: "#68ea54", dark: "#306a27", adjustContrast: true } }}
    />
  )
}
