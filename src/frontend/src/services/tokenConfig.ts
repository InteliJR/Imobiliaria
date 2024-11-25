const getTokenData = () => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
        return null;
    }

    return JSON.parse(atob(token.split('.')[1]));
}

export default getTokenData;