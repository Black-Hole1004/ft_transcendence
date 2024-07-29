import { useEffect, useState } from 'react'

function CongratulatoryMessage({ achievementId }) {
	const [achievement, setAchievement] = useState(null)
	let url = 'http://localhost:8000/achievements/'
	useEffect(() => {
		fetch(url + achievementId)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setAchievement(data)
			})

		console.log(achievement)
	}, [])

	return (
		<div className='message-padding max-lp:pb-[60px]'>
			{achievement && (
				<>
					<h1 className='message-title font-heavy leading-[3]'>{achievement.title}</h1>
					<p className='message-body font-medium'>{achievement.body}</p>
				</>
			)}
		</div>
	)
}

export default CongratulatoryMessage
