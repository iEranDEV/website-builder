import DropdownMenu from "@/components/general/DropdownMenu";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";

function LinkSettings({element, attributes, handleUpdate, updateField}: ElementSettingsProps) {
    const [linkType, setLinkType] = useState('select');
    const [projectPages, setProjectPages] = useState(Array<{value: string, text: string}>());

    const router = useRouter();

    const syncPages = async () => {
        const q = query(collection(db, "projects/" + router.query.id + '/pages/'));
        const arr = Array<{value: string, text: string}>();
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data() as Page;
            if(data.id !== router.query.pageID) {
                arr.push({value: data.id, text: data.name});
            }
        })
        setProjectPages(arr);
    }

    useEffect(() => {
        if(element?.link?.includes('page:')) setLinkType('local');
        else if(element?.link?.includes('url:')) setLinkType('external');

        syncPages();
    }, []);

    if(!element) return null;
    if(!attributes) return null;
    if(!handleUpdate) return null;
    if(!updateField) return null;

    const handleTypeChange = (val: string) => {
        setLinkType(val);
        updateField("link", "");
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="mono font-bold text-stone-400">Link settings</p>

            {/* Link type */}
            <div className="flex items-center gap-2 w-full">
                <DropdownMenu value={{value: 'select', text: 'Select link type'}} options={[
                    {value: 'select', text: 'Select link type'}, 
                    {value: 'external', text: 'External url'},
                    {value: 'local', text: 'Project page'} 
                ]} onChange={(val: string) => handleTypeChange(val)}></DropdownMenu>
            </div>

            {/* Link input */}
            {linkType !== 'select' && <div className="w-full flex gap-2 items-center">
                <FiLink className="w-6 h-6"></FiLink>
                {linkType === 'external' ?
                    <input type="text" value={element.link?.slice(4)} className="w-full element-input" placeholder="Enter url"
                    onChange={(e) => updateField("link", 'url:' + e.target.value)}
                />
                :
                    <DropdownMenu value={projectPages[0]} options={projectPages} onChange={(val: string) => updateField("link", 'page:' + val)}></DropdownMenu>
                }
            </div>}
        </div>
    )
}

export default LinkSettings;