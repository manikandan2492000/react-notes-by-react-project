import React from 'react';
import { Menu, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import styles from './Navbar.module.scss';
import Button from '../../common/Button/Button';

const Navbar = ({ onMenuClick, onSearchClick }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <button className={styles.menuBtn} onClick={onMenuClick}>
                    <Menu size={24} />
                </button>
                <h1 className={styles.logo}>React Notes</h1>
            </div>

            <div className={styles.right}>
                <div className={styles.searchBar} onClick={onSearchClick}>
                    <Search size={18} />
                    <span>Search topics...</span>
                    <span className={styles.shortcut}>Ctrl+K</span>
                </div>

                <button className={styles.searchBtnMobile} onClick={onSearchClick} aria-label="Search">
                    <Search size={20} />
                </button>

                <Button variant="secondary" onClick={toggleTheme} className={styles.themeBtn}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
