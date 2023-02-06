import DeletePageModal from "@/components/project/page/DeletePageModal";
import NewPageModal from "@/components/project/page/NewPageModal";
import PageCard from "@/components/project/page/PageCard";
import ProjectWrapper from "@/components/project/ProjectWrapper";
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProjectPages() {
    const [project, setProject] = useState<Project | null>(null);
    const [pages, setPages] = useState(Array<Page>());
    const [newPage, setNewPage] = useState(false);
    const [deletePageModal, setDeletePageModal] = useState<Page | null>(null);

    const router = useRouter();
    const { id } = router.query;

    const syncProjectData = async () => {
        const docSnap = await getDoc(doc(db, "projects", id as string))
        if(docSnap.exists()) {
            const data = docSnap.data() as Project;
            setProject(data);
            const arr = Array<Page>();
            const querySnapshot = await getDocs(collection(db, "projects/" + data.id + '/pages'));
            querySnapshot.forEach((doc) => {
                arr.push(doc.data() as Page);
            })
            setPages(arr);
        } else {
            router.push('/');
        }
    }

    const removePage = (val: Page) => {
        setPages([...pages.filter((item) => item.id !== val.id)])
    }

    useEffect(() => {
        if(id) {
            syncProjectData();
        }
    }, [id]);

    const addPage = (val: Page) => {
        setPages([...pages, val]);
    }

    

    return (
        <ProjectWrapper project={project}>
            <div className="w-full h-full overflow-y-auto p-4">
                <div className="w-full pb-4">
					<h1 className="text-2xl font-bold mono text-stone-700">Project pages</h1>
				</div>
                {pages && <div className="elements-list w-full overflow-x-auto grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {pages?.map((item) => <PageCard key={item.id} page={item} setDeletePageModal={setDeletePageModal}></PageCard>)}
                    <div onClick={() => setNewPage(true)} className='h-40'>
                        <PageCard key={'add_page'}></PageCard>
                    </div>
                </div>}

                {newPage && <NewPageModal setMenu={setNewPage} addPage={addPage} projectID={id as string}></NewPageModal>}
                {deletePageModal && <DeletePageModal removePage={removePage} page={deletePageModal} setMenu={setDeletePageModal}></DeletePageModal>}
            </div>
        </ProjectWrapper>
    )
}

export default ProjectPages;