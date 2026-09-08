import { Menu, X } from "lucide-react"
import { useContext } from 'react'
import { Link } from 'react-router'
import fpdIcon from '@/assets/icons/fpd/fpd.png'
import HeaderCtx from './context'
import { useAuth } from '@/context/Auth'
import { useHandleLogoutRedirect } from '@/context/Auth/hooks/useHandleLogoutRedirect'
import { useHandleTitle, useHandleButtonsVisibility, useHandleMobileMenu } from './hooks'

export const Title = () => {
  const href = useHandleTitle()

  return (
    <Link
      to={href}
      className="flex flex-col text-primary-content text-center w-fit"
    >
      <div className="flex gap-2 text-primary-content items-center justify-center lg:gap-4">
        <img src={fpdIcon} alt="fpd icon" className="w-10 lg:w-18" />
        <h1 className="text-xl font-bold text-center md:text-2xl lg:text-4xl">
          {import.meta.env.VITE_APP_TITLE}
        </h1>
      </div>
    </Link>
  )
}

export const Buttons = () => {
  const visible = useHandleButtonsVisibility()

  return (
    <div className="flex gap-2 overflow-y-visible pl-4 flex-wrap justify-end">
      <HeaderBtn to={'/support'}>Support</HeaderBtn>
      <HeaderBtn to={'/create/support'}>Create Support</HeaderBtn>
      <HeaderBtn to={'/roster'}>Manage Roster</HeaderBtn>
      <HeaderBtn to={'/'} visible={!visible}>
        Login
      </HeaderBtn>
      <HelpDoc />
      <LogoutBtn />
    </div>
  )
}

export const HomeLink = () => {
  return (
    <div className="relative hidden justify-center md:flex">
      <a
        href={'/home'}
        className="text-neutral-content uppercase p-3 bg-neutral/20 w-fit rounded-b-lg hover:bg-warning/50 hover:text-neutral">
          Back To All PD Apps
      </a>
    </div>
  )
}

export const MobileMenu = () => {
  const { ref, open, onBtnClick, close } = useHandleMobileMenu()
  const handleLogoutRedirect = useHandleLogoutRedirect()
  const visible = useHandleButtonsVisibility()

  if(!visible) return null

  return (
    <div ref={ref} className={`dropdown dropdown-end md:hidden ${ open ? 'dropdown-open' : '' }`}>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={onBtnClick}
        className="btn btn-ghost btn-square text-primary-content hover:bg-primary/60 hover:shadow-none">
          { open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" /> }
      </button>
      <MenuItems visible={open} onNavigate={close} onLogout={handleLogoutRedirect} />
    </div>
  )
}

type MenuItemsProps = {
  visible: boolean
  onNavigate: () => void
  onLogout: () => void
}

const MenuItems = ({ visible, onNavigate, onLogout }: MenuItemsProps) => {
  if(!visible) return null

  return (
    <ul className="dropdown-content menu z-50 bg-base-100 rounded-box w-56 p-2 shadow border border-base-300 tracking-normal">
      <li>
        <Link to={'/support'} onClick={onNavigate} className="uppercase">
          Support
        </Link>
      </li>
      <li>
        <Link to={'/create/support'} onClick={onNavigate} className="uppercase">
          Create Support
        </Link>
      </li>
      <li>
        <Link to={'/roster'} onClick={onNavigate} className="uppercase">
          Manage Roster
        </Link>
      </li>
      <li>
        <a href="https://franklintn.sharepoint.com/:b:/s/IT-ISDevelopment/IQAT_G7eB3dFQLTcbF7Ld3efAXGKw4HYHYf9teBGRTN9qA4?e=yeBOtF" target="_blank" rel="noreferrer" onClick={onNavigate} className="uppercase">
          Help
        </a>
      </li>
      <li>
        <a href={'/home'} onClick={onNavigate} className="uppercase">
          Back To All PD Apps
        </a>
      </li>
      <li>
        <button type="button" onClick={onLogout} className="uppercase">
          Logout
        </button>
      </li>
    </ul>
  )
}

const HelpDoc = () => {
  return (
    <a
      href="https://franklintn.sharepoint.com/:b:/s/IT-ISDevelopment/IQAT_G7eB3dFQLTcbF7Ld3efAXGKw4HYHYf9teBGRTN9qA4?e=yeBOtF"
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none"
      target="_blank">
        Help
    </a>
  )
}

type HeaderBtnProps = {
  to: string
  visible?: boolean
  children: React.ReactNode
}

const HeaderBtn = (props: HeaderBtnProps) => {
  const { activePage } = useContext(HeaderCtx)

  const active = activePage === props.children

  if(props.visible === false) return null

  return (
    <Link
      to={props.to}
      className={`btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ?
        'text-warning' :
        'text-neutral-content'}`}>
        {props.children}
    </Link>
  )
}

const LogoutBtn = () => {
  const { isAuthenticated } = useAuth()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if (!isAuthenticated) return null

  return (
    <button
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        Logout
    </button>
  )
}
