import { useEffect, useState } from "react";
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai";
import { TbAxisX, TbAxisY } from "react-icons/tb";


function DimensionsSettings({ attributes, handleUpdate}: ElementSettingsProps) {

    const [widthType, setWidthType] = useState('px');
    const [heightType, setHeightType] = useState('px');

    useEffect(() => {
        if(attributes?.width.includes('%')) setWidthType('%');
        else if(attributes?.width.includes('rem')) setWidthType('rem');

        if(attributes?.height.includes('%')) setHeightType('%');
        else if(attributes?.height.includes('rem')) setHeightType('rem');
    }, [attributes]);

    const parse = (val: string) => {
        const str = val.replace('px', '').replace('%', '').replace('rem', '');
        if(str !== '') {
            return Number.parseInt(str);
        }
        return 0;
    }

    return (
        <>
        {attributes && handleUpdate && 
            <div className="flex flex-col gap-2">
                <p className="mono font-bold text-stone-400">Dimensions</p>
                <div className="flex w-full gap-2">
                    {/* X axis */}
                    <div className="w-1/2 flex gap-2 items-center">
                        <TbAxisX className="h-5 w-5"></TbAxisX>
                        <input value={Number.parseInt(attributes.left?.substring(0, attributes.left.length - 2) as string)} 
                            onChange={(e) => handleUpdate({...attributes, left: e.target.value + 'px'})} 
                            type="number" className="w-full element-input"
                        />
                    </div>

                    {/* Y axis */}
                    <div className="w-1/2 flex gap-2 items-center">
                        <TbAxisY className="h-5 w-5"></TbAxisY>
                        <input value={Number.parseInt(attributes.top?.substring(0, attributes.top.length - 2) as string)} 
                            onChange={(e) => handleUpdate({...attributes, top: e.target.value + 'px'})} 
                            type="number" className="w-full element-input"
                        />
                    </div>
                </div>

                {/* Width */}
                <div className="flex items-center gap-2 w-full">
                    <AiOutlineColumnWidth className="h-6 w-6"></AiOutlineColumnWidth>
                    <input type="text" value={parse(attributes.width)}
                        onChange={(e) => handleUpdate({...attributes, width: e.target.value + widthType})}
                        className="w-32 element-input"
                    />
                    <select className="h-full w-20 rounded-xl border border-stone-300" value={widthType} onChange={(e) => {
                        setWidthType(e.target.value);
                        handleUpdate({...attributes, width: parse(attributes.width) + e.target.value})
                    }}>
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="rem">rem</option>
                    </select>
                </div>

                {/* Height */}
                <div className="flex items-center gap-2 w-full">
                    <AiOutlineColumnHeight className="h-6 w-6"></AiOutlineColumnHeight>
                    <input type="text" value={parse(attributes.height)}
                        onChange={(e) => handleUpdate({...attributes, height: e.target.value + heightType})}
                        className="w-32 element-input"
                    />
                    <select className="h-full w-20 rounded-xl border border-stone-300" value={heightType} onChange={(e) => {
                        setHeightType(e.target.value);
                        handleUpdate({...attributes, height: parse(attributes.height) + e.target.value})
                    }}>
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
        }
        </>
    )
}

export default DimensionsSettings;