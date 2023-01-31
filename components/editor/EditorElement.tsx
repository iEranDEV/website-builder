type EditorElementProps = {
    element: EditorElement | undefined,
    structure: EditorElement[] | undefined,
    setClickedElement: Function
}

function EditorElement({ element, structure, setClickedElement }: EditorElementProps) {



    return (
        <div onClick={() => setClickedElement(element)} style={element?.attributes} className='hover:outline outline-2 outline-emerald-500 outline-offset-2'>
            {element?.content}
            {structure?.filter((item) => element?.children.includes(item.id)).map((item) => {
                return <EditorElement key={item.id} element={item} structure={structure} setClickedElement={setClickedElement}></EditorElement>
            })}
        </div>
    )
}

export default EditorElement;