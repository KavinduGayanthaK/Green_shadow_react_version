
import { Outlet } from "react-router";
import VerticalNav from "./VerticalNav";

export function RootLayout() {
  return (
    <VerticalNav>
      <Outlet />
    </VerticalNav>
    
  );
}
