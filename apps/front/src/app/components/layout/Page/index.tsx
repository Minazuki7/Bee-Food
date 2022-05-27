import Header from "@components/layout/Header";
import Drawer from "@components/layout/Drawer/Drawer";

import classes from "./page.module.scss";

const Page: React.FC<any> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Header />
      <Drawer />
      <main>{children}</main>
    </div>
  );
};

export default Page;
