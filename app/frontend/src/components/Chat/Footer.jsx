import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect, useState, useRef } from 'react'

const Footer = ({ sendChatMessage, currentMessage, handleKeyPress, conversationKey }) => {
	const [width, setWidth] = useState(0)
	const [showEmoji, setShowEmoji] = useState(false)
	const emojiPickerRef = useRef(null)
	const emojiButtonRef = useRef(null)

	window.addEventListener('resize', () => {
		setWidth(window.innerWidth)
	})

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (
				showEmoji &&
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(e.target) &&
				!emojiButtonRef.current.contains(e.target)
			)
				setShowEmoji(false)
		}

		document.addEventListener('click', handleOutsideClick)

		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [showEmoji])

	const addEmoji = (e) => {
		const emojiParts = e.unified.split('-')

		const arr = []
		emojiParts.forEach((element) => {
			arr.push('0x' + element)
		})
		let emoji = String.fromCodePoint(...arr)
		currentMessage.current.value += emoji
	}

	useEffect(() => {
		currentMessage.current.focus()
	}, [conversationKey])

	const toggleEmojiPicker = () => {
		setShowEmoji(!showEmoji)
	}

	return (
		<>
			<div className='footer flex justify-center items-center w-full h-[10%] py-2'>
				<div
					className='flex justify-between w-[90%] max-lp:gap-1 chat-input-container 
			border border-border border-chat rounded-[50px]'
				>
					<button>
						<img
							src='/assets/images/icons/paperclip.svg'
							className='select-none'
							alt='paperclip-icon'
						/>
					</button>
					<input
						type='text'
						maxLength={1000}
						name='chat-input'
						autoComplete='off'
						ref={currentMessage}
						onKeyDown={handleKeyPress}
						placeholder='Type your message here...'
						className='myDiv w-[85%] chat-input bg-transparent placeholder:text-light outline-none text-[15px]'
					/>
					<button ref={emojiButtonRef} className='relative'>
						<img
							src='/assets/images/icons/emoji.svg'
							onClick={toggleEmojiPicker}
							className='select-none hover:brightness-125 hover:scale-110 duration-200 '
							alt='emojies-icon'
						/>
						{showEmoji && (
							<div ref={emojiPickerRef} className='absolute bottom-full right-0'>
								<Picker
									style={{
										backgroundColor: '#fff',
									}}
									data={data}
									theme={'dark'}
									icons={'outline'}
									onEmojiSelect={addEmoji}
									previewPosition={'none'}
									skinTonePosition={'search'}
									perLine={`${width > 420 ? 9 : width > 380 ? 8 : 6}`}
								/>
							</div>
						)}
					</button>
					<button type='submit' onClick={sendChatMessage}>
						<img
							src='/assets/images/icons/send-icon.svg'
							className='select-none hover:brightness-125 hover:scale-110 hover:rotate-45 duration-200 '
							alt='send-icon'
						/>
					</button>
				</div>
			</div>
		</>
	)
}

export default Footer
