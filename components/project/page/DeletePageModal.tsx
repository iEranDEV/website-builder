import { NotificationsContext } from "@/context/NotificationsContext";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { FiX } from "react-icons/fi";
import Modal from "../../general/Modal";
import StyledButton from "../../general/StyledButton";

type DeletePageModalProps = {
    page: Page,
    setMenu: Function,
    removePage: Function
}

function DeletePageModal({ page, setMenu, removePage}: DeletePageModalProps) {

    const notifications = useContext(NotificationsContext);

    const handleDelete = async () => {
        await deleteDoc(doc(db, "projects/" + page.project + '/pages/', page.id));
        notifications.addNotification({
            id: crypto.randomUUID(),
            type: 'SUCCESS',
            message: `Deleted page ${page.name}!`
        });
        setMenu(false);
        removePage(page);
    }

    return (
        <Modal setMenu={setMenu}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8 text-stone-700">
                <div className="w-full flex justify-between items-center gap-8">
                    <h1 className="text-lg mono">Page delete</h1>
                    <FiX onClick={() => setMenu(false)} className="h-5 w-5 cursor-pointer"></FiX>
                </div>

                <hr className="w-full bg-stone-300 border-0 h-px" />

                <p>Do you want to delete page <span className="font-bold text-emerald-500">{page.name}</span> permanently? This action is irreversible.</p>

                <hr className="w-full bg-stone-300 border-0 h-px" />
                
                <div className="w-full flex justify-between items-center gap-4">
                    <div className="w-1/2">
                        <StyledButton onClick={() => setMenu(false)} text={'Cancel'}></StyledButton>
                    </div>
                    <div className="w-1/2">
                        <StyledButton onClick={handleDelete} text={'Delete'} color={'bg-red-300'}></StyledButton>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeletePageModal;