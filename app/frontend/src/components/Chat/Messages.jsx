import Message from './Message.jsx'

const Messages = ({ messages, selectedUserId, selectedUserImage }) => {

	return (
		<div className='flex-1 w-[98%] ml-2 mr-4 overflow-auto flex flex-col justify-end gap-1.5'>
			{messages.map((message) => (
				<Message
					key={message.id}
					message={message}
					selectedUserId={selectedUserId}
					selectedUserImage={selectedUserImage}
				/>
			))}
		</div>
	)
}

export default Messages

{/* <Message content={`You bet! I'm gonna win this time.`} id={1} />
<Message content={'Ready for another round?'} id={2} />
<Message content={`Haha, we'll see about that! I've been practicing.`} id={2} />
<Message content={`Oh, bringing out the big guns, huh? Let’s do this!`} id={1} />
<Message content={`Alright, let's start! First to 10 points?`} id={2} />
<Message content={`Deal. Good luck, but not too much luck 😜`} id={1} />
<Message content={'Haha, same to you! Here we go...'} id={2} />
<Message content={'Yes! 10-9! Victory is mine!'} id={1} />
<Message content={'Nooo! That was so close! Good game, though.'} id={2} />
<Message content={'GG! You had me sweating there for a bit. Rematch?'} id={1} />
<Message content={`Definitely. But this time, I'm taking the win!`} id={2} />
<Message content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, culpa? Eaque laudantium est sunt ad corporis, vel nihil beatae velit, praesentium aliquid fugiat amet tempore voluptatum repellendus exercitationem voluptas doloremque.`} id={1} />
<Message content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, culpa? Eaque laudantium est sunt ad corporis, vel nihil beatae velit, praesentium aliquid fugiat amet tempore voluptatum repellendus exercitationem voluptas doloremque.`} id={2} />
<Message content={`.`} id={2} /> */}