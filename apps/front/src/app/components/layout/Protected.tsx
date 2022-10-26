import { ReactNode } from "react";

import { useLocation } from "react-router-dom";
import useUser from "@hooks/useUser";
import Redirect from "@components/ui/Redirect";
import { encodeUri } from "@utils/url";
import { User } from "@requests/user";
import { RESOURCE, ROLE } from "@shared/permission";
import NotFound from "./NotFound";
import NotFoundImg from "@assets/png/NotFound.png";

const isValid = <T,>(data: T | T[], value: T | T[], allValue: T): boolean => {
  if (Array.isArray(data))
    return !!data.find((item) => isValid(item, value, allValue));
  if (Array.isArray(value)) {
    if (value.length === 0 && data === allValue) return true;
    return !!value.find((item) => isValid(data, item, allValue));
  }

  if (data === allValue || value === allValue) return true;
  return data === value;
};

export interface ProtectedProps<Protected extends boolean = true> {
  children:
    | ReactNode
    | ((user: Protected extends true ? User : User | null) => ReactNode);
  role?: ROLE | ROLE[];
  resource?: RESOURCE | RESOURCE[];
}

const Protected = <Protected extends boolean = true>({
  children,
  role = ROLE.ALL,
  resource = RESOURCE.ANY,
}: ProtectedProps<Protected>) => {
  const user = useUser();
  const location = useLocation();

  if (!user)
    return (
      <Redirect
        to={{
          pathname: "/login",
          search: encodeUri({ from: location.pathname }),
        }}
      />
    );

  if (
    user &&
    !(
      isValid(role, user.role, ROLE.ALL)
      // &&
      // isValid(
      //   resource,
      //   user.permissions.map((p) => p.resource) || [],
      //   RESOURCE.ANY
      // )
    )
  ) {
    return (
      <div className="grid justify-center items-center mt-36">
        <img src={NotFoundImg} width="500" height="500"></img>
      </div>
    );
  }

  return typeof children === "function" ? (
    <>{children(user as Protected extends true ? User : User | null)}</>
  ) : (
    <>{children}</>
  );
};

export default Protected;
