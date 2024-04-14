
import React from 'react';
import {OneSeria} from "../../interfaces";
import styles from "../../css/OneSeries.module.css";

interface OneSeriesProps {
    seria: OneSeria;
}


export  function  OneSeries({seria}:OneSeriesProps) {
    return (
        <div>
            <p className={styles.p__statika}>{seria.name}</p>
            <p>Серия {seria.number}</p>
            <p className="description">Описание серии:&nbsp;
                <span>{seria.description || "Нет информации о данной серии"}</span>
            </p>
            <p >Продолжительность: {seria.duration} мин</p>
        </div>
    );
}

