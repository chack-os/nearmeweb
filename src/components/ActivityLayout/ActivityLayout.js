import React from 'react'
import {Route } from 'react-router-dom'
import {matchPath} from 'react-router'
import {Container, Row, Col} from 'reactstrap'
import Activities from '../../containers/Activities/Activities'
import SelectActivity from "../Activity/SelectActivity/SelectActivity";
import DetailActivity from "../../containers/Activities/DetailActivity/DetailActivity";
import EditActivity from "../../containers/Activities/EditActivity/EditActivity";

const activityLayout = (props) => {

    const match = matchPath(props.history.location.pathname, {
        path: '/activities/:id',
        exact: true,
        strict: false
    })
    console.log(match)
    return (
        <Container>
            <Row>
                <Col md="5">
                    <Activities path={props.match.path}/>
                </Col>
                <Col md="7">
                    <Route exact path={`${props.match.path}/new`} component={EditActivity}/>
                    {match &&
                    <Route exact path={`${props.match.path}/:id`} component={DetailActivity}/>
                    }
                    {match &&
                    <Route exact path={`${props.match.path}/:id/edit`} component={EditActivity}/>
                    }
                    <Route exact path={`${props.match.path}/`}  component={SelectActivity} />
                </Col>
            </Row>
        </Container>
    )}
export default activityLayout