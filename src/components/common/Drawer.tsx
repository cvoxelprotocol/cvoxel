import { useStateShowDrawer } from "@/recoilstate";
import clsx from "clsx";
import {ReactNode, FC} from "react";

type DrawerProp = {
    children: ReactNode
}
export const Drawer:FC<DrawerProp> = ({ children }) => {
    const [open, setOpen] = useStateShowDrawer()

  return (
    <nav
      className={clsx(" absolute overflow-hidden z-50 bg-white bg-opacity-25 inset-0 transform ease-in-out ", open ? " transition-opacity opacity-100 duration-700 translate-x-0  "
      : " transition-all duration-500 opacity-0 -translate-x-full")}
    >
      <section
        className={clsx("w-[250px] left-0 absolute bg-white h-full shadow-xl duration-500 ease-in-out transition-all transform", open ? " translate-x-0" : "-translate-x-full")}
      >
        {children}
      </section>
      <section
        className=" w-screen h-full"
        onClick={() => {
            setOpen(false);
        }}
      ></section>
    </nav>
  );
}
