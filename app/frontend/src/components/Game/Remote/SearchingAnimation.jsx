import './Remote.css'

const SearchingAnimation = () => {
	return (
		<div
			className='animation-container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
			flex text-primary font-dreamscape text-[150px] searching-animation select-none overflow-hidden'
		>
			<marquee className='char marquee-lg' direction='down' scrollamount='19'>
				<div>S</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='10'>
				<div>E</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='12'>
				<div>A</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='15'>
				<div>R</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='14'>
				<div>C</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='18'>
				<div>H</div>
			</marquee>
			<marquee className='char marquee-sm' direction='down' scrollamount='11'>
				<div>I</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='17'>
				<div>N</div>
			</marquee>
			<marquee className='char marquee-lg' direction='down' scrollamount='16'>
				<div>G</div>
			</marquee>
			<marquee className='char marquee-sm' direction='down' scrollamount='13'>
				<div>.</div>
			</marquee>
			<marquee className='char marquee-sm' direction='down' scrollamount='19'>
				<div>.</div>
			</marquee>
			<marquee className='char marquee-sm' direction='down' scrollamount='9'>
				<div>.</div>
			</marquee>
		</div>
	)
}

export default SearchingAnimation
