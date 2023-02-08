import UserDropdown from "../user/UserDropdown";
import AppWrapper from "./AppWrapper";
import NavBar from "./nav/NavBar";
import { TfiMobile } from 'react-icons/tfi'

type LayoutProps = {
    children: JSX.Element,
    navbar: JSX.Element[] | null
}

function Layout( {children, navbar}: LayoutProps ) {


    return (
        <AppWrapper>
            <>
                <div className='hidden md:flex w-screen h-screen bg-neutral-300'>
                    <div className="h-full hidden md:block relative z-[210]">
                        <NavBar navbar={navbar}></NavBar>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full bg-neutral-100 px-2 border-b border-neutral-400 flex justify-between md:justify-end items-center py-2 relative z-[200]">
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
                <div className="flex md:hidden w-screen h-screen justify-center items-center flex-col gap-2 text-neutral-400">
                    <TfiMobile className="h-7 w-7"></TfiMobile>
                    <p className="mono text-sm">Mobile view is not supported yet</p>
                </div>
            </>
        </AppWrapper>
    )
}

export default Layout;