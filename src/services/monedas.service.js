import {fetch,put,post } from './base.service'
let entpoint = '/Moneda'
export const getMonedas = () => {
    return fetch(entpoint);
}