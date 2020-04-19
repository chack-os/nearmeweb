import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import ActivityLayout from './components/ActivityLayout/ActivityLayout'

import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';

const asyncCheckout = asyncComponent(()=>{
    return import('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(()=>{
    return import('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(()=>{
    return import('./containers/Auth/Auth');
})
const asyncActivities = asyncComponent(()=>{
    return import('./components/ActivityLayout/ActivityLayout');
})

class App extends Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
    }
  render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Redirect to="/"/>
            </Switch>
        );
        if(this.props.isAuth){
            routes=(<Switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/activities" component={ActivityLayout}>
                    <Route  path="new" component={ActivityLayout}/>
                    <Route  path=":id" component={ActivityLayout}/>
                    <Route  path=":id/edit" component={ActivityLayout}/>
                    <Route  path=""  component={ActivityLayout} />
                </Route>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={asyncAuth}/>
                <Redirect to="/"/>
            </Switch>);
        }
    return (
      <div>
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
