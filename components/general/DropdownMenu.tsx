import { useState } from "react";
import { IoMdArrowDropdown } from 'react-icons/io';

type DropdownMenuProps = {
    options: Array<{value: string, text: string}>,
    onChange: Function
}

function DropdownMenu({ options, onChange }: DropdownMenuProps) {
    const [selected, setSelected] = useState(options[0]);
    const [open, setOpen] = useState(false);

    const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, val: {value: string, text: string}) => {
        e.stopPropagation()
        setOpen(false);
        if(val.value !== selected.value) {
            setSelected(val);
            onChange(val.value);
        }
    } 

    return (
        <div className="w-full relative">
            <button type="button" onClick={() => setOpen(!open)} className="bg-neutral-200 border border-neutral-300 rounded-xl w-full flex items-center justify-between px-2 py-1">
                <p>{selected.text}</p>
                <IoMdArrowDropdown className="h-4 w-4"></IoMdArrowDropdown>
            </button>

            {/* Menu */}
            {open && <div className="w-full mt-1 rounded-xl flex border border-neutral-400 flex-col z-30 bg-neutral-300 absolute top-full left-0 overflow-hidden text-neutral-800">
                {options.map((item) => {
                    return (
                        <div onClick={(e) => handleSelect(e, item)} className="w-full px-2 py-1 hover:bg-neutral-500/20" key={item.value}>{item.text}</div>
                    )
                })}
            </div>}
        </div>
    )
}

export default DropdownMenu;