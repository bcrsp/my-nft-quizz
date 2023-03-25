import React, { Children, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Home } from "../../pages/Home";
import { Header } from "./header/Header";

import background from "../../../assets/spectrum-gradient.png"

type Props = {
  // children: any
}
export const Layout = (props: Props) => {
  return (
    <div >
      <Header />
      <div>
        <Outlet/>
      </div>      
    </div>
  );
};
