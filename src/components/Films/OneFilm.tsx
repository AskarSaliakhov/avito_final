
import styles from "../../css/OneFilm.module.css";
import { Film } from "../../interfaces";

interface OneFilmProps {
    film: Film;
}

export function OneFilm({ film }: OneFilmProps) {
    const hasPoster = film.poster && film.poster.url;

    const filmClasses = `${styles.film} ${hasPoster ? '' : styles.minHeight600}`;

    return (
        <div className={filmClasses}>
            {hasPoster && (
                <img src={film.poster.url} alt={film.name} className={styles.filmPoster} />
            )}
            <div className={styles.filmInfo}>
                <p className={styles.filmName}>{film.name}</p>
                <p className={styles.filmData}>{film.year}, {film.ageRating}+, {film.movieLength} мин.</p>
                <p className={styles.filmData}>{film.alternativeName}</p>
                <ul className={styles.countries}>
                    {film.countries.map((country) => country.name).join(", ")}
                </ul>
            </div>
        </div>
    );
}
