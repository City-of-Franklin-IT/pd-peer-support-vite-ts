import { useContext } from 'react';
import { Link } from 'react-router';
import { APP_TITLE } from '../../../config';
import fpdIcon from '@/assets/icons/fpd/fpd.png';
import HeaderCtx from './context';
import { useActiveAccount } from '@/helpers/hooks';
import useHandleLogoutRedirect from '@/context/Auth/hooks/useHandleLogoutRedirect';
import { useHandleTitle, useHandleButtonsVisibility } from './hooks';

export const Title = () => {
  const href = useHandleTitle();

  return (
    <Link
      to={href}
      className="flex flex-col text-primary-content text-center mt-4 w-fit lg:my-4"
    >
      <div className="flex gap-4 text-primary-content items-center justify-center">
        <img src={fpdIcon} alt="fpd icon" className="w-18" />
        <h1 className="text-xl font-bold text-center md:text-2xl lg:text-4xl">
          {APP_TITLE}
        </h1>
      </div>
    </Link>
  );
};

export const Buttons = () => {
  const visible = useHandleButtonsVisibility();

  if (!visible) return null;

  return (
    <div className="flex gap-2 overflow-y-visible w-fit pl-4 pb-2 flex-wrap justify-around lg:pb-0">
      <HelpDoc />
      <HeaderBtn to={'/support'}>Support</HeaderBtn>
      <HeaderBtn to={'/create/support'}>Create Support</HeaderBtn>
      <HeaderBtn to={'/roster'}>Manage Roster</HeaderBtn>
      <HeaderBtn to={'/'} visible={!visible}>
        Login
      </HeaderBtn>
      <LogoutBtn />
    </div>
  );
};

export const HomeLink = () => {
  return (
    <a
      href={'/home'}
      className="text-neutral-content uppercase p-3 m-auto bg-neutral/20 w-fit rounded-b-lg hover:bg-warning/50 hover:text-neutral"
    >
      Back To All PD Apps
    </a>
  );
};

const HelpDoc = () => {
  return (
    <a
      href="https://franklintn.sharepoint.com/:b:/s/IT-ISDevelopment/IQAT_G7eB3dFQLTcbF7Ld3efAXGKw4HYHYf9teBGRTN9qA4?e=yeBOtF"
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none"
      target="_blank"
    >
      Help
    </a>
  );
};

type HeaderBtnProps = {
  to: string;
  visible?: boolean;
  children: React.ReactNode;
};

const HeaderBtn = (props: HeaderBtnProps) => {
  const { activePage } = useContext(HeaderCtx);

  const active = activePage === props.children;

  if (props.visible === false) return null;

  return (
    <Link
      to={props.to}
      className={`btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none ${
        active ? 'text-warning' : 'text-neutral-content'
      }`}
    >
      {props.children}
    </Link>
  );
};

const LogoutBtn = () => {
  // Logout button
  const activeAccount = useActiveAccount();

  const handleLogoutRedirect = useHandleLogoutRedirect();

  if (!activeAccount) return null;

  return (
    <button
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none"
    >
      Logout
    </button>
  );
};
