import StyledButton from "@/components/general/StyledButton";
import { BiEnvelope, BiError, BiLockAlt, BiUser } from 'react-icons/bi';
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NotificationsContext } from "@/context/NotificationsContext";

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const userContext = useContext(UserContext);
    const notifications = useContext(NotificationsContext);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!email) {
            setError('E-mail input cannot be empty!');
            return;
        }

        if(!username) {
            setError('Username input cannot be empty!');
            return;
        }

        if(!password) {
            setError('Password input cannot be empty!');
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
            const userData = userCredentials.user;
            const user: User = {
                id: userData.uid,
                email: email,
                username: username,
                createdAt: new Date()
            }
            await setDoc(doc(db, "users", userData.uid), user);
            userContext.setUser(user);
            notifications.addNotification({
                id: crypto.randomUUID(),
                type: 'SUCCESS',
                message: `Registered as ${user.username}`
            })
            router.push('/');
        })
    }

    return (
        <div className="w-screen h-screen bg-neutral-100 flex justify-center items-center p-4">
            <div className="p-4 rounded-xl w-96 flex flex-col justify-between items-center gap-4 text-neutral-700">
                <div className="w-full flex flex-col gap-1 items-center justify-center">
                <h1 className="font-bold text-emerald-500 text-3xl mono">Let's get started</h1>
                <p>Have an account? <Link href='/account/login' className="text-emerald-500 font-semibold underline">Log in</Link></p>
                </div>
                
                <hr className="border w-full border-neutral-300" />

                {error && <div className="w-full bg-red-300 p-2 rounded-xl flex gap-4 items-center">
                    <BiError className="h-6 w-6 text-red-700"></BiError>
                    <p className="w-full text-sm text-red-700">{error}</p>
                </div>}

                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 mt-8 items-center'>

                    {/* Email input */}
                    <div className="w-full flex gap-4 items-center">
                        <label htmlFor="email">
                            <BiEnvelope className="h-5 w-5"></BiEnvelope>
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full bg-neutral-200/50 text-neutral-700 rounded p-2" placeholder="example@gmail.com" />
                    </div>

                    {/* Username input */}
                    <div className="w-full flex gap-4 items-center">
                        <label htmlFor="username">
                            <BiUser className="h-5 w-5"></BiUser>
                        </label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="w-full bg-neutral-200/50 text-neutral-700 rounded p-2" placeholder="username" />
                    </div>

                    {/* Password input */}
                    <div className="w-full flex gap-4 items-center">
                        <label htmlFor="password">
                            <BiLockAlt className="h-5 w-5"></BiLockAlt>
                        </label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full bg-neutral-200/50 text-neutral-700 rounded p-2" placeholder="●●●●●●●●●" />
                    </div>

                    <div className="w-2/3 mt-8">
                        <StyledButton text={'Click to sign up'}></StyledButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;