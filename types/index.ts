export {};

declare global {
    type Page = {
        _id: string,
        name: string,
        structure: Array<any>,
        createdAt: Date,
        modifiedAt: Date,
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
}