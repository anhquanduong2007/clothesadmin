import * as types from "../constants/products";
import { toast } from 'react-toastify';
const initialState = {
    dataProducts: [],
    error: "",
    totalPage: 0,
    groupProducts: [],
    addMode: false,
    deleteMode: false,
    editMode: false,
    dataAction: {},
    files: [],
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                dataProducts: action.payload.data
            }
        case types.GET_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload.data
            }
        case types.GET_TOTALPAGE_SUCCESS:
            return {
                ...state,
                totalPage: action.payload.data
            }
        case types.GET_GROUP_PRODUCTS_SUCCESS:
            return {
                ...state,
                groupProducts: action.payload.data
            }
        case types.DELETE_MODE:
            const idProduct = action.payload.id;
            console.log(idProduct);
            let data = {};
            state.dataProducts.forEach((item) => {
                if (item.id === idProduct) {
                    data = item;
                }
            })
            console.log(data);
            return {
                ...state,
                deleteMode: true,
                dataAction: data,
            }
        case types.RESET_MODE:
            return {
                ...state,
                addMode: false,
                deleteMode: false,
                editMode: false,
                files: [],
            }
        case types.ADD_MODE:
            return {
                ...state,
                addMode: true
            }
        case types.ADD_PRODUCT_SUCCESS:
            toast.success("Thêm thành công !",{ delay: 1000 });
            return {
                ...state,
                dataProducts: [action.payload.data].concat(state.dataProducts),

            }
        case types.GET_FILES:
            return {
                ...state,
                files: action.payload.data,
            }
        case types.DELETE_FILES:
            return {
                ...state,
                files: [],
            }
        case types.DELETE_PRODUCT_SUCCESS:
            toast.success("Xóa thành công !",{ delay: 1000 });
            console.log(action.payload.data);
            return {
                ...state,
                dataProducts: state.dataProducts.filter(item => item.id !== action.payload.data)
            }
        default:
            return state;
    }
}
export default reducer;