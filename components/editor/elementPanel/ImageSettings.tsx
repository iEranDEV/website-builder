import ProjectImages from "@/components/project/images/ProjectImages";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

function ImageSettings({element, updateField}: ElementSettingsProps) {
    const [imagesModal, setImagesModal] = useState(false);

    if(!element) return null;
    if(!updateField) return null;

    const handlePick = (image: Image) => {
        updateField("image", {id: image.id, src: image.url});
    }

    return (
        <div className={`flex flex-col gap-2 ${imagesModal && 'z-[200] relative'}`}>
            <p className="mono font-bold text-stone-400">Image</p>

            {/* Link type */}
            <button onClick={() => setImagesModal(true)} className="flex gap-2 w-full justify-center items-center bg-sky-500 hover:bg-sky-600 transition-all text-neutral-100 rounded-xl p-2">
                <FiImage className="h-5 w-5"></FiImage>
                <p>Open images collection</p>
            </button>

            {imagesModal && <ProjectImages onPick={handlePick} setMenu={setImagesModal}></ProjectImages>}

        </div>
    )
}

export default ImageSettings;