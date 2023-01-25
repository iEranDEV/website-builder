import AppWrapper from "@/components/general/AppWrapper";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { IoArrowBackOutline } from 'react-icons/io5';
import Link from "next/link";
import { FiBox, FiEye, FiSettings } from "react-icons/fi";
import ProjectSettings from "@/components/project/ProjectSettings";
import ProjectPages from "@/components/project/ProjectPages";

function ProjectPage() {
    const [project, setProject] = useState<Project | null>(null);
    const [section, setSection] = useState('settings');

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

    const renderSection = () => {
        switch(section) {
            case 'settings':
                return <ProjectSettings></ProjectSettings>
            case 'pages':
                return <ProjectPages></ProjectPages>
        }
    }

    return (
        <AppWrapper>
            <>
                {project ?
                    <div className="w-screen h-screen bg-stone-200 flex flex-col md:flex-row gap-4 items-center justify-center p-4">
                        {/* Project navigation */}
                        <div className="w-full md:w-60 md:h-full bg-stone-100 shadow p-4 flex md:flex-col justify-center md:justify-start gap-4 items-center text-stone-700 rounded-xl">
                            {/* Back to all projects */}
                            <Link href={'/'} className='md:w-full flex gap-4 hover:text-emerald-500 cursor-pointer items-center'>
                                <IoArrowBackOutline className="h-6 w-6 md:h-5 md:w-6"></IoArrowBackOutline>
                                <p className="hidden md:block">All projects</p>
                            </Link>
                            
                            {/* Project settings */}
                            <div onClick={() => setSection('settings')} className='md:w-full flex gap-4 hover:text-emerald-500 cursor-pointer items-center'>
                                <FiSettings className="h-6 w-6 md:h-5 md:w-6"></FiSettings>
                                <p className="hidden md:block">Settings</p>
                            </div>

                            {/* Project pages */}
                            <div onClick={() => setSection('pages')} className='md:w-full flex gap-4 hover:text-emerald-500 cursor-pointer items-center'>
                                <FiBox className="h-6 w-6 md:h-5 md:w-6"></FiBox>
                                <p className="hidden md:block">Pages</p>
                            </div>

                            
                            {/* Project preview */}
                            <div className='md:w-full flex gap-4 text-stone-400 cursor-not-allowed items-center'>
                                <FiEye className="h-6 w-6 md:h-5 md:w-6"></FiEye>
                                <p className="hidden md:block">Preview</p>
                            </div>
                        </div>

                        {/* Rendered page */}
                        <div className="w-full h-full bg-stone-100 shadow rounded-xl p-4">
                            {renderSection()}
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

export default ProjectPage;