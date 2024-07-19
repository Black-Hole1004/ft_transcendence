function User() {
	return (
		<div>
			<div
				className='flex tb:flex-row flex-col max-tb:justify-around items-center gap-x-2
				tb:h-user-tb h-[100px] max-tb:w-user-div w-full rounded-xl user tb:p-user-div-px-tb '
			>
				<img
					src='./assets/images/tabi3a.jpeg'
					className='rounded-full border border-primary'
					alt='user image'
				/>
				<div className='font-medium'>
					<div className='user-nickname text-primary'>
						<p className=''>Arabiai</p>
					</div>
					<div className='flex text-light max-tb:hidden last-message'>
						<pre className='font-medium'>You: </pre>
						<p className='last-message-w whitespace-nowrap overflow-hidden text-ellipsis'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, omnis
							possimus officia fuga enim ullam
						</p>
						<pre className='font-medium'> &middot; 1h</pre>
					</div>
				</div>
			</div>
		</div>
	)
}

export default User
