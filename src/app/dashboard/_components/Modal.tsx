import { ReactNode } from "react";
import {motion} from 'framer-motion'

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isModalOpen: boolean;
}

const Modal = ({ children, onClose , isModalOpen}: ModalProps) => {
  const handleBackdropClick = (e:any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={handleBackdropClick}>
      <motion.div className="bg-white p-5 w-[30%]  rounded-lg shadow-lg"
      initial={{scale:0,opacity:0}}
      animate={{scale:1,opacity:1}}
      exit={{scale:0,opacity:0}}
      transition={{duration:0.2,ease:"easeInOut"}}
      >
      <div className="flex justify-between items-center relative">
      <div className="mr-7">
      <h2 className="text-xl font-black">Start Your Mock Interview</h2>
      <p className="text-xs font-semibold text-gray-400">Create Your Custom AI Mock Interview</p>
      </div>
        <button
          className="text-3xl absolute -top-3 right-0 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
