import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface ModalProps {
showModal:React.Dispatch<React.SetStateAction<boolean>>;
currentQuestion:string;
}

const Modal: React.FC<ModalProps> = ({ showModal ,currentQuestion }) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div onClick={()=>{showModal(false)}} className="absolute inset-0 bg-black opacity-50" ></div>
      <div className="rounded-lg shadow-lg z-10 w-1/3 h-2/5 bg-slate-700 opacity-80 relative">
        <div className="flex justify-center items-center h-full ">
        <button className='top-5 right-5 absolute red size-5 hover:scale-125 transition-transform' onClick={()=>{showModal(false)}}><FontAwesomeIcon icon={faXmark}/></button>
        <img src={currentQuestion[1]} alt="image" />
        </div>
      
      </div>
    </div>
  );
};

export default Modal;
