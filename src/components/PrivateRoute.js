import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSession } from '../helpers/sessionHelper';
import { connect } from 'react-redux';
import { isUserLogin } from '../actions'
require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
        if (decode.username && decode.exp && decode._id
            && decode.exp > Math.floor(Date.now() / 1000)) {
            return decode.username;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const PrivateRoute = ({ children, sessionUsername, ...rest }) => {
    const token = getSession('token');
    let isValidToken = false;
    if (typeof (token) === 'string') {
        const tokenValue = token.replace("JWT ", '');
        isValidToken = verifyToken(tokenValue);
    }

    if (isValidToken) {
        sessionUsername(isValidToken, token)
    }

    return (
        <Route
            {...rest}
            render={() =>
                isValidToken ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login"
                            }}
                        />
                    )
            }
        />
    );
}

const mapDispatchToProps = (dispatch) => ({
    sessionUsername: (username, token) => dispatch(isUserLogin(username, token))
})

export default connect(null, mapDispatchToProps)(PrivateRoute)