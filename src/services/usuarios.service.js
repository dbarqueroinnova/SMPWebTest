import { fetch, put, post } from "./base.service";

export const getUsuarios = async () => {
  console.log("usuarios")
  try {
    let response = [];

    const dataUsuario = await fetch(`/Usuario`);
    dataUsuario.data.forEach((element) => {
      response.push({
        usuarioId: element.usuarioId,
        nombre: element.nombre,
        telefono: element.telefono,
        identificacion: element.identificacion,
        email: element.email,
        rolId: element.rol.rolId,
        roleName: element.rol.rolName,
        estado: element.estado,
      });
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const crearUsuario = async (data) => {
  try {
    const dataUsuario = await post(`/Usuario`, data);
    return dataUsuario.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const actualizarUsuario = async (data) => {
  try {
    const dataUsuario = await put(`/Usuario`, data);
    return dataUsuario.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
