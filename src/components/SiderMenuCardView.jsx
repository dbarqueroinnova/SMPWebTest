import { classNames } from "../util/classes";
export const SiderMenuCardView = ({ card, isOpen }) => {
  return (
    <div className="sidebar-menu-card-view">
      <div className={classNames("profile-info", isOpen ? "" : "collapsed")}>
        <div className="name">{card.displayName}</div>
      </div>
    </div>
  );
};
