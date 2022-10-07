import LOGO from "@assets/png/Rectangle 101.png";
import shoppingBag from "@assets/svg/shopping-bag.svg";
import branch from "@assets/svg/BRANCH.svg";
import driver from "@assets/svg/DRIVER.svg";
import franchise from "@assets/svg/FRANCHISE.svg";
import client from "@assets/svg/CLIENTT.svg";
import users from "@assets/svg/MANGER.svg";
import zone from "@assets/svg/zone.svg";
import Order from "../../components/modules/orders";
import Branch from "@components/modules/branchs";
import Franchise from "@components/modules/franchises";
import Driver from "@components/modules/drivers";
import Drawer, { adminResources } from "@components/layout/Drawer/Drawer";
import Countries from "@components/modules/countries";
import City from "@components/modules/cities";
import Zone from "@components/modules/zones";
import Protected from "@components/layout/Protected";
import { RESOURCE, ROLE } from "@shared/permission";
import Page from "@components/layout/Page";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "@nestjs/common";
import NotFound from "@components/layout/NotFound";
import Client from "@components/modules/clintes";
import ClientForm from "@components/forms/ClientForm";
import { useCreateClient } from "@requests/client";
import Register from "@pages/Register";

const Admin = () => {
  return (
    <Protected role={ROLE.ADMIN}>
      {(user) => (
        <Page>
          <Routes>
            <Route path="drivers/*" element={<Driver />} />
            <Route path="clients/*" element={<Client />} />
            <Route path="franchises/*" element={<Franchise />} />
            <Route path="branches/*" element={<Branch />} />
            <Route path="orders/*" element={<Order />} />
            <Route path="zones/*" element={<Zone />} />
            <Route path="users/*" element={<Register />} />

            {/* <Route
            path="/"
            element={
              <Redirect
                to={
                  adminResources.find(({ resource }) =>
                    user.permissions.some(
                      (permission) =>
                        permission.resource === RESOURCE.ANY ||
                        permission.resource === resource
                    )
                  )?.path || 'admin'
                }
              /> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Page>
      )}
    </Protected>
  );
};

export default Admin;
