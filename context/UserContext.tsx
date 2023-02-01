import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext<{user: User | null, authorize: Function, logOut: Function, loading: boolean, setLoading: Function}>({
    user: null,
    authorize: () => {},
    logOut: () => {},
    loading: false,
    setLoading: () => {},
})

export const UserContextProvider = ({ children } : {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const authorize = (value: User) => {
        setUser(value);
        localStorage.setItem('user', JSON.stringify(value));
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');

    }

    useEffect(() => {
        const localData = localStorage.getItem('user');
        if(localData) {
            //setUser(JSON.parse(localData) as User);
            const localUser = JSON.parse(localData) as User;
            const syncData = async () => {
                console.log('syncing user data...')
                await fetch('/api/account/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: localUser.email,
                        password: localUser.password,
                    })
                }).then(async (result) => {
                    const data = await result.json();
                    if(data.success) {
                        authorize(data.data as User);
                    } else {
                        logOut();
                        router.push('/account/login');
                    }
                }).catch(() => {
                    logOut();
                    router.push('/account/login');
                });
            }
            syncData();
        } else {
            router.push('/account/login');
        }
    }, []);

    return (
        <UserContext.Provider value={{user: user, authorize: authorize, logOut: logOut, loading: loading, setLoading: setLoading}}>
            {children}
        </UserContext.Provider>
    )
}