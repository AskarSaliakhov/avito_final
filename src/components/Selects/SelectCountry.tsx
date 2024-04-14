import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import styles from "../../css/SelectAge.module.css";
import { StylesConfig } from 'react-select';

import {CUSTOMS_STYLES} from "../../data/customStyle";

const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <div style={{ marginRight: '-8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 10L12 15L7 10" stroke="#333" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round" />
                </svg>
            </div>
        </components.DropdownIndicator>
    );
};

interface Props {
    data: { value: string, label: string }[];
    onSelectChange: any;
}

export function SelectCountry({ data, onSelectChange }: Props) {
    const [selectedOptionCountry, setSelectedOptionCountry] = useState<{ value: string, label: string } | null>(null);

    useEffect(() => {
        const country = localStorage.getItem("country");
        if (country) {
            const option = data.find(option => option.value === country);
            if (option) {
                setSelectedOptionCountry(option);
            }
        }
    }, [data]);

    const handleOptionChange = (selectedOption: any) => {
        if (selectedOption) {
            localStorage.setItem("country", selectedOption.value);
            setSelectedOptionCountry(selectedOption);
            onSelectChange(selectedOption);
        }
    };


    return (
        <div>
            <Select
                options={data}
                components={{ DropdownIndicator }}
                placeholder="США"
                noOptionsMessage={() => 'Нет фильтров'}
                onChange={handleOptionChange}
                value={selectedOptionCountry}
                className={styles.select}
                styles={CUSTOMS_STYLES}
            />
        </div>
    );
}
