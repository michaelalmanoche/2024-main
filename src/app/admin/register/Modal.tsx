import React, { ReactNode } from 'react';
import styles from './Modal.module.css'; // Assuming you have a CSS module for styling

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
       
        {children}
      </div>
    </div>
  );
};

export default Modal;
