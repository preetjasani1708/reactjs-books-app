import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setSession } from '../helpers/sessionHelper';
import { connect } from 'react-redux';
import { isUserLogin } from '../actions';
const axios = require('axios');

const SignIn = (props) => {
    let history = useHistory();
    const [isInputs, setIsInputs] = useState(false)
    const [apiResult, setApiResult] = useState(null)
    const initialState = {
        username: '',
        password: '',
    }
    const [inputs, setInputs] = useState(initialState);
    useEffect(
        () => {
            if (inputs.username.length >= 6 &&
                inputs.password.length >= 8) {
                setIsInputs(true)
            }
            else {
                setIsInputs(false)
            }
        }, [inputs]
    )

    useEffect(
        () => {
            if (apiResult && apiResult.token) {

                history.push('/books');
            }
        }, [apiResult]
    )

    const onHandleInputs = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const onLoginClick = async () => {
        try {
            if (inputs.username && inputs.password) {
                let result =
                    await axios.post('http://localhost:3000/api/signin', {
                        username: inputs.username,
                        password: inputs.password
                    })
                if (result) {
                    setApiResult({
                        success: result.data.success,
                        token: result.data.token,
                        message: 'Login Successfully.'
                    })
                    setSession('token', result.data.token)
                    props.fireUserLogin(inputs.username, result.data.token)
                }
            }
        } catch (error) {
            setApiResult({
                success: false,
                message: 'Incorrect Username Or Password'
            })
            setInputs(initialState);
        }
    }

    return (
        <div>
            <div style={{
                color: apiResult ? apiResult.success ?
                    '#00FF00' : '#FF0000' : '#000000'
            }}>
                {apiResult ? apiResult.message : ''}
            </div>
            <div>Sign In</div>
            <div>Username :
            <input type='text'
                    name='username'
                    value={inputs.username}
                    placeholder='Enter Username'
                    onChange={onHandleInputs}
                />
            </div>
            <div>Password :
            <input type='password'
                    name='password'
                    value={inputs.password}
                    placeholder='Enter Password'
                    onChange={onHandleInputs}
                /></div>
            <div>
                <button disabled={!isInputs}
                    onClick={onLoginClick} >
                    Log In
                </button>
            </div>
            <div>Don't have account ? {' '}
                <Link to='/register'>
                    SignUp
                </Link>
            </div>

        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    fireUserLogin: (username, token) => dispatch(isUserLogin(username, token))
})

export default connect(null, mapDispatchToProps)(SignIn)