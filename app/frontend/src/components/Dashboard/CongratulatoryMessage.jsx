
function CongratulatoryMessage(props) {
	return (
		<div className='max-lg:absolute top-0 left-1 max-lg:pb-[60px]'>
			<h1 className='message-title font-heavy leading-[3]'>
				{props.title}
			</h1>
			{/* <p className='message-body font-medium'>
				{props.description}.
			</p> */}
			<p className='message-body font-medium'>
				{props.body}
			</p>
		</div>
	)
}
export default CongratulatoryMessage
