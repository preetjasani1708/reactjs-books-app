import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

const SignUp = () => {
    const [isValid, setIsValid] = useState(false);
    const [apiResult, setApiResult] = useState(null);
    const initnialState = {
        username: '',
        password: ''
    }
    const [inputs, setInputs] = useState(initnialState)

    //component did update
    useEffect(
        () => {
            if (inputs.username.length >= 6 &&
                inputs.password.length >= 8) {
                setIsValid(true)
            }
            else {
                setIsValid(false);
            }

        }, [inputs]
    )

    const onHandleInput = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        setApiResult(null);
    }

    const addInput = async () => {
        if (inputs.username && inputs.password) {
            let result =
                await axios.post('http://localhost:3000/api/signup', inputs);
            if (result.data) {
                setApiResult({
                    success: result.data.success,
                    message: result.data.msg
                })
            }
            setInputs(initnialState);
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
            <div>Sign Up</div>
            <div>Username :
        <input type='text'
                    name='username'
                    value={inputs.username}
                    placeholder='Enter Username'
                    onChange={onHandleInput} />
            </div>
            <div>Password :
    <input type='password'
                    name='password'
                    value={inputs.password}
                    placeholder='Password'
                    onChange={onHandleInput} />
            </div>
            <div>
                <button onClick={addInput}
                    disabled={!isValid}
                >Sign Up</button>
            </div>
            <div>Already have account ? {' '}
                <Link to='/login'>
                    SignIn
                </Link>
            </div>
        </div>
    );
}

export default SignUp