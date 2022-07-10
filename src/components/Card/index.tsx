import styles from "./Card.module.scss";
import FavoriteOutlinedIcon from "src/assets/favorite_outlined_icon.svg"
import FavoriteIcon from "src/assets/favorite_icon.svg"
import { memo, useContext } from "react";
import { IVehicleContextProps, VehicleContext } from "src/contexts/VehicleContext";
import { IVehicle } from "src/types/Vehicle";
import { Link } from "react-router-dom";




const CardComponent = ({ data }: { data: IVehicle }) => {

  const { handleFavorite } = useContext(VehicleContext) as IVehicleContextProps;

  return (
    <div className={styles.Card_Container}>
      <div className={styles.icon_container} onClick={() => handleFavorite(data._id)}>
        {data.isFavorite ?(
          <img 
            src={FavoriteIcon} 
            alt="Botão de adicionado ao favorito" 
            className={styles.favorite_icon} />
        ):(
          <img 
            src={FavoriteOutlinedIcon} 
            alt="Botão de adicionar aofavorito" 
            className={styles.favorite_icon} />
        )}
      </div>
      <Link to={'/vehicle/'+data._id}>
        <div className={styles.Card}>
          <h2 className={styles.card_list_title}>{data.description.slice(0, 7)}</h2>
          <p>Preço: {data.price}</p>
          <p>Descrição: {data.description.slice(0, 7)}</p>
          <p>Ano: {data.year}</p>
        </div>
      </Link>
    </div>
  );
};


export const Card = memo(CardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps)
})

Card.displayName = 'Card';