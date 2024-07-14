import React, { useEffect, useRef, useState } from 'react';
import './Profile.css'
import Header from '../../components/Header'

const Profile = () => {
	// const containerRef = useRef(null)
	// const [width, setWidth] = useState(0)

	// useEffect(() => {
	// 	const calculateWidth = () => {
	// 		if (containerRef.current) {
	// 			const containerWidth = containerRef.current.getBoundingClientRect().width
	// 			setWidth(containerWidth)
	// 		}
	// 	}


	// }, [containerRef])

	// console.log(width)
	return (
		<div ref={containerRef} className='min-h-screen flex flex-col backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex-grow'>

			</section>
		</div>
	);
}

export default Profile;