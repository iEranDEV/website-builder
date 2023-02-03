import ProjectWrapper from "@/components/project/ProjectWrapper";
import { UserContext } from "@/context/UserContext";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
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
            const syncData = async () => {
                const docSnap = await getDoc(doc(db, "projects", id as string))
                if(docSnap.exists()) {
                    setProject(docSnap.data() as Project);
                } else {
                    router.push('/');
                }
            };
            syncData();
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