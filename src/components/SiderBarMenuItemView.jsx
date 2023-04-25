import { useState } from "react";
import { NavLink } from "react-router-dom";
import { classNames } from "../util/classes";
import { SiderBarMenuSubItemView } from "./SiderBarMenuSubItemView";
export const SiderBarMenuItemView = ({ item, isOpen }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="sidebar-menu-item-view">
      {item.items.length === 0 ? (
        <NavLink to={item.url}>
          <div
            className={classNames("item-content", isOpen ? "" : "collapsed")}
          >
            <div className="icon">
              <item.icon />
            </div>
            <span className="label"> {item.label}</span>
          </div>
        </NavLink>
      ) : (
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            // if (isOpen) {
            setVisible(!visible);
            // }
          }}
        >
          <div
            className={classNames("item-content", isOpen ? "" : "collapsed")}
          >
            <div className="icon">
              <item.icon />
            </div>
            <span className="label"> {item.label}</span>
          </div>

          {item.items.map((itemSub, key) => {
            if (visible) {
              return (
                <SiderBarMenuSubItemView
                  key={key}
                  item={itemSub}
                  isOpen={isOpen}
                  isVisible={visible}
                />
              );
            }
          })}
        </a>
      )}
      {!isOpen ? <div className="tooltip">{item.label}</div> : ""}
    </div>
  );
};
