import { StructureContext } from "@/context/StructureContext";
import { useContext } from "react";
import { BiText } from "react-icons/bi";
import { FiImage, FiSquare } from "react-icons/fi";
import ComponentsItem from "./ComponentsItem";
import StructureTreeElement from "./StructureTreeElement";

function ComponentsPanel() {

    const structureContext = useContext(StructureContext);
    const structure = structureContext.structure;

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
        <div className="w-60 min-w-[15rem] max-w-[15rem] h-full bg-stone-200 border-r border-stone-400 overflow-x-auto flex flex-col gap-2 divide-y divide-stone-400">
            <div className="w-full h-1/2 flex flex-col gap-2">
                <p className="p-2 mono text-sm font-bold text-stone-400">Drag and drop items to add them to your page</p>
                {items}
            </div>
            <div className="w-full h-1/2 flex flex-col p-2">
                {structure.filter((item) => item.type === 'SECTION').map((item) => {
                    return (
                        <StructureTreeElement key={item.id} elementID={item.id}></StructureTreeElement>
                    )
                })}
            </div>
        </div>
    )
}

export default ComponentsPanel;