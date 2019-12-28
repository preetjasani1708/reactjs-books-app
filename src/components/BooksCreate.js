import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSession } from '../helpers/sessionHelper';
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

    return (
        <div>
            <div style={{
                color: apiResult ? apiResult.success ?
                    '#00FF00' : '#FF0000' : '#000000'
            }}>
                {apiResult ? apiResult.message : ''}
            </div>
            <div>Create Book</div>
            <div>ISBN :
            <input type='text'
                    name='isbn'
                    value={inputs.isbn}
                    placeholder='Enter ISBN'
                    onChange={onHandleInputs}>
                </input>
            </div>
            <div>Title :
        <input type='text'
                    name='title'
                    value={inputs.title}
                    placeholder='Enter Title'
                    onChange={onHandleInputs}>
                </input>
            </div>
            <div>Author :
        <input type='text'
                    name='author'
                    value={inputs.author}
                    placeholder='Enter Author'
                    onChange={onHandleInputs}>
                </input>
            </div>
            <div>Publisher :
        <input type='text'
                    name='publisher'
                    value={inputs.publisher}
                    placeholder='Enter Publisher'
                    onChange={onHandleInputs}>
                </input>
            </div>
            <div>
                <button disabled={!isValidInputs}
                    onClick={addBook}>Create Book</button> {' '}
                <Link to='/books'>Books List</Link>
            </div>
        </div>
    );
}

export default BooksCreate