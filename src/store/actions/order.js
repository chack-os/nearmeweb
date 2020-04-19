import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../share/firebaseConfig'

export const purchaseBudgetSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BUDGET_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}
export const purchaseBudgetFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BUDGET_FAIL,
        error: error
    }
}
export const purchaseBudgetStart = () => {
    return {
        type: actionTypes.PURCHASE_BUDGET_START
    }
}

export const purchaseBudget = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBudgetStart());

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();

        db.collection("order").add(orderData)
        .then(function(response) {
            console.log("Document written with ID: ", response.id);
            dispatch(purchaseBudgetSuccess(response.id, orderData));
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            dispatch(purchaseBudgetFail(error));
        });
    }
}
export const purchaseBudgetAxios = (orderData, token) => {
    return dispatch => {

        dispatch(purchaseBudgetStart());

        axios.post('/orders.json?auth='+token,orderData).then(
            (response) => {
                //console.log(response.data);
                dispatch(purchaseBudgetSuccess(response.data.name, orderData));
                //this.setState({loading: false, purchasing: false})
                //this.props.history.push('/');
            }).catch((error)=> {
            dispatch(purchaseBudgetFail(error));
            //this.setState({loading : false, purchasing: false})
            //console.log(error)
        });
    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
export const fetchOrdersSuccess = (orders)=>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersFail = (error)=>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrdersStart = ()=>{
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrdersAxios = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams).then(
            (res)=>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push(
                        {...res.data[key],id:key});
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }
        ).catch((error)=>{
            dispatch(fetchOrdersFail(error))
        })
    }
}
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();
        db.collection('order').get().then((querySnapshot) => {
            const fetchedOrders = [];
            querySnapshot.forEach((doc) => {
                fetchedOrders.push(
                    {...doc.data(),id:doc.id});
            });
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
     }
}