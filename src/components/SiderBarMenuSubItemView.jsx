
import { NavLink } from "react-router-dom";
import { classNames } from "../util/classes";
export const SiderBarMenuSubItemView = ({ item, isOpen, }) => {
 
  return (
    <div className="sidebar-menu-sub-item-view">
      <NavLink to={item.url}>
        <div className={classNames("item-content", isOpen ? "" : "collapsed")}>
          <div className="icon">
            <item.icon />
          </div>
          <span className="label"> {item.label}</span>
        </div>
        
        </NavLink>
      {!isOpen ? <div className="tooltip">{item.label}</div> : ""}
    </div>
  );
};
