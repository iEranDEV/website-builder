import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { VscLoading } from 'react-icons/vsc';

function AppWrapper({ children }: { children: JSX.Element }) {

    const router = useRouter();
    const userContext = useContext(UserContext);
    const user = userContext.user;

    useEffect(() => {
        if(!user) {
            const timer = setTimeout(() => {
                router.push('/account/login');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [user]);

    return (
        <>
            {user ?
                <>
                    {children}
                </>
            :
                <div className="w-screen h-screen flex justify-center items-center">
                    <VscLoading className="h-7 w-7 text-neutral-500 animate-spin"></VscLoading>
                </div>
            }
        </>
    )
}

export default AppWrapper;