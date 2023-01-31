import { StructureContext } from "@/context/StructureContext"
import { useContext, useRef, useState } from "react"

type EditorElementProps = {
    elementID: string,
    setClickedElement: Function
}

function EditorElement({ elementID, setClickedElement }: EditorElementProps) {
    const [dragStatus, setDragStatus] = useState(false);

    const elementRef = useRef<HTMLDivElement>(null);

    const structure = useContext(StructureContext);
    const element = structure.structure.find((item) => item.id === elementID);

    const handleDragStatus = (status: boolean) => {
        if(element?.type !== 'ROOT_ELEMENT') {
            setDragStatus(status);
        }
    }

    const handleDrop = () => {
        if(element?.type !== 'ROOT_ELEMENT') {
            setDragStatus(false);
            console.log('dropped item on ' + element?.id);
        }
    }

    return (
        <div ref={elementRef} onClick={() => setClickedElement(element)} style={element?.attributes} className={`${element?.type != 'ROOT_ELEMENT' && 'hover:outline outline-2 outline-emerald-500 outline-offset-2'}`}>
            {<div onDragEnter={() => handleDragStatus(true)} 
                onDragLeave={() => handleDragStatus(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop()} 
                className={`${dragStatus && '!bg-emerald-200/50'} absolute ${structure.dragElement !== '' ? 'block bg-transparent' : 'hidden'}`} 
                style={{width: elementRef.current?.clientWidth, height: elementRef.current?.clientHeight}}>
            </div>}
            {element?.content}
            {element?.children.map((elementID) => {
                return <EditorElement key={elementID} elementID={elementID} setClickedElement={setClickedElement}></EditorElement>
            })}
        </div>
    )

}

export default EditorElement;