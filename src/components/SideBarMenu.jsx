import { useState } from "react";
import { classNames } from "../util/classes";
import { VscMenu } from "react-icons/vsc";
import { SiderMenuCardView } from "./SiderMenuCardView";
import { SiderBarMenuItemView } from "./SiderBarMenuItemView";

export const SideBarMenu = ({ items, card, collapseMenu}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={classNames("sidebar-menu", isOpen ? "expanded" : "collapsed")}
    >
      <div className="menu-button">
        <div
          className="hamburger-icon"
          onClick={() => {
            setIsOpen(!isOpen);
            collapseMenu();
          }}
        >
          <VscMenu />
        </div>
      </div>
      <SiderMenuCardView card={card} isOpen={isOpen} />
      {items.map((item) => {
        if(!item.isHidden){
          return (
            <SiderBarMenuItemView key={item.id} item={item} isOpen={isOpen} />
          )
        }})}
    </div>
  );
};
