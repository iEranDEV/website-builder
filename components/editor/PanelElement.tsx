import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

function PanelElement({ elementID }: {elementID: string}) {
    const [element, setElement] = useState<EditorElement | null>(null);
    const [expanded, setExpanded] = useState(false);

    const structureContext = useContext(StructureContext);
    const structure = structureContext.structure;

    const handleClick = () => {
        setExpanded(!expanded);
        structureContext.setClickedElement(elementID);
    }

    useEffect(() => {
        const val = structure.find((item) => item.id === elementID);
        if(val) setElement(val);
    }, [structure.find((item) => item.id === elementID)]);

    return (
        <div className={`w-full px-2`}>
            <div onClick={handleClick} className={`w-full flex gap-1 hover:bg-stone-300/50 items-center cursor-pointer ${structureContext.clickedElement === elementID && 'bg-stone-300'}`}>
                {element?.children && element.children.length > 0 ? <>
                    {expanded ? 
                        <MdExpandLess className="h-4 w-4"></MdExpandLess>
                    :
                        <MdExpandMore className="h-4 w-4"></MdExpandMore>
                    }
                </>
                :
                    <span className="h-4 w-4"></span>
                }
                {element && <p>{element?.name}</p>}
            </div>
            {expanded && <div className="pl-2">
                {element?.children.map((item) => {
                    return (
                        <PanelElement key={item} elementID={item}></PanelElement>
                    )
                })}
            </div>}
        </div>
    )
}

export default PanelElement;