import { createContext, useState, useEffect, useContext } from 'react'

const HeadersContext = createContext()

export const HeadersProvider = ({ children }) => {
	const [headers, setHeaders] = useState({})

	useEffect(() => {
		let access_token = ''
		let cookies = document.cookie.split(';').filter((cookie) => cookie.includes('access_token'))

		if (cookies.length) {
			access_token = cookies[0].split('=')[1]
		}
	
		setHeaders({
			Authorization: `Bearer ${access_token}`,
		})
	}, [])

	return (
		<HeadersContext.Provider value={headers}>
			{children}
		</HeadersContext.Provider>
	)
}

export const useHeaders = () => {
	const headers = useContext(HeadersContext)
	if (headers === undefined) {
		throw new Error('useHeaders must be used within a HeadersProvider');
	}
	return headers;
}