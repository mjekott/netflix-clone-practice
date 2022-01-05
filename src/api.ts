const APIKEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3"


export interface IMovie {
    backdrop_path: string;
    id: number;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;

}

export interface IGetMoviesResult {
    dates: {
        maximum: number
        minimun: number
    },
    page: number,
    results: IMovie[]
    totoal_pages: number
    total_results: number

}

export const getMovies = () => {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${APIKEY}`).then((response) => response.json())
}