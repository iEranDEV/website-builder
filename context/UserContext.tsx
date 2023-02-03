import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const UserContext = createContext<{user: User | null, setUser: Function}>({
    user: null,
    setUser: () => {}
})

export const UserContextProvider = ({ children } : {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null);
    const [id, setID] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const authSession = auth.onAuthStateChanged(async (data) => {
            console.log(data);
            if(data) {
                setID(data.uid);
            } else {
                setID(null);
            }
        })
        authSession();
    }, []);

    useEffect(() => {
        if(id) {
            const unsubscribe = onSnapshot(doc(db, "users", id), (doc) => {
                setUser(doc.data() as User);
            })

            return () => {
                unsubscribe();
            }
        }
    }, [id])

    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            {children}
        </UserContext.Provider>
    )
}