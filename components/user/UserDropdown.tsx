import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { FiBox, FiHome, FiLogOut, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";

function UserDropdown() {
    const [menu, setMenu] = useState(false);

    const router = useRouter();
    const userContext = useContext(UserContext);
    const user = userContext.user;

    const handleLogOut = () => {
        userContext.logOut();
        router.push('/account/login');
    }

    return (
        <div className="flex gap-2 items-center select-none" >
            <p className="text-stone-700">Logged as <span className="font-bold text-emerald-500">{user?.username}</span></p>
            <MdArrowDropDown onClick={() => setMenu(true)}  className="h-5 w-5 text-stone-700 cursor-pointer"></MdArrowDropDown>

            {/* Dropdown menu */}
            {menu && <div onClick={() => setMenu(false)} className="w-screen h-screen fixed top-0 left-0 ">
                <div className="bg-stone-100 shadow-xl py-4 w-52 flex flex-col items-center gap-2 absolute right-2 rounded-xl top-14">
                    <Link href={'/'} className='w-full flex gap-4 items-center px-4 text-stone-700 hover:text-emerald-500'>
                        <FiHome className="h-4 w-4"></FiHome>
                        <p>Projects</p>
                    </Link>
                    <div className='w-full flex gap-4 items-center px-4 text-stone-700 hover:text-emerald-500'>
                        <FiUser className="h-4 w-4"></FiUser>
                        <p>Account</p>
                    </div>
                    <div className='w-full flex gap-4 items-center px-4 text-stone-700 hover:text-emerald-500'>
                        <FiSettings className="h-4 w-4"></FiSettings>
                        <p>Settings</p>
                    </div>
                    <div className='w-full flex gap-4 items-center px-4 text-stone-400 cursor-not-allowed'>
                        <FiUsers className="h-4 w-4"></FiUsers>
                        <p>Teams</p>
                    </div>
                    <div className='w-full flex gap-4 items-center px-4 text-stone-400 cursor-not-allowed'>
                        <FiBox className="h-4 w-4"></FiBox>
                        <p>Community</p>
                    </div>
                    <div onClick={() => handleLogOut()} className='w-full flex gap-4 items-center px-4 text-red-500 cursor-pointer'>
                        <FiLogOut className="h-4 w-4"></FiLogOut>
                        <p>Log out</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UserDropdown;