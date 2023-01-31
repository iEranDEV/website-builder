import Layout from "@/components/general/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEye, FiSave, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import structure from '@/test_structure.json';
import ComponentsPanel from "@/components/editor/ComponentsPanel";
import EditorElement from "@/components/editor/EditorElement";
import { AiOutlinePlus } from "react-icons/ai";
import ElementPanel from "@/components/editor/ElementPanel";

function Editor() {
    const [page, setPage] = useState<Page | null>(null);
    const [clickedElement, setClickedElement] = useState<EditorElement | null>(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(id) {
            /*fetch(`/api/page/${id}`).then(async (result) => {
                const data = await result.json();
                if(data.success) {
                    setPage(data.data as Page);
                } 
            }).catch(() => {
                router.push('/')
            })*/
            const newPage: Page = {
                _id: crypto.randomUUID(),
                name: "test_page",
                structure: JSON.parse(JSON.stringify(structure)) as EditorElement[],
                createdAt: new Date(),
                modifiedAt: new Date(),
                project: "63d4203d259ab3800fb01244"
            }
            setPage(newPage);
        }
    }, [id]);

    const navBarItems = () => {
		return [
			<Link key={'back'} href={'/project/' + page?.project + '/pages'} className='flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
                <IoArrowBackOutline className="h-6 w-6"></IoArrowBackOutline>
                <p className="md:hidden">All pages</p>
            </Link>,

            <div key={'save'} className='flex gap-2 items-center text-stone-700 hover:text-emerald-500 cursor-pointer'>
                <FiSave className="h-6 w-6"></FiSave>
                <p className="md:hidden">Save</p>
            </div>,
            
            <div key={'preview'} className='flex gap-2 items-center text-stone-400 cursor-not-allowed'>
                <FiEye className="h-6 w-6"></FiEye>
                <p className="md:hidden">Preview</p>
            </div>,

            <div key={'delete'} className='flex gap-2 items-center text-stone-700 hover:text-red-400 cursor-pointer'>
                <FiTrash className="h-6 w-6"></FiTrash>
                <p className="md:hidden">Delete project</p>
            </div>,
		]
	}

    return (
        <Layout navbar={navBarItems()}>
            <div className="w-full h-full flex bg-stone-300">
                <ComponentsPanel></ComponentsPanel>
                <div className="w-full h-full relative">
                    <div className="absolute w-full h-full p-3 overflow-auto">
                        {/*
                            <div className="bg-red-500 w-full">
                                {Array.from(Array(35)).map((e, i) => {
                                    return <p key={i}>{i}</p>
                                })}
                            </div>
                        */}
                        <EditorElement element={page?.structure.find((item) => item.type === 'ROOT_ELEMENT')} structure={page?.structure} setClickedElement={setClickedElement}></EditorElement>
                        <div className="w-full h-40 mt-4 bg-stone-200 shadow rounded-xl hover:bg-stone-200/80 cursor-pointer flex justify-center items-center text-stone-400">
                            <AiOutlinePlus className="w-10 h-10 "></AiOutlinePlus>
                        </div>
                    </div>
                </div>
                <ElementPanel clickedElement={clickedElement} setClickedElement={setClickedElement}></ElementPanel>
            </div>
        </Layout>
    )

}

export default Editor;