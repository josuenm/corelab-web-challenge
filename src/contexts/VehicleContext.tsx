import { createContext, useState } from "react"
import { IVehicle } from "src/types/Vehicle";


interface IVehicleDTO {
    name: string;
    description: string;
    plate: string;
    year: number;
    color: string;
    price: number;
}

interface IVehicleContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}




export interface IVehicleContextProps {
    vehicles: IVehicle[];
    favorites: IVehicle[];
    insertVehicle: (vehicle: IVehicleDTO) => void;
    deleteVehicle: (id: string) => void;
}



const VehicleContext = createContext<null | IVehicleContextProps>(null);





const VehicleContextProvider = ({ children }: IVehicleContextProviderProps) => {

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [favorites, setFavorites] = useState<IVehicle[]>([]);




    const insertVehicle = (vehicle: IVehicleDTO) => {
        const response = { id: '', createdAt: new Date(), isFavorite: false, ...vehicle };
        setVehicles(prev => ({...prev, response}))
    }
    
    const deleteVehicle = (id: string) => {
        const findIndex = vehicles.findIndex(vehicle => vehicle.id === id)
        const newVehiclesList = vehicles.splice(findIndex)
        setVehicles(newVehiclesList)
    }
    
    const listAllVehicles = () => {
        return vehicles
    }
    
    const listAllFavorites = () => {
        return vehicles.map((vehicle) => vehicle.isFavorite === true)
    }


    return (
        <VehicleContext.Provider value={{vehicles, favorites, insertVehicle, deleteVehicle}}>
            {children}
        </VehicleContext.Provider>
    )
}


export { VehicleContext, VehicleContextProvider };