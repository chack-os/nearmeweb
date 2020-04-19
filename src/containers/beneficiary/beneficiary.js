import React, {Component} from 'react';
import {connect} from 'react-redux';
import {inputChangedHandler,getFormData,getRenderform,checkValidity} from "../../share/igUtility";
import Spinner from '../../components/UI/Spinner/Spinner';

class beneficiary extends Component {
  state = {
    form: {
      phone: {
        displayLabel: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Phone'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false,
        visible: true
      },
      email: {
        displayLabel: '',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-Mail'
        },
        value: '',
        validation: {
          required: false,
          isEmail: true
        },
        valid: false,
        touched: false,
        visible: true
      },
      cui_1: {
        displayLabel: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Cui'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false,
        visible: true
      },
      cui_2: {
        displayLabel: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Cui'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        visible: true
      },
      cui_3: {
        displayLabel: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Cui'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false,
        visible: true
      },
      cui: {
        displayLabel: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Cui'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false,
        visible: false
      }
    }
  }
  submitHandler = (event) => {
    event.preventDefault();
  }
  render() {
    return ( <form onSubmit = {this.submitHandler}>

    </form>)
    }
  }