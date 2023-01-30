export {};

declare global {
    type Page = {
        _id: string,
        name: string,
        structure: Array<any>,
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

    enum ElementType {
        ROOT_ELEMENT,
        SECTION,
        TEXT,
        IMAGE,
        BOX
    }

    type EditorElement = {
        id: string,
        type: ElementType,
        attributes: Map<string, string | number>,
        parent: string | null,
        children: string[],
    }
}