function LinkSettings({element, attributes, handleUpdate, updateField}: ElementSettingsProps) {

    if(!element) return null;
    if(!attributes) return null;
    if(!handleUpdate) return null;
    if(!updateField) return null;

    return (
        <div className="flex flex-col gap-2">
            <p className="mono font-bold text-stone-400">Text</p>

            {/* Text content */}
            <div className="flex items-center gap-2 w-full">
                {/*<MdContentPaste className="h-6 w-6"></MdContentPaste>*/}
                <textarea cols={10} rows={3} value={element.content}
                    onChange={(e) => updateField("content", e.target.value)}
                    className="w-full element-input"
                />
            </div>
        </div>
    )
}

export default LinkSettings;