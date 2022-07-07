import styles from './Home.module.scss';
import FilterIcon from "src/assets/filter_icon.svg"

import Button from "src/components/Button";
import Card from "src/components/Card";
import Search from "src/components/Search";
import NewVehicleModal from "src/components/NewVehicleModal";
import FilterModal from 'src/components/FilterModal';
import { useContext, useState } from 'react';
import { VehicleContext, IVehicleContextProps } from 'src/contexts/VehicleContext';




const Home = () => {

    const { vehicles, favorites } = useContext(VehicleContext) as IVehicleContextProps;

    const [newModalState, setNewModalState] = useState<boolean>(false);
    const [filterModalState, setFilterModalState] = useState<boolean>(false);


    return (
        <div className={styles.Home}>
            <main className={styles.main}>
                <div className={styles.search_container}>
                    <Search placeholder="Buscar" value="" onChange={() => {}} />
                    <div className={styles.icon_container} onClick={() => setFilterModalState(true)}>
                        <img src={FilterIcon} alt="Icone de filtro" />
                    </div>
                </div>
                <Button text="Adicionar" onClick={() => setNewModalState(true)} />

                {/* Modals */}
                <NewVehicleModal isActive={newModalState} setIsModalActive={setNewModalState} />
                <FilterModal isActive={filterModalState} setIsModalActive={setFilterModalState} />

                <div className={styles.card_list_container}>
                   <h2>Favoritos</h2>

                   <div className={styles.card_list}>
                    {favorites.length > 1 ? favorites.map((vehicle) => (
                            <Card 
                                title='Anúncio 4' 
                                description='Isso é somente um teste' 
                                price={22000}
                                year={2018}
                                isFavorited={true}
                                key={vehicle.id} />
                        )) : (
                            <div className={styles.empty_list_container}>
                                <p className={styles.title}>Nenhum anúncio foi encontrado</p>
                            </div>
                        )}
                   </div>
                </div>


                <div className={styles.card_list_container}>
                   <h2>Anúncios</h2>

                   <div className={styles.card_list}>
                    {vehicles.length > 1 ? vehicles.map((vehicle) => (
                        <Card 
                            title={vehicle.name} 
                            description={vehicle.description} 
                            price={vehicle.price}
                            year={vehicle.year}
                            isFavorited={vehicle.isFavorite} 
                            key={vehicle.id} />
                    )) : (
                        <div className={styles.empty_list_container}>
                            <p className={styles.title}>Nenhum anúncio foi encontrado</p>
                        </div>
                    )}
                   </div>
                </div>
            </main>
        </div>
    )
}



export default Home;