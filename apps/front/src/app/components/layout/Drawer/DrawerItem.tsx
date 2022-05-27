import {
  matchPath,
  NavLink,
  useLocation,
  useResolvedPath,
  resolvePath,
} from 'react-router-dom';
import classNames from 'classnames';
import DropDown from '@components/feedback/Dropdown';
import { SVGProps, useState } from 'react';

const CONTAINER_CLASS_NAME =
  'w-full h-[80px] flex items-center px-[26px] text-xl font-normal cursor-pointer';
const INACTIVE_CLASS_NAME = 'text-black';
const ACTIVE_CLASS_NAME = 'text-white bg-black';

export interface DrawerLink {
  title: string;
  path: string;
}

export interface DrawerItemProps {
  title: string;
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  path?: string;
  children?: DrawerLink[];
}

const DrawerItem = ({ path, title, children, Icon }: DrawerItemProps) => {
  const parent = useResolvedPath('.');
  const location = useLocation();
  const isActive = children
    ? children.some((child) =>
        matchPath(
          {
            path: resolvePath(child.path, parent.pathname).pathname,
            end: true,
          },
          location.pathname
        )
      )
    : !!matchPath(
        { path: resolvePath(path || '', parent.pathname).pathname, end: true },
        location.pathname
      );

  const [open, setOpen] = useState(isActive);

  const renderChild = ({ title, path }: DrawerLink) => {
    const isActive = !!matchPath(
      { path: resolvePath(path, parent.pathname).pathname, end: true },
      location.pathname
    );

    return (
      <NavLink
        className={classNames(
          'flex items-center min-h-[50px] pl-[64px] text-lg',
          isActive ? 'text-white bg-orange' : 'bg-grey1'
        )}
        key={title}
        to={path}
      >
        {title}
      </NavLink>
    );
  };

  const icon = <div className={'mr-[10px] w-[30px]'}>{Icon && <Icon />}</div>;

  if (path)
    return (
      <NavLink
        to={path}
        className={classNames(
          CONTAINER_CLASS_NAME,
          isActive ? ACTIVE_CLASS_NAME : INACTIVE_CLASS_NAME
        )}
      >
        {icon}
        {title}
      </NavLink>
    );

  return (
    <DropDown
      open={open}
      classes={{ items: 'flex flex-col w-100 px-26', container: 'w-full' }}
      items={children?.map(renderChild)}
    >
      <button
        disabled={isActive}
        onClick={() => setOpen(!open)}
        className={classNames(
          CONTAINER_CLASS_NAME,
          open || isActive ? ACTIVE_CLASS_NAME : INACTIVE_CLASS_NAME
        )}
      >
        {icon}
        {title}
      </button>
    </DropDown>
  );
};

export default DrawerItem;
