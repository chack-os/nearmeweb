import React, {Component} from 'react'
import {Container, Button} from 'reactstrap'
import {getFormData, getRenderform, inputChangedHandler} from "../../../share/igUtility";
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from "../../../store/actions";
import {connect} from "react-redux";

class EditActivity extends Component {
    state = {
        form: {
            phone: {
                displayLabel: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 8
                },
                valid: false,
                touched: false,
                visible: true
            },
            uploadToken: {
                displayLabel: '',
                elementType: 'input',
                elementConfig: {
                    type: 'token',
                    placeholder: 'uploadToken'
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
            }
        }
    }
    submitHandler = (event) => {
        event.preventDefault();
        const formData=getFormData(this);
        this.props.onSaveUploadToken(formData,this.props.token);
    }
    inputChangedHandler = (event, inputIdentifier)=> {
        //console.log(event.target.value);
        inputChangedHandler(event,inputIdentifier,this);
    }
    render() {
        let form = getRenderform(this);
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>);
        }
        return (
            <Container fluid={true}>
            {errorMessage}
            {form}
            </Container>
        )
    }
}
const mapStatToProps = state =>{
    return {
        loading: state.activity.loading,
        error: state.activity.error,
        token: state.auth.idToken
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSaveUploadToken: (data,token) => dispatch(actions.addActivity(data,token))
    }
}
export default connect(mapStatToProps,mapDispatchToProps)(EditActivity);