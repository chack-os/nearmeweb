import React from 'react';
import Input from '../components/UI/Input/Input';
import {Button} from 'reactstrap';
import {updateObject} from './Utility';

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules) {
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

    }
    return isValid;
}

export const inputChangedHandler = (event, inputIdentifier, cmp)=>{
    //console.log(event.target.value);
    const updatedFormElement = updateObject(cmp.state.form[inputIdentifier],
        {value:event.target.value,
        valid:checkValidity(event.target.value,cmp.state.form[inputIdentifier].validation),
        touched: true});
    const updatedForm =updateObject(cmp.state.form,{
        [inputIdentifier]:updatedFormElement
    });
    let formIsValid = true;
    for(let inputIdentifier in updatedForm){
        if(updatedForm[inputIdentifier].visible)
            formIsValid=updatedForm[inputIdentifier].valid && formIsValid
    }
    cmp.setState({form: updatedForm, formIsValid: formIsValid});
}
export const getRenderform = (cmp) =>{
    const formElementsArray =[];
    for(let key in cmp.state.form){
        if(cmp.state.form[key].visible) {
            formElementsArray.push({
                id: key,
                config: cmp.state.form[key]
            })
        }
        //console.log(key,cmp.state.form[key].displayLabel,formElementsArray[formElementsArray.length-1].config.displayLabel);
    }
    let form = (
        <form onSubmit={cmp.submitHandler}>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       changed={(event)=>cmp.inputChangedHandler(event,formElement.id)}
                       displayLabel={formElement.config.displayLabel}
                />
            ))}
            <Button color="success" disabled={!cmp.state.formIsValid}>Submit</Button>
        </form>);
    return form;
}
export const getFormData = (cmp) => {
    const formData={};
    for(let formElementIdentifier in cmp.state.form){
        if(cmp.state.form[formElementIdentifier].visible)
          formData[formElementIdentifier]=cmp.state.form[formElementIdentifier].value;
    }
    return formData;
}