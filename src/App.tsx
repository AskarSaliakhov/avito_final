import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { AllFilms } from "./components/Films/AllFilms";
import { FilmDetails } from "./components/Films/FilmDetails";
import { Registration } from "./components/Registration/Registration";
import { RandomFilm } from "./components/Films/RandomFilm";
import {Header} from "./components/Header";
import {store} from "./redux/store";


function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<AllFilms />} />
                        <Route path="/:id" element={<FilmDetails />} />
                        <Route path='/reg' element={<Registration />} />
                        <Route path='/rand' element={<RandomFilm />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
