import useUser from '@hooks/useUser';
import { RESOURCE, ROLE } from '@shared/permission';

import Logo from '@assets/svg/orange-logo.svg';

import { ReactComponent as Dashboard } from '@assets/svg/dashboard.svg';
import { ReactComponent as Sending } from '@assets/svg/sending.svg';
import { ReactComponent as Ticket } from '@assets/svg/ticket.svg';
import { ReactComponent as Finance } from '@assets/svg/finance.svg';
import { ReactComponent as Client } from '@assets/svg/client.svg';

import DrawerItem, { DrawerItemProps } from './DrawerItem';

export const vendorResources = [
  { title: 'Tableau de bord', path: '.', Icon: Dashboard },
  {
    title: 'Gestion des envois',
    Icon: Sending,
    children: [
      { title: 'Créer un envoi colis', path: 'add-package' },
      { title: 'Colis préparés', path: 'manifests' },
      { title: 'Mes envois', path: 'shipments' },
      { title: 'Suivi colis', path: 'packages' },
    ],
  },
  { title: 'Gestion des tickets', Icon: Ticket, path: 'tickets' },
  { title: 'Finances', Icon: Finance, path: 'finances' },
  { title: 'Mes clients', Icon: Client, path: 'clients' },
];

export const adminResources = [
  { title: 'Admins', resource: RESOURCE.ADMIN, path: 'admins' },
  { title: 'Roles', resource: RESOURCE.ROLE, path: 'roles' },
  { title: 'Camions', resource: RESOURCE.TRUCK, path: 'trucks' },
  { title: 'Chauffeurs', resource: RESOURCE.DRIVER, path: 'drivers' },
  { title: 'Clients', resource: RESOURCE.VENDOR, path: 'clients' },
  { title: 'Zones', resource: RESOURCE.ZONE, path: 'zones' },
  { title: 'Dépôts', resource: RESOURCE.DEPOSIT, path: 'deposits' },
];

export const ownerResources = [
  { title: 'Clients', path: 'clients' },
  {
    title: 'Gouvernorats',
    path: 'governorates',
  },
  { title: 'Villes', path: 'cities' },
  {
    title: 'Localités',
    path: 'localities',
  },
];

export interface DrawerItem extends DrawerItemProps {
  resource?: RESOURCE;
}

const Drawer = () => {
  const user = useUser();
  let items = [] as DrawerItem[];
  if (user?.role === ROLE.ADMIN) {
    items = adminResources;
  } else if (user?.role === ROLE.SUPER_ADMIN) {
    items = ownerResources;
  } else if (user?.role === ROLE.CLIENT) {
    items = vendorResources;
  }

  return (
    <aside className="fixed top-0 bottom-0 bg-white w-drawer flex flex-col items-center">
      <div className="flex items-start justify-center h-[264px] pt-[43px]">
        <img alt="logo" src={Logo} />
      </div>
      {items.map((item) => {
        if (
          item.resource &&
          !user?.permissions.find(
            (p) => p.resource === RESOURCE.ANY || p.resource === item.resource
          )
        ) {
          return null;
        }

        return <DrawerItem key={item.title} {...item} />;
      })}
    </aside>
  );
};

export default Drawer;
