import {fetch,put,post } from './base.service'
let entpoint = '/Plan'
export const getPlanes = () => {
    return fetch(entpoint);
}
export const createPlanes = (plan) => {
    return post(entpoint, plan);
}
export const editPlanes = (plan) => {
    return put(entpoint, plan);
}