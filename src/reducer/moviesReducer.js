import { IS_MOVIES_DATA } from "../actions/moviesActions";

const initialState = {
    Nowplaying : [], 
    Popularmovies : [], 
    Popularseries : [], 
    Combaineddata : [], 
    Popularpeoples : [], 
    Genres : [],
    Moviesgenres :[]
}

const moviesReducer = (state = initialState, action) => {
    switch (action?.type) {
        case IS_MOVIES_DATA:
            return{
                ...state,
                Nowplaying : action.payload.Nowplaying, 
                Popularmovies : action.payload.Popularmovies, 
                Popularseries : action.payload.Popularseries, 
                Combaineddata : action.payload.Combaineddata, 
                Popularpeoples : action.payload.Popularpeoples, 
                Genres : action.payload.Genres,
                Moviesgenres : action.payload.Moviesgenres
            }    
        default:
            return state;
    }
}

export default moviesReducer;