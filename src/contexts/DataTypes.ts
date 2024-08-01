export interface asset {
    gatewayId?: string,
    id: string,
    locationId?: string,
    name: string,
    parentId?: string,
    sensorId?: string,
    sensorType?: "energy" | "vibration",
    status?: "operating" | "alert"
}

export interface location {
    id: string,
    name: string,
    parentId?: string
}

export interface company {
    id: string,
    name: string
}