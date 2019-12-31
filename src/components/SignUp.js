import React, { useState, useEffect } from 'react';
import ButtonAppBar from './custom/AppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
        try {
            if (inputs.username && inputs.password) {
                let result =
                    await axios.post('http://localhost:3000/api/signup', inputs);
                if (result.data) {
                    setApiResult({
                        success: result.data.success,
                        message: result.data.msg
                    })
                    setInputs(initnialState);
                }
            }
        } catch (error) {
            setApiResult({
                success: false,
                message: 'Invalid Inputs'
            })
            setInputs(initnialState)
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

        customTypographySignUp: {
            padding: theme.spacing(2),
        },

        customTypography: {
            padding: theme.spacing(1),
        },

    }));
    const classes = useStyles();

    return (
        <div>
            <ButtonAppBar name='Sign Up'
                signInOut='Sign In'
                redirectOn='/login' >
                <Grid container spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
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
                                className={classes.customTypographySignUp}>
                                Sign Up
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
                                    onChange={onHandleInput}
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
                                    onChange={onHandleInput}
                                    size='small'
                                />
                            </Typography>

                            <Typography className={classes.customTypography}>
                                <Button variant="outlined"
                                    disabled={!isValid}
                                    onClick={addInput}
                                    color="primary">
                                    Sign Up
                                </Button>
                            </Typography>

                            <Typography variant="h6"
                                className={classes.customTypography}>
                                Already have account ? {' '}
                                <Button color="primary"
                                    href='/login'>
                                    Sign In
                                </Button>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

            </ButtonAppBar>
        </div>
    );
}

export default SignUp