
function ElementPanel({clickedElement, setClickedElement} : {clickedElement: EditorElement | null, setClickedElement: Function}) {

    return (
        <div className={`w-60 p-2 min-w-[15rem] max-w-[15rem] h-full bg-stone-200 border-l border-stone-400 overflow-x-auto flex flex-col gap-2`}>
            test
        </div>
    )
}

export default ElementPanel;