import Card from "@components/cards/card";
import NotFound from "@components/layout/NotFound";
import Page from "@components/layout/Page";
import Protected from "@components/layout/Protected";
import Branch from "./Branches";

import { ROLE } from "@shared/permission";
import { Route, Routes } from "react-router-dom";
import Items from "./Branches/Items";
import Register from "@pages/Register";
import FoodSuggestion from "./FoodSuggestion";
import BlindMode from "./FoodSuggestion/blindMode";
import DirectedMode from "./FoodSuggestion/directedMode";

const Owner = () => {
  return (
    <Protected role={ROLE.CLIENT}>
      {(user) => (
        <Page>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="branches" element={<Branch />} />
            <Route path="FoodSuggestion" element={<FoodSuggestion />} />
            <Route path="branches/*" element={<Items />} />
            <Route path="Register/" element={<Register />} />
            <Route path="FoodSuggestion/blindMode" element={<BlindMode />} />
            <Route
              path="FoodSuggestion/assistedMode"
              element={<DirectedMode />}
            />
          </Routes>
        </Page>
      )}
    </Protected>
  );
};

export default Owner;
