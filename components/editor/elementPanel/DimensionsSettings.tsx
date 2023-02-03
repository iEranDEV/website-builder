import { useEffect, useState } from "react";
import { AiOutlineColumnHeight, AiOutlineColumnWidth, AiOutlinePlus } from "react-icons/ai";
import { BiArrowFromBottom, BiArrowFromLeft, BiArrowFromRight, BiArrowFromTop, BiArrowToLeft } from "react-icons/bi";

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

    const getAxisIcon = (val: 'X' | 'Y') => {
        if(val === 'X') {
            if(attributes?.left) return <BiArrowFromLeft className="h-5 w-5"></BiArrowFromLeft>
            else if(attributes?.right) return <BiArrowFromRight className="h-5 w-5"></BiArrowFromRight>
        } else if (val === 'Y') {
            if(attributes?.top) return <BiArrowFromTop className="h-5 w-5"></BiArrowFromTop>
            else if(attributes?.bottom) return <BiArrowFromBottom className="h-5 w-5"></BiArrowFromBottom>
        }
    }

    const getAxis = (val: 'X' | 'Y') => {
        if(val === 'X') {
            if(attributes?.left) return Number.parseInt(attributes.left?.substring(0, attributes.left.length - 2) as string);
            else if(attributes?.right) return Number.parseInt(attributes.right?.substring(0, attributes.right.length - 2) as string)
        } else if (val === 'Y') {
            if(attributes?.top) return Number.parseInt(attributes.top?.substring(0, attributes.top.length - 2) as string)
            else if(attributes?.bottom) return Number.parseInt(attributes.bottom?.substring(0, attributes.bottom.length - 2) as string)
        }
    }

    const updateAxis = (str: 'X' | 'Y', val: string) => {
        if(handleUpdate) {
            if(str === 'X') {
                if(attributes?.left) handleUpdate({...attributes, left: val});
                else if(attributes?.right) handleUpdate({...attributes, right: val});
            } else if (str === 'Y') {
                if(attributes?.top) handleUpdate({...attributes, top: val});
                else if(attributes?.bottom) handleUpdate({...attributes, bottom: val});
            }
        }
    }

    const updateDimension = (str: string) => {
        if(handleUpdate) {
            let val: string | undefined = '';
            switch(str) {
                case 'left':
                    val = attributes?.right;
                    handleUpdate({...attributes, right: undefined, left: val});
                    break;
                case 'right':
                    val = attributes?.left;
                    handleUpdate({...attributes, right: val, left: undefined});
                    break;
                case 'top':
                    val = attributes?.bottom;
                    handleUpdate({...attributes, bottom: undefined, top: val});
                    break;
                case 'bottom':
                    val = attributes?.top;
                    handleUpdate({...attributes, bottom: val, top: undefined});
                    break;
            }
        }
    }

    return (
        <>
        {attributes && handleUpdate && 
            <div className="flex flex-col gap-2">
                <p className="mono font-bold text-stone-400">Dimensions</p>
                <div className="flex w-full gap-2">
                    {/* X axis */}
                    <div className="w-1/2 flex gap-2 items-center">
                        {getAxisIcon('X')}
                        <input value={getAxis('X')} 
                            onChange={(e) => updateAxis('X', e.target.value + 'px')} 
                            type="number" className="w-full element-input"
                        />
                    </div>

                    {/* Y axis */}
                    <div className="w-1/2 flex gap-2 items-center">
                        {getAxisIcon('Y')}
                        <input value={getAxis('Y')} 
                            onChange={(e) => updateAxis('Y', e.target.value + 'px')} 
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
                    <select className="h-full w-20 rounded-xl border border-stone-300 bg-stone-100 font-semibold" value={widthType} onChange={(e) => {
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
                    <select className="h-full w-20 rounded-xl border border-stone-300 bg-stone-100 font-semibold" value={heightType} onChange={(e) => {
                        setHeightType(e.target.value);
                        handleUpdate({...attributes, height: parse(attributes.height) + e.target.value})
                    }}>
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="rem">rem</option>
                    </select>
                </div>

                {/* Constraints */}
                <div className="h-32 py-2 flex justify-between items-center">
                    {/* Visual box */}
                    <div className="w-28 h-auto aspect-square flex justify-center items-center">
                        <div className="relative w-16 h-16 border-2 border-stone-500 rounded-lg flex justify-center items-center">
                            <AiOutlinePlus className="text-stone-500 w-7 h-7"></AiOutlinePlus>

                            {/* Top */}
                            <span className={`w-[2px] h-3 absolute top-0 -translate-y-[140%] ${attributes.top ? 'bg-sky-500' : 'bg-stone-500'}`}></span>
                            {/* Bottom */}
                            <span className={`w-[2px] h-3 absolute bottom-0 translate-y-[140%] ${attributes.bottom ? 'bg-sky-500' : 'bg-stone-500'}`}></span>
                            {/* Left */}
                            <span className={`w-3 h-[2px] absolute left-0 top-1/2 -translate-x-[140%] -translate-y-1/2 ${attributes.left ? 'bg-sky-500' : 'bg-stone-500'}`}></span>
                            {/* Right */}
                            <span className={`w-3 h-[2px] absolute right-0 top-1/2 translate-x-[140%] -translate-y-1/2 ${attributes.right ? 'bg-sky-500' : 'bg-stone-500'}`}></span>
                        </div>
                    </div>

                    {/* Values dropdowns */}
                    <div className="w-24 h-full flex flex-col justify-around items-end">
                        <select className="h-8 w-24 rounded-xl border border-stone-300 bg-stone-100 font-semibold"
                            value={attributes.left ? 'left' : 'right'}
                            onChange={(e) => updateDimension(e.target.value)}
                        >
                            <option value="left">left</option>
                            <option value="right">right</option>
                        </select>
                        <select className="h-8 w-24 rounded-xl border border-stone-300 bg-stone-100 font-semibold"
                            value={attributes.top ? 'top' : 'bottom'}
                            onChange={(e) => updateDimension(e.target.value)}
                        >
                            <option value="top">top</option>
                            <option value="bottom">bottom</option>
                        </select>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default DimensionsSettings;