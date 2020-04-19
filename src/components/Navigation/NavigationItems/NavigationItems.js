import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {props.isAuth? <NavigationItem link="/activities" >Activities</NavigationItem>:null}
        {!props.isAuth ? <NavigationItem link="/auth" >Authenticate</NavigationItem> :
            <NavigationItem link="/logout" >Logout</NavigationItem>}
    </ul>
);
export default navigationItems;