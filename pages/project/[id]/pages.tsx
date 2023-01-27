import NewPageModal from "@/components/project/page/NewPageModal";
import PageCard from "@/components/project/page/PageCard";
import ProjectWrapper from "@/components/project/ProjectWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProjectPages() {
    const [project, setProject] = useState<Project | null>(null);
    const [newPage, setNewPage] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    const syncProjectData = () => {
        fetch(`/api/project/${id}`).then(async (result) => {
            const data = await result.json();
            if(data.success) {
                setProject(data.data as Project);
            } 
        }).catch(() => {
            router.push('/')
        })
    }

    useEffect(() => {
        if(id) {
            syncProjectData();
        }
    }, [id]);

    const syncData = () => {
        syncProjectData();
    }

    

    return (
        <ProjectWrapper project={project}>
            <div className="w-full h-full p-4">
                {project?.pages && <div className="w-full h-full overflow-x-auto gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {project?.pages?.map((item) => <PageCard key={item._id} page={item}></PageCard>)}
                    <div onClick={() => setNewPage(true)} className='h-40'>
                        <PageCard key={'add_page'}></PageCard>
                    </div>
                </div>}

                {newPage && <NewPageModal setMenu={setNewPage} syncData={syncData} projectID={id as string}></NewPageModal>}
            </div>
        </ProjectWrapper>
    )
}

export default ProjectPages;