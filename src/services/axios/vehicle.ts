import { IVehicle, IVehicleDTO } from "src/types/Vehicle";
import { api } from "./api";






interface IVehicleWithToken {
    token: string;
    vehicle: IVehicleDTO;
}


interface ITokenAndId {
    id: string;
    token: string;
}




const vehicleApi = {
    create: async ({ token, vehicle }: IVehicleWithToken): Promise<IVehicle> => {
        const response = await api.post('/vehicle/create', vehicle, {
            headers: {
                'corelab.token': token
            }
        })

        return response.data
    },

    findAll: async (token: string): Promise<IVehicle[]> => {
        const response = await api.get('/vehicle/findAll', {
            headers: {
                'corelab.token': token
            }
        })

        if(response.status === 200) {
            return response.data
        } else {
            return []
        }
    },

    findById: async ({ id, token }: ITokenAndId): Promise<IVehicle> => {
        const response = await api.get(`/vehicle/findById/${id}`, {
            headers: {
                'corelab.token': token
            }
        })

        return response.data
    },

    handleFavorite: async ({ id, token, isFavorite }: ITokenAndId & { isFavorite: boolean }): Promise<void> => {

        await api.patch(`/vehicle/favorite/${id}`, isFavorite, {
            headers: {
                'corelab.token': token
            }
        })
    },

    deleteOne: async ({ token, id, }: ITokenAndId): Promise<boolean | IVehicle> => {
        const response = await api.delete(`/vehicle/deleteOne/${id}`, {
            headers: {
                'corelab.token': token
            }
        })

        if(response.status === 200) {
            return response.data
        } else {
            return false
        }
    },

    updateOne: 
        async ({ id, token, data }: { id: string, token: string, data: IVehicleDTO }): Promise<IVehicle> => {
        const response = await api.patch(`/vehicle/updateOne/${id}`, data, {
            headers: {
                'corelab.token': token
            }
        })

        return response.data
    },
}



export default vehicleApi;