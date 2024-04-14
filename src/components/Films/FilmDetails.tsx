import {useParams} from "react-router";
import {useState, useEffect} from "react";
import {OneSeason, Poster, Reviews, Film, Country} from "../../interfaces";
import {AllReviews} from "../Reviews/AllReviews";
import {Pagination} from "../Pagination";
// @ts-ignore
import StarRatings from 'react-star-ratings';


import styles from "../../css/FilmDetails.module.css"
import {SliderSettingsFilms} from "../Sliders/SlidersSimiliarFilms";
import {SliderPosters} from "../Sliders/SliderPosters";
import {useNavigate} from "react-router-dom";
import {AllSeries} from "../Series/AllSeries";





export function FilmDetails() {
    const [pageActors, setPageActors] = useState<number>(1);

    const [film, setFilm] = useState<Film | null>(null);

    const [reviews, setReviews] = useState<Reviews | null>(null);
    const [pageReview, setPageReview] = useState<number>(1)

    const [posters, setPosters] = useState<Poster[] | null>(null)

    const [isSeries, setIsSeries] = useState<boolean | null>(null)
    const [series, setSeries] = useState<OneSeason[] | null>(null)
    const [pageSeries, setPageSeries] = useState<number>(1)
    const [countSeasons, setCountSeasons] = useState<number>(0);


    const {id} = useParams();
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/")
    }


    const handlePageChangeReview = (page: number) => {
        setPageReview(page);
    };

    const handlePageChangeSeries = (page: number) => {
        setPageSeries(page)
    }


    const handleIncrement = () => {
        setPageActors(pageActors + 1);
    };

    const handleDecrement = () => {
        setPageActors(pageActors - 1);
    };


    // ОТЗЫВЫ
    useEffect(() => {
        let realId = id?.split("=")[1];
        fetch(`https://api.kinopoisk.dev/v1.4/review?page=${pageReview}&limit=5&movieId=${realId}`, {
            // @ts-ignore
            headers: {
                'X-API-KEY': process.env.REACT_APP_TOKEN
            }
        })
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
            .catch(error => console.error("Error fetching film details:", error))
    }, [id, pageReview])


    // САМ ФИЛЬМ
    useEffect(() => {
        let realId = id?.split("=")[1];
        fetch(`https://api.kinopoisk.dev/v1.4/movie/${realId}`, {
            // @ts-ignore
            headers: {
                'X-API-KEY': process.env.REACT_APP_TOKEN
            }
        })
            .then(res => res.json())
            .then(data => {
                setFilm(data);
                setIsSeries(data.isSeries)
            })
            .catch(error => console.error("Error fetching film details:", error))
            .finally(() => {
                window.scrollTo(0, 0);
            })
    }, [id]);

    // ФОТОГРАФИИ
    useEffect(() => {
        let realId = id?.split("=")[1];
        fetch(`https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&movieId=${realId}`, {
            // @ts-ignore
            headers: {
                'X-API-KEY': process.env.REACT_APP_TOKEN
            }
        })
            .then(res => res.json())
            .then(data => {
                setPosters(data.docs);
            })
            .catch(error => console.error("Error fetching film details:", error))
            .finally(() => {
                window.scrollTo(0, 0);
            })
    }, [id])


    //Сериал ли?
    useEffect(() => {
        let realId = id?.split("=")[1];
        fetch(`https://api.kinopoisk.dev/v1.4/season?page=${pageSeries}&limit=1&movieId=${realId}`, {
            // @ts-ignore
            headers: {
                'X-API-KEY': process.env.REACT_APP_TOKEN
            }
        })
            .then((data) => data.json())
            .then((data) => {
                setSeries(data.docs);

                setCountSeasons(data.total)
            })
            .catch((err) => console.log(err));
    }, [id, pageSeries]);


    return (
        <div className={styles.container}>
            {film && (
                <div>
                    <div className={styles.details}>
                        <img
                            className={styles.poster}
                            src={film.poster.url}
                            alt={film.name}
                        />


                        <div className={styles.info}>
                            <h3 className={styles.name}>{film.name}</h3>
                            {film.alternativeName &&
                                <p className={styles.alter__name}>
                                    {film.alternativeName} {film.ageRating}+
                                </p>
                            }


                            <button className={styles.will__watch}>Буду смотреть</button>
                            <button
                                onClick={handleClick}
                                className={styles.back}
                            >
                                Все фильмы
                            </button>

                            <div className={styles.full__info}>
                                <p className={styles.about}>О фильме:</p>
                                <p>
                                    <span className={styles.statika}>Год:</span>
                                    <span className={styles.year}>{film.year}</span>
                                </p>
                                <p>
                                    <span className={styles.statika}>Длительность:</span>
                                    <span className={styles.movie__length}>{film.movieLength} мин</span>
                                </p>
                                <p>
                                    <span className={styles.statika}>Страны:</span>
                                    <span
                                        className={styles.countries}>{film.countries.map((country: Country) => country.name).join(", ")}</span>
                                </p>
                                <p>
                                    <span className={styles.statika}>Слоган:</span>
                                    <span className={styles.slogan}>{film.slogan}</span>
                                </p>
                                <p>
                                    <span className={styles.statika}> Бюджет:</span>
                                    {film.budget && film.budget.value !== undefined ? (
                                        <span className={styles.budget}>
        {film.budget.value.toLocaleString('ru-RU')} {film.budget.currency}
    </span>
                                    ) : (
                                        <span className={styles.budget}>Данные отсутствуют</span>
                                    )}

                                </p>
                                <p>
                                    <span className={styles.statika}>Сборы в мире:</span>
                                    {film && film.fees && film.fees.world && film.fees.world.value !== undefined ? (
                                        <p className={styles.fee}>
                                            {film.fees.world.value.toLocaleString('ru-RU')} {film.fees.world.currency}
                                        </p>
                                    ) : (
                                        <p className={styles.fee}>Данные отсутствуют</p>
                                    )}
                                </p>

                            </div>
                        </div>
                        {film.persons && film.persons.length > 0 ? (
                            <div className={styles.actorInfo}>
                                <p className={`${styles.rating} ${film.rating.kp < 5 ? styles.bad__rating : styles.good_rating}`}>
                                    {film.rating.kp.toFixed(1)}
                                </p>
                                <p className={styles.all__actors_stat}>
                                    В главных ролях:
                                </p>
                                {film.persons
                                    .slice((pageActors - 1) * 10, pageActors * 10)
                                    .map((person, index) => (
                                        <p key={index}>{person.name}</p>
                                    ))}
                                <div className={styles.paginationContainer}>
                                    <Pagination
                                        page={pageActors}
                                        onIncrement={handleIncrement}
                                        onDecrement={handleDecrement}
                                        next={pageActors+1}
                                        prev={pageActors-1}
                                        howIsNeed={10}
                                        total={film.persons.length}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className={styles.no__actors}>Нет данных о актерах</p>
                        )}


                    </div>


                    {series && <AllSeries
                        seasons={series}
                        total={countSeasons}
                        onPageChange={handlePageChangeSeries}/>
                    }

                    <div className={styles.description__all}>
                        <p className={styles.description__statika}>Описание фильма:</p>
                        <p className={styles.description__text}>{film.description}</p>
                    </div>


                    <div className={styles.point__wrapper}>
                        <p className={styles.raiting}>Рейтинг фильма</p>
                        <StarRatings
                            rating={film.rating.kp}
                            starRatedColor="orange"
                            starDimension="40px"
                            starSpacing="2px"
                            numberOfStars={10}
                        />


                        <span
                            className={`${styles.rating__again} ${film.rating.kp < 5 ? styles.bad__rating : styles.good_rating}`}>
                            {film.rating.kp.toFixed(1)}
                        </span>
                    </div>

                    {posters && posters.length > 0 ? (
                        <div className="slider-wrapper__posters">
                            <p className={styles.similar__statika}>Постеры фильма</p>
                            <div className="slider-container__posters">
                                <div className={styles.posters__container}>
                                    <SliderPosters posters={posters}/>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.no__posters}>Нет информации о постерах к фильму</p>
                    )}


                    {!film.similarMovies || film.similarMovies.length === 0 ? (
                        <p className={styles.no__similar__movies}>
                            Нет информации о похожих фильмах
                        </p>
                    ) : (
                        <div className="slider-wrapper">
                            <p className={styles.similar__statika}>Похожие фильмы</p>
                            <div className="slider-container">
                                <SliderSettingsFilms similiarFilms={film.similarMovies}/>
                            </div>
                        </div>

                    )}

                        {!reviews || reviews.total === 0 ? (
                            <p className={styles.no__reviews}>
                                Нет рецензий для этого фильма
                            </p>
                        ) : (
                            <AllReviews
                                reviews={reviews}
                                total={reviews.total}
                                onPageChangeReview={handlePageChangeReview}
                            />
                        )}

                </div>
            )}
        </div>
    );
}
