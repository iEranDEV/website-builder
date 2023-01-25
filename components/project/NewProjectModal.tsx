import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { FormEvent } from "react";
import { FiX } from "react-icons/fi";
import Modal from "../general/Modal";
import StyledButton from "../general/StyledButton";

function NewProjectModal({setMenu, addProject}: {setMenu: Function, addProject: Function}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const userContext = useContext(UserContext);
    const user = userContext.user;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMenu(false);
        console.log(name);
        await fetch('/api/project/new', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                description: description,
                owner: user?._id
            })
        }).then(async (result) => {
            const data = await result.json();
            if(data.success) {
                addProject(data.data as Project);
            }
        })
    }

    return (
        <Modal setMenu={setMenu}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8 text-stone-700">
                <div className="w-full flex justify-between items-center gap-8">
                    <h1 className="text-lg mono">Create new project</h1>
                    <FiX onClick={() => setMenu(false)} className="h-5 w-5 cursor-pointer"></FiX>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col gap-6'>
                    {/* Project name input */}
                    <div className="w-full relative group">
                        <p className="absolute bg-stone-100 px-2 -top-3 left-3 text-stone-400 group-focus-within:text-emerald-500">name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="border-2 border-stone-300 rounded-xl p-2 w-full bg-stone-100 placeholder-stone-300 focus:border-emerald-500 focus:outline-none" placeholder="super fancy project" />
                    </div>

                    {/* Project description input */}
                    <div className="w-full relative group">
                        <p className="absolute bg-stone-100 px-2 -py-3 -top-3 left-3 text-stone-400 group-focus-within:text-emerald-500">description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols={1} rows={6} maxLength={150} className="border-2 border-stone-300 rounded-xl p-2 w-full bg-stone-100 placeholder-stone-300 focus:border-emerald-500 focus:outline-none" placeholder="super fancy project"></textarea>
                        <div className="w-full text-end">
                            <p className="text-stone-400 ">{description.length}/150</p>
                        </div>
                    </div>

                    {/* Submit button */}
                    <StyledButton text={'Click to create category'}></StyledButton>
                </form>
            </div>
        </Modal>
    )
}

export default NewProjectModal;