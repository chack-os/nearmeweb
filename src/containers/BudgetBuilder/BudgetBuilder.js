import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Budget from '../../components/Budget/Budget';
import BuildControls from '../../components/Budget/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Budget/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class BudgetBuilder extends Component{
    state = {
        purchasable: false,
        purchasing: false
    }
    componentDidMount(){
        //console.log('BudgetBuilder componentDidMount');
        if(!this.props.bparts)
            this.props.onInitBudgetParts();
        else{
            const updatedBudgetParts ={
                ...this.props.bparts
            };
            this.updatePurchaseState(updatedBudgetParts);
        }
    }

    addBudgetPartHandler = (type) => {
        const oldCount = this.props.bparts[type];
        const updatedCount = oldCount + 1;
        const updatedBudgetParts ={
            ...this.props.bparts
        };
        updatedBudgetParts[type] = updatedCount;
        this.props.onBudgetPartAdded(type);
        this.updatePurchaseState(updatedBudgetParts);
    }

    removeBudgetPartHandler = (type) => {
        const oldCount = this.props.bparts[type];
        if (oldCount<=0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedBudgetParts ={
            ...this.props.bparts
        };
        updatedBudgetParts[type] = updatedCount;

        this.props.onBudgetPartRemoved(type);
        this.updatePurchaseState(updatedBudgetParts);
    }

    updatePurchaseState =(updatedBudgetParts)=>{

        const sum = Object.keys(updatedBudgetParts).map(
            (igKey) =>{
                return updatedBudgetParts[igKey]
            }
        ).reduce((sum,el)=>{
            return sum + el;
        },0)
        this.setState({purchasable: sum > 0});
    }
    purchaseHandler=()=>{
        if(this.props.isAuth) {
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push({
                pathname:'/auth' });
        }

    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler=()=>{
/*        const queryParams = [];
        for(let i in this.state.budgetParts){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.budgetParts[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');*/
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout' });
    }
    backpurchaseContinueHandler=()=>{
        //alert('Continue');

    }

    render(){
        const disabledInfo = {
            ...this.props.bparts
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null;

        let budget = this.props.error? <p>Error loading budget Parts</p>: <Spinner/>
        if(this.props.bparts) {
            budget = (
                <Auxiliar>
                    <Budget budgetParts={this.props.bparts}></Budget>
                    <BuildControls budgetPartAdded={this.addBudgetPartHandler}
                                   budgetPartRemoved={this.removeBudgetPartHandler}
                                   disabled={disabledInfo}
                                   purchasable={this.state.purchasable}
                                   price={this.props.totalPrice}
                                   isAuth={this.props.isAuth}
                                   ordered={this.purchaseHandler}/>
                </Auxiliar>
            );
            orderSummary =<OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                budgetParts={this.props.bparts}
                price={this.props.totalPrice}
            />;
        }else{
            orderSummary = <Spinner></Spinner>;
        }
        return (
            <Auxiliar>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {budget}
            </Auxiliar>
        );

    }
}

const mapStateToProps = state => {
    return {
        bparts : state.budgetBuilder.budgetParts,
        totalPrice : state.budgetBuilder.totalPrice,
        error: state.budgetBuilder.error,
        isAuth: state.auth.idToken !==null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onBudgetPartAdded: (bpartName) => dispatch(actions.addBudgetPart(bpartName)),
        onBudgetPartRemoved: (bpartName) => dispatch(actions.removeBudgetPart(bpartName)),
        onInitBudgetParts: () => dispatch(actions.initBudgetParts()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BudgetBuilder, Axios));