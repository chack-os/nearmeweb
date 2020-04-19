import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BudgetParts.css';

class BudgetParts extends Component {
    render() {
        let part = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                part = <div className={classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                part = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                part = <div className={classes.Meat}></div>
                break;
            case ('cheese'):
                part = <div className={classes.Cheese}></div>
                break;
            case ('salad'):
                part = <div className={classes.Salad}></div>
                break;
            case ('bacon'):
                part = <div className={classes.Bacon}></div>
                break;
            default:
                part = null;
        }
        return part;
    }
}

BudgetParts.propTypes ={
    type: PropTypes.string.isRequired
};

export default BudgetParts;