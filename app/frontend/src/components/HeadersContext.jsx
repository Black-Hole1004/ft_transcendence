import { createContext, useState, useEffect, useContext } from 'react'

const HeadersContext = createContext()

export const HeadersProvider = ({ children }) => {
	const [headers, setHeaders] = useState(null)

	useEffect(() => {
		try {
			const cookies = document.cookie.split(';')
			const accessTokenCookie = cookies.find((cookie) =>
				cookie.trim().startsWith('access_token=')
		)

			const access_token = accessTokenCookie ? accessTokenCookie.split('=')[1].trim() : null

			if (access_token) {
				setHeaders({
					Authorization: `Bearer ${access_token}`,
				})
			} else {
				setHeaders(null)
			}
		} catch (error) 
		{
			console.error('Error initializing headers:', error)
			setHeaders(null)
		}
	}, [])

	return <HeadersContext.Provider value={headers}>{children}</HeadersContext.Provider>
}

export const useHeaders = () => {
	const headers = useContext(HeadersContext)
	if (headers === undefined) {
		throw new Error('useHeaders must be used within a HeadersProvider')
	}
	return headers
}
