import { ReactNode, createContext, useEffect, useState } from "react";
import { asset, company, location } from "./DataTypes";
import { getAssets, getLocations } from "../api/data";

interface dataContextData {
    companies: company[]
    selectedCompany: string,
    locations: location[],
    assets: asset[]
    selectedComponent: asset | null
}

const initialData: dataContextData = {

    companies: [],
    selectedCompany: "",
    locations: [],
    assets: [],
    selectedComponent: null
}


export const DataContext = createContext<{ data: dataContextData, setData: (data: dataContextData) => void }>({ data: initialData, setData: () => { } })

export function DataContextProvider({ children }: { children: ReactNode }) {

    const [data, setData] = useState(initialData)

    useEffect(() => {

        if (data.selectedCompany === "") return

        getLocations(data.selectedCompany).then((locationRes) => {
            getAssets(data.selectedCompany).then((assetsRes) => {

                setData({ ...data, locations: locationRes, assets: assetsRes })

            })
        })

    }, [data.selectedCompany])


    return <DataContext.Provider value={{ data, setData }}>
        {children}
    </DataContext.Provider>

}