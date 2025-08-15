import { useContext } from "react"
import { Link } from "react-router"
import { APP_TITLE } from '../../../config'
import HeaderCtx from "./context"
import { useActiveAccount } from "@/helpers/hooks"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useHandleTitle, useHandleButtonsVisibility } from './hooks'

export const Title = () => {
  const { href, visible } = useHandleTitle()

  if(!visible) return null

  return (
    <Link to={href} className="flex flex-col text-primary-content items-start w-fit">
      <h1 className="text-lg font-bold whitespace-nowrap lg:text-2xl">Franklin Police Department</h1>
      <span className="text-sm ml-6 w-fit lg:text-xl lg:whitespace-nowrap">{APP_TITLE}</span>
    </Link>
  )
}

export const Buttons = () => {
  const visible = useHandleButtonsVisibility()

  if(!visible) return null

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:ml-auto">
      <HeaderBtn to={'/support'}>Support</HeaderBtn>
      <HeaderBtn to={'/create/support'}>Create Support</HeaderBtn>
      <HeaderBtn to={'/roster'}>Manage Roster</HeaderBtn>
      <HeaderBtn 
        to={'/'}
        visible={!visible}>Login</HeaderBtn>
      <LogoutBtn />
    </div>
  )
}

type HeaderBtnProps = { to: string, visible?: boolean, children: React.ReactNode }

const HeaderBtn = (props: HeaderBtnProps) => {
  const { activePage } = useContext(HeaderCtx)

  const active = activePage === props.children

  if(props.visible === false) return null

  return (
    <Link 
      to={props.to} 
      className={`btn btn-sm btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none 2xl:btn-lg ${ active ? 'text-warning' : 'text-neutral-content' }`}>
        {props.children}
    </Link>
  )
}

const LogoutBtn = () => { // Logout button
  const activeAccount = useActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(!activeAccount) return null

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
        Logout
    </button>
  )
}