import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modalBackdrop} fixed inset-0 flex items-center justify-center z-50`}>
      <div className={`${styles.modalContent} bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-auto`}>
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;