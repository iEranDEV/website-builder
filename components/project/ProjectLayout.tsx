import AppWrapper from "@/components/general/AppWrapper";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { IoArrowBackOutline } from 'react-icons/io5';
import Link from "next/link";
import { FiBox, FiCode, FiEye, FiSettings, FiTrash } from "react-icons/fi";

function ProjectLayout({children} : { children: JSX.Element }) {
    const [project, setProject] = useState<Project | null>(null);

    const router = useRouter();
    const { id } = router.query;

    const userContext = useContext(UserContext);
    const user = userContext.user;

    useEffect(() => {
        if(user) {
            fetch(`/api/project/${id}`).then(async (result) => {
                const data = await result.json();
                if(data.success) {
                    const val = data.data as Project;
                    if(val.owner === user._id) {
                        setProject(val);
                    } else {
                        router.push('/');
                    }
                } 
            }).catch(() => {
                router.push('/')
            })
        }
    }, [user]);


    return (
        <AppWrapper>
            <>
                {project ?
                    <div className="w-screen h-screen bg-stone-200 flex flex-col md:flex-row gap-4 items-center justify-center p-4">
                        {/* Project navigation */}
                        <div className="w-full md:w-60 md:h-full bg-stone-100 shadow p-4 flex md:flex-col justify-start gap-4 items-center text-stone-700 rounded-xl">
                            {/* Back to all projects */}
                            <Link href={'/'} className='md:w-full flex gap-4 hover:text-emerald-500 cursor-pointer items-center'>
                                <IoArrowBackOutline className="h-6 w-6 md:h-5 md:w-6"></IoArrowBackOutline>
                                <p className="hidden md:block">All projects</p>
                            </Link>
                            
                            {/* Project settings */}
                            <Link href={'/project/' + project._id + '/settings'} className='md:w-full flex gap-4 hover:text-emerald-500 cursor-pointer items-center'>
                                <FiSettings className="h-6 w-6 md:h-5 md:w-6"></FiSettings>
                                <p className="hidden md:block">Settings</p>
                            </Link>

                            {/* Project pages */}
                            <Link href={'/project/' + project._id + '/pages'} className='md:w-full flex gap-4 hover:text-emerald-500 cursor-pointer items-center'>
                                <FiBox className="h-6 w-6 md:h-5 md:w-6"></FiBox>
                                <p className="hidden md:block">Pages</p>
                            </Link>

                            
                            {/* Project preview */}
                            <div className='md:w-full flex gap-4 text-stone-400 cursor-not-allowed items-center'>
                                <FiEye className="h-6 w-6 md:h-5 md:w-6"></FiEye>
                                <p className="hidden md:block">Preview</p>
                            </div>

                            {/* Generate code */}
                            <div className='md:w-full flex gap-4 text-stone-400 cursor-not-allowed items-center'>
                                <FiCode className="h-6 w-6 md:h-5 md:w-6"></FiCode>
                                <p className="hidden md:block">Generate</p>
                            </div>

                            {/* Delete project */}
                            <div className='md:w-full flex gap-4 text-stone-700 hover:text-red-400 items-center cursor-pointer'>
                                <FiTrash className="h-6 w-6 md:h-5 md:w-6"></FiTrash>
                                <p className="hidden md:block">Delete project</p>
                            </div>
                        </div>

                        {/* Rendered page */}
                        <div className="w-full h-full">
                            {children}
                        </div>
                    </div>
                :
                    <div className="w-screen h-screen flex justify-center items-center">
                        <VscLoading className="h-7 w-7 text-stone-500 animate-spin"></VscLoading>
                    </div>
                }
            </>
        </AppWrapper>
    )
}

export default ProjectLayout;