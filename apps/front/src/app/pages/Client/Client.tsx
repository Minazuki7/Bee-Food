import Card from "@components/cards/card";
import NotFound from "@components/layout/NotFound";
import Page from "@components/layout/Page";
import Protected from "@components/layout/Protected";
import Branch from "./Branches";

import { ROLE } from "@shared/permission";
import { Route, Routes } from "react-router-dom";
import Items from "./Branches/Items";
import Register from "@pages/Register";

const Owner = () => {
  return (
    <Protected role={ROLE.CLIENT}>
      {(user) => (
        <Page>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="branches" element={<Branch />} />
            <Route path="branches/*" element={<Items />} />
            <Route path="Register/" element={<Register />} />
          </Routes>
        </Page>
      )}
    </Protected>
  );
};

export default Owner;
