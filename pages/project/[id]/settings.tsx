import ProjectLayout from "@/components/project/ProjectLayout";
import { useRouter } from "next/router";

function ProjectSettings() {

    const router = useRouter();
    const { id} = router.query;

    return (
        <ProjectLayout>
            <div>
                {id}
            </div>
        </ProjectLayout>
    )
}

export default ProjectSettings;