import React, {Component} from 'react';
import Auxiliar from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    };
    sideDrawerToggleHandler = () => {
        this.setState( (prevState)=> {return {showSideDrawer: !prevState.showSideDrawer}});
    }

    render() {
        return(
            <Auxiliar>
            <Toolbar
                isAuth={this.props.isAuth}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={this.props.isAuth}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliar>
        )
    }

};
const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null
    }
}
export default connect(mapStateToProps)(Layout);