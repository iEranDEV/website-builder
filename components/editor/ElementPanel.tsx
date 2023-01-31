import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useState } from "react";
import { RiEmotionSadLine } from 'react-icons/ri'

function ElementPanel({clickedElement} : {clickedElement: string | null}) {
    const [element, setElement] = useState<EditorElement | null>(null);

    const structure = useContext(StructureContext);

    useEffect(() => {
        const val = structure.structure.find((item) => item.id === clickedElement);
        if(val) setElement(val);
    }, [structure.structure.find((item) => item.id === clickedElement)]);

    const handleTest = () => {
        console.log('clicked');
        if(element) {
            const newElement = structuredClone(element);
            newElement.attributes.backgroundColor = "#00FF00";
            console.log(newElement);
            setElement(newElement);
            structure.updateElement(newElement);
        }
    }

    return (
        <div className={`w-60 p-2 min-w-[15rem] max-w-[15rem] h-full bg-stone-200 border-l border-stone-400 overflow-x-auto flex flex-col gap-2`}>
            {element ?
                <div onClick={handleTest}>{JSON.stringify(element)}</div>
            :
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-stone-400">
                    <RiEmotionSadLine className="h-7 w-7"></RiEmotionSadLine>
                    <p>Select element to edit</p>
                </div>
            }
        </div>
    )
}

export default ElementPanel;