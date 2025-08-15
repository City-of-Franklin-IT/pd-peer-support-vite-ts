// Components
import CreateSupportForm from "@/components/support/forms/create/CreateSupportForm"

export const createFormMap = new Map<string, () => React.JSX.Element>([
  ['support', CreateSupportForm]
])