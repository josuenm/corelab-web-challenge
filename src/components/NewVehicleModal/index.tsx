import styles from './NewVehicleModal.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import { CompleteInput, Submit } from 'src/components/Form';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


type Inputs = {
  name: string,
  brand: string,
  color: string,
  year: number,
  plate: string
};


interface NewAdModalProps {
    isActive: boolean;
    setIsModalActive: (value: boolean) => void;
}



const schema = yup.object({
    name: yup.string().required("Insira um nome"),
    brand: yup.string().required("Insira uma marca"),
    color: yup.string().required("Insira uma cor"),
    year: yup.number().typeError('Insira um ano válido').positive("Insira um ano válido").integer("Insira um ano válido").required("Insira o ano").min(1886, "Insirá um ano válido").max(new Date().getFullYear(), 'Insirá um ano válido'),
    plate: yup.string().required("Insira a placa"),
}).required();



const NewAdModal = ({ isActive, setIsModalActive }: NewAdModalProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


    const closeModal = () => setIsModalActive(false);
    
    if(!isActive) return <></>
    return (
        <>
            <div className={styles.Background} onClick={closeModal}></div>
            
            <div className={styles.BackButtonContainer} onClick={closeModal}>
                <img src={BackButtonIcon} alt="Botão de voltar" />
            </div>

            <div className={styles.Modal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CompleteInput 
                        label='Nome' 
                        placeholder="Sandero" 
                        register={{...register("name")}}
                        error={errors.name?.message} />

                    <CompleteInput 
                        label='Marca' 
                        placeholder="Renault" 
                        register={{...register("brand")}}
                        error={errors.brand?.message} />

                    <CompleteInput 
                        label='Cor' 
                        placeholder="Vermelho" 
                        register={{...register("color")}}
                        error={errors.color?.message} />

                    <CompleteInput 
                        type="number" 
                        label='Ano' 
                        placeholder="2016" 
                        register={{...register("year")}}
                        error={errors.year?.message} />

                    <CompleteInput 
                        label='Placa' 
                        placeholder="PWZ1020" 
                        register={{...register("plate")}}
                        error={errors.plate?.message} />

                    <div className={styles.Submit_Container}>
                        <Submit title="Salvar" />
                    </div>
                </form>
            </div>
        </>
    )
}


export default NewAdModal;