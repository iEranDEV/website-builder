type ModalProps = {
    setMenu: Function,
    children: JSX.Element,
    objModal?: boolean
}

function Modal({ objModal, setMenu, children }: ModalProps) {

    return (
        <div onClick={() => objModal ? setMenu(null) : setMenu(false)} className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[1px] bg-neutral-400/50'>
            <div onClick={(e) => e.stopPropagation()} className='bg-neutral-100 rounded-xl relative shadow-xl flex flex-col p-4 justify-center items-center w-96'>
                {children}
            </div>
        </div>
    )
}

export default Modal;