import styles from './FilterModal.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import Button from '../Button';
import FilterIcon from "src/assets/filter_icon.svg"
import { Label } from '../Form';
import { useContext, useState } from 'react';
import { IVehicleContextProps, VehicleContext } from 'src/contexts/VehicleContext';


interface IFilterModalProps {
    isActive: boolean;
    setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFilterButtonProps {
    setFilterModalState: (param: boolean) => void;
}





const FilterModal = ({ isActive, setIsModalActive }: IFilterModalProps) => {

    const closeModal = () => setIsModalActive(false);
    
    const { filterAllVehicles } = useContext(VehicleContext) as IVehicleContextProps;
    
    const [models, setModels] = useState<string>('');
    const [colors, setColors] = useState<string>('');
    const [years, setYears] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    const [error, setError] = useState<string>('');


    function handleFilter() {
        if(minPrice > maxPrice) {
            setError('O preço mínimo não pode ser maior que o preço máximo');
        }

        filterAllVehicles({models, colors, years, minPrice, maxPrice})
    }



    const carModels = [
        { id: 1, value: "", title: "Selecione um modelo" },
        { id: 2, value: "Volkswagen", title:"Volkswagen" },
        { id: 3, value: "Fiat", title:"Fiat" },
        { id: 4, value: "Chevrolet", title:"Chevrolet" },
        { id: 5, value: "Ford", title:"Ford" },
        { id: 6, value: "Hyundai", title:"Hyundai" },
    ]
    
    const carColors = [
        { id: 1, value: "", title: "Selecione uma cor" },
        { id: 2, value: "Vermelho", title:"Vermelho" },
        { id: 3, value: "Preto", title:"Preto" },
        { id: 4, value: "Prata", title:"Prata" },
        { id: 5, value: "Branco", title:"Branco" },
        { id: 6, value: "Cinza", title:"Cinza" },
    ]
    
    const carYears = [
        { id: 1, value: "", title: "Selecione o ano" },
        { id: 2, value: "2022", title: "2022" },
        { id: 4, value: "2021", title: "2021" },
        { id: 5, value: "2020", title: "2020" },
        { id: 6, value: "2019", title: "2019" },
        { id: 7, value: "2018", title: "2018" },
        { id: 8, value: "2017", title: "2017" },
        { id: 9, value: "2016", title: "2016" },
        { id: 10, value: "2015", title: "2015" },
        { id: 11, value: "2014", title: "2014" },
        { id: 12, value: "2013", title: "2013" },
        { id: 13, value: "2012", title: "2012" },
        { id: 14, value: "2011", title: "2011" },
        { id: 15, value: "2010", title: "2010" },
    ]

    if(!isActive) return <></>
    return (
        <>
            <div className={styles.Background} onClick={closeModal}></div>
            
            <div className={styles.BackButtonContainer} onClick={closeModal}>
                <img src={BackButtonIcon} alt="Botão de voltar" />
            </div>

            <div className={styles.Modal}>
                <div className={styles.Complete_Select_Container}>
                    <Label label="Modelos" />

                    <select id="Modelos" onChange={(e) => setModels(e.target.value)}>
                        {carModels.map((item) => (
                            <option value={item.value} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.Complete_Select_Container}>
                    <Label label="Cor" />

                    <select id="Cor" onChange={(e) => setColors(e.target.value)}>
                        {carColors.map((item) => (
                            <option value={item.value} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.Complete_Select_Container}>
                    <Label label="Ano" />

                    <select id="Ano" onChange={(e) => setYears(e.target.value)}>
                        {carYears.map((item) => (
                            <option value={item.value} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.pricing_container}>
                    <div className={styles.pricing_input_container}>
                        <Label label="Preço mín." />
                        <input 
                            type="number" 
                            id="preçomin" 
                            value={minPrice} 
                            placeholder="Preço mínimo" 
                            className={styles.Input} 
                            onChange={(e) => setMinPrice(Number(e.target.value))} />
                    </div>
                    <div className={styles.pricing_input_container}>
                        <Label label="Preço máx." />
                        <input 
                            type="number" 
                            id="preçomáx" 
                            value={maxPrice} 
                            placeholder="Preço máximo" 
                            className={styles.Input}
                            onChange={(e) => setMaxPrice(Number(e.target.value))} />
                    </div>
                </div>

                {error.length > 1 && <p className={styles.error_message}>{error}</p>}

                <div className={styles.Button_Container}>
                    <Button title="Salvar" onClick={handleFilter} />
                </div>
            </div>
        </>
    )
}




const FilterButton = ({ setFilterModalState }: IFilterButtonProps) => {

    return (
        <button 
            type="button" 
            onClick={() => setFilterModalState(true)}
            className={styles.Filter_Button}>
            Filtrar
        </button>
    )
}





export { FilterModal, FilterButton };