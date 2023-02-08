import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { FiBox, FiCode, FiEye, FiSettings, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import Layout from "../general/Layout";
import NavItem from "../general/nav/NavItem";
import DeleteProjectModal from "./DeleteProjectModal";

const getHTMLTag = (val: string) => {
    switch(val) {
        case 'SECTION':
        case 'CONTAINER':
            return "div";
        case 'TEXT':
            return "p";
        case 'LINK':
            return "a";
        case 'IMAGE':
            return "img";
        default:
            return "div";
    }
}

function ProjectWrapper({children, project}: {children: JSX.Element, project: Project | null}) {
    const [deleteProjectModal, setDeleteProjectModal] = useState(false);

    const navBarItems = () => {
		return [
            <NavItem key={'projects'} text="All projects" route="/">
                <IoArrowBackOutline className="h-6 w-6"></IoArrowBackOutline>
            </NavItem>,

            <NavItem key={'settings'} text="Settings" route={'/project/' + project?.id + '/settings'}>
                <FiSettings className="h-6 w-6"></FiSettings>
            </NavItem>,

            <NavItem key={'pages'} text="Pages" route={'/project/' + project?.id + '/pages'}>
                <FiBox className="h-6 w-6"></FiBox>
            </NavItem>,

            <NavItem key={'preview'} text="Preview" disabled>
                <FiEye className="h-6 w-6"></FiEye>
            </NavItem>,

            <NavItem onClick={generate} key={'generate'} text="Generate">
                <FiCode className="h-6 w-6"></FiCode>
            </NavItem>,

            <NavItem onClick={() => setDeleteProjectModal(true)} key={'delete'} text="Delete project">
                <FiTrash className="h-6 w-6"></FiTrash>
            </NavItem>,
        ]
	}

    const render = (doc: Document, parent: HTMLElement, structure: EditorElement[], data: EditorElement) => {
        const element = doc.createElement(getHTMLTag(data.type));
        
        // Apply css styles
        for(const [key, value] of Object.entries(data.attributes)) {
            element.style[key as any] = value;
        }

        // Content
        if(data.content) element.innerText = data.content;

        // Apply specific values (links, images, ...)
        switch(data.type) {
            case 'LINK':
                if(data.link) {
                    (element as HTMLAnchorElement).href = data.link;
                }
                break;
        }

        // Apply to parent
        parent.appendChild(element);

        // Render children
        data.children.forEach((id) => {
            const childData = structure.find((item) => item.id === id);
            if(childData) render(doc, element, structure, childData);
        })
    }

    const generate = async () => {
        const querySnapshot = await getDocs(collection(db, "projects/" + project?.id + '/pages/'));
        querySnapshot.forEach((doc) => {
            const page = doc.data() as Page;
            const structure = page.structure
            const pageDocument = window.document.implementation.createHTMLDocument(page.name);
            pageDocument.head.lang = "en";

            // Styling body
            const bodyElement = pageDocument.body;
            bodyElement.style.margin = "0 auto";
            
            const rootElement = pageDocument.createElement("div");
            rootElement.id = 'root';
            structure.filter((item) => item.type === 'SECTION').map((section) => {
                render(pageDocument, rootElement, structure, section);
            })
            pageDocument.body.appendChild(rootElement);

            const link = document.createElement("a");
            const blob = new Blob([new XMLSerializer().serializeToString(pageDocument)], {type: 'text/html'});
            link.href = window.URL.createObjectURL(blob);
            link.download = page.name + ".html";
            link.click();
        })
    }

    return (
        <Layout navbar={navBarItems()}>
            {project ?
                <>
                    {children}
                    {deleteProjectModal && <DeleteProjectModal project={project} setMenu={setDeleteProjectModal}></DeleteProjectModal>}
                </>
            :
                <div className="w-screen h-screen flex justify-center items-center">
                    <VscLoading className="h-7 w-7 text-neutral-500 animate-spin"></VscLoading>
                </div>
            }
        </Layout>
    )
}

export default ProjectWrapper;