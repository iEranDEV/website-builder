import { NotificationsContext } from "@/context/NotificationsContext";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useContext } from "react";
import { FiX } from "react-icons/fi";
import Modal from "../../general/Modal";
import StyledButton from "../../general/StyledButton";

type DeleteProjectModalProps = {
    projectID?: string,
    image: Image,
    setMenu: Function,
    deleteImage: Function
}

function DeleteImageModal({ projectID, image, setMenu, deleteImage }: DeleteProjectModalProps) {

    const notifications = useContext(NotificationsContext);

    const handleDelete = async () => {
        await deleteDoc(doc(db, "projects/" + projectID + '/images/', image.id));
        await deleteObject(ref(storage, projectID + '/' + image.id));
        notifications.addNotification({
            id: crypto.randomUUID(),
            type: 'SUCCESS',
            message: `Deleted image ${image.name}!`
        });
        setMenu(null);
        deleteImage(image);
    }

    return (
        <Modal objModal setMenu={setMenu}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8 text-neutral-700">
                <div className="w-full flex justify-between items-center gap-8">
                    <h1 className="text-lg mono">Image delete</h1>
                    <FiX onClick={() => setMenu(null)} className="h-5 w-5 cursor-pointer"></FiX>
                </div>

                <hr className="w-full bg-neutral-300 border-0 h-px" />

                <p>Do you want to delete image <span className="font-bold text-emerald-500">{image.name}</span> permanently? This action is irreversible.</p>

                <hr className="w-full bg-neutral-300 border-0 h-px" />
                
                <div className="w-full flex justify-between items-center gap-4">
                    <div className="w-1/2">
                        <StyledButton onClick={() => setMenu(null)} text={'Cancel'}></StyledButton>
                    </div>
                    <div className="w-1/2">
                        <StyledButton onClick={handleDelete} text={'Delete'} color={'bg-red-300'}></StyledButton>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteImageModal;