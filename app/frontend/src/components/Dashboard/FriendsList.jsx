import React from 'react'

function FriendsList() {
	return (
		<div
			className='flex flex-col items-center lg:w-fl-ldr-custom tb:w-[380px] w-[300px]
            rounded-xl card-height card-color h-fl-ldr-custom'
		>
			<h1 className='font-dreamscape-sans card-title'>FRIENDS LIST</h1>

			<div className='flex items-center border border-border rounded-2xl pl-2.5'>
				<img src='/assets/images/icons/search-icon.png' className='search-icon' alt='' />
				<input
					type='text'
					placeholder='Search for friends...'
					className=' font-medium bg-transparent text-primary outline-none search-input p-2.5 placeholder:text-border'
				/>
			</div>
			<div className='flex flex-col items-center w-full overflow-y-scroll users'>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
			</div>
		</div>
	)
}

export default FriendsList
