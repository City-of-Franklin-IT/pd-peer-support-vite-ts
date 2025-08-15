// Components
import * as Components from './components'

function CreatePersonnelForm({ index }: { index: number }) {

  return (
    <Components.PersonnelSelect index={index} />
  )
}

export default CreatePersonnelForm