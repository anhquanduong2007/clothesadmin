import * as productsTypes from "../constants/products";
export const getDataProduct = () => {
    return {
        type: productsTypes.GET_PRODUCTS,
    };
}
export const getDataProductSuccess = (data) => {
    return {
        type: productsTypes.GET_PRODUCTS_SUCCESS,
        payload: {
            data
        }
    };
}
export const getDataProductFailed = (data) => {
    return {
        type: productsTypes.GET_PRODUCTS_FAILED,
        payload: {
            data
        }
    };
}
export const getTotalPageSuccess = (data) => {
    return {
        type: productsTypes.GET_TOTALPAGE_SUCCESS,
        payload: {
            data
        }
    }
}
export const getTotalPageFailed = () => {
    return {
        type: productsTypes.GET_TOTALPAGE_FAILED,
    }
}

export const getGroupProductsSuccess = (data) => {
    return {
        type: productsTypes.GET_GROUP_PRODUCTS_SUCCESS,
        payload: {
            data
        }
    }
}
export const getGroupProductsFailed = () => {
    return {
        type: productsTypes.GET_GROUP_PRODUCTS_SUCCESS,
    }
}
export const deleteMode = (id) => {
    return {
        type: productsTypes.DELETE_MODE,
        payload: {
            id
        }
    }
}
export const addMode = () => {
    return {
        type: productsTypes.ADD_MODE,
    }
}
export const resetMode = () => {
    return {
        type: productsTypes.RESET_MODE,
    }
}

// add product
export const addProduct = (data) => {
    return {
        type: productsTypes.ADD_PRODUCT,
        payload: {
            data
        }
    }
}
export const addProductSuccess = (data) => {
    return {
        type: productsTypes.ADD_PRODUCT_SUCCESS,
        payload: {
            data
        }
    }
}
export const addProductFailed = (data) => {
    return {
        type: productsTypes.ADD_PRODUCT_FAILED,
        payload: {
            data
        }
    }
}
export const getFiles = (data) => {
    return {
        type: productsTypes.GET_FILES,
        payload: {
            data
        }
    }
}
export const deleteFiles = () => {
    return {
        type: productsTypes.DELETE_FILES,
    }
}

// 
export const deleteProduct = (data) => {
    return {
        type: productsTypes.DELETE_PRODUCT,
        payload: {
            data
        }
    }
}
export const deleteProductSuccess = (data) => {
    return {
        type: productsTypes.DELETE_PRODUCT_SUCCESS,
        payload: {
            data
        }
    }
}
export const deleteProductFailed = (data) => {
    return {
        type: productsTypes.DELETE_PRODUCT_FAILED,
        payload: {
            data
        }
    }
}
