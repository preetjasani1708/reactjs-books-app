import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import { connect } from 'react-redux';
import { getSession } from '../helpers/sessionHelper';
import signOut from '../helpers/signOutHelper';
const axios = require('axios');

const Books = (props) => {
    const history = useHistory();
    const [apiResult, setApiResult] = useState([])

    useEffect(() => {
        displayBooks();
    }, [])

    const displayBooks = async () => {
        try {
            let result = await axios.get('http://localhost:3000/api/book', {
                headers: {
                    Authorization: getSession('token')
                }
            })
            if (result.data) {
                setApiResult(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderTableHeader = () => {
        if (apiResult.length) {
            let header = Object.keys(apiResult[0])
            const indexId = header.indexOf('_id')
            if (indexId > -1) {
                header.splice(indexId, 1)
            }
            const indexV = header.indexOf('__v')
            if (indexV > -1) {
                header.splice(indexV, 1)
            }
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }

    const renderTableData = () => {
        return apiResult.map(item => {
            const { _id, isbn, title, author, publisher } = item
            return (
                <tr key={_id}>
                    <td>{isbn}</td>
                    <td>{title}</td>
                    <td>{author}</td>
                    <td>{publisher}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div>Hi {props.username} {' '}
                <button onClick={() => signOut('token', history)}>
                    SignOut
                </button>
            </div>
            <h1 id='title'>Books List</h1>
            <table id='books'>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData()}
                </tbody>
            </table>
            <Link to="/books/create">Books create</Link>
        </div>
    )
}

const mapStateToProps = state => ({
    username: state.login.username
})

export default connect(mapStateToProps)(Books)