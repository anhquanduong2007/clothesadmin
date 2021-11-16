import * as types from "../constants/ui";
const initialState = {
    showLoadingLogin: false,
    noficationLogin: false,
    showModal: false,
    loadingAddProduct: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING_LOGIN:
            return {
                ...state,
                showLoadingLogin: true,
            }
        case types.HIDDEN_LOADING_LOGIN:
            return {
                ...state,
                showLoadingLogin: false,
            }
        case types.OPEN_MODAL_PRODUCT:
            return {
                ...state,
                showModal: true
            }
        case types.CLOSE_MODAL_PRODUCT:
            return {
                ...state,
                showModal: false
            }
        case types.SHOW_LOADING_ADD_PRODUCT:
            return {
                ...state,
                loadingAddProduct: true
            }
        case types.HIDDEN_LOADING_ADD_PRODUCT:
            return {
                ...state,
                loadingAddProduct: false
            }
        default:
            return state;

    }
}
export default reducer;
