import NotFound from "@components/layout/NotFound";
import Page from "@components/layout/Page";
import Protected from "@components/layout/Protected";
import Branch from "@components/modules/branchs";
import City from "@components/modules/cities";
import Country from "./Countries";
import Zone from "./Zones";
import { ROLE } from "@shared/permission";
import { Route, Routes } from "react-router-dom";
import Franchise from "@components/modules/franchises";
import Companies from "./Companies";
import Stats from "./Stats/Stats";

const SuperAdmin = () => {
  return (
    <Protected role={ROLE.SUPER_ADMIN}>
      {(user) => (
        <Page>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="cities/*" element={<City />} />
            <Route path="countries/*" element={<Country />} />
            <Route path="franchises/*" element={<Franchise />} />
            <Route path="zones/*" element={<Zone />} />
            <Route path="Companies/*" element={<Companies />} />
            <Route path="Stats/*" element={<Stats />} />
          </Routes>
        </Page>
      )}
    </Protected>
  );
};
export default SuperAdmin;
