// utils/tokenUtils.js
export const isAccessTokenValid = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error validating access token:', error);
      return false;
    }
};

export const isRefreshTokenValid = (refreshToken) => {
    try {
      const decodedToken = jwtDecode(refreshToken);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error validating refresh token:', error);
      return false;
    }
};

export const refreshTokens = async (refreshToken) => {
    console.log('--- refreshing token ---')
    try {
        const response = await fetch(VITE_API_REFRESH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "refresh": refreshToken
            })
        })
        const data = await response.json()
        if (response.ok) {
            const updatedTokens = {
                access_token: data.access,
                refresh_token: authTokens.refresh_token,
            };
            setAuthTokens(updatedTokens);
            setUser(jwtDecode(data.access));
            Cookies.set('access_token', JSON.stringify(updatedTokens.access_token))  
            Cookies.set('refresh_token', JSON.stringify(updatedTokens.refresh_token))
        }
        else {
            console.log('--- Login failed ---', data)
            logout()
        }
    } catch (error) {
        console.error('--- error ----', error)
        logout()
    }
}