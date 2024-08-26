import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

function UserStatsGraph() {
	const data = [
		{ name: 'Mon', min: 80 },
		{ name: 'Tue', min: 60 },
		{ name: 'Wed', min: 150 },
		{ name: 'Thu', min: 130 },
		{ name: 'Fri', min: 240 },
		{ name: 'Sat', min: 290 },
		{ name: 'Sun', min: 240 },
	]

	return (
		<div
			className='font-medium rounded-xl mt-2 lp:ml-2 chart-card max-lp:self-center flex flex-col
			lp:h-chart-lp h-chart-ms lp:w-chart-lp w-chart-ms'
		>
			<p className='text-primary chart-title m-2'>
				Weekly User Engagement: Time Spent on Platform
			</p>
			<ResponsiveContainer width='95%' height='90%' className={'self-center'}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id='min' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#FFCE9E' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#FFCE9E' stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey='name'
						scale='point'
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
						type='monotone'
						dataKey='min'
						stroke='#FFCE9E'
						fillOpacity={1}
						fill='url(#min)'
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
	)
}

export default UserStatsGraph
