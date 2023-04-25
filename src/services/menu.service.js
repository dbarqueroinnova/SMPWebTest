import { fetch } from "./base.service";
import { principalIconRouteSubMenus } from "../util/iconRoutes";
import { addMenu } from "@/features/menuSlice";

export const getList = async (menu, dispatch) => {
  try {
    if (menu.getMenu.length === 0) {
      const dataMenu = await fetch("/MenuOption");
      let response = [];
      dataMenu.data.forEach((item) => {
        let index = response.find((x) => x.name === item.module);
        if (index) {
          index.subMenus.push({
            path: item.url,
            name: item.name,
            component: "",
            icon: item.icon,
          });
          return;
        }
        let menuRepetido = dataMenu.data.filter(
          (menu) => menu.module === item.module
        );
        if (menuRepetido.length > 1) {
          response.push({
            path: "",
            name: item.module,
            icon: principalIconRouteSubMenus(item.module),
            subMenus: [
              {
                path: item.url,
                name: item.name,
                component: "",
                icon: item.icon,
              },
            ],
          });
        } else {
          response.push({
            path: item.url,
            name: item.name,
            component: "",
            subMenus: [],
            icon: item.icon,
          });
        }
      });
      dispatch(addMenu(response))
      return response;
    }else {
      return menu.getMenu
    }
  } catch (error) {
    throw new Error(error);
  }
};


