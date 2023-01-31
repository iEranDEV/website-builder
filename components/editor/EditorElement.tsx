import { StructureContext } from "@/context/StructureContext"
import { useContext, useRef, useState } from "react"
import defaultComponents from '@/default_components.json'

type EditorElementProps = {
    elementID: string,
    clickedElement: string | null,
    setClickedElement: Function
}

function EditorElement({ elementID, clickedElement, setClickedElement }: EditorElementProps) {
    const [dragStatus, setDragStatus] = useState(false);

    const elementRef = useRef<HTMLDivElement>(null);

    const structure = useContext(StructureContext);
    const element = structure.structure.find((item) => item.id === elementID);

    const handleDragStatus = (status: boolean) => {
        if(element?.type !== 'ROOT_ELEMENT') {
            setDragStatus(status);
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if(element?.type !== 'ROOT_ELEMENT') {
            setClickedElement(element?.id);
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        if(element?.type !== 'ROOT_ELEMENT') {
            setDragStatus(false);
            const newElement = structuredClone((defaultComponents as any)[structure.dragElement.toLowerCase()]) as EditorElement;
            newElement.id = crypto.randomUUID();
            newElement.parent = element ? element.id : null;
            newElement.attributes.top = (e.clientY - rect.top) + 'px';
            newElement.attributes.left = (e.clientX - rect.left) + 'px';
            structure.addElement(newElement);
        }
    }


    return (
        <div ref={elementRef} onClick={(e) => handleClick(e)} style={element?.attributes} className={`outline-2 ${element?.type != 'ROOT_ELEMENT' && 'hover:outline outline-stone-500'} ${clickedElement === element?.id && 'outline !outline-emerald-500 z-50'}`}>
            {<div onDragEnter={() => handleDragStatus(true)} 
                onDragLeave={() => handleDragStatus(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e)} 
                className={`${dragStatus && '!bg-emerald-200/50'} absolute ${structure.dragElement !== '' ? 'block bg-transparent' : 'hidden'}`} 
                style={{width: elementRef.current?.clientWidth, height: elementRef.current?.clientHeight}}>
            </div>}
            {element?.content}
            {element?.children.map((elementID) => {
                return <EditorElement key={elementID} elementID={elementID} clickedElement={clickedElement} setClickedElement={setClickedElement}></EditorElement>
            })}
        </div>
    )

}

export default EditorElement;