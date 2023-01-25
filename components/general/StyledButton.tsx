import { AiOutlineArrowRight } from 'react-icons/ai'

type StyledButtonProps = {
    text: string,
    onClick?: Function,
}

function StyledButton({ text } : StyledButtonProps) {

    return (
        <button type="submit" className="w-full relative flex justify-between items-center px-4 py-2 hover:pr-2 transition-all group text-stone-700">
            <p className='z-10 underline mono'>{text}</p>
            <AiOutlineArrowRight className='z-10 h-5 w-5'></AiOutlineArrowRight>
            <div className='rounded-full transition-all bg-emerald-300 absolute h-full w-10 aspect-square z-0 top-0 left-0 group-hover:w-full group-hover:aspect-auto'></div>
        </button>
    )
}

export default StyledButton;