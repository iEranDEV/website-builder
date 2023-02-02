export {};

declare global {
    type Page = {
        _id: string,
        name: string,
        structure: Array<EditorElement>,
        createdAt: Date,
        modifiedAt: Date,
        project: string
    }

    type User = {
        _id: string,
        email: string,
        username: string,
        password: string,
        createdAt: Date
    }

    type Project = {
        _id: string,
        owner: string,
        name: string,
        description: string,
        createdAt: Date,
        pages: Array<Page>
    }

    type ElementAttributes = {
        width: string,
        height: string,
        backgroundColor: string,
        color?: string,
        position?: any,
        top?: string,
        left?: string,
        fontWeight?: string,
        textDecoration?: string,
        fontStyle?: string
    }

    type EditorElement = {
        id: string,
        name: string,
        type: 'ROOT_ELEMENT' | 'SECTION' | 'TEXT' | 'IMAGE' | 'CONTAINER',
        content?: string,
        attributes: ElementAttributes,
        parent: string | null,
        children: string[],
    }

    type ElementSettingsProps = {
        element?: EditorElement | null,
        attributes?: ElementAttributes | null,
        handleUpdate?: Function,
        updateName?: Function,
        updateContent?: Function
    }
}