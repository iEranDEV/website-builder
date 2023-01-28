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
            <Link key={text} href={route} className={`flex group gap-2 relative items-center ${disabled ? 'text-stone-400 cursor-not-allowed' : 'text-stone-700 hover:text-emerald-500'}`}>
                {children}
                <p className="md:hidden">{text}</p>

                <div className="absolute h-8 left-0 w-max translate-x-16 rounded-xl hidden md:group-hover:block">
                    <div className="w-0 h-0 absolute border-t-8 border-t-transparent border-r-[10px] border-r-stone-800 border-b-8 border-b-transparent -translate-x-[100%] translate-y-[50%]"></div>
                    <p className="bg-stone-800 text-stone-100 px-3 py-1 rounded break-keep">{text}</p>
                </div>
            </Link>
        :
            <div key={text} className={`flex gap-2 items-center ${disabled ? 'text-stone-400 cursor-not-allowed' : 'text-stone-700 hover:text-emerald-500'}`}>
                {children}
                <p className="md:hidden">{text}</p>
            </div>
        }
        </>
    )
}

export default NavItem;