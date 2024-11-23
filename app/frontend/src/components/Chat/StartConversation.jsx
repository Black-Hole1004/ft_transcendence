const StartConversation = () => {
	return (
		<div className='flex-1 flex flex-col justify-center items-center text-primary p-5 gap-2 text-center'>
			<img className='w-[50%] select-none' src="/assets/images/NoMessages.svg" alt="" />
			<h2 className='font-heavy nickname'>No conversations yet!</h2>
			<p className=' font-regular bio'>You can begin by typing a name in the search bar and selecting the user to initiate a chat.</p>
		</div>
	)
}

export default StartConversation