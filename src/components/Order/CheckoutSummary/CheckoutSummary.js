import React from 'react';
import Budget from '../../Budget/Budget';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Summary</h1>
            <div style={{width: '100%', margin: 'auto' }}>
                <Budget budgetParts={props.budgetParts}/>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinued}>Continue</Button>
        </div>
    );
};
export default checkoutSummary;