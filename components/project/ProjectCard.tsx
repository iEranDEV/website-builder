import { db } from "@/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineNewspaper } from 'react-icons/hi2'
import StyledButton from "../general/StyledButton";

function ProjectCard({project}: {project?: Project}) {
    const [pagesCount, setPagesCount] = useState(0);

    const syncPagesCount = async () => {
        if(project) {
            const snapshot = await getCountFromServer(collection(db, "projects/" + project?.id + '/pages/'));
            setPagesCount(snapshot.data().count);
        }
    }

    useEffect(() => {
        syncPagesCount();
    }, []);

    if(project) {
        return (
            <div className="element-card w-full h-60 bg-neutral-100 shadow rounded-xl p-2 flex flex-col divide-y-2 justify-between text-neutral-700">
                <h1 className="text-xl font-semibold h-1/2 break-words overflow-hidden p-2">{project.name}</h1>
                <div className="h-1/2 flex flex-col justify-around">
                    <p className="w-full text-neutral-400">Created: {project.createdAt.toDate().toLocaleDateString()}</p>
                    <div className="w-full flex flex-col gap-2 justify-between md:flex-row md:items-center text-neutral-500">

                        {/* Amount of pages */}
                        <div className="flex items-center gap-1">
                            <HiOutlineNewspaper className="h-5 w-5"></HiOutlineNewspaper>
                            <span className="text-lg font-semibold">{pagesCount}</span>
                        </div>

                        <Link href={'/project/' + project.id + '/settings'} className="w-40">
                            <StyledButton text={'Edit project'}></StyledButton>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="element-card w-full h-60 bg-neutral-200 shadow rounded-xl hover:bg-neutral-200/80 cursor-pointer flex justify-center items-center text-neutral-400">
                <AiOutlinePlus className="w-10 h-10 "></AiOutlinePlus>
            </div>
        )
    }
}

export default ProjectCard;