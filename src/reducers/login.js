const login = (state={}, action) => {
    switch (action.type) {
        case 'IS_LOGIN':

            return {
                ...state,
                username: action.username,
                token: action.token,
                isLoggined: true
            }

        default:
            return state;
    }
}

export default login