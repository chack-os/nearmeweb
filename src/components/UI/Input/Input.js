import React from 'react';
import classes from './Input.css';

const input=(props)=>{
    let inputElement = null;
    const inputClasses = [props.elementType==='checkbox'?classes.InputCheckBoxElement:classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = (<input className={inputClasses.join(' ')}
                                   {...props.elementConfig}
                                   value={props.value} onChange={props.changed}/>);
            break;
        case ('textarea'):
            inputElement = (<textarea className={inputClasses.join(' ')}
                                      {...props.elementConfig}
                                      value={props.value} onChange={props.changed}></textarea>);
            break;
        case('select'):
            inputElement = (<select className={inputClasses.join(' ')}
                                    value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
            break;
        case('checkbox'):
            inputElement = (<input className={inputClasses.join(' ')}
                                  type={props.elementType}
                                  id={props.key}
                                  name={props.key}
                                  value={props.value} onChange={props.changed}/>)
            break;
        default:
            inputElement = (<input className={inputClasses.join(' ')}
                                   {...props.elementConfig} onChange={props.changed}
                                   value={props.value}/>);
    }

    if(props.elementType==='checkbox')
        return(<div className={classes.Input}>
                {inputElement}<label className={classes.Label}>{props.displayLabel}</label>
                    </div>)
    else
        return (<div className={classes.Input}>
                <label className={classes.Label}>{props.displayLabel}</label>
                {inputElement}</div>)
}
export default input;