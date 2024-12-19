import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../context/AuthContext';


const OauthHandler = () => {
	const { setAuthTokens, setUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('----- OauthHandler ----');
		const params = new URLSearchParams(window.location.search);
		const accessToken = params.get('access_token');
		const refreshToken = params.get('refresh_token');
		console.log(accessToken, refreshToken);

		if (accessToken && refreshToken) {
			console.log('----- OauthHandler11111 ----');
			Cookies.set('access_token', JSON.stringify(accessToken));
			Cookies.set('refresh_token', JSON.stringify(refreshToken));
			const data = {
				access_token: accessToken,
				refresh_token: refreshToken
			}
			setAuthTokens(data)
			setUser(jwtDecode(accessToken));
			console.log('User=============>', jwtDecode(accessToken));
			console.log('Access Token=============>', accessToken);
			console.log('Refresh Token=============>', refreshToken);
			navigate("/dashboard", { replace: true });
			// window.location.reload();
		}
	}, [setAuthTokens, navigate]);

	return null;
};

export default OauthHandler;