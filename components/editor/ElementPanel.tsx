import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useState } from "react";
import { AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { RiEmotionSadLine } from 'react-icons/ri'
import { TbAxisX, TbAxisY} from 'react-icons/tb'

function ElementPanel({clickedElement} : {clickedElement: string | null}) {
    const [element, setElement] = useState<EditorElement | null>(null);
    const [attributes, setAttributes] = useState<ElementAttributes | null>(null);

    const structure = useContext(StructureContext);

    useEffect(() => {
        const val = structure.structure.find((item) => item.id === clickedElement);
        if(val) {
            setElement(val);
            setAttributes(val.attributes);
        }
    }, [structure.structure.find((item) => item.id === clickedElement)]);

    const handleUpdate = (val: ElementAttributes) => {
        setAttributes(val);
        if(element) {
            const newElement = structuredClone(element);
            newElement.attributes = val;
            setElement(newElement);
            structure.updateElement(newElement);
        }
    }

    return (
        <div className={`w-60 p-2 min-w-[15rem] max-w-[15rem] h-full bg-stone-200 border-l border-stone-400 overflow-x-auto flex flex-col gap-2`}>
            {element && attributes ?
                <div className="w-full h-full overflow-y-auto flex flex-col gap-8 divide-y divide-stone-300 text-stone-700">

                    {/* Dimensions */}
                    {element.type !== 'SECTION' &&
                        <div className="flex flex-col gap-2">
                            <p className="mono font-bold text-stone-400">Dimensions</p>
                            <div className="grid grid-cols-2 gap-2">
                                {/* X axis */}
                                <div className="w-full flex gap-2 items-center">
                                    <TbAxisX className="h-5 w-5"></TbAxisX>
                                    <input value={Number.parseInt(attributes.left?.substring(0, attributes.left.length - 2) as string)} 
                                        onChange={(e) => handleUpdate({...attributes, left: e.target.value + 'px'})} 
                                        type="number" className="w-16 element-input"/>
                                </div>

                                {/* Y axis */}
                                <div className="w-full flex gap-2 items-center">
                                    <TbAxisY className="h-5 w-5"></TbAxisY>
                                    <input value={Number.parseInt(attributes.top?.substring(0, attributes.top.length - 2) as string)} 
                                    onChange={(e) => handleUpdate({...attributes, top: e.target.value + 'px'})} 
                                    type="number" className="w-16 element-input"/>
                                </div>
                            </div>

                            {/* Width */}
                            <div className="flex items-center gap-2 w-full">
                                <AiOutlineColumnWidth className="h-6 w-6"></AiOutlineColumnWidth>
                                <input type="text" value={attributes.width}
                                onChange={(e) => handleUpdate({...attributes, width: e.target.value})}
                                className="w-28 element-input"/>
                            </div>

                            {/* Height */}
                            <div className="flex items-center gap-2 w-full">
                                <AiOutlineColumnHeight className="h-6 w-6"></AiOutlineColumnHeight>
                                <input type="text" value={attributes.height}
                                onChange={(e) => handleUpdate({...attributes, height: e.target.value})}
                                className="w-28 element-input"/>
                            </div>
                        </div>
                    }
                    <p>testada</p>

                </div>
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