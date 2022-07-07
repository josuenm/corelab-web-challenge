import styles from './FilterModal.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import { Select, Label, Input } from '../Form';
import Button from '../Button';

interface FilterModalProps {
    isActive: boolean;
    setIsModalActive: (value: boolean) => void;
}


const FilterModal = ({ isActive, setIsModalActive }: FilterModalProps) => {
    const closeModal = () => setIsModalActive(false);
    

    const carModels = [
        { id: 1, value: "", title: "Selecione uma marca" },
        { id: 2, value: "VW", title: "Volkswagen" },
        { id: 3, value: "FI", title: "Fiat" },
        { id: 4, value: "CH", title: "Chevrolet" },
    ]
    
    const carColors = [
        { id: 1, value: "", title: "Selecione uma cor" },
        { id: 2, value: "VE", title: "Vermelho" },
        { id: 3, value: "PR", title: "Preto" },
        { id: 4, value: "PA", title: "Prata" },
        { id: 5, value: "BR", title: "Branco" },
    ]
    
    const carYears = [
        { id: 1, value: "", title: "Selecione um ano" },
        { id: 2, value: "22", title: "2022" },
        { id: 3, value: "19", title: "2019" },
        { id: 4, value: "18", title: "2018" },
        { id: 5, value: "17", title: "2017" },
    ]


    if(!isActive) return <></>
    return (
        <>
            <div className={styles.Background} onClick={closeModal}></div>
            
            <div className={styles.BackButtonContainer} onClick={closeModal}>
                <img src={BackButtonIcon} alt="Botão de voltar" />
            </div>

            <div className={styles.Modal}>
                <Select label="Modelo" data={carModels} />
                <Select label="Cor" data={carColors} />
                <Select label="Ano" data={carYears} />

                <div className={styles.pricing_container}>
                    <div className={styles.pricing_input_container}>
                        <Label label="Preço mín." />
                        <Input type="number" placeholder="Preço mínimo" />
                    </div>
                    <div className={styles.pricing_input_container}>
                        <Label label="Preço máx." />
                        <Input type="number" placeholder="Preço máximo" />
                    </div>
                </div>

                <div className={styles.button_container}>
                    <Button text="Salvar" onClick={() => null} />
                </div>
            </div>
        </>
    )
}



export default FilterModal;