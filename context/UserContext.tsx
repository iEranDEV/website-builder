import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext<{user: User | null, authorize: Function, loading: boolean, setLoading: Function}>({
    user: null,
    authorize: () => {},
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

    useEffect(() => {
        const localData = localStorage.getItem('user');
        if(localData) {
            setUser(JSON.parse(localData) as User);
        }
    }, []);

    return (
        <UserContext.Provider value={{user: user, authorize: authorize, loading: loading, setLoading: setLoading}}>
            {children}
        </UserContext.Provider>
    )
}