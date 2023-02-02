import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai";
import { TbAxisX, TbAxisY } from "react-icons/tb";


function DimensionsSettings({ attributes, handleUpdate}: ElementSettingsProps) {

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
                    <input type="text" value={attributes.width}
                        onChange={(e) => handleUpdate({...attributes, width: e.target.value})}
                        className="w-48 element-input"
                    />
                </div>

                {/* Height */}
                <div className="flex items-center gap-2 w-full">
                    <AiOutlineColumnHeight className="h-6 w-6"></AiOutlineColumnHeight>
                    <input type="text" value={attributes.height}
                        onChange={(e) => handleUpdate({...attributes, height: e.target.value})}
                        className="w-48 element-input"
                    />
                </div>
            </div>
        }
        </>
    )
}

export default DimensionsSettings;