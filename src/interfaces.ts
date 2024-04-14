export interface Poster {
    url: string;
}

export interface Country {
    name: string;
}

interface Budget {
    value: number,
    currency: string
}

interface Genre {
    name: string
}

interface Fee {
    value: number;
    currency: string;
}

interface Fees {
    world: Fee;
    russia: Fee;
    usa: Fee;
}

interface Rating {
    kp: number
}

export interface Person {
    id: number,
    photo: string,
    name: string
}

export interface similarMovie {
    id: number,
    name: string,
    poster: Poster
}


export interface Film {
    id: number;
    name: string;
    year: number;
    ageRating: number;
    poster: Poster;
    alternativeName?: string,
    movieLength: number,
    countries: Country[]
    slogan: string,
    budget: Budget,
    genres: Genre[],
    fees: Fees,
    description: string,
    rating: Rating,
    persons: Person[],
    similarMovies: similarMovie[]
}

export interface Review {
    id: number,
    title: string,
    type: string,
    review: string
}

export interface Reviews {
    total: number;
    docs: Review[]
}

export interface SimilarMovie {
    id: number,
    name: string,
    poster: Poster
}

export interface AllSeriesSv {
    docs:OneSeason[]
}

export interface OneSeason{
    description:string,
    episodes:OneSeria[],
    poster:Poster
}

export interface OneSeria {
    number:number,
    name:string,
    still:Poster,
    duration:number,
    description:string
}

