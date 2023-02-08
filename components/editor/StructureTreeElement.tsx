import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { TbNewSection } from "react-icons/tb";
import { FiImage, FiLink, FiSquare } from "react-icons/fi";
import { BiText } from "react-icons/bi";

function StructureTreeElement({ elementID }: {elementID: string}) {
    const [element, setElement] = useState<EditorElement | null>(null);
    const [expanded, setExpanded] = useState(false);

    const structureContext = useContext(StructureContext);
    const structure = structureContext.structure;

    useEffect(() => {
        const val = structure.find((item) => item.id === elementID);
        if(val) setElement(val);
        else setElement(null);
    }, [structure.find((item) => item.id === elementID)]);

    const renderIcon = () => {
        switch(element?.type) {
            case 'SECTION':
                return <TbNewSection></TbNewSection>;
            case 'CONTAINER':
                return <FiSquare></FiSquare>;
            case 'TEXT':
                return <BiText></BiText>;
            case 'LINK':
                return <FiLink></FiLink>;
            case 'IMAGE':
                return <FiImage></FiImage>
        }
    }

    return (
        <>
            {element && <div className={`w-full`}>
                <div className={`w-full flex gap-1 hover:bg-neutral-300/50 text-neutral-700 items-center cursor-pointer ${structureContext.clickedElement === elementID && 'font-semibold'}`}>
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
                        {renderIcon()}
                        <span>{element?.name}</span>
                    </p>}
                </div>
                {expanded && <div className="pl-2">
                    {element?.children.map((item) => {
                        return (
                            <StructureTreeElement key={item} elementID={item}></StructureTreeElement>
                        )
                    })}
                </div>}
            </div>}
        </>
    )
}

export default StructureTreeElement;