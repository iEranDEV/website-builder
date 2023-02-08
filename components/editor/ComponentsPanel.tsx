import { StructureContext } from "@/context/StructureContext";
import { useContext, useState } from "react";
import { BiLeftArrow, BiRightArrow, BiText } from "react-icons/bi";
import { FiLink, FiSquare } from "react-icons/fi";
import ComponentsItem from "./ComponentsItem";
import StructureTreeElement from "./StructureTreeElement";

function ComponentsPanel() {
    const [show, setShow] = useState(false);

    const structureContext = useContext(StructureContext);
    const structure = structureContext.structure;

    const items = [
        <ComponentsItem key={'container'} text="Container">
            <FiSquare className="h-6 w-6"></FiSquare>
        </ComponentsItem>,
        <ComponentsItem key={'text'} text="Text">
            <BiText className="h-6 w-6"></BiText>
        </ComponentsItem>,
        /*
        <ComponentsItem key={'image'} text="Image">
            <FiImage className="h-6 w-6"></FiImage>
        </ComponentsItem>,
        */
        <ComponentsItem key={'link'} text="Link">
            <FiLink className="h-6 w-6"></FiLink>
        </ComponentsItem>
    ]

    return (
        <div className={`${!show ? 'w-0 z-50' : 'w-96 max-w-[15rem] z-20'} transition-all duration-300 relative h-full bg-white border-r border-neutral-400 flex flex-col gap-2 divide-y divide-neutral-400`}>
            
            {/* Toggler */}
            <div onClick={() => setShow(!show)} className="absolute cursor-pointer h-7 w-7 bg-white text-neutral-700 flex justify-center items-center border border-neutral-400 bottom-4 -right-3">
                {show ? 
                    <BiLeftArrow className="h-4 w-4"></BiLeftArrow>
                :
                    <BiRightArrow className="h-4 w-4"></BiRightArrow>
                }
            </div>

            {show && <>
                <div className="w-full h-1/2 overflow-y-auto flex flex-col gap-2">
                    <p className="p-2 mono text-sm font-bold text-neutral-400">Drag and drop items to add them to your page</p>
                    {items}
                </div>
                <div className="w-full h-1/2 overflow-y-auto flex flex-col p-2">
                    {structure.filter((item) => item.type === 'SECTION').map((item) => {
                        return (
                            <StructureTreeElement key={item.id} elementID={item.id}></StructureTreeElement>
                        )
                    })}
                </div>
            </>}
        </div>
    )
}

export default ComponentsPanel;