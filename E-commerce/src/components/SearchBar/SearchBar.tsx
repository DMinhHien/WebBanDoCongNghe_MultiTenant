import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => (
  <div className={styles.searchContainer}>
    <input type="text" placeholder="Tìm mua?" className={styles.searchBar} />
    <button className={styles.searchButton}>TÌM</button>
  </div>
);

export default SearchBar;
