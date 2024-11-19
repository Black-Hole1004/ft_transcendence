import './ConfirmationModal.css'

const ConfirmationModal = ({ dialogRef, closeDialog, setTwoFactorAuthEnabled }) => {
	const handleDisable = () => {
		setTwoFactorAuthEnabled(false)
		closeDialog()
	}

	return (
		<dialog
			id={'dialog'}
			ref={dialogRef}
			className={`dialog-shape max-w-full text-primary pr-4
			ml:border-1.5 border rounded-xl bg-transparent backdrop:bg-backdrop-40 backdrop:backdrop-blur-md`}
		>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-1'>
					<h1 className='dialog-title font-heavy'>Disable Two-Factor Authentication</h1>
					<p className='font-regular paragraph'>
						Are you sure you want to disable Two-Factor Authentication?
					</p>
				</div>
				<button
					onClick={handleDisable}
					className='border border-border transition duration-300 select-none py-2 px-4 my-4 self-end
			rounded-lg text-primary font-medium hover:bg-primary hover:text-secondary'
				>
					Disable
				</button>
			</div>
		</dialog>
	)
}

export default ConfirmationModal
