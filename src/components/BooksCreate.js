import React, { useState, useEffect } from 'react';
import { getSession } from '../helpers/sessionHelper';
import ButtonAppBar from './custom/AppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const axios = require('axios');

const BooksCreate = () => {

    const initialState = {
        isbn: '',
        title: '',
        author: '',
        publisher: ''
    }
    const [inputs, setInputs] = useState(initialState)
    const [isValidInputs, setIsValidInputs] = useState(false)
    const [apiResult, setApiResult] = useState(null)

    //Component Did Update
    useEffect(
        () => {
            if (inputs.isbn && inputs.title && inputs.author &&
                inputs.publisher && inputs.isbn.length >= 13) {
                setIsValidInputs(true)
            } else {
                setIsValidInputs(false)
            }
        }, [inputs]
    )

    const onHandleInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        // let tempInputs = Object.assign({}, inputs);
        // tempInputs[e.target.name] = e.target.value;
        // setInputs(tempInputs)
    }

    const addBook = async () => {
        try {
            if (isValidInputs) {
                let result =
                    await axios.post('http://localhost:3000/api/book',
                        inputs, {
                        headers: {
                            Authorization: getSession('token')
                        }
                    })
                if (result.data) {
                    setApiResult({
                        success: result.data.success,
                        message: result.data.msg
                    })
                    setInputs(initialState)
                }
            }
        } catch (error) {
            setApiResult({
                success: false,
                message: 'Invalid Inputs'
            })
            setInputs(initialState)
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
            <ButtonAppBar name='Create Book'
                signInOut='Sign Out'>
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
                                className={classes.customTypographySignUp}>
                                Create Book
                            </Typography>
                            <Typography variant="h5"
                                className={classes.customTypography}>
                                ISBN : {' '}
                                <TextField id="outlined-basic"
                                    type='text'
                                    label="Enter ISBN"
                                    variant="outlined"
                                    name='isbn'
                                    value={inputs.isbn}
                                    onChange={onHandleInputs}
                                    size='small'
                                />
                            </Typography>
                            <Typography variant="h5"
                                className={classes.customTypography}>
                                Title : {' '}
                                <TextField id="outlined-basic"
                                    type='text'
                                    label="Enter Title"
                                    variant="outlined"
                                    name='title'
                                    value={inputs.title}
                                    onChange={onHandleInputs}
                                    size='small'
                                />
                            </Typography>
                            <Typography variant="h5"
                                className={classes.customTypography}>
                                Author : {' '}
                                <TextField id="outlined-basic"
                                    type='text'
                                    label="Enter Author"
                                    variant="outlined"
                                    name='author'
                                    value={inputs.author}
                                    onChange={onHandleInputs}
                                    size='small'
                                />
                            </Typography>
                            <Typography variant="h5"
                                className={classes.customTypography}>
                                Publisher : {' '}
                                <TextField id="outlined-basic"
                                    type='text'
                                    label="Enter Publisher"
                                    variant="outlined"
                                    name='publisher'
                                    value={inputs.publisher}
                                    onChange={onHandleInputs}
                                    size='small'
                                />
                            </Typography>
                            <Typography className={classes.customTypography}>
                                <Button variant="outlined"
                                    disabled={!isValidInputs}
                                    onClick={addBook}
                                    color="primary">
                                    Create Book
                                </Button>
                                {' '}
                                <Button color="primary"
                                    href='/books'>
                                    Books List
                                </Button>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </ButtonAppBar>
        </div>
    );
}

export default BooksCreate