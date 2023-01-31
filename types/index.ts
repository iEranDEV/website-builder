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

    type EditorElement = {
        id: string,
        type: 'ROOT_ELEMENT' | 'SECTION' | 'TEXT' | 'IMAGE' | 'CONTAINER',
        content: '',
        attributes: {
            width?: string,
            height?: string,
            backgroundColor?: string,
            color?: string,
        },
        parent: string | null,
        children: string[],
    }
}