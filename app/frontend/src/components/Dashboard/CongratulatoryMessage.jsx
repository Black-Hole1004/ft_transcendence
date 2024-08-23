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
			{/* {achievement && ( */}
				{/* <> */}
					{/* <h1 className='message-title font-heavy leading-[3]'>{achievement.title}</h1> */}
					{/* <p className='message-body font-medium'>{achievement.body}</p> */}
					<h1 className='message-title font-heavy leading-[3]'>
						Congratulations, Celestial Master!
					</h1>
					<p className='message-body font-medium'>
						You've ascended to the highest echelons of cosmic mastery, basking in the
						brilliance of the Sun itself. As a true luminary of the cosmos, your journey
						knows no bounds. Shine on, and may your light guide others to new celestial
						heights!
					</p>
				{/* </> */}
			{/* )} */}
		</div>
	)
}

export default CongratulatoryMessage
