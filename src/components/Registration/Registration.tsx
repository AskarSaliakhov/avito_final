import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/actions/user";
import styles from "../../css/Registration.module.css";
import {useNavigate} from "react-router-dom";

export function Registration() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleSubmit = () => {
        if (password === 'test' && login === 'test') {
            // @ts-ignore
            dispatch<ActionTypes>(registerUser());
            localStorage.setItem('isRegistered', 'true');
            navigate('/')
        } else {
            alert("Проверьте, что данные верны. Пароль и логин 'test'")
        }
    };

    return (
        <div className={styles.registration}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="login">Имя:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={handleLoginChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}
