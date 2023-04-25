import {fetch,put,post } from './base.service'
let entpoint = '/Producto'
export const getProductos = () => {
    return fetch(entpoint);
}
export const createProductos = (producto) => {
    return post(entpoint, producto);
}
export const editProductos = (producto) => {
    return put(entpoint, producto);
}