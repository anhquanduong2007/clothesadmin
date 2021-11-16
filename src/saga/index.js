import * as comomTypes from "../constants/commom";
import * as productsTypes from "../constants/products";
import axios from "axios";
import { takeLatest, call, put, delay, all } from "redux-saga/effects";
import { getTokenSuccess, getTokenFailed } from "../actions/comom";
import { showLoadingLogin, hiddenLoadingLogin, hiddenLoadingAddProduct, closeModalProduct, showLoadingAddProduct } from "../actions/ui";
import { logout } from "../actions/comom";
import { getDataProductSuccess, getTotalPageSuccess, getGroupProductsSuccess, addProductSuccess, resetMode,deleteProductSuccess } from "../actions/products";
import {
    ref,
    deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/config";
const deleteUrl = (data) => {
    data.images.forEach((item) => {
        let url = ref(storage, item);
        const desertRef = ref(storage, url._location.path_);
        deleteObject(desertRef)
            .then(() => {

            })
            .catch((error) => {

            });
    })

}
function* takeToken({ payload }) {

    yield put(showLoadingLogin());
    const { username, password } = payload;
    const getToken = () => {
        return axios.post('http://freeapi.somee.com/api/Account/Login', {
            UserName: username,
            Passwords: password
        })
    }
    try {
        const response = yield call(getToken)
        yield put(getTokenSuccess(response.data));
    } catch (error) {
        yield put(getTokenFailed(error));
    }
    yield delay(500);
    yield put(hiddenLoadingLogin());
}
// get products
function* getProducts() {
    const dataProducts = () => {
        return axios.get('http://freeapi.somee.com/api/Product');
    }
    const getTotalPage = () => {
        return axios.get('http://freeapi.somee.com/api/Product/TotalPage');
    }
    const getGroupProduct = () => {
        return axios.get('http://freeapi.somee.com/api/Category');
    }
    const getImgProduct = () => {
        return axios.get('http://freeapi.somee.com/api/Images');
    }
    try {
        const [data, totalPage, groupProduct, imgProduct] = yield all([
            call(dataProducts),
            call(getTotalPage),
            call(getGroupProduct),
            call(getImgProduct)
        ])
        data.data.forEach((item) => {
            imgProduct.data.forEach((img) => {
                if (item.id === img.productId) {
                    item.images.push(img.ten);
                }
            })
        })
        console.log(data.data);
        yield put(getDataProductSuccess(data.data));
        yield put(getTotalPageSuccess(totalPage.data));
        yield put(getGroupProductsSuccess(groupProduct.data))
    } catch {

        console.log("Lỗi");
    }
}

function* addProduct({ payload }) {
    const { data } = payload;
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(data);
    const addProducts = (data, config) => {
        return axios.post(`http://freeapi.somee.com/api/Product/AddProduct`, data, config);
    }
    if (token) {
        const config = {
            headers: { Authorization: `Bearer ${token.token}` }
        };
        try {
            const response = yield call(addProducts, data, config);
            yield put(addProductSuccess(response.data));
            yield put(hiddenLoadingAddProduct());
            yield put(resetMode());
            yield delay(500);
            yield put(closeModalProduct());
        } catch {
            deleteUrl(data);
            yield put(hiddenLoadingAddProduct());
            yield put(resetMode());
            yield put(closeModalProduct());
            yield put(logout());
        }
    } else {
        deleteUrl(data);
        yield put(hiddenLoadingAddProduct());
        yield put(resetMode());
        yield put(closeModalProduct());
        yield put(logout());

    }

}
function* deleteProduct({ payload }) {
    yield put(showLoadingAddProduct());
    const { data } = payload;
    const token = JSON.parse(localStorage.getItem("token"));
    const addProducts = (id,config) => {
        return axios.delete(`http://freeapi.somee.com/api/Product/${id}`, config);
    }
    if (token) {
        const config = {
            headers: { Authorization: `Bearer ${token.token}` }
        };
        try {
            deleteUrl(data);
            const response = yield call(addProducts, data.id,config);
            yield put(deleteProductSuccess(response.data));
            yield put(hiddenLoadingAddProduct());
            yield put(resetMode());
            yield delay(500);
            yield put(closeModalProduct());

        } catch {
            yield put(hiddenLoadingAddProduct());
            yield put(resetMode());
            yield put(closeModalProduct());
            yield put(logout());
        }
    } else {
        yield put(hiddenLoadingAddProduct());
        yield put(resetMode());
        yield put(closeModalProduct());
        yield put(logout());
    }
}
function* rootSaga() {
    yield takeLatest(comomTypes.GET_TOKEN, takeToken);
    yield takeLatest(productsTypes.GET_PRODUCTS, getProducts)
    yield takeLatest(productsTypes.ADD_PRODUCT, addProduct);
    yield takeLatest(productsTypes.DELETE_PRODUCT, deleteProduct)
}
export default rootSaga;