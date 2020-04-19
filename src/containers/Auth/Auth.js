import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {inputChangedHandler, getFormData, getRenderform, checkValidity} from "../../share/igUtility";
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject} from "../../share/Utility";


class Auth extends Component{
    state = {
        form: {
            email: {
                displayLabel:'',
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
            password: {
                displayLabel:'',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false,
                elementType: 'input',
                visible:true
            },
            rememberme: {
                displayLabel: 'Remember me',
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    placeholder: 'Remember me'
                },
                value: false,
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                visible:false
            }
        },
        isSignUp: true
    }
    componentDidMount(){
        if(!this.props.buildingBudget && this.props.authRedirectPath!=='/')
            this.props.onSetAuthRedirectPath();
    }
    submitHandler = (event) => {
        event.preventDefault();
        const formData=getFormData(this);
        this.props.onAuth(formData['email'],formData['password'],this.state.isSignUp)
    }
    inputChangedHandler = (event, inputIdentifier)=> {
        //console.log(event.target.value);
        inputChangedHandler(event,inputIdentifier,this);
    }
    switchAuthModeHandler = () => {
        let isSignUp=!this.state.isSignUp
        const updatedFormElement = updateObject(this.state.form['rememberme'],
            {visible:!isSignUp,valid:isSignUp});
        const updatedForm =updateObject(this.state.form,{
            ['rememberme']:updatedFormElement
        });
        this.setState(prevState=>{return {form: updatedForm,isSignUp:!prevState.isSignUp} });
    }
    render (){
        let form = getRenderform(this);
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>);
        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <div><img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile" id="profile-img" className={classes.ProfileImgCard} /></div>
                {form}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignUp ?  'Sign In':'Sign Up'}</Button>
            </div>
        )
    }
}
const mapStatToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken !== null,
        buildingBudget : state.budgetBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch (actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStatToProps,mapDispatchToProps)(Auth);