import styles from "./Card.module.scss";
import DeleteIcon from "src/assets/delete_icon.svg"
import FavoriteOutlinedIcon from "src/assets/favorite_outlined_icon.svg"
import FavoriteIcon from "src/assets/favorite_icon.svg"


interface ICard {
  title: string;
  price: number;
  description: string;
  year: number;
  isFavorited?: boolean;
}



const Card = (props: ICard) => {

  return (
    <div className={styles.Card}>

      <header>
        <div className={styles.icon_container}>
          {props.isFavorited ?(
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
        <div className={styles.icon_container}>
          <img src={DeleteIcon} alt="Botão de remover" className={styles.delete_icon} />
        </div>
      </header>
      <h2 className={styles.card_list_title}>{props.title}</h2>
      <p>Price: {props.price}</p>
      <p>Description: {props.description}</p>
      <p>Year: {props.year}</p>
    </div>
  );
};

export default Card;
