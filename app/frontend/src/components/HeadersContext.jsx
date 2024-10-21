import { createContext, useState, useEffect, useContext } from 'react'

const HeadersContext = createContext()

export const HeadersProvider = ({ children }) => {
	const [headers, setHeaders] = useState({})

	useEffect(() => {
		let accessToken = ''
		let cookies = document.cookie.split(';').filter((cookie) => cookie.includes('accessToken'))

		if (cookies.length) {
			accessToken = cookies[0].split('=')[1]
		}
	
		setHeaders({
			Authorization: `Bearer ${accessToken}`,
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