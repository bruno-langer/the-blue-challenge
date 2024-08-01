import { asset, company, location } from "../contexts/DataTypes"

export const getCompanies = async () => {
    const data = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT + '/companies')
    return await data.json() as company[]
}

export const getAssets = async (id: string) => {
    const data = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT + '/companies/' + id + '/assets')
    return await data.json() as asset[]
}

export const getLocations = async (id: string) => {
    const data = await fetch(import.meta.env.VITE_BACKEND_ENDPOINT + '/companies/' + id + '/locations')
    return await data.json() as location[]
}