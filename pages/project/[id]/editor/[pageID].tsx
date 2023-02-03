import Layout from "@/components/general/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiPlus, FiSave, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import ComponentsPanel from "@/components/editor/ComponentsPanel";
import EditorElement from "@/components/editor/EditorElement";
import ElementPanel from "@/components/editor/elementPanel/ElementPanel";
import { StructureContext } from "@/context/StructureContext";
import NavItem from "@/components/general/nav/NavItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

function Editor() {
    const [page, setPage] = useState<Page | null>(null);
    const [structure, setStructure] = useState(Array<EditorElement>());
    const [clickedElement, setClickedElement] = useState('');
    const [dragElement, setDragElement] = useState('');
    const [movedElement, setMovedElement] = useState({id: '', posX: 0, posY: 0});

    const router = useRouter();
    const { id, pageID } = router.query;

    useEffect(() => {
        if(id && pageID) {
            const syncData = async () => {
                const docSnap = await getDoc(doc(db, "projects/" + id + '/pages/' + pageID));
                if(docSnap.exists()) {
                    console.log('loaded editor');
                    const newPage = docSnap.data() as Page;
                    setPage(newPage);
                    setStructure(newPage.structure);
                } else {
                    router.push('/');
                }
            }
            syncData();
        }
    }, [id, pageID]);

    // Add new section to page
    const addSection = () => {
        const newSection: EditorElement = {
            id: crypto.randomUUID(),
            type: "SECTION",
            name: 'Section #' + (structure.filter((item) => item.type === 'SECTION').length + 1),
            content: "",
            attributes: {
                width: '100%',
                height: '200px',
                backgroundColor: '#FFFFFF',
                color: '#FFFFFF',
                position: "relative"
            },
            parent: structure.find((item) => item.type === 'ROOT_ELEMENT')?.id as string,
            children: []
        }
        addElement(newSection);
    }

    const navBarItems = () => {
		return [
            <NavItem key={'back'} text="All pages" route={'/project/' + page?.project + '/pages'}>
                <IoArrowBackOutline className="h-6 w-6"></IoArrowBackOutline>
            </NavItem>,
            
            <NavItem onClick={save} key={'save'} text="Save">
                <FiSave className="h-6 w-6"></FiSave>
            </NavItem>,

            <NavItem key={'delete'} text="Delete page">
                <FiTrash className="h-6 w-6"></FiTrash>
            </NavItem>,

            <NavItem onClick={addSection} key={'add_section'} text="Add section">
                <FiPlus className="h-6 w-6"></FiPlus>
            </NavItem>,
		]
	}

    const save = async () => {
        await updateDoc(doc(db, "projects/" + page?.project + '/pages/' + page?.id), {
            structure: structure
        })
    }

    const addElement = (element: EditorElement) => {
        const newStructure = structuredClone(structure);
        element.name = (element.type.charAt(0) + element.type.slice(1).toLowerCase()) + ' #' + (structure.filter((item) => item.type === element.type).length + 1)
        newStructure.push(element);
        newStructure.find((item) => item.id === element.parent)?.children.push(element.id);
        setStructure(newStructure);
    }

    const updateElement = (element: EditorElement) => {
        const newStructure = structuredClone(structure);
        const index = newStructure.findIndex((item) => item.id === element.id);
        newStructure[index] = element;
        setStructure(newStructure);
    }

    const deleteElement = (element: EditorElement) => {
        const newStructure = structuredClone(structure);
        newStructure.splice(newStructure.findIndex((item) => item.id === element.id), 1);
        const parent = newStructure.find((item) => item.id === element.parent);
        if(parent) {
            parent.children.splice(parent.children.findIndex((item) => item === element.id), 1);
        }
        setStructure(newStructure);
    }

    return (
        <Layout navbar={navBarItems()}>
            <>
                {page && <StructureContext.Provider value={{
                        structure: structure, 
                        addElement: addElement, 
                        updateElement: updateElement, 
                        deleteElement: deleteElement, 
                        dragElement: dragElement, setDragElement: setDragElement, 
                        movedElement: movedElement, setMovedElement: setMovedElement,
                        clickedElement: clickedElement,
                        setClickedElement: setClickedElement,
                    }}>
                    <div className="w-full h-full flex bg-stone-300">
                        <ComponentsPanel></ComponentsPanel>
                        <div className="w-full h-full relative">
                            <div className="absolute w-full h-full p-3 overflow-auto">
                                <EditorElement clickedElement={clickedElement} elementID={page?.structure.find((item) => item.type === 'ROOT_ELEMENT')?.id as string} setClickedElement={setClickedElement}></EditorElement>
                            </div>
                        </div>
                        <ElementPanel></ElementPanel>
                    </div>
                </StructureContext.Provider>}
            </>
        </Layout>
    )

}

export default Editor;