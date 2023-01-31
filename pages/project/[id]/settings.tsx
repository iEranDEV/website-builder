import ProjectWrapper from "@/components/project/ProjectWrapper";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function ProjectSettings() {
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
        <ProjectWrapper project={project}>
            <div className="m-4 w-full h-full">
                {id}
            </div>
        </ProjectWrapper>
    )
}

export default ProjectSettings;