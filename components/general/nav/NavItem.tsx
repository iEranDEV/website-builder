import Link from "next/link";

type NavItemProps = {
    children: JSX.Element,
    text: string,
    disabled?: boolean,
    route?: string,
    onClick?: Function
}

function NavItem({ children, text, disabled, route, onClick }: NavItemProps) {


    return (
        <>
        {route ?
            <Link onClick={() => onClick && onClick()} key={text} href={route} className={`flex group gap-2 relative items-center ${disabled ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 hover:text-emerald-500'}`}>
                {children}
                <p className="md:hidden">{text}</p>

                <div className="absolute h-8 left-0 w-max translate-x-16 rounded-xl hidden md:group-hover:block">
                    <div className="w-0 h-0 absolute border-t-8 border-t-transparent border-r-[10px] border-r-neutral-800 border-b-8 border-b-transparent -translate-x-[100%] translate-y-[50%]"></div>
                    <p className="bg-neutral-800 text-neutral-100 px-3 py-1 rounded break-keep">{text}</p>
                </div>
            </Link>
        :
            <div onClick={() => onClick && onClick()} key={text} className={`flex group gap-2 cursor-pointer relative items-center ${disabled ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 hover:text-emerald-500'}`}>
                {children}
                <p className="md:hidden">{text}</p>

                <div className="absolute h-8 left-0 w-max translate-x-16 rounded-xl hidden md:group-hover:block">
                    <div className="w-0 h-0 absolute border-t-8 border-t-transparent border-r-[10px] border-r-neutral-800 border-b-8 border-b-transparent -translate-x-[100%] translate-y-[50%]"></div>
                    <p className="bg-neutral-800 text-neutral-100 px-3 py-1 rounded break-keep">{text}</p>
                </div>
            </div>
        }
        </>
    )
}

export default NavItem;