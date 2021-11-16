import * as uiTypes from "../constants/ui";
export const showLoadingLogin = () => {
    return {
        type: uiTypes.SHOW_LOADING_LOGIN,
        
    };
}
export const hiddenLoadingLogin = () => {
    return {
        type: uiTypes.HIDDEN_LOADING_LOGIN,
        
    }
}
//modal
export const openModalProduct = () => {
    return {
        type: uiTypes.OPEN_MODAL_PRODUCT,
    }
}
export const closeModalProduct = () => {
    return {
        type: uiTypes.CLOSE_MODAL_PRODUCT,
    }
}
export const showLoadingAddProduct = () => {
    return {
        type: uiTypes.SHOW_LOADING_ADD_PRODUCT,
    }
}
export const hiddenLoadingAddProduct = () => {
    return {
        type: uiTypes.HIDDEN_LOADING_ADD_PRODUCT,
    }
}


