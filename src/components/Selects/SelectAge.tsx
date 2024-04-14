import React, { useEffect, useState } from 'react';
import Select, {components} from 'react-select';
import styles from "../../css/SelectAge.module.css";
import {CUSTOMS_STYLES} from "../../data/customStyle";

const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <div className={styles.dropdownIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 10L12 15L7 10" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </components.DropdownIndicator>
    );
};

interface Props {
    data: { value: string, label: string }[];
    onSelectChange: any;
}

export function SelectAge({ data, onSelectChange }: Props) {
    const [selectedOptionAge, setSelectedOptionAge] = useState<{ value: string, label: string } | null>(null);

    useEffect(() => {
        const limit = localStorage.getItem("age");
        if (limit) {
            const option = data.find(option => option.value === limit);
            if (option) {
                setSelectedOptionAge(option);
            }
        }
    }, [data]);

    const handleOptionChange = (selectedOption: any) => {
        localStorage.setItem("age", selectedOption.value);
        setSelectedOptionAge(selectedOption);
        onSelectChange(selectedOption);
    };


    return (
        <Select
            options={data}
            components={{ DropdownIndicator }}
            placeholder="Выберите фильтр"
            noOptionsMessage={() => 'Нет фильтров'}
            onChange={handleOptionChange}
            value={selectedOptionAge}
            className={styles.select}
            styles={CUSTOMS_STYLES}
        />
    );
}
