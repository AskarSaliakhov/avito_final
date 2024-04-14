import {StylesConfig} from "react-select";

export const CUSTOMS_STYLES: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '20px',
        width: '200px',
        height:'40px',
        backgroundColor: '#f2f2f2',
        borderColor: 'transparent',
        position: 'relative',
        boxShadow: state.isFocused ? 'none' : 'none',
        outline: 'none',
        '&:hover': {
            borderColor: state.isFocused ? '' : 'transparent',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f2f2f2' : 'white',
        color: 'black',
        cursor: 'pointer',
        padding: '10px 8px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
        padding: '5px',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'white',
        padding: '8px',
        border: 'none',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'black',
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        position: 'absolute',
        right: '18px', // Сдвигаем треугольник влево
        top: '50%',
        transform: 'translateY(-50%)',
    }),
};
