// Components
import * as Components from './components'

function Footer() {

  return (
    <footer className="relative flex flex-col h-[24vh] bg-neutral mt-auto">
      <p className="text-neutral-content text-xl font-[ubuntu] text-bold tracking-[.4rem] text-center m-auto">Developed by City of Franklin Information Technology</p>
      <Components.DocsBtn />
    </footer>
  )
}
export default Footer