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

    const moveable = element?.attributes.position === 'absolute';

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

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        if(element?.type !== 'ROOT_ELEMENT' && element?.type !== 'SECTION') {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            structure.setMovedElement({id: elementID, posX: x, posY: y});
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if(element?.type !== 'ROOT_ELEMENT') {
            // Calc new position
            const x = structure.movedElement.posX;
            const y = structure.movedElement.posY;
            const newElement = structuredClone(structure.structure.find((item) => item.id === structure.movedElement.id));
            const parentObject = document.querySelector('#element_' + structure.structure.find((item) => item.id === structure.movedElement.id)?.parent);
            const rect = parentObject?.getBoundingClientRect();
            if(newElement && rect) {
                newElement.attributes.top = (e.clientY - rect.top - y) + 'px';
                newElement.attributes.left = (e.clientX - rect.left - x) + 'px';
                structure.updateElement(newElement);
            }
            structure.setMovedElement({id: '', posX: 0, posY: 0});
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if(element?.type !== 'ROOT_ELEMENT') {
            const x = structure.movedElement.posX;
            const y = structure.movedElement.posY;
            const newElement = structuredClone(structure.structure.find((item) => item.id === structure.movedElement.id));
            const parentObject = document.querySelector('#element_' + structure.structure.find((item) => item.id === structure.movedElement.id)?.parent);
            const rect = parentObject?.getBoundingClientRect();
            if(newElement && rect) {
                newElement.attributes.top = (e.clientY - rect.top - y) + 'px';
                newElement.attributes.left = (e.clientX - rect.left - x) + 'px';
                structure.updateElement(newElement);
            }
        }
    }

    const handleMouseLeave = () => {
        if(element?.type !== 'ROOT_ELEMENT' && element?.children.includes(structure.movedElement.id)) {
            structure.setMovedElement({id: '', posX: 0, posY: 0});
        }
    }

    const handleDrop = () => {
        if(element?.type !== 'ROOT_ELEMENT') {
            setDragStatus(false);
            console.log(structure.dragElement);
            const newElement = structuredClone((defaultComponents as any)[structure.dragElement.toLowerCase()]) as EditorElement;
            newElement.id = crypto.randomUUID();
            newElement.parent = element ? element.id : null;
            structure.addElement(newElement);
        }
    }

    return (
        <div onMouseUp={(e) => element?.children.includes(structure.movedElement.id) && handleMouseUp(e)} 
            onMouseMove={(e) => element?.children.includes(structure.movedElement.id) && handleMouseMove(e)}
            onMouseDown={(e) => moveable && handleMouseDown(e)} 
            onMouseLeave={handleMouseLeave}
            ref={elementRef} 
            onClick={(e) => handleClick(e)} 
            id={'element_' + elementID}
            style={element?.attributes} 
            className={`whitespace-pre outline-2 ${clickedElement === element?.id && '!outline-sky-500 outline-offset-2 outline-dashed z-50'}`}
        >
            {<div onDragEnter={() => handleDragStatus(true)} 
                onDragLeave={() => handleDragStatus(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop} 
                className={`${dragStatus && '!bg-neutral-400/50'} transition-all absolute ${structure.dragElement !== '' ? 'block bg-transparent' : 'hidden'}`} 
                style={{width: elementRef.current?.clientWidth, height: elementRef.current?.clientHeight}}>
            </div>}
            {element && <>
                {element.content}
                {element.children.map((elementID) => {
                    return <EditorElement key={elementID} elementID={elementID} clickedElement={clickedElement} setClickedElement={setClickedElement}></EditorElement>
                })}
            </>}
        </div>
    )

}

export default EditorElement;