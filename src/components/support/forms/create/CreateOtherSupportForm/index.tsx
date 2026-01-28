import { useIsVisible } from './hooks'

// Components
import * as Components from './components'

function CreateOtherSupportForm() {
  const visible = useIsVisible()

  if(!visible) return null

  return (
    <Components.DescriptionInput />
  )
}

export default CreateOtherSupportForm