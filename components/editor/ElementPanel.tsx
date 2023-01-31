import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { BiColorFill } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { RiEmotionSadLine } from 'react-icons/ri'
import { TbAxisX, TbAxisY} from 'react-icons/tb'

function ElementPanel({clickedElement, setClickedElement} : {clickedElement: string | null, setClickedElement: Function}) {
    const [element, setElement] = useState<EditorElement | null>(null);
    const [attributes, setAttributes] = useState<ElementAttributes | null>(null);

    const structure = useContext(StructureContext);

    // Refs
    const backgroundColorRef = useRef<HTMLInputElement>(null);

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

    const handleDelete = () => {
        if(element) {
            structure.deleteElement(element);
            setClickedElement(null);
            setElement(null);
            setAttributes(null);
        }
    }

    return (
        <div className={`w-96 p-2 h-full bg-stone-200 border-l border-stone-400 overflow-x-auto flex flex-col gap-2`}>
            {element && attributes ?
                <div className="w-full h-full overflow-y-auto flex flex-col divide-stone-300 text-stone-600">

                    {/* Dimensions */}
                    {element.type !== 'SECTION' &&
                        <div className="flex flex-col gap-2">
                            <p className="mono font-bold text-stone-400">Dimensions</p>
                            <div className="flex w-full gap-2">
                                {/* X axis */}
                                <div className="w-1/2 flex gap-2 items-center">
                                    <TbAxisX className="h-5 w-5"></TbAxisX>
                                    <input value={Number.parseInt(attributes.left?.substring(0, attributes.left.length - 2) as string)} 
                                        onChange={(e) => handleUpdate({...attributes, left: e.target.value + 'px'})} 
                                        type="number" className="w-full element-input"
                                    />
                                </div>

                                {/* Y axis */}
                                <div className="w-1/2 flex gap-2 items-center">
                                    <TbAxisY className="h-5 w-5"></TbAxisY>
                                    <input value={Number.parseInt(attributes.top?.substring(0, attributes.top.length - 2) as string)} 
                                        onChange={(e) => handleUpdate({...attributes, top: e.target.value + 'px'})} 
                                        type="number" className="w-full element-input"
                                    />
                                </div>
                            </div>

                            {/* Width */}
                            <div className="flex items-center gap-2 w-full">
                                <AiOutlineColumnWidth className="h-6 w-6"></AiOutlineColumnWidth>
                                <input type="text" value={attributes.width}
                                    onChange={(e) => handleUpdate({...attributes, width: e.target.value})}
                                    className="w-48 element-input"
                                />
                            </div>

                            {/* Height */}
                            <div className="flex items-center gap-2 w-full">
                                <AiOutlineColumnHeight className="h-6 w-6"></AiOutlineColumnHeight>
                                <input type="text" value={attributes.height}
                                    onChange={(e) => handleUpdate({...attributes, height: e.target.value})}
                                    className="w-48 element-input"
                                />
                            </div>
                            <hr className="my-4" />
                        </div>
                    }

                    <div className="flex flex-col gap-2">
                        <p className="mono font-bold text-stone-400">Background</p>

                        {/* Background color */}
                        <div className="flex items-center gap-2 w-full">
                            <BiColorFill className="h-6 w-6"></BiColorFill>
                            <input ref={backgroundColorRef} value={attributes.backgroundColor}
                                onChange={(e) => handleUpdate({...attributes, backgroundColor: e.target.value})}
                                type="color" className="w-0 h-0 invisible" 
                            />
                            <div onClick={() => backgroundColorRef.current?.click()} className="w-6 h-6 rounded-lg border aspect-square cursor-pointer" style={{backgroundColor: attributes.backgroundColor}}></div>
                            <input type="text" value={attributes.backgroundColor}
                                onChange={(e) => handleUpdate({...attributes, backgroundColor: e.target.value})}
                                className="w-full element-input"
                            />
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Delete element */}
                    <div className="w-full justiy-center py-2">
                        <button onClick={handleDelete} className="mono text-red-400 font-semibold w-full p-2 rounded-xl flex justify-center items-center gap-2 border-2 border-red-400 hover:bg-red-400 hover:text-stone-100">
                            <FiTrash className="h-5 w-5"></FiTrash>
                            <p>Delete element</p>
                        </button>
                    </div>

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