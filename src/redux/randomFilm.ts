import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Film} from "../interfaces";

export const fetchRandomFilm = createAsyncThunk<Film, void, { rejectValue: string }>(
    'films/fetchRandomFilm',
    async (_, { rejectWithValue }) => {
        try {
            let respData: Film;
            while (true) {
                const resp = await fetch('https://api.kinopoisk.dev/v1.4/movie/random', {
                    headers: {
                        'X-API-KEY': process.env.REACT_APP_TOKEN || ''
                    }
                });
                respData = await resp.json();
                if (respData.poster.url !== null) {
                    break;
                }
            }
            return respData;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

interface FilmsState {
    randomFilm: Film | null;
    loading: boolean;
    error: string | null;
}

const initialState: FilmsState = {
    randomFilm: null,
    loading: false,
    error: null
};

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRandomFilm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomFilm.fulfilled, (state, action: PayloadAction<Film>) => {
                state.loading = false;
                state.randomFilm = action.payload;
            })
            .addCase(fetchRandomFilm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default filmsSlice.reducer;
