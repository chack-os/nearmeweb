import React from 'react';
import ReactDOM from 'react-dom';
import { /*BrowserRouter,*/ HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import budgetBuilderReducer from './store/reducers/budgetBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import activityReducer from './store/reducers/activity'
import thunk from 'redux-thunk'

const composeEnhancers = process.env.NODE_ENV==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;
//console.log( process.env.NODE_ENV,composeEnhancers);
const rootReducer = combineReducers({
    budgetBuilder : budgetBuilderReducer,
    order : orderReducer,
    auth : authReducer,
    activity : activityReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app=(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
