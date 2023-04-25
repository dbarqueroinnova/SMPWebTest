import {fetch,put,post } from './base.service'
let entpoint = '/Convenio'
export const getConvenios = () => {
    return fetch(entpoint);
}
export const createConvenio = (convenio) => {
}
export const editPConvenio = (convenio) => {
}