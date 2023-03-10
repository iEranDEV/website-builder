import { db } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import { FormEvent } from "react";
import { FiX } from "react-icons/fi";
import Modal from "../../general/Modal";
import StyledButton from "../../general/StyledButton";
import startStructure from '@/test_structure.json'
import { NotificationsContext } from "@/context/NotificationsContext";

function NewPageModal({setMenu, addPage, projectID}: {setMenu: Function, addPage: Function, projectID: string}) {
    const [name, setName] = useState('');

    const notifications = useContext(NotificationsContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMenu(false);
        const page: Page = {
            id: crypto.randomUUID(),
            name: name,
            structure: [...startStructure] as Array<EditorElement>,
            createdAt: Timestamp.now(),
            modifiedAt: Timestamp.now(),
            project: projectID
        }
        await setDoc(doc(db, "projects/" + projectID + '/pages', page.id), page);
        notifications.addNotification({
            id: crypto.randomUUID(),
            type: 'SUCCESS',
            message: `Created page ${page.name}!`
        })
        addPage(page);
    }

    return (
        <Modal setMenu={setMenu}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8 text-neutral-700">
                <div className="w-full flex justify-between items-center gap-8">
                    <h1 className="text-lg mono">Create new page</h1>
                    <FiX onClick={() => setMenu(false)} className="h-5 w-5 cursor-pointer"></FiX>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col gap-6'>
                    {/* Project name input */}
                    <div className="w-full relative group">
                        <p className="absolute bg-neutral-100 px-2 -top-3 left-3 text-neutral-400 group-focus-within:text-emerald-500">name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="border-2 border-neutral-300 rounded-xl p-2 w-full bg-neutral-100 placeholder-neutral-300 focus:border-emerald-500 focus:outline-none" placeholder="super fancy project" />
                    </div>

                    {/* Submit button */}
                    <StyledButton text={'Click to create page'}></StyledButton>
                </form>
            </div>
        </Modal>
    )
}

export default NewPageModal;