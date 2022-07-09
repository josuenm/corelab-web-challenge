import { parseCookies } from "nookies";
import { useCallback, useEffect } from "react";
import { createContext, useState } from "react"
import { IVehicle, IVehicleDTO } from "src/types/Vehicle";
import vehicleApi from "src/services/axios/vehicle";


interface IVehicleContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}

interface IFilterAllVehicles {
    models: string;
    colors: string;
    years: string;
    minPrice: number;
    maxPrice: number;
}


export interface IVehicleContextProps {
    vehicles: IVehicle[];
    favorites: IVehicle[];
    insertVehicle: (vehicle: IVehicleDTO) => void;
    deleteVehicle: (id: string) => void;
    isLoading: boolean;
    listAllVehicles: () => void;
    searchVehicles: (value: string) => void;
    filterAllVehicles: (params: IFilterAllVehicles) => void;
    handleFavorite: (id: string) => void;
}



const VehicleContext = createContext<null | IVehicleContextProps>(null);





const VehicleContextProvider = ({ children }: IVehicleContextProviderProps) => {

    const [originalVehicleList, setOriginalVehicleList] = useState<IVehicle[]>([]);
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [favorites, setFavorites] = useState<IVehicle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const cookies = parseCookies();
    const coreLabToken = cookies['corelab.token']


    const insertVehicle = async (vehicle: IVehicleDTO) => {
        const response = await vehicleApi.create({token: coreLabToken, vehicle})

        setVehicles(prev => ({...prev, response}))
        setOriginalVehicleList(prev => ({...prev, response}))
    }
    

    const deleteVehicle = (id: string) => {
        const response = vehicleApi.deleteOne({ token: coreLabToken, id })
        if(!response) return

        const newVehiclesList = originalVehicleList.filter((item) => item._id !== id)
        setVehicles(newVehiclesList)
        setOriginalVehicleList(newVehiclesList)
    }
    

    const listAllVehicles = useCallback(async () => {
        setIsLoading(true)
        
        const response = await vehicleApi.findAll(coreLabToken);

        setIsLoading(false)
        
        setVehicles(response)
        setOriginalVehicleList(response)
        listAllFavorites(response)
    }, [coreLabToken])
    

    const listAllFavorites = async (vehiclesList: IVehicle[]) => {
        const favoritesList = vehiclesList.filter((vehicle) => vehicle.isFavorite === true)
        setFavorites(favoritesList)
    }

    const handleFavorite = async (id: string) => {
        await vehicleApi.handleFavorite({ token: coreLabToken, id })

        const newVehicleList = originalVehicleList.map((vehicle) => {
            if(vehicle._id === id) {
                vehicle.isFavorite = true
                return vehicle
            } else return vehicle
        })

        setVehicles(newVehicleList)
        setOriginalVehicleList(newVehicleList)
        const favoritesList = newVehicleList.filter((vehicle) => vehicle.isFavorite === true)
        setFavorites(favoritesList)
    }
    

    const filterAllVehicles = ({ models, colors, years, minPrice, maxPrice }: IFilterAllVehicles) => {

    }

    const searchVehicles = async (value: string) => {
        const toFind = value.toLowerCase();


        // Organizing what will be filtered and choosing only object values
        let vehiclesValues = originalVehicleList.map((vehicle) => {
            return Object.values({
                name: vehicle.name.toLowerCase(),
                description: vehicle.description ? vehicle.description.toLowerCase() : '',
                plate: vehicle.plate.toLowerCase(),
                year: vehicle.year.toString(),
                color: vehicle.color.toLowerCase(),
                price: vehicle.price ? vehicle.price.toString() : ''
            })
        })


        // Find all indexes that the word exists
        let indexArray: number[] = []
        for(let i = 0;i < vehiclesValues.length;i++) {
            const index = vehiclesValues[i].find(item => item.includes(toFind))

            if(!!index) {
                indexArray.push(i)
            }
        }


        // Putting vehicles into an array
        let vehiclesFiltered: IVehicle[] = []
        indexArray.forEach((index) => {
            vehiclesFiltered.push(originalVehicleList[index])
        })


        // Putting favorite vehicles within the favorite vehicle array
        const favoriteVehiclesFound = vehiclesFiltered.filter((vehicle) => {
            return vehicle.isFavorite === true
        });
        setFavorites(favoriteVehiclesFound);


        // Putting vehicles within the vehicle array
        setVehicles(vehiclesFiltered);
    }

    useEffect(() => {
        listAllVehicles()
    }, [listAllVehicles])


    return (
        <VehicleContext.Provider value={{
            vehicles, favorites, insertVehicle, deleteVehicle, isLoading, listAllVehicles, searchVehicles, filterAllVehicles, handleFavorite
        }}>
            {children}
        </VehicleContext.Provider>
    )
}


export { VehicleContext, VehicleContextProvider };