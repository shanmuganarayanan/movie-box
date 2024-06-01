export const IS_MOVIES_DATA = 'MOVIES_DATA';

export const MoviesDataHandler = ({ Nowplaying, Popularmovies, Popularseries, Combaineddata, Popularpeoples, Genres, Moviesgenres}) => {
    return {
    type: IS_MOVIES_DATA,
    payload: {Nowplaying, Popularmovies, Popularseries, Combaineddata, Popularpeoples, Genres, Moviesgenres},
}};