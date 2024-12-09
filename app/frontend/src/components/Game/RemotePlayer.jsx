import React, { useMemo, useCallback } from 'react'

const RemotePlayer = (props) => {
	// Create getImageUrl as a memoized function
	const getImageUrl = useCallback((path, type = 'profile') => {
		if (!path) {
			return '/assets/images/default-avatar.png'
		}

		if (path.startsWith('http')) {
			return path
		}

		return `${import.meta.env.VITE_BASE_URL}${path}`
	}, [])

	// Memoize the image URLs
	const profileImageUrl = useMemo(
		() => getImageUrl(props.playerImage),
		[props.playerImage, getImageUrl]
	)

	const badgeImageUrl = useMemo(
		() => getImageUrl(props.badgeImage, 'badge'),
		[props.badgeImage, getImageUrl]
	)

	// Memoize the trimmed name
	const displayName = useMemo(() => {
		if (props.PlayerName.length > 11) {
			return props.PlayerName.slice(0, 11) + '...'
		}
		return props.PlayerName
	}, [props.PlayerName])

	return (
		<div
			className={`flex flex-col items-center ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'}`}
		>
			<img
				src={profileImageUrl}
				className='rounded-full border-2 border-primary user-photo'
				alt='user photo'
				onError={(e) => {
					e.target.src = '/assets/images/default-avatar.png'
				}}
			/>
			<p className='players-usernames truncate'>{displayName}</p>
			<img
				src={badgeImageUrl}
				className='achievements-icons hover:scale-[1.2] transition duration-500'
				alt='badge'
				onError={(e) => {
					e.target.style.display = 'none'
				}}
			/>
			<p className='text-level badge-name'>{props.BadgeName}</p>
		</div>
	)
}

export default React.memo(RemotePlayer)
