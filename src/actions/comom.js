import * as comomTypes from "../constants/commom";
export const getToken = (username,password) => {
    return {
        type: comomTypes.GET_TOKEN,
        payload: {
            username,
            password
        }
    };
}
export const getTokenSuccess = (data) => {
    return {
        type: comomTypes.GET_TOKEN_SUCCESS,
        payload: {
            data,
        }
    }
}
export const getTokenFailed = (data) => {
    return {
        type: comomTypes.GET_TOKEN_FAILED,
        payload: {
            data,
        }
    }
}
export const restTokenError = () => {
    return {
        type: comomTypes.REST_ERROR_TOKEN,
       
    }
}
export const logout = () => {
    return {
        type: comomTypes.LOGOUT,
       
    }
}

