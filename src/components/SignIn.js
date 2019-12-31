import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setSession } from '../helpers/sessionHelper';
import { connect } from 'react-redux';
import { isUserLogin } from '../actions';
import ButtonAppBar from './custom/AppBar';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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

    //Component Did Mount
    useEffect(
        () => {
            props.fireUserLogin('', '')
        })

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
        }, [apiResult, history]
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

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },

        customPaper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },

        customTypographySignIn: {
            padding: theme.spacing(2),
        },

        customTypography: {
            padding: theme.spacing(1),
        },

    }));
    const classes = useStyles();

    return (
        <div>
            <ButtonAppBar name='Sign In'
                signInOut='Sign Up'
                redirectOn='/register'>
                <Grid container spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12}>
                        <Paper className={classes.customPaper}>
                            <Typography variant="h6"
                                className={classes.customTypography}
                                style={{
                                    color: apiResult ? apiResult.success ?
                                        '#00FF00' : '#FF0000' : '#000000'
                                }}>
                                {apiResult ? apiResult.message : ''}
                            </Typography>
                            <Typography variant="h4"
                                className={classes.customTypographySignIn}>
                                Sign In
                            </Typography>
                            <Typography variant="h5"
                                className={classes.customTypography}>
                                Username : {' '}
                                <TextField id="outlined-basic"
                                    type='text'
                                    label="Enter Username"
                                    variant="outlined"
                                    name='username'
                                    value={inputs.username}
                                    onChange={onHandleInputs}
                                    size='small'
                                />
                            </Typography>
                            <Typography variant="h5"
                                className={classes.customTypography}>
                                Password : {' '}
                                <TextField id="outlined-basic"
                                    type='password'
                                    label="Enter Password"
                                    variant="outlined"
                                    name='password'
                                    value={inputs.password}
                                    onChange={onHandleInputs}
                                    size='small'
                                />
                            </Typography>
                            <Typography className={classes.customTypography}>
                                <Button variant="outlined"
                                    disabled={!isInputs}
                                    onClick={onLoginClick}
                                    color="primary">
                                    Sign In
                                </Button>
                            </Typography>
                            <Typography variant="h6"
                                className={classes.customTypography}>
                                Don't have account ? {' '}
                                <Button color="primary"
                                    href='/register'>
                                    Sign Up
                                </Button>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </ButtonAppBar>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    fireUserLogin: (username, token) => dispatch(isUserLogin(username, token))
})

export default connect(null, mapDispatchToProps)(SignIn)