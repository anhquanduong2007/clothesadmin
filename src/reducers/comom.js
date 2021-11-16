import * as types from "../constants/commom";
const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    errorToken: "",
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TOKEN_SUCCESS:
            localStorage.setItem('token', JSON.stringify(action.payload.data));
            return {
                ...state,
                token: action.payload.data
            }
        case types.GET_TOKEN_FAILED:
            return {
                ...state,
                errorToken: action.payload.data
            }
        case types.REST_ERROR_TOKEN:
            return {
                ...state,
                errorToken: ""
            }
        case types.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}
export default reducer;