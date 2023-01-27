import Link from "next/link";
import { FiBox, FiCode, FiEye, FiSettings, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import Layout from "../general/Layout";

function ProjectWrapper({children, project}: {children: JSX.Element, project: Project | null}) {

    const navBarItems = () => {
		return [
            <Link href={'/'} className='flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
                <IoArrowBackOutline className="h-6 w-6"></IoArrowBackOutline>
                <p className="md:hidden">All projects</p>
            </Link>,
            
            <Link href={'/project/' + project?._id + '/settings'} className='flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
                <FiSettings className="h-6 w-6"></FiSettings>
                <p className="md:hidden">Settings</p>
            </Link>,

            <Link href={'/project/' + project?._id + '/pages'} className='flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
                <FiBox className="h-6 w-6"></FiBox>
                <p className="md:hidden">Pages</p>
            </Link>,

            
            <div className='flex gap-2 items-center text-stone-400 cursor-not-allowed'>
                <FiEye className="h-6 w-6"></FiEye>
                <p className="md:hidden">Preview</p>
            </div>,

            <div className='flex gap-2 items-center text-stone-400 cursor-not-allowed'>
                <FiCode className="h-6 w-6"></FiCode>
                <p className="md:hidden">Generate</p>
            </div>,

            <div className='flex gap-2 items-center text-stone-700 hover:text-red-400 cursor-pointer'>
                <FiTrash className="h-6 w-6"></FiTrash>
                <p className="md:hidden">Delete project</p>
            </div>,
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