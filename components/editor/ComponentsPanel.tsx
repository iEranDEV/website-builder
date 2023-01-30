import { BiText } from "react-icons/bi";
import { FiImage, FiSquare } from "react-icons/fi";
import ComponentsItem from "./ComponentsItem";

function ComponentsPanel() {

    const items = [
        <ComponentsItem text="Container">
            <FiSquare className="h-6 w-6"></FiSquare>
        </ComponentsItem>,
        <ComponentsItem text="Text">
            <BiText className="h-6 w-6"></BiText>
        </ComponentsItem>,
        <ComponentsItem text="Image">
            <FiImage className="h-6 w-6"></FiImage>
        </ComponentsItem>
    ]

    return (
        <div className="w-96 h-full bg-stone-200 border-r border-stone-400 overflow-x-auto flex flex-col gap-2">
            <p className="p-2 mono text-sm font-bold text-stone-400">Drag and drop items to add them to your page</p>
            {items}
        </div>
    )
}

export default ComponentsPanel;