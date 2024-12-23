import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../context/AuthContext';


const OauthHandler = () => {
	const { setAuthTokens, setUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const accessToken = params.get('access_token');
		const refreshToken = params.get('refresh_token');

		if (accessToken && refreshToken) {
			Cookies.set('access_token', JSON.stringify(accessToken));
			Cookies.set('refresh_token', JSON.stringify(refreshToken));
			const data = {
				access_token: accessToken,
				refresh_token: refreshToken
			}
			setAuthTokens(data)
			setUser(jwtDecode(accessToken));
			navigate("/dashboard", { replace: true });
			// window.location.reload();
		}
	}, [setAuthTokens, navigate]);

	return null;
};

export default OauthHandler;