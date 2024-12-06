import React, { useEffect, useRef, useState, useCallback } from 'react'
import _ from 'lodash'

const RemotePongTable = ({

}) => {

	const canvasRef = useRef(null)
	const [isPaused, setIsPaused] = useState(false)
	console.log('RemotePongTable ...')

	return (
		<div className='flex flex-col items-center gap-7'>
			<canvas
				ref={canvasRef}
				width={800}
				height={400}
				className={`game-table border border-primary rounded-2xl ${
					isPaused ? 'brightness-[20%]' : 'brightness-[1]'
				}`}
			/>

		</div>
	)
}

export default RemotePongTable
