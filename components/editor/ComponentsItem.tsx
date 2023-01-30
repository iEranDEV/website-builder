type ComponentsItemProps = {
    children: JSX.Element,
    text: string,
}

function ComponentsItem({ children, text }: ComponentsItemProps) {

    return (
        <div className="w-full h-10 text-stone-700 flex gap-4 items-center cursor-pointer px-2 hover:bg-stone-300/60" draggable>
            {children}
            <p className="mono">{text}</p>
        </div>
    )
}

export default ComponentsItem;