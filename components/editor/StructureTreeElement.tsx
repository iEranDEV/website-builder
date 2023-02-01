import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { BsCheck } from 'react-icons/bs'

function StructureTreeElement({ elementID }: {elementID: string}) {
    const [element, setElement] = useState<EditorElement | null>(null);
    const [expanded, setExpanded] = useState(false);

    const structureContext = useContext(StructureContext);
    const structure = structureContext.structure;

    useEffect(() => {
        const val = structure.find((item) => item.id === elementID);
        if(val) setElement(val);
    }, [structure.find((item) => item.id === elementID)]);

    return (
        <div className={`w-full`}>
            <div className={`w-full flex gap-1 hover:bg-stone-300/50 items-center cursor-pointer ${structureContext.clickedElement === elementID && 'font-semibold'}`}>
                {element?.children && element.children.length > 0 ? <>
                    {expanded ? 
                        <MdExpandLess onClick={() => setExpanded(false)} className="h-4 w-4"></MdExpandLess>
                    :
                        <MdExpandMore onClick={() => setExpanded(true)} className="h-4 w-4"></MdExpandMore>
                    }
                </>
                :
                    <span className="h-4 w-4"></span>
                }
                {element && <p className="flex gap-2 items-center" onClick={() => structureContext.setClickedElement(elementID)}>
                    <span>{element?.name}</span>
                    {structureContext.clickedElement === elementID && <BsCheck className="text-emerald-500 h-5 w-5"></BsCheck>}
                </p>}
            </div>
            {expanded && <div className="pl-2">
                {element?.children.map((item) => {
                    return (
                        <StructureTreeElement key={item} elementID={item}></StructureTreeElement>
                    )
                })}
            </div>}
        </div>
    )
}

export default StructureTreeElement;