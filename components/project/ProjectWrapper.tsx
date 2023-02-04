import { useState } from "react";
import { FiBox, FiCode, FiEye, FiSettings, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import Layout from "../general/Layout";
import NavItem from "../general/nav/NavItem";
import DeleteProjectModal from "./DeleteProjectModal";

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

    const generate = () => {
        const document = window.document.implementation.createHTMLDocument("test");
        console.log(document)
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
                    <VscLoading className="h-7 w-7 text-stone-500 animate-spin"></VscLoading>
                </div>
            }
        </Layout>
    )
}

export default ProjectWrapper;