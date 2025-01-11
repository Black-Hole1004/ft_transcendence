import './ConfirmationModal.css'

const ConfirmationModal = ({ dialogRef, closeDialog, setTwoFactorAuthEnabled, send2faAxiosRequest}) => {
	const handleDisable = () => {
		setTwoFactorAuthEnabled(false)
		send2faAxiosRequest(false)
		closeDialog()
	}

	return (
		<dialog
			id={'dialog'}
			ref={dialogRef}
			className={`dialog-shape max-w-full text-primary
			bg-transparent backdrop:bg-[rgba(0,0,0,.6)] backdrop:backdrop-blur-md`}
		>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-1'>
					<h1 className='dialog-title font-heavy text-light'>Disable Two-Factor Authentication</h1>
					<p className='font-regular paragraph'>
						Are you sure you want to disable Two-Factor Authentication?
					</p>
				</div>
				<button
					onClick={handleDisable}
					className='border border-border select-none py-2 px-8 my-6 self-end paragraph font-medium outline-none rounded
					buttons-text remove-button bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]'
				>
					Disable
				</button>
			</div>
		</dialog>
	)
}

export default ConfirmationModal
