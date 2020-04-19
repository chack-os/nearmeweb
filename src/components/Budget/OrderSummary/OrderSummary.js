import React, {Component} from 'react';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // can be functional
    // componentWillUpdate(){
    //     console.log('[Order Summary will update]');
    // }

    render() {
        const budgetPartsSummary = Object.keys(this.props.budgetParts).map(
            (igKey) => {
                return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.budgetParts[igKey]}
                </li>
            });

        return (
            <Auxiliar>
                <h3>Order Summary</h3>
                <p>following Parts</p>
                <ul>
                    {budgetPartsSummary}
                </ul>
                <p><strong>Total: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Auxiliar>
        )
    }
}
export default OrderSummary;