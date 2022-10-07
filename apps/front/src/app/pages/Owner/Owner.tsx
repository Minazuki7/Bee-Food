import Card from "@components/cards/card";
import NotFound from "@components/layout/NotFound";
import Page from "@components/layout/Page";
import Protected from "@components/layout/Protected";
import Branch from "@components/modules/branchs";

import { ROLE } from "@shared/permission";
import { Route, Routes } from "react-router-dom";
import Items from "./Items";
import Menus from "./Menus";
import AddItem from "./AddItem";
import AddMenu from "./AddMenu";
import Order from "./Orders";
import Client from "@pages/Client";

const Owner = () => {
  return (
    <Protected role={ROLE.OWNER}>
      {(user) => (
        <Page>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/addMenu" element={<AddMenu />} />
            <Route path="orders/*" element={<Order />} />
            <Route path="items/*" element={<Items />} />
            <Route path="branches/*" element={<Branch />} />
            <Route path="menus/*" element={<Menus />} />
            <Route path="clients/*" element={<Client />} />
          </Routes>
        </Page>
      )}
    </Protected>
  );
};

export default Owner;
