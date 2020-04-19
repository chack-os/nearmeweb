import {updateObject} from "../../share/Utility";
import * as actionTypes from "../actions/actionTypes";

const initialState={
    activities: [],
    error:null,
    loading:false
}
const addActivitySuccess=(state,action)=>{
    const newActivity = updateObject(action.activityData,{id : action.activityId});
    return updateObject(state,{
        loading: false,
        activities: state.activities.concat(newActivity)
    });
}
const reducer = (state = initialState, action)=> {
    switch (action.type) {
        case actionTypes.ADD_ACTIVITY_INIT:  return updateObject(state,{purchased:false});
        case actionTypes.ADD_ACTIVITY_SUCCESS:return addActivitySuccess(state,action);
        case actionTypes.ADD_ACTIVITY_FAIL:return updateObject(state,{loading: false});
        case actionTypes.ADD_ACTIVITY_START:return updateObject(state,{loading: true});
        case actionTypes.FETCH_ACTIVITIES_FAIL:return updateObject(state,{loading: false, error: action.error});
        case actionTypes.FETCH_ACTIVITIES_SUCCESS:return updateObject(state,{loading: false,activities: action.activities});
        case actionTypes.FETCH_ACTIVITIES_START:return updateObject(state,{loading: true});
        default:return state;
    }
}
export default reducer;