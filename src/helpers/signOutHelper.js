import { getSession, removeSession } from './sessionHelper';
const axios = require('axios');

const signOut = async (key, history) => {
    try {
        let result =
            await axios.delete('http://localhost:3000/api/signout', {
                headers: {
                    Authorization: getSession(key)
                }
            })

        if (result) {
            history.replace('/login')
            removeSession('token');
        }
    } catch (error) {
        console.log(error)
    }
}

export default signOut