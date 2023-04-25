import { fetch, put, post } from "./base.service";
export const getRoles = async () => {
 

  try {
    const dataRole = await fetch(`/RolDetail`);
    let response = [];
    dataRole.data.forEach((item) => {
      let index = response.find((x) => x.roleId == item.rol.rolId);
      if (index) {
        if (item.menuOption) {
          index.items.push(item.menuOption.optionId);
        }
        return;
      }
      if (item.menuOption) {
        response.push({
          // id:item.id,
          roleId: item.rol.rolId,
          roleName: item.rol.rolName,
          items: [item.menuOption?.optionId],
        });
      } else {
        response.push({
          // id:item.id,
          roleId: item.rol.rolId,
          roleName: item.rol.rolName,
          items: [],
        });
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  return;
};

export const getMenuOptions = async () => {
  try {
    const dataMenu = await fetch(`/MenuOption`);
    let response = [];
    dataMenu.data.forEach((item) => {
      let index = response.find((x) => x.module === item.module);
      if (index) {
        index.items.push({
          optionId: item.optionId,
          name: item.name,
        });
        return;
      }
      response.push({
        module: item.module,
        items: [
          {
            optionId: item.optionId,
            name: item.name,
          },
        ],
      });
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateRol = async (data) => {
  try {
    const rol = await put(`/Rol`, data);
    return rol.data;
  } catch (error) {
    throw new Error(error);

  }
};
export const insertRol = async (data) => {
  try {
    const rol = await post(`/Rol`, data);
    return rol.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const insertRolDetail = async (data) => {
  try {
    const rolDetail = await post(`/RolDetail`, data);
    return rolDetail.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateRolDetail = async (data) => {
  try {
    const rolDetail = await put(`/RolDetail`, data);
    return rolDetail.data;
  } catch (error) {
    throw new Error(error);
  }
};
