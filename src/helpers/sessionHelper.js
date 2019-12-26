export const setSession = (key, value) => {
    sessionStorage.setItem(key, value)
}

export const getSession = key => {
    let keyValue = sessionStorage.getItem(key)
    return keyValue;
}

export const removeSession = key => {
    sessionStorage.removeItem(key)
}