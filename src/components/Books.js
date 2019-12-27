import React from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';

const Books = (props) => {

    return (
        <div>
            <div>Hi {props.username}</div>
            <Link to="/books/create">Books create</Link>
        </div>
    )
}

const mapStateToProps = state => ({
    username: state.login.username
})

export default connect(mapStateToProps)(Books)