import styles from './Home.module.scss';

import Card from "src/components/Card";
import Search from "src/components/Search";
import NewVehicleModal from "src/components/NewVehicleModal";
import { FilterButton, FilterModal } from 'src/components/FilterModal';
import { useContext, useState } from 'react';
import { VehicleContext, IVehicleContextProps } from 'src/contexts/VehicleContext';
import { Head } from 'src/components/Head';
import { SmallLoading } from 'src/components/Loading';




const Home = () => {

    const { vehicles, favorites, isLoading } = useContext(VehicleContext) as IVehicleContextProps;

    const [newModalState, setNewModalState] = useState<boolean>(false);
    const [filterModalState, setFilterModalState] = useState<boolean>(false);

    return (
        <>
            <Head title="Início | CoreLab" />
            <div className={styles.Home}>
                <main className={styles.main}>
                    <Search placeholder="Buscar">
                        <FilterButton setFilterModalState={setFilterModalState} />
                    </Search>

                    {/* Modals */}
                    <NewVehicleModal isActive={newModalState} setIsModalActive={setNewModalState} />
                    <FilterModal isActive={filterModalState} setIsModalActive={setFilterModalState} />

                    <div className={styles.Add_Button}>
                        <h2>Adicione um novo anúncio</h2>
                        <button type="button" onClick={() => setNewModalState(true)}>
                            Adicionar
                        </button>
                    </div>

                    <div className={styles.card_list_container}>
                    <h2>Favoritos</h2>

                    <div className={styles.card_list}>
                        {isLoading ? <SmallLoading /> : (
                            favorites.length >= 1 ? favorites.map((vehicle) => (
                                <Card 
                                    title={vehicle.name} 
                                    description={vehicle.description} 
                                    price={vehicle.price}
                                    year={vehicle.year}
                                    isFavorited={vehicle.isFavorite} 
                                    key={vehicle._id} />
                            )) : (
                                <div className={styles.empty_list_container}>
                                    <p className={styles.title}>Nenhum anúncio foi encontrado</p>
                                </div>
                            ))
                        }
                    </div>
                    </div>


                    <div className={styles.card_list_container}>
                    <h2>Anúncios</h2>

                    <div className={styles.card_list}>
                        {isLoading ? <SmallLoading /> : (
                            vehicles.length >= 1 ? vehicles.map((vehicle) => (
                                <Card 
                                    title={vehicle.name} 
                                    description={vehicle.description} 
                                    price={vehicle.price}
                                    year={vehicle.year}
                                    isFavorited={vehicle.isFavorite} 
                                    key={vehicle._id} />
                            )) : (
                                <div className={styles.empty_list_container}>
                                    <p className={styles.title}>Nenhum anúncio foi encontrado</p>
                                </div>
                            )
                        )}
                    </div>
                    </div>
                </main>
            </div>
        </>
    )
}



export default Home;