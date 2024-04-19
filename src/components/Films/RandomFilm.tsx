import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomFilm} from "../../redux/randomFilm";
import { RootState} from "../../redux/store";
import { Loader} from "../Loader";
import { useNavigate } from 'react-router-dom';
import {AppDispatch} from "../../redux/store";
import styles from '../../css/RandomFilm.module.css';

export function RandomFilm() {
    const isRegistered = localStorage.getItem('isRegistered');
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const film = useSelector((state: RootState) => state.films.randomFilm);
    const loading = useSelector((state: RootState) => state.films.loading);

    useEffect(() => {
        dispatch(fetchRandomFilm());
    }, [dispatch]);

    const handleNewFilmClick = () => {
        if (isRegistered) {
            dispatch(fetchRandomFilm());
        } else {
            navigate('/reg');
        }
    };

    const handleDetailsClick = () => {
        if (film) {
            navigate(`/id=${film.id}`);
        }
    };

    return (
        <div className={styles.randomFilm}>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {film && (
                        <>
                            <img src={film.poster.url} alt={film.name} />
                            <div>
                                <button onClick={handleNewFilmClick}>Получить другой случайный фильм</button>
                                <button onClick={handleDetailsClick}>Перейти на страницу фильма</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
