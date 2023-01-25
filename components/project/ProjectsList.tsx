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
        <div className="w-full h-full p-4">
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