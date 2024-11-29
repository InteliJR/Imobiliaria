const getTokenData = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return null;
    }

    return JSON.parse(atob(token.split('.')[1]));
}

export default getTokenData;