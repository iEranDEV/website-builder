import { db } from "@/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import JSZip from "jszip";
// @ts-ignore
import { saveAs } from 'file-saver';
import { useState } from "react";
import { FiBox, FiCode, FiEye, FiImage, FiSettings, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import Layout from "../general/Layout";
import NavItem from "../general/nav/NavItem";
import DeleteProjectModal from "./DeleteProjectModal";
import ProjectImages from "./images/ProjectImages";

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
    const [imagesModal, setImagesModal] = useState(false);

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

            <NavItem onClick={() => setImagesModal(true)} key={'images'} text="Images">
                <FiImage className="h-6 w-6"></FiImage>
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
                console.log(data.link)
                if(data.link) {
                    if(data.link.includes("url:")) {
                        (element as HTMLAnchorElement).href = data.link.slice(4);
                    } else if(data.link.includes("page:")) {
                        (element as HTMLAnchorElement).href = data.link.slice(5) + '.html';
                    }
                }
                break;
            case 'IMAGE':
                if(data.image?.src) {
                    (element as HTMLImageElement).src = 'img/' + data.image?.name;
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
        const jszip = new JSZip();
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

            const blob = new Blob([new XMLSerializer().serializeToString(pageDocument)], {type: 'text/html'});
            jszip.file(page.name + '.html', blob);
        });
        const imagesSnapshot = await getDocs(collection(db, "projects/" + project?.id + '/images/'));
        imagesSnapshot.forEach(async (doc) => {
            const image = doc.data() as Image;
            const imageBlob = await (await fetch(image.url)).blob();
            jszip.file('img/' + image.name, imageBlob);
        })
        setTimeout(() => {
            jszip.generateAsync({ type: 'blob' }).then((blob) => saveAs(blob, project?.name + '.zip'))
        }, 1000);
    }

    return (
        <Layout navbar={navBarItems()}>
            {project ?
                <>
                    {children}
                    {deleteProjectModal && <DeleteProjectModal project={project} setMenu={setDeleteProjectModal}></DeleteProjectModal>}
                    {imagesModal && <ProjectImages setMenu={setImagesModal}></ProjectImages>}
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