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
        left?: string
    }

    type EditorElement = {
        id: string,
        type: 'ROOT_ELEMENT' | 'SECTION' | 'TEXT' | 'IMAGE' | 'CONTAINER',
        content: '',
        attributes: ElementAttributes,
        parent: string | null,
        children: string[],
    }
}