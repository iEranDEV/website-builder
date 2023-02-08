import { TbLayoutAlignBottom, TbLayoutAlignCenter, TbLayoutAlignLeft, TbLayoutAlignMiddle, TbLayoutAlignRight, TbLayoutAlignTop } from "react-icons/tb";

function SpacingSettings({element, attributes, handleUpdate}: ElementSettingsProps) {

    if(!element) return null;
    if(!attributes) return null;
    if(!handleUpdate) return null;

    return (
        <div className="flex flex-col gap-2">
            <p className="mono font-bold text-stone-400">Spacing</p>

            {/* Flex properties */}
            <div className="w-full gap-2 grid grid-cols-2">

                {/* Left -> Right */}
                <div className="w-full flex items-center justify-start gap-2">

                    {/* Justify start */}
                    <button onClick={() => handleUpdate({...attributes, justifyContent: 'start'})} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.justifyContent === 'start' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                        <TbLayoutAlignLeft className="h-5 w-5"></TbLayoutAlignLeft>
                    </button>

                    {/* Justify center */}
                    <button onClick={() => handleUpdate({...attributes, justifyContent: 'center'})} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.justifyContent === 'center' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                        <TbLayoutAlignCenter className="h-5 w-5"></TbLayoutAlignCenter>
                    </button>

                    {/* Justify end */}
                    <button onClick={() => handleUpdate({...attributes, justifyContent: 'end'})} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.justifyContent === 'end' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                        <TbLayoutAlignRight className="h-5 w-5"></TbLayoutAlignRight>
                    </button>
                </div>

                {/* Top -> Bottom */}
                <div className="w-full flex items-center justify-end gap-2">

                    {/* Align start */}
                    <button onClick={() => handleUpdate({...attributes, alignItems: 'start'})} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.alignItems === 'start' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                        <TbLayoutAlignTop className="h-5 w-5"></TbLayoutAlignTop>
                    </button>

                    {/* Align center */}
                    <button onClick={() => handleUpdate({...attributes, alignItems: 'center'})} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.alignItems === 'center' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                        <TbLayoutAlignMiddle className="h-5 w-5"></TbLayoutAlignMiddle>
                    </button>

                    {/* Align end */}
                    <button onClick={() => handleUpdate({...attributes, alignItems: 'end'})} className={`h-7 w-7 bg-stone-100 border rounded flex justify-center items-center ${attributes.alignItems === 'end' ? 'border-sky-500 text-sky-500' : 'border-neutral-400 text-neutral-700'}`}>
                        <TbLayoutAlignBottom className="h-5 w-5"></TbLayoutAlignBottom>
                    </button>
                </div>
            </div>

            
        </div>
    )
}

export default SpacingSettings;