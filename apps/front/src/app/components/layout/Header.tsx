import useLogout from '@hooks/useLogout';

import { ReactComponent as UserLogo } from '@assets/svg/user-logo.svg';
import { ReactComponent as Bell } from '@assets/svg/bell.svg';
import Search from '@components/inputs/Search';
import useUser from '@hooks/useUser';

const Header = () => {
  const user = useUser();
  const logout = useLogout();

  return (
    <header className="text-white h-header w-100 pl-drawer bg-black flex pr-4">
      <div className="flex-1 justify-between gap-4 pl-[30px] pr-[74px] flex items-center">
        <Search className={'w-[421px]'} />
        <div className="flex gap-[68px] items-center">
          <div className="flex gap-[16px] items-center">
            <Bell />
            <span className="text-lightOrange text-base">Notifications</span>
          </div>
          <div
            onClick={logout}
            className="flex font-bold items-center text-xl cursor-pointer gap-[37px]"
          >
            <UserLogo />
            <div className="flex flex-col">
              {user?.email}
              <div className="text-orange font-normal text-base">
                Espace particulier
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
