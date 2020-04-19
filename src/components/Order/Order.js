import React from 'react';
import classes from './Order.css'

const order = (props) => {
    const budgetParts =[];
    for(let budgetPartName in props.budgetParts){
        budgetParts.push({name: budgetPartName,amount: props.budgetParts[budgetPartName]})
    }
    const budgetPartsOutput = budgetParts.map(
        (ig)=>{
            return <span
                style={{textTransform: 'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border: '1px solid #ccc',
                padding: '5px'}}
            key={ig.name}>{ig.name} ({ig.amount})</span>
        }
    )
    return (
    <div className={classes.Order}>
        <p>Budget Part: {budgetPartsOutput} </p>
        <p>Total: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
)}
export default order;