import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineNewspaper } from 'react-icons/hi2'
import StyledButton from "../general/StyledButton";

function ProjectCard({project}: {project?: Project,}) {

    if(project) {
        return (
            <div className="w-full h-60 bg-stone-100 shadow rounded-xl p-2 cursor-pointer flex flex-col divide-y-2 justify-between text-stone-700">
                <h1 className="text-xl font-semibold h-1/2 break-words overflow-hidden p-2">{project.name}</h1>
                <div className="h-1/2 flex flex-col justify-around">
                    <p className="w-full text-stone-400">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                    <div className="w-full flex flex-col gap-2 justify-between md:flex-row md:items-center text-stone-500">

                        {/* Amount of pages */}
                        <div className="flex items-center gap-1">
                            <HiOutlineNewspaper className="h-5 w-5"></HiOutlineNewspaper>
                            <span className="text-lg font-semibold">0</span>
                        </div>

                        <div className="w-40">
                            <StyledButton text={'Dashboard'}></StyledButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-60 bg-stone-300/50 hover:bg-stone-300 cursor-pointer flex justify-center items-center text-stone-400">
                <AiOutlinePlus className="w-10 h-10 "></AiOutlinePlus>
            </div>
        )
    }
}

export default ProjectCard;