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
            setUser(JSON.parse(localData) as User);
        }
    }, []);

    return (
        <UserContext.Provider value={{user: user, authorize: authorize, logOut: logOut, loading: loading, setLoading: setLoading}}>
            {children}
        </UserContext.Provider>
    )
}