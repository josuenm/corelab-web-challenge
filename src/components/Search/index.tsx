import styles from './Search.module.scss';
import SearchIcon from 'src/assets/search_icon.svg';

interface ISearch {
  placeholder: string;
  value: string;
  onChange: () => void;
}

const Search = (props: ISearch) => {
  return (
    <label htmlFor="search_input" className={styles.SearchContainer}>
      <img src={SearchIcon} alt="Icone de pesquisa" />
      <input 
        type="text" 
        placeholder={props.placeholder} 
        value={props.value}
        className={styles.Input}
        id="search_input" />
    </label>
  );
};

export default Search;
