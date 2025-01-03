import React from 'react';

const DeleteConfirmationModal = ({ dialogRef, closeDialog, onDelete }) => {
  return (
    <dialog
      ref={dialogRef}
      className="bg-transparent relative"
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
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
      
      {/* Modal Content - adjusted width */}
      <div className="relative w-[650px] bg-[#121212] bg-opacity-95 rounded-3xl p-8 border border-gray-600 shadow-xl">
        {/* Title */}
        <h2 className="text-red-500 text-3xl font-bold mb-6">Delete Account</h2>
        
        {/* Message */}
        <p className="text-[#E6DDC6] text-xl mb-12 leading-relaxed">
          Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
        </p>
        
        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={closeDialog}
            className="px-6 py-3 rounded-xl border border-gray-600 text-white hover:bg-gray-800 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete();
              closeDialog();
            }}
            className="px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteConfirmationModal;