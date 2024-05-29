export const IS_LOADING = 'USER_LOADER';

export const ApiLoaderHandler = ( isApiLoading ) => {
    return {
    type: IS_LOADING,
    payload: {isApiLoading},
}};