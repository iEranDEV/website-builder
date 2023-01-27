import NewPageModal from "@/components/project/page/NewPageModal";
import PageCard from "@/components/project/page/PageCard";
import ProjectLayout from "@/components/project/ProjectLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProjectPages() {
    const [pages, setPages] = useState<Array<Page> | null>(null);
    const [newPage, setNewPage] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(id) {
            fetch(`/api/project/${id}`).then(async (result) => {
                const data = await result.json();
                if(data.success) {
                    const project = data.data as Project;
                    setPages(project.pages);
                } 
            }).catch(() => {
                router.push('/')
            })
        }
    }, [id]);

    const addPage = (page: Page) => {
        if(pages) setPages([...pages, page])
    }

    return (
        <ProjectLayout>
            <>
                {pages && <div className="w-full h-full overflow-x-auto gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {pages?.map((item) => <PageCard key={item._id} page={item}></PageCard>)}
                    <div onClick={() => setNewPage(true)} className='h-40'>
                        <PageCard key={'add_page'}></PageCard>
                    </div>
                </div>}

                {newPage && <NewPageModal setMenu={setNewPage} addPage={addPage} projectID={id as string}></NewPageModal>}
            </>
        </ProjectLayout>
    )
}

export default ProjectPages;