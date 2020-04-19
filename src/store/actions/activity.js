import firebase from "firebase/app";
import firebaseConfig from '../../share/firebaseConfig'
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import Axios from 'axios'
import {fetchOrdersFail, fetchOrdersSuccess} from "./order";

export const addActivitySuccess = (id, activityData) => {
    return {
        type: actionTypes.ADD_ACTIVITY_SUCCESS,
        activityId: id,
        activityData: activityData
    };
}
export const addActivityFail = (error) => {
    return {
        type: actionTypes.ADD_ACTIVITY_FAIL,
        error: error
    }
}
export const addActivityStart = () => {
    return {
        type: actionTypes.ADD_ACTIVITY_START
    }
}

export const addActivity = (activityData, token) => {
    return dispatch => {
        dispatch(addActivityStart());

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();

        db.collection("activity").add(activityData)
            .then(function(response) {
                console.log("Document written with ID: ", response.id);

                const queryParams = '?text='+activityData.uploadToken+'auth='+token;
                Axios.get('https://us-central1-osng-http.cloudfunctions.net/setUploadToken'+queryParams).then(
                    (res)=>{
                        console.log(res)
                        dispatch(addActivitySuccess(response.id, activityData));
                    }
                ).catch((error)=>{
                    console.log(error)
                    dispatch(addActivityFail(error));
                })
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                dispatch(addActivityFail(error));
            });
    }
}

export const addActivityInit = () => {
    return {
        type: actionTypes.ADD_ACTIVITY_INIT
    }
}
export const fetchActivitiesSuccess = (activities)=>{
    return {
        type: actionTypes.FETCH_ACTIVITIES_SUCCESS,
        activities: activities
    }
}
export const fetchActivitiesFail = (error)=>{
    return {
        type: actionTypes.FETCH_ACTIVITIES_FAIL,
        error: error
    }
}
export const fetchActivitiesStart = ()=>{
    return {
        type: actionTypes.FETCH_ACTIVITIES_START
    }
}
export const fetchActivities = (token, userId) => {
    return dispatch => {
        dispatch(fetchActivitiesStart());
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();
        db.collection('activity').get().then((querySnapshot) => {
            const fetchedActivities = [];
            querySnapshot.forEach((doc) => {
                fetchedActivities.push(
                    {...doc.data(),id:doc.id});
            });
            dispatch(fetchActivitiesSuccess(fetchedActivities));
        }).catch(error=>{
            dispatch(fetchActivitiesFail(error));
        });
    }
}