import { NotificationsContext } from "@/context/NotificationsContext";
import { UserContext } from "@/context/UserContext";
import { db } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
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
    const notifications = useContext(NotificationsContext);
    const user = userContext.user;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMenu(false);
        if(user) {
            const project: Project = {
                id: crypto.randomUUID(),
                owner: user.id,
                name: name,
                description: description,
                createdAt: Timestamp.now()
            }
            await setDoc(doc(db, "projects", project.id), project);
            notifications.addNotification({
                id: crypto.randomUUID(),
                type: 'SUCCESS',
                message: `Created project ${project.name}!`
            })
            addProject(project);
        }
    }

    return (
        <Modal setMenu={setMenu}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8 text-neutral-700">
                <div className="w-full flex justify-between items-center gap-8">
                    <h1 className="text-lg mono">Create new project</h1>
                    <FiX onClick={() => setMenu(false)} className="h-5 w-5 cursor-pointer"></FiX>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col gap-6'>
                    {/* Project name input */}
                    <div className="w-full relative group">
                        <p className="absolute bg-neutral-100 px-2 -top-3 left-3 text-neutral-400 group-focus-within:text-emerald-500">name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="border-2 border-neutral-300 rounded-xl p-2 w-full bg-neutral-100 placeholder-neutral-300 focus:border-emerald-500 focus:outline-none" placeholder="super fancy project" />
                    </div>

                    {/* Project description input */}
                    <div className="w-full relative group">
                        <p className="absolute bg-neutral-100 px-2 -py-3 -top-3 left-3 text-neutral-400 group-focus-within:text-emerald-500">description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols={1} rows={6} maxLength={150} className="border-2 border-neutral-300 rounded-xl p-2 w-full bg-neutral-100 placeholder-neutral-300 focus:border-emerald-500 focus:outline-none" placeholder="super fancy project"></textarea>
                        <div className="w-full text-end">
                            <p className="text-neutral-400 ">{description.length}/150</p>
                        </div>
                    </div>

                    {/* Submit button */}
                    <StyledButton text={'Click to create project'}></StyledButton>
                </form>
            </div>
        </Modal>
    )
}

export default NewProjectModal;