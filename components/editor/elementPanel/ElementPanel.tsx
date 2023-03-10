import { StructureContext } from "@/context/StructureContext";
import { useContext, useEffect, useRef, useState } from "react";
import { BiColorFill, BiLeftArrow, BiRename, BiRightArrow } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { RiEmotionSadLine } from 'react-icons/ri'
import DimensionsSettings from "./DimensionsSettings";
import ImageSettings from "./ImageSettings";
import LinkSettings from "./LinkSettings";
import SpacingSettings from "./SpacingSettings";
import TextSettings from "./TextSettings";

const typeAccess = {
    dimension: ['CONTAINER', 'LINK', 'TEXT'],
    text: ['TEXT', 'LINK'],
    backgroundColor: ['CONTAINER', 'SECTION'],
    link: ['LINK'],
    spacing: ['SECTION', 'CONTAINER'],
    image: ['IMAGE']
}

function ElementPanel() {
    const [show, setShow] = useState(true);
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

    const updateField = (field: any, val: any) => {
        if(!element) return;

        const newElement = structuredClone(element) as any;
        newElement[field] = val;
        structureContext.updateElement(newElement as EditorElement)
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
        <div className={`${!show ? 'w-0' : 'w-96 max-w-[16rem]'} h-[calc(100vh-37px)] transition-all duration-300 relative bg-white border-l border-neutral-400`}>
            
            {/* Toggler */}
            <div onClick={() => setShow(!show)} className={`z-20 absolute cursor-pointer h-7 w-7 bg-white text-neutral-700 flex justify-center items-center border border-neutral-400 bottom-4 ${show ? '-left-3' : '-left-12'}`}>
                {show ? 
                    <BiRightArrow className="h-4 w-4"></BiRightArrow>
                :
                    <BiLeftArrow className="h-4 w-4"></BiLeftArrow>
                }
            </div>

            {show && <>
                {(element && attributes) ?
                    <div className="relative z-[60] p-2 pb-12 h-full overflow-y-auto w-full flex flex-col gap-4 divide-neutral-300 text-neutral-600">

                        {/* Element name */}
                        <div className="flex flex-col gap-2">
                            <p className="mono font-bold text-neutral-400">Element data</p>

                            <div className="flex items-center gap-2 w-full">
                                <BiRename className="h-6 w-6"></BiRename>
                                <input type="text" value={element.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    className="w-full element-input"
                                />
                            </div>

                            {element.type !== 'SECTION' && <div className="w-full flex gap-2 items-center justify-between text-neutral-700">
                                <p>Moveable</p>
                                <input type="checkbox" checked={attributes.position === 'absolute'} onChange={(e) => e.target.checked ? handleUpdate({...attributes, position: "absolute"}) : handleUpdate({...attributes, position: "static"})} />
                            </div>}
                        </div>

                        {/* Dimensions */}
                        <DimensionsSettings element={element} attributes={attributes} handleUpdate={handleUpdate}></DimensionsSettings>

                        {/* Link */}
                        {typeAccess.link.includes(element.type) && 
                            <LinkSettings element={element} attributes={attributes} handleUpdate={handleUpdate} updateField={updateField}></LinkSettings>
                        }

                        {/* Image */}
                        {typeAccess.image.includes(element.type) &&
                            <ImageSettings element={element} updateField={updateField}></ImageSettings>
                        }

                        {/* Spacing */}
                        {typeAccess.spacing.includes(element.type) && 
                            <SpacingSettings element={element} attributes={attributes} handleUpdate={handleUpdate} updateField={updateField}></SpacingSettings>
                        }

                        {/* Text */}
                        {typeAccess.text.includes(element.type) && 
                            <TextSettings element={element} attributes={attributes} handleUpdate={handleUpdate} updateField={updateField}></TextSettings>
                        }

                        {typeAccess.backgroundColor.includes(element.type) && <div className="flex w-full flex-col gap-2">
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
                                    className="w-[10.5rem] element-input"
                                />
                            </div>
                        </div>}

                        {/* Delete element */}
                        <div className="w-full justiy-center py-2">
                            <button onClick={handleDelete} className="mono text-red-400 font-semibold w-full px-2 py-1 rounded-xl flex justify-center items-center gap-2 border-2 border-red-400 hover:bg-red-400 hover:text-neutral-100">
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
            </>}
        </div>
    )
}

export default ElementPanel;