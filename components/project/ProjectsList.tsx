import { UserContext } from "@/context/UserContext";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
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
            const getProjects = async () => {
                const q = query(collection(db, "projects"), where("owner", "==", user.id));
                const querySnapshot = await getDocs(q);
                const arr = Array<Project>();
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data() as Project);
                })
                setProjects(arr);
            }
            getProjects();
        }
    }, []);

    const addProject = (project: Project) => {
        setProjects([...projects, project]);
    }

    return (
        <div className="h-full w-full overflow-y-auto">
            <div className="w-full overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 elements-list">
                {projects.map((project) => {
                    return <ProjectCard key={project.id} project={project}></ProjectCard>
                })}
                <div onClick={() => setNewProject(true)}>
                    <ProjectCard key={'add_project'}></ProjectCard>
                </div>

                {newProject && <NewProjectModal addProject={addProject} setMenu={setNewProject}></NewProjectModal>}
            </div>
        </div>
    )
}

export default ProjectsList;