import React from 'react';
import classes from './Budget.css';
import BudgetParts from './BudgetParts/BudgetParts'

const budget = (props) => {
    //console.log(props.budgetParts);
    //console.log(Object.keys(props.budgetParts))

    let transformedBudgetParts = Object.keys(props.budgetParts).map(
        (igKey) => {
            //console.log(igKey, props.budgetParts[igKey])
            return [...Array(props.budgetParts[igKey])].map(
                (_,i)=> {
                    return <BudgetParts type={igKey} key={igKey + i}/>;
                })
        }).reduce( (arr, el)=>{
            return arr.concat(el)
    },[]);

    if (transformedBudgetParts.length===0){
        transformedBudgetParts=<div>Please start adding Parts</div>;
    }
    return (
        <div className={classes.Budget}>
            <BudgetParts type="bread-top"/>
            {transformedBudgetParts}
            <BudgetParts type="bread-bottom"/>
        </div>
    );
};
export default budget;