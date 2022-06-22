import Link from "next/link";
import { slide as Menu } from 'react-burger-menu'
import {FC} from "react"
import { Props as MenuProps} from "react-burger-menu"

export const BurgerMenu:FC<MenuProps> = (props) => {
  return (
    <>
      <Menu {...props}>
        <a
          id="discord"
          className="menu-item"
          href="https://discord.gg/JxDKhkMab3"
        >
          Discord
        </a>
        <a id="github" className="menu-item" href="https://discord.gg/JxDKhkMab3">
          Github
        </a>
        <div id="go-to-app" className="menu-item">
          <Link href="/">Go to App</Link>
        </div>
      </Menu>
    </>
  );
};
