import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {inputChangedHandler, getFormData} from "../../../share/igUtility";

class ContactData extends Component{
    state={
        form: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                visible:true
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                visible:true
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched:false,
                visible:true
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                visible:true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid:false,
                touched:false,
                visible:true
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[{value: 'fastest', displayValue: 'Fastest'},
                        {value: 'chipest', displayValue: 'Chipest'}
                    ]
                },
                value: 'fastest',
                valid:false,
                touched:false,
                visible:true
            }
        },
        formIsValid: false
    }
    submitHandler = (event) =>{
        event.preventDefault();
        //console.log(this.props.bparts);

        //this.setState({loading:true});

        const formData=getFormData(this);

        const order = {
            budgetParts: this.props.bparts,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        //console.log("order data :",order.orderData);
        this.props.onOrderBudget(order,this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier)=>{
        //console.log(event.target.value);
        /*const updatedOrderForm ={
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        */
        inputChangedHandler(event,inputIdentifier,this);
    }
    render () {
        const formElementsArray =[];
        for(let key in this.state.form){
            formElementsArray.push({
                id: key,
                config:this.state.form[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
    </form>);
        if(this.props.loading)
        {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4> data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return {
        bparts: state.budgetBuilder.budgetParts,
        price: state.budgetBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBudget: (orderData,token) => dispatch(actions.purchaseBudget(orderData,token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( ContactData, Axios) );