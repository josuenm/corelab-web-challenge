import styles from './EditVehicleModal.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import { CompleteInput, Submit } from 'src/components/Form';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext, useMemo } from 'react';
import { IVehicleContextProps, VehicleContext } from 'src/contexts/VehicleContext';
import { IVehicleDTO } from 'src/types/Vehicle';


type IInputs = {
  name: string,
  description: string,
  price: number,
  brand: string,
  color: string,
  year: number,
  plate: string
};


interface IEditVehicleModalProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    dataToEdit: IVehicleDTO;
}



const schema = yup.object({
    name: yup.string().required("Insira um nome"),
    description: yup.string().notRequired(),
    price: yup.number().typeError("Insira um preço válido").min(1, "Insira um número apartir de 1 real"),
    brand: yup.string().required("Insira uma marca"),
    color: yup.string().required("Insira uma cor"),
    year: yup.number().typeError('Insira um ano válido').positive("Insira um ano válido").integer("Insira um ano válido").required("Insira o ano").min(1886, "Insirá um ano válido").max(new Date().getFullYear(), 'Insirá um ano válido'),
    plate: yup.string().required("Insira a placa"),
}).required();



const EditVehicleModal = ({ dataToEdit, close, id }: IEditVehicleModalProps) => {

    const { updateOne } = useContext(VehicleContext) as IVehicleContextProps

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IInputs>({
        resolver: yupResolver(schema),
        defaultValues: useMemo(() => {
            return {...dataToEdit, price: dataToEdit.price || 0}
        }, [dataToEdit])
    });

    const closeModal = () => close(false);


    const onSubmit: SubmitHandler<IInputs> = async (data) => {
        updateOne({ data, id: id })

        reset({
            name: '',
            brand: '',
            color: '',
            year: 0,
            plate: ''
        })
        window.location.reload();
    };

    
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
                        label='Descrição' 
                        placeholder="Um ótimo carro para passeio..." 
                        register={{...register("description")}}
                        error={errors.description?.message} />

                    <CompleteInput 
                        label='Preço' 
                        placeholder="27900" 
                        register={{...register("price")}}
                        error={errors.price?.message} />

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


export default EditVehicleModal;