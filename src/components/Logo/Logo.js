import React from 'react';
import ImageLogo from '../../assets/images/budget-logo.png'
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={ImageLogo} alt="MyBudget"/>
    </div>
);
export default logo;