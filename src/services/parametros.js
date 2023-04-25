import { fetch, put } from "./base.service";

export const getParametros = async () => {
    try {
        const response = await fetch(`/Parametro`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateParametros = async (body) => {
    try {
        const response = await put('/Parametro', body)
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
