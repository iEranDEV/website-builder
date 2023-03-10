import { useRef } from "react";
import { BiBold, BiColorFill, BiFontSize, BiItalic, BiUnderline } from "react-icons/bi";
import { MdContentPaste } from "react-icons/md";

function TextSettings({element, attributes, handleUpdate, updateField}: ElementSettingsProps) {

    const textColorRef = useRef<HTMLInputElement>(null);

    return (
        <>
        {attributes && element && handleUpdate && updateField &&
            <div className="flex flex-col gap-2">
                <p className="mono font-bold text-stone-400">Text</p>

                {/* Text content */}
                <div className="flex items-center gap-2 w-full">
                    <MdContentPaste className="h-6 w-6"></MdContentPaste>
                    <textarea cols={10} rows={3} value={element.content}
                        onChange={(e) => updateField("content", e.target.value)}
                        className="w-full element-input"
                    />
                </div>

                {/* Text color */}
                <div className="flex items-center gap-2 w-full">
                    <BiColorFill className="h-6 w-6"></BiColorFill>
                    <input ref={textColorRef} value={attributes.color}
                        onChange={(e) => handleUpdate({...attributes, color: e.target.value})}
                        type="color" className="w-0 h-0 invisible" 
                    />
                    <div onClick={() => textColorRef.current?.click()} className="w-6 h-6 rounded-lg border aspect-square cursor-pointer" style={{backgroundColor: attributes.color}}></div>
                    <input type="text" value={attributes.color}
                        onChange={(e) => handleUpdate({...attributes, color: e.target.value})}
                        className="w-[10.5rem] element-input"
                    />
                </div>

                {/* Font */}
                <div className="grid grid-cols-2 w-full gap-2">
                    {/* Font size */}
                    <div className="flex items-center gap-2 w-full">
                        <BiFontSize className="h-6 w-6"></BiFontSize>
                        <input type="number" value={Number.parseInt(attributes.fontSize?.substring(0, attributes.fontSize.length - 2) as string)}
                            onChange={(e) => handleUpdate({...attributes, fontSize: e.target.value + 'px'})}
                            className="w-full element-input"
                        />
                    </div>

                    {/* Text attributes */}
                    <div className="flex items-center gap-2 w-full justify-end">
                        {/* Bold */}
                        <button onClick={() => {
                            if(attributes.fontWeight === 'normal') handleUpdate({...attributes, fontWeight: 'bold'});
                            else handleUpdate({...attributes, fontWeight: 'normal'});
                        }} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.fontWeight === 'bold' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                            <BiBold className="h-5 w-5"></BiBold>
                        </button>
                        {/* Italic */}
                        <button onClick={() => {
                            if(attributes.fontStyle === 'normal') handleUpdate({...attributes, fontStyle: 'italic'});
                            else handleUpdate({...attributes, fontStyle: 'normal'});
                        }} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.fontStyle === 'italic' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                            <BiItalic className="h-5 w-5"></BiItalic>
                        </button>
                        {/* Underline */}
                        <button onClick={() => {
                            if(attributes.textDecoration === 'none') handleUpdate({...attributes, textDecoration: 'underline'});
                            else handleUpdate({...attributes, textDecoration: 'none'});
                        }} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.textDecoration === 'underline' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                            <BiUnderline className="h-5 w-5"></BiUnderline>
                        </button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default TextSettings;