import React from 'react'

function Input({placeholder}) {
	return (
		<input className='bg-secondary-light placeholder:text-light responsive-input font-heavy border border-border box-border' placeholder={`${placeholder}`}></input>
	)
}

export default Input