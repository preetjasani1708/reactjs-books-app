import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSession } from '../helpers/sessionHelper';
require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
        if (decode.username && decode.exp && decode._id
            && decode.exp > Math.floor(Date.now() / 1000)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const PrivateRoute = ({ children, ...rest }) => {
    const token = getSession('token');
    let isValidToken = false;
    if (typeof (token) === 'string') {
        const tokenValue = token.replace("JWT ", '');
        isValidToken = verifyToken(tokenValue);
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

export default PrivateRoute