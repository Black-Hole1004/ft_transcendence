import React from 'react';

const DeleteConfirmationModal = ({ dialogRef, closeDialog, onDelete }) => {
	return (
		<dialog
		ref={dialogRef}
		className="dialog-shape bg-transparent backdrop:bg-[rgba(0,0,0,.6)] backdrop:backdrop-blur-md text-primary"
		onClick={(e) => {
			const dialogDimensions = e.currentTarget.getBoundingClientRect();
			if (
			e.clientX < dialogDimensions.left ||
			e.clientX > dialogDimensions.right ||
			e.clientY < dialogDimensions.top ||
			e.clientY > dialogDimensions.bottom
			) {
			closeDialog();
			}
		}}
		>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-1'>
					<h1 className='dialog-title font-heavy text-red-600'>Delete Account</h1>
					<p className='font-regular paragraph'>
						Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
					</p>
				</div>
				<div className="flex justify-end gap-4">
					<button
						onClick={closeDialog}
						className="rounded border-border font-regular buttons-text remove-button border
						bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]"
					>
						Cancel
					</button>
					<button
						onClick={() => {
						onDelete();
						closeDialog();
						}}
						className="rounded border-red-600 font-regular buttons-text remove-button border
						transition duration-300 select-none bg-red-600 bg-opacity-10 hover:bg-red-600 active:bg-red-700"
					>
						Delete Account
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default DeleteConfirmationModal;