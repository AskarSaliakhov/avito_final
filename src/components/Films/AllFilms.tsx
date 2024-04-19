import {useEffect, useState} from 'react';

import {Pagination} from '../Pagination';
import {OneFilm} from "./OneFilm";
import {Search} from '../Search';
import {SelectLimit} from '../Selects/SelectLimit';
import {Loader} from "../Loader";
import {SelectYear} from "../Selects/SelectYear";
import {SelectCountry} from "../Selects/SelectCountry";
import {SelectAge} from "../Selects/SelectAge";

import {Link} from 'react-router-dom';
import {useDebounce} from 'use-debounce';
// @ts-ignore
import Select, {ActionMeta, ValueType} from 'react-select';

import {Film} from "../../interfaces";

import styles from '../../css/AllFilms.module.css';
import {COUNTRIES, YEARS, AGES, LIMITS} from "../../data/selects";


type SelectOptionType = { label: string, value: string };

export function AllFilms() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedValue] = useDebounce(searchQuery, 300);
    const [limit, setLimit] = useState<number>(parseInt(localStorage.getItem("limit") || "10", 10));
    const [page, setPage] = useState<number>(parseInt(localStorage.getItem("page") || "1", 10));
    const [allFilms, setAllFilms] = useState<Film[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string>(localStorage.getItem("country") || "США");
    const [selectedYears, setSelectedYears] = useState<number>(parseInt(localStorage.getItem("year") || "2024", 10));
    const [selectedAge, setSelectedAge] = useState<number>(parseInt(localStorage.getItem("age") || "18", 10));
    const [countFilms, setCountFilms] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [firstRender,setFirstRender]=useState<boolean>(true);






    const incrementPage = () => {
        window.scrollTo(0, 0);
        setPage(prevPage => prevPage + 1);
    };

    const decrementPage = () => {
        window.scrollTo(0, 0);
        setPage(prevState => prevState-1);
    };


    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        setPage(1)
    };

    const selectChangeLimit = (selectedOption: SelectOptionType | null) => {
        if (selectedOption) {
            const newLimit = parseInt(selectedOption.value);
            setLimit(newLimit);
        }
    };

    const selectChangeCountries = (selectedOption: SelectOptionType | null) => {
        if (selectedOption) {
            setSelectedCountries(selectedOption.value);
            setPage(1)
        }
    };

    const selectChangeYears = (selectedOption: SelectOptionType | null) => {
        if (selectedOption) {
            setSelectedYears(parseInt(selectedOption.value));
            setPage(1)
        }
    };

    const selectChangeAge = (selectedOption: SelectOptionType | null) => {
        if (selectedOption) {
            setSelectedAge(parseInt(selectedOption.value));
            setPage(1)
        }
    };

    const fetchFilmsFilters = async () => {
        try {
            setSearchQuery("")
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}&year=${selectedYears}&ageRating=${selectedAge}&countries.name=${selectedCountries}`, {
                headers: {
                    'X-API-KEY': process.env.REACT_APP_TOKEN || ''
                }
            })


            const dataResp = await response.json();
            setCountFilms(dataResp.total)
            if (dataResp.total > limit) {
                setAllFilms(dataResp.docs.slice(0, limit));
            } else {
                setAllFilms(dataResp.docs);
            }
        } catch (e) {
            console.log(e)
        }
    }


    const fetchFilms = async () => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limit}&query=${encodeURIComponent(debouncedValue)}`, {
                headers: {
                    'X-API-KEY': process.env.REACT_APP_TOKEN || ''
                }
            });


            const dataResp = await response.json();
            setCountFilms(dataResp.total)
            if (dataResp.total > limit) {
                setAllFilms(dataResp.docs.slice(0, limit));
            } else {
                setAllFilms(dataResp.docs);
            }
        } catch (error) {
            console.error('Ошибка при получении фильмов:', error);
        }
    };

    useEffect(() => {
        localStorage.setItem("limit", limit.toString());
    }, [limit]);

    useEffect(() => {
        localStorage.setItem("page", page.toString());
    }, [page]);

    useEffect(()=>{
        setPage(1)
    },[debouncedValue])

    useEffect(()=>{
        setLoading(true)
        if (firstRender || debouncedValue!=="") {
            fetchFilms().then(()=>setLoading(false))
        }
        else {
            fetchFilmsFilters().then(()=>setLoading(false))
        }
    },[debouncedValue,page,limit,selectedAge,selectedCountries,selectedYears])


    useEffect(()=>{
        setSearchQuery("")
    },[selectedYears])

    useEffect(() => {
        setFirstRender(false);
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Все фильмы</h1>
                <Search onSearchChange={handleSearchChange}  />

            </div>
            <div className={styles.filters}>
                <div>
                    <p>Выберите лимит на странице:</p>
                    <SelectLimit data={LIMITS} onSelectChange={selectChangeLimit}/>
                </div>
                <div>
                    <p>Выберите страны:</p>
                    <SelectCountry data={COUNTRIES} onSelectChange={selectChangeCountries}/>
                </div>
                <div>
                    <p>Выберите год</p>
                    <SelectYear data={YEARS} onSelectChange={selectChangeYears}/>
                </div>
                <div>
                    <p>Выберите возраст</p>
                    <SelectAge data={AGES} onSelectChange={selectChangeAge}/>
                </div>
            </div>
            <ul className={styles.films}>
                {loading && <Loader/>}
                {
                    allFilms.map((film) => (
                            <Link to={`/id=${film.id}`} key={film.id}>
                                <OneFilm film={film}/>
                            </Link>
                        )
                    )}
            </ul>
            <Pagination
                page={page}
                onIncrement={incrementPage}
                onDecrement={decrementPage}
                next={page + 1}
                prev={page - 1}
                total={countFilms}
                howIsNeed={limit}
            />

        </div>
    );
}
