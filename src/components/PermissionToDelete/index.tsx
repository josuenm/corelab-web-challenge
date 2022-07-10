import styles from './PermissionToDelete.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import { useContext } from 'react';
import { IVehicleContextProps, VehicleContext } from 'src/contexts/VehicleContext';
import { useNavigate } from 'react-router-dom';



interface PermissionToDeleteProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
}



const PermissionToDelete = ({ close, id }: PermissionToDeleteProps) => {

    const navigate = useNavigate()

    const { deleteVehicle } = useContext(VehicleContext) as IVehicleContextProps;

    function handleClose() {
        close(false)
    }

    async function Delete() {
        const response = await deleteVehicle(id)

        if(response) {
            navigate('/', { replace: true })
        }
    }

    return (
        <>
            <div className={styles.Back_Button} onClick={handleClose}>
                <img src={BackButtonIcon} alt="Botão de voltar" />
            </div>
            <div className={styles.Background} onClick={handleClose}></div>
            <div className={styles.Modal}>
                <p className={styles.Title}>
                    Tem certeza que deseja excluir?
                </p>

            <div className={styles.Button_Set}>
                <button type="button" className={styles.Delete} onClick={Delete}>
                    Excluir
                </button>
                <button type="button" className={styles.NoDelete} onClick={handleClose}>
                    Não
                </button>
            </div>
            </div>
        </>
    )
}



export default PermissionToDelete;