import { IS_LOADING } from "../actions/apiLoaderActions";


const initialState = {
    isApiLoading: false,
};

const apiLoaderReducer = (state = initialState, action) => {
    switch (action?.type) {
        case IS_LOADING:
            return {
                ...state,
                isApiLoading: action?.payload?.isApiLoading,
            };
        default:
            return state;
    }
};

export default apiLoaderReducer ;