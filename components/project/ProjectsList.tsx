import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import NewProjectModal from "./NewProjectModal";
import ProjectCard from "./ProjectCard";

function ProjectsList() {
    const [projects, setProjects] = useState(Array<Project>());
    const [newProject, setNewProject] = useState(false);

    const userContext = useContext(UserContext);
    const user = userContext.user;

    useEffect(() => {
        if(user) {
            fetch('/api/project?owner=' + user._id).then(async (result) => {
                const data = await result.json();
                if(data.success) {
                    setProjects(data.data as Array<Project>);
                } 
            })
        }
    }, []);

    const addProject = (project: Project) => {
        setProjects([...projects, project]);
    }

    return (
        <div className="w-full h-full overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {projects.map((project) => {
                return <ProjectCard key={project._id} project={project}></ProjectCard>
            })}
            <div onClick={() => setNewProject(true)}>
                <ProjectCard key={'add_project'}></ProjectCard>
            </div>

            {newProject && <NewProjectModal addProject={addProject} setMenu={setNewProject}></NewProjectModal>}
        </div>
    )
}

export default ProjectsList;