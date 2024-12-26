// import { useEffect, useState } from 'react'

//message-padding

function CongratulatoryMessage(props) {
	return (
		<div className='max-lg:pb-[60px]'>
			<h1 className='message-title font-heavy leading-[3]'>
				{props.title}
			</h1>
			<p className='message-body font-medium'>
				{props.description}
			</p>
		</div>
	)
}

export default CongratulatoryMessage
