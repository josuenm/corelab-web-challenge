import styles from './Search.module.scss';
import SearchIcon from 'src/assets/search_icon.svg';
import { useContext, useRef, useState } from 'react';
import { IVehicleContextProps, VehicleContext } from 'src/contexts/VehicleContext';

interface ISearch {
  placeholder: string;
  children: React.ReactNode;
}

const Search = (props: ISearch) => {

  const searchInput = useRef<HTMLInputElement | null>(null);
  const { searchVehicles, listAllVehicles } = useContext(VehicleContext) as IVehicleContextProps;

  function handleSearch() {
    const inputValue = searchInput.current?.value || ''

    if(inputValue.length < 1) {
      listAllVehicles()
    } else {
      searchVehicles(inputValue)
    }
  }


  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSearch()
    }}>
      <label htmlFor="search_input" className={styles.Search_Container}>
        <img src={SearchIcon} alt="Icone de pesquisa" />
        <input 
          type="text" 
          placeholder={props.placeholder} 
          className={styles.Input}
          id="search_input"
          ref={searchInput} />
      </label>
      <div className={styles.Buttons_Container}>
        <button type='submit' className={styles.Search_Button}>Buscar</button>
        { props.children }
      </div>
    </form>
  );
};

export default Search;
