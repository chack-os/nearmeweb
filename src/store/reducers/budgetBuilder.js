import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../share/Utility";

const initialState = {
    budgetParts: null,
    totalPrice: 4,
    error: false,
    building: false
}

const BUDGETPART_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addBudgetPart=(state,action)=> {
    const updateBudgetPart ={[action.budgetPartName]: state.budgetParts[action.budgetPartName] + 1}
    const updatedBudgetParts = updateObject(state.budgetParts,updateBudgetPart);
    const updatedState={
        budgetParts: updatedBudgetParts,
        totalPrice: state.totalPrice + BUDGETPART_PRICES[action.budgetPartName],
        building:true
    }
    return updateObject(state,updatedState);
}
const removeBudgetPart=(state,action)=>{
    const updateBudgetPart ={[action.budgetPartName]: state.budgetParts[action.budgetPartName] - 1}
    const updatedBudgetParts = updateObject(state.budgetParts,updateBudgetPart);
    const updatedState={
        budgetParts: updatedBudgetParts,
        totalPrice: state.totalPrice - BUDGETPART_PRICES[action.budgetPartName],
        building:true
    }
    return updateObject(state,updatedState);
}
const setBudgetParts=(state,action)=>{
    //console.log('reducer BudgetBuilder set bugetparts')
    return updateObject(state,{
        budgetParts: action.budgetParts,
        totalPrice: 4,
        error: false,
        building:false
    });
}
const fetchBudgetPartsFailed = (state,action)=>{
    //console.log('reducer BudgetBuilder fetch ingredientes failed')
    return updateObject(state,{error: true});
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case (actionTypes.ADD_BUDGETPART): return addBudgetPart(state,action);
        case (actionTypes.REMOVE_BUDGETPART): return removeBudgetPart(state,action);
        case (actionTypes.SET_BUDGETPARTS): return setBudgetParts(state,action);
        case (actionTypes.FETCH_BUDGETPARTS_FAILED): return fetchBudgetPartsFailed(state,action);
        default: return state;
    }
}
export default reducer;