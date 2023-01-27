import Layout from "@/components/general/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEye, FiSave, FiTrash } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";

function Editor() {
    const [page, setPage] = useState<Page | null>(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(id) {
            fetch(`/api/page/${id}`).then(async (result) => {
                const data = await result.json();
                if(data.success) {
                    setPage(data.data as Page);
                } 
            }).catch(() => {
                router.push('/')
            })
        }
    }, [id]);

    const navBarItems = () => {
		return [
			<Link href={'/'} className='flex gap-2 items-center text-stone-700 hover:text-emerald-500'>
                <IoArrowBackOutline className="h-6 w-6"></IoArrowBackOutline>
                <p className="md:hidden">All pages</p>
            </Link>,

            <div className='flex gap-2 items-center text-stone-700 hover:text-emerald-500 cursor-pointer'>
                <FiSave className="h-6 w-6"></FiSave>
                <p className="md:hidden">Save</p>
            </div>,
            
            <div className='flex gap-2 items-center text-stone-400 cursor-not-allowed'>
                <FiEye className="h-6 w-6"></FiEye>
                <p className="md:hidden">Preview</p>
            </div>,

            <div className='flex gap-2 items-center text-stone-700 hover:text-red-400 cursor-pointer'>
                <FiTrash className="h-6 w-6"></FiTrash>
                <p className="md:hidden">Delete project</p>
            </div>,
		]
	}

    return (
        <Layout navbar={navBarItems()}>
            <div className="w-full h-full flex bg-stone-300 ">
                test
            </div>
        </Layout>
    )

}

export default Editor;