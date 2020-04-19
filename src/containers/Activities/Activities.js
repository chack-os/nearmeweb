import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import {Row, Col, Button, Container} from 'reactstrap'
import Spinner from '../../components/UI/Spinner/Spinner';
import Activity from '../../components/Activity/Activity'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class activities extends Component{
    state = {
        toNew:false
    }
    onNew = () => {
        //this.props.history.push('/activities/new')
        this.setState({toNew:true})
    }
    componentDidMount() {
        this.props.onFetchActivities(this.props.token, this.props.userId);
    }


    render() {
		let redirect=null
        if (this.state.toNew === true) {
            redirect= <Redirect to='/activities/new' />
        }
        let activity=<Spinner/>
        if(!this.props.loading && this.props.error===null){
            activity=this.props.activities.map((activity,index) =>(
                <Activity
                    phone={activity.phone}
                    token={activity.uploadToken}
                    key={activity.id}
                    id={index}
                    path={this.props.path}
                />
            ));
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>);
        }
        return (
            <Container>
			{redirect}
                {errorMessage}
                <Row>
                    <Col xs={12}>
                        <Button onClick={this.onNew} color="success">New</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {activity}
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        activities: state.activity.activities,
        loading: state.activity.loading,
        token: state.auth.idToken,
        userId: state.auth.userId,
        error: state.activity.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchActivities: (token,userId) => dispatch(actions.fetchActivities(token, userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(activities, axios);