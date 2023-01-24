import StyledButton from "@/components/general/StyledButton";
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import Link from "next/link";
import { FormEvent, useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="w-screen h-screen bg-stone-100 flex justify-center items-center p-4">
            <div className="p-4 rounded-xl w-96 flex flex-col justify-between items-center gap-4 text-stone-700">
                <div className="w-full flex flex-col gap-1 items-center justify-center">
                <h1 className="font-bold text-emerald-500 text-3xl mono">Welcome back</h1>
                <p>Don't have an account? <Link href='/account/register' className="text-emerald-500 font-semibold underline">Sign up</Link></p>
                </div>
                
                <hr className="border w-full border-stone-300" />

                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 mt-8 items-center'>

                    {/* Email input */}
                    <div className="w-full flex gap-4 items-center">
                        <label htmlFor="email">
                            <BiEnvelope className="h-5 w-5"></BiEnvelope>
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full bg-stone-200/50 text-stone-700 rounded p-2" placeholder="example@gmail.com" />
                    </div>

                    {/* Password input */}
                    <div className="w-full flex gap-4 items-center">
                        <label htmlFor="password">
                            <BiLockAlt className="h-5 w-5"></BiLockAlt>
                        </label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full bg-stone-200/50 text-stone-700 rounded p-2" placeholder="●●●●●●●●●" />
                    </div>

                    <div className="w-2/3 mt-8">
                        <StyledButton text={'Click to log in'}></StyledButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;