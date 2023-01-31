import { FiBox, FiCode, FiEye, FiSettings, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import Layout from "../general/Layout";
import NavItem from "../general/nav/NavItem";

function ProjectWrapper({children, project}: {children: JSX.Element, project: Project | null}) {

    const navBarItems = () => {
		return [
            <NavItem key={'projects'} text="All projects" route="/">
                <IoArrowBackOutline className="h-6 w-6"></IoArrowBackOutline>
            </NavItem>,

            <NavItem key={'settings'} text="Settings" route={'/project/' + project?._id + '/settings'}>
                <FiSettings className="h-6 w-6"></FiSettings>
            </NavItem>,

            <NavItem key={'pages'} text="Pages" route={'/project/' + project?._id + '/pages'}>
                <FiBox className="h-6 w-6"></FiBox>
            </NavItem>,

            <NavItem key={'preview'} text="Preview" disabled>
                <FiEye className="h-6 w-6"></FiEye>
            </NavItem>,

            <NavItem key={'generate'} text="Generate" disabled>
                <FiCode className="h-6 w-6"></FiCode>
            </NavItem>,

            <NavItem key={'delete'} text="Delete project">
                <FiTrash className="h-6 w-6"></FiTrash>
            </NavItem>,
        ]
	}

    return (
        <Layout navbar={navBarItems()}>
            {project ?
                <>
                    {children}
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