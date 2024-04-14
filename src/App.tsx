import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AllFilms} from "./components/Films/AllFilms";
import {FilmDetails} from "./components/Films/FilmDetails";


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/' element={<AllFilms/>}/>
                        <Route path="/:id" element={<FilmDetails/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
