import { db, storage } from "@/firebase";
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FiEdit, FiTrash, FiUploadCloud, FiX } from "react-icons/fi";

function ProjectImages({ onPick, setMenu }: {onPick?: Function, setMenu: Function}) {
    const [images, setImages] = useState(Array<Image>());

    const router = useRouter();
    const { id } = router.query;
    const uploadRef = useRef<HTMLInputElement>(null);

    const syncImages = async () => {
        const querySnapshot = await getDocs(collection(db, "projects/" + id + '/images/'));
        const arr = Array<Image>();
        querySnapshot.forEach((doc) => {
            arr.push(doc.data() as Image);
        })
        setImages(arr);
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if(!e.target.files) return;
        const files = Array.from(e.target.files);
        const arr = Array<Image>();
        for(const file of files) {
            const fileID = crypto.randomUUID();
            await uploadBytes(ref(storage, id + '/' + fileID), file).then(async (snapshot) => {
                await getDownloadURL(snapshot.ref).then(async (url) => {
                    const image: Image = {
                        id: fileID,
                        uploaded: Timestamp.now(),
                        url: url,
                        name: file.name,
                        type: file.type
                    }
                    await setDoc(doc(db, "projects/" + id + '/images/', fileID), image);
                    console.log(image);
                    arr.push(image);
                })
            })
        }
        setImages(arr);
    }

    const handlePick = (image: Image) => {
        if(!onPick) return;
        setMenu(false);
        onPick(image);
    }

    useEffect(() => {
        if(id) syncImages();
    }, [id]);

    return (
        <div className="w-screen h-screen fixed z-[150] top-0 left-0 flex justify-center items-center backdrop-blur-[1px] bg-neutral-400/50">
            <div className="bg-white shadow-xl h-full w-full md:w-5/6 md:h-5/6 rounded-xl p-4 flex flex-col gap-4 text-neutral-600">
                <div className="h-[5%] w-full flex justify-between items-center">
                    <div className="flex gap-4 items-end">
                        <h1 className="font-bold text-2xl mono gap-4">Images collection</h1>
                        {onPick && <span className="text-sky-500">(Select image)</span>}
                    </div>
                    <FiX onClick={() => setMenu(false)} className="h-7 w-7 cursor-pointer"></FiX>
                </div>

                <hr />


                <div className="w-full h-[90%] overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {images.map((image) => {
                        return (
                            <div onClick={() => handlePick(image)} key={image.id} className="w-full aspect-square flex flex-col gap-2 hover:bg-stone-200/80">
                                <img className="w-full aspect-square" src={image.url} alt={image.name} />
                                <div className="w-full p-2 flex justify-between items-end">
                                    <div className="w-1/2 flex flex-col">
                                        <p className="font-semibold">{image.name}</p>
                                        <p className="text-neutral-400">{image.uploaded.toDate().toLocaleDateString()}</p>
                                    </div>
                                    <div className="w-1/2 flex justify-end gap-2 items-end">
                                        <FiEdit onClick={(e) => e.stopPropagation()} className="h-5 w-5 cursor-pointer hover:text-sky-500"></FiEdit>
                                        <FiTrash onClick={(e) => e.stopPropagation()} className="h-5 w-5 cursor-pointer hover:text-red-500"></FiTrash>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>


                <hr />

                <div className="h-[5%] w-full flex justify-between items-center">
                    <button onClick={() => uploadRef.current?.click()} className="flex gap-2 justify-center items-center bg-sky-500 hover:bg-sky-600 transition-all text-neutral-100 rounded-xl px-8 py-2">
                        <FiUploadCloud className="h-5 w-5"></FiUploadCloud>
                        <p>Upload images</p>
                    </button>

                    <input multiple className="hidden" type="file" accept="image/png, image/jpeg" ref={uploadRef} onChange={(e) => handleUpload(e)} />
                </div>
            </div>
        </div>
    )
}

export default ProjectImages;