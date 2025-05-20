import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg';
};

const Modal = ({ children, title, isOpen, onClose, size = 'md' }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Handle size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
  }[size];

  // Close modal when Escape key is pressed
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  // Click outside to close
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      // Focus on close button when modal opens (for accessibility)
      initialFocusRef.current?.focus();
      
      // Prevent body scrolling when modal is open
      document.body.classList.add('overflow-hidden');
    } else {
      dialogRef.current?.close();
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      // Cleanup on unmount
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`w-full ${sizeClasses} max-w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      m-0 p-0 rounded-lg shadow-xl bg-white 
      backdrop:bg-black/50 backdrop-blur-sm 
      transition-all duration-1000 ease-in-out`}
           
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <button
            ref={initialFocusRef}
            onClick={onClose}
            className="p-1 rounded-full text-gray-500  hover:bg-gray-100 focus:outline-none cursor-pointer "
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;