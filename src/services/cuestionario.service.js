import { fetch, put, post } from "./base.service";

export const getCuestionarios = async () => {
  console.log('cuestionarios')
  try {
    const dataCuestionario = await fetch(`/Cuestionario`);

    return dataCuestionario.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getTipoPreguntas = async () => {

    try {
      const dataTipoPregunta = await fetch(`/TipoPregunta`);
  
      return dataTipoPregunta.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  

  export const crearCuestionario = async (data) => {

    try {
      const crear = await post(`/Cuestionario`,data);
  
      return crear.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  export const actualizarCuestionario = async (data) => {

    try {
      const actualizar = await put(`/Cuestionario`,data);
  
      return actualizar.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

