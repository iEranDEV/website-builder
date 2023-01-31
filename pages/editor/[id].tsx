import Layout from "@/components/general/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEye, FiPlus, FiSave, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import structureTest from '@/test_structure.json';
import ComponentsPanel from "@/components/editor/ComponentsPanel";
import EditorElement from "@/components/editor/EditorElement";
import ElementPanel from "@/components/editor/ElementPanel";
import { StructureContext } from "@/context/StructureContext";
import NavItem from "@/components/general/nav/NavItem";

function Editor() {
    const [page, setPage] = useState<Page | null>(null);
    const [structure, setStructure] = useState(Array<EditorElement>());
    const [clickedElement, setClickedElement] = useState<string | null>(null);
    const [dragElement, setDragElement] = useState('');
    const [movedElement, setMovedElement] = useState({id: '', posX: 0, posY: 0});

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(id) {
            /*fetch(`/api/page/${id}`).then(async (result) => {
                const data = await result.json();
                if(data.success) {
                    setPage(data.data as Page);
                } 
            }).catch(() => {
                router.push('/')
            })*/
            const newPage: Page = {
                _id: crypto.randomUUID(),
                name: "test_page",
                structure: JSON.parse(JSON.stringify(structureTest)) as EditorElement[],
                createdAt: new Date(),
                modifiedAt: new Date(),
                project: "63d4203d259ab3800fb01244"
            }
            setStructure(structuredClone(newPage.structure));
            setPage(newPage);
        }
    }, [id]);

    // Add new section to page
    const addSection = () => {
        const newSection: EditorElement = {
            id: crypto.randomUUID(),
            type: "SECTION",
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
            
            <NavItem key={'save'} text="Save">
                <FiSave className="h-6 w-6"></FiSave>
            </NavItem>,

            <NavItem key={'preview'} text="Preview">
                <FiEye className="h-6 w-6"></FiEye>
            </NavItem>,

            <NavItem key={'delete'} text="Delete page" disabled>
                <FiTrash className="h-6 w-6"></FiTrash>
            </NavItem>,

            <NavItem onClick={addSection} key={'add_section'} text="Add section">
                <FiPlus className="h-6 w-6"></FiPlus>
            </NavItem>,
		]
	}

    const addElement = (element: EditorElement) => {
        const newStructure = structuredClone(structure);
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
                        movedElement: movedElement, setMovedElement: setMovedElement
                    }}>
                    <div className="w-full h-full flex bg-stone-300">
                        <ComponentsPanel></ComponentsPanel>
                        <div className="w-full h-full relative">
                            <div className="absolute w-full h-full p-3 overflow-auto">
                                <EditorElement clickedElement={clickedElement} elementID={page?.structure.find((item) => item.type === 'ROOT_ELEMENT')?.id as string} setClickedElement={setClickedElement}></EditorElement>
                            </div>
                        </div>
                        <ElementPanel clickedElement={clickedElement} setClickedElement={setClickedElement}></ElementPanel>
                    </div>
                </StructureContext.Provider>}
            </>
        </Layout>
    )

}

export default Editor;