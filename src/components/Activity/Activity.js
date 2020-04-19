import React from 'react'
import {Link} from 'react-router-dom'
import {Container} from 'reactstrap'

const activity=(props)=>{
    return (
       <Container fluid={true}>
        <Link to={`${props.path}/${props.id}`} params={{id:props.id}} >
        <span>
            <h4>{props.phone}</h4>
            <p>{props.token}</p>
        </span>
        <span>

        </span>
        </Link>
       </Container>
    )
}
export default activity;