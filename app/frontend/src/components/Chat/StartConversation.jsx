const StartConversation = () => {
	return (
		<div
			className="flex-1 w-full flex flex-col justify-center items-center text-primary
			p-5 gap-2 text-center bg-[rgba(27,22,17,0.5)]"
		>
			<img
				className="w-[40%] select-none"
				src="/assets/images/emptyStates/conversations.svg"
				alt=""
			/>
			<h2 className="font-heavy nickname">No conversations yet!</h2>
			<p className=" font-regular bio">
				You can begin by typing a name in the search bar and selecting
				the user to initiate a chat.
			</p>
		</div>
	);
};

export default StartConversation;
