import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../share/firebaseConfig'
import {fetchOrdersStart, fetchOrdersSuccess} from "./order";

export const addBudgetPart = (name)=>{
    return {
        type: actionTypes.ADD_BUDGETPART,
        budgetPartName: name
    };
}
export const removeBudgetPart = (name)=>{
    return {
        type: actionTypes.REMOVE_BUDGETPART,
        budgetPartName: name
    };
}
export const setBudgetParts = (budgetParts)=>{
    return {
        type: actionTypes.SET_BUDGETPARTS,
        budgetParts: budgetParts
    }
}
export const fetchBudgetPartsFailed = () => {
    return {
        type: actionTypes.FETCH_BUDGETPARTS_FAILED
    };
}
export const initBudgetParts = () => {
    return dispatch => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();
        db.collection('budgetParts').get().then((querySnapshot) => {
            let budgetParts = null;
            querySnapshot.forEach((doc) => {
                budgetParts={...doc.data()};
                console.log(budgetParts)
            });
            dispatch(setBudgetParts(budgetParts));
        }).catch(error=>{
            dispatch(fetchBudgetPartsFailed());
            //this.setState({error:true});
        })
    }
}
export const initBudgetPartsAxios = () => {
    //console.log('actions BudgetBuilder initBudgetParts')
    return dispatch => {
        //console.log('before axios');
         Axios.get('/budgetParts.json').then(
             (response) =>{
                 //console.log('get budgetParts.json')
                 dispatch(setBudgetParts(response.data));
                 //this.setState({budgetParts: response.data});
             }
         ).catch(error=>{
             dispatch(fetchBudgetPartsFailed());
             //this.setState({error:true});
         })
    };
}