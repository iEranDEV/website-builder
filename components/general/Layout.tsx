import UserDropdown from "../user/UserDropdown";
import AppWrapper from "./AppWrapper";
import NavBar from "./nav/NavBar";

type LayoutProps = {
    children: JSX.Element,
    navbar: JSX.Element[] | null
}

function Layout( {children, navbar}: LayoutProps ) {


    return (
        <AppWrapper>
            <div className='w-screen h-screen flex bg-stone-300'>
                <div className="h-full hidden md:block">
                    <NavBar navbar={navbar}></NavBar>
                </div>
                <div className="w-full h-full flex flex-col">
                    <div className="w-full bg-stone-100 px-2 border-b border-stone-400 flex justify-between md:justify-end items-center py-2 relative z-10">
                        <div className="md:hidden">
                            <NavBar navbar={navbar}></NavBar>
                        </div>
                        <UserDropdown></UserDropdown>
                    </div>

                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </AppWrapper>
    )
}

export default Layout;