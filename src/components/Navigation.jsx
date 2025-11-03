import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import ThemeToggle from './ThemeToggle';

function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>AirThreads</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/product" 
            className={`${styles.navLink} ${location.pathname === '/product' ? styles.active : ''}`}
          >
            Product
          </Link>
          <Link 
            to="/integrations" 
            className={`${styles.navLink} ${location.pathname === '/integrations' ? styles.active : ''}`}
          >
            Integrations
          </Link>
          <Link 
            to="/about" 
            className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
          >
            About
          </Link>
        </div>

        <div className={styles.ctaSection}>
          <ThemeToggle />
          <Link to="/product" className={styles.ctaButton}>
            Try Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 