import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../css/Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <img src="/kinopoisk.jpg" alt="Кинопоиск" />
                    </NavLink>
                </div>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/" className={styles.active}>Все фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reg" className={styles.active}>Авторизация</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rand" className={styles.active}>Случайный фильм</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
}


