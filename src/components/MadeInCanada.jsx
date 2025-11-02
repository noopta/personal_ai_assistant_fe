import React from 'react';
import styles from './MadeInCanada.module.css';

const MadeInCanada = () => (
  <div className={styles.madeInCanada}>
    <span role="img" aria-label="heart">❤️</span>
    <span className={styles.text}>Proudly built in Toronto, Ontario</span>
    <span role="img" aria-label="Canada flag">🇨🇦</span>
  </div>
);

export default MadeInCanada; 