export {};

declare global {
    type Project = {
        _id: string,
        owner: string,
        name: string,
        description: string,
        createdAt: Date
    }

    type User = {
        _id: string,
        email: string,
        username: string,
        password: string,
        createdAt: Date
    }
}