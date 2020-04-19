import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
/*    state = {
        budgetParts: null,
        totalPrice: 0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const budgetParts = {};
        let price=0;
        for(let param of query.entries()){
            //[
            if(param[0]==='price'){
                  price=+param[1];
            }
            else {
                budgetParts[param[0]] = +param[1];
            }
        }
        this.setState({budgetParts: budgetParts, totalPrice:price});
    }*/

    checkoutCanceledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render()
    {
        let summary = <Redirect to="/"/>
        if (this.props.bparts)
        {
            const purchasedRedirect = this.props.purchased? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                    onCheckoutCancelled = {this.checkoutCanceledHandler}
                    onCheckoutContinued = {this.checkoutContinuedHandler}
                    budgetParts={this.props.bparts}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        /*render ={(props)=>(<ContactData budgetParts={this.props.bparts}
                                                   totalPrice={this.props.price}
                        {...props}/>)}*/
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}
const mapStateToProps=state=>{
    return {
        bparts: state.budgetBuilder.budgetParts,
        price: state.budgetBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);