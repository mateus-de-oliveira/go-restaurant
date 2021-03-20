import {useState, useEffect, useRef} from 'react'
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean,
  setIsOpen: () => void,
  children: React.ReactNode
}

export function Modal({isOpen, setIsOpen, children}:ModalProps) {
  // constructor(props) {
  //   super(props);

  //   const { isOpen } = this.props;
  //   this.state = {
  //     modalStatus: isOpen
  //   }
  // }

  const [isModalStatus, setIsModalStatus] = useState(isOpen)


  useEffect(() =>{
      setIsModalStatus(isOpen)
  }, [isOpen])
    // const { children, setIsOpen } = this.props;

    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={isModalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
    );
  
};


