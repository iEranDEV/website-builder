import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useRef, useState } from "react";
import { BiColorFill, BiRename } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { RiEmotionSadLine } from 'react-icons/ri'
import DimensionsSettings from "./DimensionsSettings";
import TextSettings from "./TextSettings";

function ElementPanel() {
    const [element, setElement] = useState<EditorElement | null>(null);
    const [attributes, setAttributes] = useState<ElementAttributes | null>(null);

    const structureContext = useContext(StructureContext);
    const structure = structureContext.structure;

    // Refs
    const backgroundColorRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const val = structure.find((item) => item.id === structureContext.clickedElement);
        if(val) {
            setElement(val);
            setAttributes(val.attributes);
        }
    }, [structure.find((item) => item.id === structureContext.clickedElement)]);

    const handleUpdate = (val: ElementAttributes) => {
        setAttributes(val);
        if(element) {
            const newElement = structuredClone(element);
            newElement.attributes = val;
            setElement(newElement);
            structureContext.updateElement(newElement);
        }
    }

    const updateName = (val: string) => {
        if(element) {
            const newElement = structuredClone(element);
            newElement.name = val;
            structureContext.updateElement(newElement);
        }
    }

    const updateContent = (val: string) => {
        if(element) {
            const newElement = structuredClone(element);
            newElement.content = val;
            structureContext.updateElement(newElement);
        }
    }

    const handleDelete = () => {
        if(element) {
            structureContext.deleteElement(element);
            structureContext.setClickedElement('');
            setElement(null);
            setAttributes(null);
        }
    }

    return (
        <div className={`w-64 min-w-[16rem] max-w-[16rem] p-2 h-full bg-neutral-100 border-l border-neutral-400 overflow-x-auto flex flex-col gap-2`}>
            {element && attributes ?
                <div className="w-full h-full overflow-y-auto flex flex-col gap-4 divide-neutral-300 text-neutral-600">

                    {/* Element name */}
                    <div className="flex flex-col gap-2">
                        <p className="mono font-bold text-neutral-400">Name</p>

                        <div className="flex items-center gap-2 w-full">
                            <BiRename className="h-6 w-6"></BiRename>
                            <input type="text" value={element.name}
                                onChange={(e) => updateName(e.target.value)}
                                className="w-full element-input"
                            />
                        </div>
                    </div>

                    {/* Dimensions */}
                    {element.type !== 'SECTION' &&
                        <DimensionsSettings attributes={attributes} handleUpdate={handleUpdate}></DimensionsSettings>
                    }

                    {/* Text */}
                    {element.type === 'TEXT' && 
                        <TextSettings element={element} attributes={attributes} handleUpdate={handleUpdate} updateContent={updateContent}></TextSettings>
                    }

                    {element.type !== 'TEXT' && <div className="flex w-full flex-col gap-2">
                        <p className="mono font-bold text-neutral-400">Background</p>

                        {/* Background color */}
                        <div className="flex items-center gap-2">
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
                    </div>}

                    {/* Delete element */}
                    <div className="w-full justiy-center py-2">
                        <button onClick={handleDelete} className="mono text-red-400 font-semibold w-full p-2 rounded-xl flex justify-center items-center gap-2 border-2 border-red-400 hover:bg-red-400 hover:text-neutral-100">
                            <FiTrash className="h-5 w-5"></FiTrash>
                            <p>Delete element</p>
                        </button>
                    </div>

                </div>
            :
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-neutral-400">
                    <RiEmotionSadLine className="h-7 w-7"></RiEmotionSadLine>
                    <p>Select element to edit</p>
                </div>
            }
        </div>
    )
}

export default ElementPanel;