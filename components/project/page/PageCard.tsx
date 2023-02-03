import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { IoArrowForwardOutline } from "react-icons/io5";

function PageCard({ page } : { page?: Page }) {


    if(page) {
        return (
            <div className="w-full h-40 bg-stone-100 shadow rounded-xl flex flex-col justify-between p-4 text-stone-700">
                <h1 className="text-xl font-semibold h-1/2 break-words overflow-hidden">{page.name}</h1>
                <div className="w-full flex items-center justify-between">
                    <FiTrash className="h-6 w-6 md:h-5 md:w-6 cursor-pointer hover:text-red-400"></FiTrash>
                    <Link href={'/project/' + page.project +'/editor/' + page.id}>
                        <IoArrowForwardOutline className="h-6 w-6 md:h-5 md:w-6 cursor-pointer hover:text-emerald-400"></IoArrowForwardOutline>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-40 bg-stone-200 shadow rounded-xl hover:bg-stone-200/80 cursor-pointer flex justify-center items-center text-stone-400">
                <AiOutlinePlus className="w-10 h-10 "></AiOutlinePlus>
            </div>
        )
    }
}

export default PageCard;