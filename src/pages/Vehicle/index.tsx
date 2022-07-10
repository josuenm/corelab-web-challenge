import styles from './Vehicle.module.scss';
import BackButtonIcon from 'src/assets/arrow_left_icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import PermissionToDelete from 'src/components/PermissionToDelete';
import EditVehicleModal from 'src/components/EditVehicleModal';
import vehicleApi from 'src/services/axios/vehicle';
import { parseCookies } from 'nookies';



const Vehicle = () => {

    const navigate = useNavigate();
    const path = useLocation();
    const pathname = path.pathname.split('/vehicle/')[1]

    const cookies = parseCookies();
    const coreLabToken = cookies['corelab.token']


    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);


    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [plate, setPlate] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [year, setYear] = useState<number>(0)

    function deleteVehicle() {
        setDeleteModal(true)
    }


    function editVehicle() {
        setEditModal(true)
    }


    const findVehicle = useCallback(async() => {
        const { 
            _id,
            name, 
            description, 
            brand, 
            price, 
            plate, 
            color, 
            year 
        } = await vehicleApi.findById({ id: pathname, token: coreLabToken })

        setName(name)
        setDescription(description)
        setBrand(brand)
        setPrice(price)
        setPlate(plate)
        setColor(color)
        setYear(year)
        setId(_id)

    }, [coreLabToken, pathname])



    useEffect(() => {
        findVehicle()
    }, [findVehicle])


    return (
        <>
            {deleteModal && <PermissionToDelete close={setDeleteModal} id={id} />}
            {editModal && (
                <EditVehicleModal 
                    dataToEdit={{name, brand, price, plate, color, description, year}}
                    close={setEditModal} 
                    id={id} />
            )}
            <main className={styles.Main}>
                <div className={styles.Back_Button} onClick={() => navigate("/", { replace: true })}>
                    <img src={BackButtonIcon} alt="Botão de voltar" />
                </div>

                <div className={styles.Card}>
                    <div className={styles.Picture}>
                        <span>Sem foto</span>
                    </div>

                    <h1 className={styles.Title}>
                        {name}
                    </h1>
                    
                    <h2 className={styles.Price}>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(Number(price || 0))}
                    </h2>

                    <div className={styles.Info}>
                        <p className={styles.Info_Title}>
                            Informações:
                        </p>

                        <p className={styles.Plate}>
                            <strong>Placa:</strong> {plate}
                        </p>
                        <p className={styles.Color}>
                            <strong>Cor:</strong> {color}
                        </p>
                        <p className={styles.Color}>
                            <strong>Marca:</strong> {brand}
                        </p>
                        <p className={styles.Color}>
                            <strong>Ano:</strong> {year}
                        </p>
                    </div>

                    <p className={styles.Description}>
                        {description}
                    </p>
                </div>

                <div className={styles.Button_Set}>
                    <button type='button' className={styles.Edit_Button} onClick={editVehicle}>
                        Editar
                    </button>
                    <button 
                        type='button' 
                        className={styles.Delete_Button}
                        onClick={deleteVehicle}>
                        Apagar
                    </button>
                </div>
            </main>
        </>
    )
}



export default Vehicle;