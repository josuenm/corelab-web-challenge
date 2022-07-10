import styles from './FilterModal.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import { Label, Submit } from '../Form';
import { useContext, useMemo } from 'react';
import { IVehicleContextProps, VehicleContext } from 'src/contexts/VehicleContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


type IInputs = {
    brand: string;
    color: string;
    year: string;
    minPrice: number;
    maxPrice: number;
};

interface IFilterModalProps {
    setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFilterButtonProps {
    setFilterModalState: (param: boolean) => void;
}



const schema = yup.object({
    maxPrice: yup.number().typeError('Insira um preço ou coloque zero').min(0, "Insira um preço válido"),
    minPrice: yup.number().typeError('Insira um preço ou coloque zero').min(0, "Insira um preço válido").max(yup.ref('maxPrice'), "O preço mínimo não pode ser maior que o preço máximo")
}).required();




const FilterModal = ({ setIsModalActive }: IFilterModalProps) => {

    const closeModal = () => setIsModalActive(false);
    
    const { filterAllVehicles } = useContext(VehicleContext) as IVehicleContextProps;

    const { register, handleSubmit, formState: { errors } } = useForm<IInputs>({
        resolver: yupResolver(schema),
        defaultValues: useMemo(() => {
            return {
                minPrice: 0,
                maxPrice: 0
            }
        }, [])
    });


    const onSubmit: SubmitHandler<IInputs> = async (data) => {
        filterAllVehicles({
            ...data,
            minPrice: data.minPrice || 0,
            maxPrice: data.maxPrice || 0,
        })

        closeModal()
    };

    
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

    return (
        <>
            <div className={styles.Background} onClick={closeModal}></div>
            
            <div className={styles.BackButtonContainer} onClick={closeModal}>
                <img src={BackButtonIcon} alt="Botão de voltar" />
            </div>

            <div className={styles.Modal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.Complete_Select_Container}>
                        <Label label="Cor" />

                        <select id="Cor" {...register('color')}>
                            {carColors.map((item) => (
                                <option value={item.value} key={item.id}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.Complete_Select_Container}>
                        <Label label="Ano" />

                        <select id="Ano" {...register('year')}>
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
                                placeholder="Preço mínimo" 
                                className={styles.Input} 
                                {...register('minPrice')} />
                            {errors.minPrice && (
                                <p className={styles.error_message}>{errors.minPrice.message}</p>
                            )}
                        </div>
                        <div className={styles.pricing_input_container}>
                            <Label label="Preço máx." />
                            <input 
                                type="number" 
                                id="preçomáx" 
                                placeholder="Preço máximo" 
                                className={styles.Input}
                                {...register('maxPrice')} />
                            {errors.maxPrice && (
                                <p className={styles.error_message}>{errors.maxPrice.message}</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.Button_Container}>
                        <Submit title="Salvar" />
                    </div>
                </form>
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