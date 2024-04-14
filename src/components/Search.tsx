import {useState, useEffect} from "react";
import styles from "../css/Search.module.css";

interface Props {
    onSearchChange: (value: string) => void;
}

export function Search({onSearchChange}: Props) {
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        const storedValue = localStorage.getItem("searchValue");
        if (storedValue) {
            setSearchValue(storedValue);
            onSearchChange(storedValue);
        }
    }, [onSearchChange]);

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);
        localStorage.setItem("searchValue", value);
        onSearchChange(value);
    };

    return (
        <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Введите значение"
            className={styles.searchInput}
        />
    );
}

