import './MatchMaking.css'
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
		if (path.startsWith('/assets')) {
			return path;
		}

		const pathComplete = `${import.meta.env.VITE_BASE_URL}${path}`;
		return pathComplete;

	}, [])

	// Memoize the image URLs
	const profileImageUrl = useMemo(
		() => getImageUrl(props.playerImage, 'profile'),
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
			className={`${props.id === 1 ? 'mtb:left-0 left-3' : 'mtb:right-0 right-3'} max-lg:-bottom-10 max-lg:top-full
			absolute flex flex-col items-center ${props.isPaused ? 'brightness-[20%]' : 'brightness-[1]'}
			avatar aspect-square xl:gap-12 lg:gap-10 tb:gap-5 gap-3`}
		>
			<div className='relative rounded-full border border-primary'>
				<img
					src={profileImageUrl}
					alt='user photo'
					className='match-user-image aspect-square object-cover rounded-full'
					onError={(e) => {
						console.log('Profile image load error:', e);
						e.target.src = '/assets/images/default-avatar.png';
					}}
				/>
				<img
					src={badgeImageUrl}
					alt='badge'
					className={`absolute z-10 bottom-0 ${props.id === 1 ? '-left-5' : '-right-5'} w-[60%]`}
				/>
			</div>
			<div>
				<h2 className='font-dreamscape-sans text-primary leading-none'>
					{displayName}
				</h2>
				<h6 className='font-dreamscape-sans text-level'>{props.BadgeName}</h6>
			</div>
		</div>
		
	)
}

export default React.memo(RemotePlayer)