import { createContext } from "react";

export const StructureContext = createContext({
    structure: Array<EditorElement>(),
    addElement: (element: EditorElement) => {},
    updateElement: (element: EditorElement) => {},
    deleteElement: (element: EditorElement) => {},
    dragElement: '',
    setDragElement: (value: string) => {},
    movedElement: {id: '', posX: 0, posY: 0},
    setMovedElement: (value: {id: string, posX: number, posY: number}) => {}
})