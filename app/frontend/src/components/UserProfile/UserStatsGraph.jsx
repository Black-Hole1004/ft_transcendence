import { useEffect } from 'react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import useAuth from '../../context/AuthContext'
const API_TIME_SPENT = import.meta.env.VITE_API_TIME_SPENT
const BASE_URL = import.meta.env.VITE_BASE_URL


function UserStatsGraph(user) {
	const [userData, setUserData] = useState([])
	const { getAuthHeaders } = useAuth()

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				console.log('API URL:', `${BASE_URL}/api/users/${user.profile_name}/time-spent/`);
				const response = await fetch(`${BASE_URL}/api/users/${user.profile_name}/time-spent/`, {
					method: 'GET',
					headers: getAuthHeaders(),
				})
				const result = await response.json()

				console.log(result)

				if (response.ok && Array.isArray(result.data)) {
					// Default data for all days of the week
					console.log('result.data ------->', result.data)
					const allDays = [
						{ name: 'Mon', min: 0 },
						{ name: 'Tue', min: 0 },
						{ name: 'Wed', min: 0 },
						{ name: 'Thu', min: 0 },
						{ name: 'Fri', min: 0 },
						{ name: 'Sat', min: 0 },
						{ name: 'Sun', min: 0 },
					]

					// Process data from the API to map it to days of the week
					const apiData = result.data.map((item) => {
						const date = new Date(item.date)
						const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }) // "Mon", "Tue", etc.
						const minutes = item.total_time_spent_seconds ? Math.round(item.total_time_spent_seconds / 60) : 0

						console.log('dayName:', dayName)
						console.log('minutes:', minutes)
						return {
							name: dayName,
							min: minutes
						}
					})

					// Merge the default days with API data
					const mergedData = allDays.map((day) => {
						const dayData = apiData.find((d) => d.name === day.name)
						return {
							...day,
							min: dayData ? dayData.min : day.min
						}
					})
					console.log('mergedData ------->', mergedData)
					setUserData(mergedData)
				} else {
					console.log('Failed to fetch user data')
					// logout()
				}
			} catch (error) {
				console.error('Error:', error)
			}
		}
		fetchUserData()
	}, [])


	return (
		<div className="font-medium rounded-xl mt-2 lp:ml-2 chart-card max-lp:self-center flex flex-col lp:h-chart-lp h-chart-ms lp:w-chart-lp w-chart-ms">
			<p className="text-primary chart-title m-2">Weekly User Engagement: Time Spent on Platform</p>
			<ResponsiveContainer width="95%" height="90%" className={'self-center'}>
				<AreaChart data={userData}>
					<defs>
						<linearGradient id="min" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#FFCE9E" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#FFCE9E" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey="name"
						scale="point"
						padding={{ left: 15, right: 15 }}
						axisLine={false}
						tickLine={false}
						tick={{
							fontSize: 'clamp(0.625rem, 0.354vw + 0.559rem, 1.125rem)',
							fill: '#FBFBEE',
						}}
					/>
					<Tooltip
						cursor={{
							stroke: '#FBFBEE',
							strokeWidth: 0.5
						}}
						contentStyle={{
							backgroundColor: '#79624C',
							border: '1px solid #FBFBEE',
							borderRadius: '5px',
						}}
					/>
					<Area
						type="monotone"
						dataKey="min"
						stroke="#FFCE9E"
						fillOpacity={1}
						fill="url(#min)"
						strokeWidth={2}
						dot={{
							stroke: '#79624C',
							strokeWidth: 2.5,
							r: 4,
							fill: '#FFCE9E',
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
export default UserStatsGraph
