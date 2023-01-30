import { BiText } from "react-icons/bi";
import { FiImage, FiSquare } from "react-icons/fi";
import ComponentsItem from "./ComponentsItem";

function ComponentsPanel() {

    const items = [
        <ComponentsItem key={'container'} text="Container">
            <FiSquare className="h-6 w-6"></FiSquare>
        </ComponentsItem>,
        <ComponentsItem key={'text'} text="Text">
            <BiText className="h-6 w-6"></BiText>
        </ComponentsItem>,
        <ComponentsItem key={'image'} text="Image">
            <FiImage className="h-6 w-6"></FiImage>
        </ComponentsItem>
    ]

    return (
        <div className="w-60 min-w-[15rem] max-w-[15rem] h-full bg-stone-200 border-r border-stone-400 overflow-x-auto flex flex-col gap-2">
            <p className="p-2 mono text-sm font-bold text-stone-400">Drag and drop items to add them to your page</p>
            {items}
        </div>
    )
}

export default ComponentsPanel;