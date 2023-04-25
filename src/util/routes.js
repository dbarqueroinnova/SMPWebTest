import { getList } from "../services/menu.service";
import { Home } from "../views/Home";
import { Productos } from "../views/Productos/Productos";
import { Roles } from "../views/Roles/Roles";
import { Usuarios } from "../views/Usuarios/Usuarios";

export const routes = [
  {
    path: "/Home",
    name: "Home",
    subMenus: [],
    component: Home,
  },
  {
    path: "/Productos",
    name: "Productos",
    subMenus: [],
    component: Productos,
  },
  {
    path: "",
    name: "Gestión de Permisos",
    subMenus: [
      {
        path: "/Roles",
        name: "Gestión de Roles",
        component: Roles,
      },
      {
        path: "/Usuarios",
        name: "Gestión de Usuarios",
        component: Usuarios,
      },
    ],
  },
];

const getRutas = async () => {
  const rutas = await getList();
  console.log(rutas);
};
export const routePaths = () => {
  getRutas();
  const array = [];
  routes.map((route) =>
    route.subMenus.length === 0
      ? array.push(route.path)
      : route.subMenus.map((subMenu) => array.push(subMenu.path))
  );
  return array;
};
