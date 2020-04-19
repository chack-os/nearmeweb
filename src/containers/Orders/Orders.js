import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index'

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
        /*axios.get('/orders.json').then(
            (res)=>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push(
                        {...res.data[key],id:key});
                }
                //console.log(res.data);
                this.setState({loading:false, orders:fetchedOrders});
            }
        ).catch((error)=>{
            this.setState({loading:false});
        })*/
    }

    render(){
        let order=<Spinner/>
        if(!this.props.loading){
            order=this.props.orders.map(order =>(
                <Order
                    budgetParts={order.budgetParts}
                    price={+order.price}
                    key={order.id}
                />
            ));
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));