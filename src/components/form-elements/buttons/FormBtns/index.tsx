// Components
import * as Components from './components'

function FormBtns({ onCancelBtnClick }: { onCancelBtnClick: React.MouseEventHandler<HTMLButtonElement> }) {

  return (
    <div className="flex flex-col gap-4 mt-6 w-full md:flex-row md:gap-6">
      <Components.CancelBtn onClick={onCancelBtnClick} />
      <Components.ResetBtn />
      <Components.SaveBtn />
    </div>
  )
}

export default FormBtns