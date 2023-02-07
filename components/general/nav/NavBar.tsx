import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FiX } from "react-icons/fi";

function NavBar({navbar}:{navbar: JSX.Element[] | null}) {
    const [menu, setMenu] = useState(false);

    return (
        <div className="h-full md:h-auto bg-neutral-100 md:bg-neutral-200/80 flex flex-col items-center text-neutral-700">
            {/* Toggler */}
            {navbar && <div className="md:hidden">
                <BiMenuAltLeft onClick={() => setMenu(true)} className="h-7 w-7"></BiMenuAltLeft>
            </div>}

            {/* Content */}
            <div className={`fixed w-screen md:w-auto h-screen transition-all md:border-r border-neutral-400 bg-neutral-100 z-50 md:static ${menu ? 'top-0 left-0' : 'top-0 left-full'}`}>

                <div className="md:hidden w-full flex flex-col gap-4 p-3">
                    <FiX onClick={() => setMenu(false)} className="h-8 w-8"></FiX>
                </div>

                <div className="w-full h-full flex flex-col gap-4 md:gap-0 justify-center md:justify-start items-center [&>*]:p-3">
                    {navbar}
                </div>
            </div>
        </div>
    )
}

export default NavBar;