import { Timestamp } from "firebase/firestore";

export {};

declare global {
    type Page = {
        id: string,
        name: string,
        structure: Array<EditorElement>,
        createdAt: Timestamp,
        modifiedAt: Timestamp,
        project: string
    }

    type User = {
        id: string,
        email: string,
        username: string,
        createdAt: Date
    }

    type Project = {
        id: string,
        owner: string,
        name: string,
        description: string,
        createdAt: Timestamp
    }

    type ElementAttributes = {
        width: string,
        height: string,
        backgroundColor: string,
        color?: string,
        position?: any,
        top?: string,
        left?: string,
        bottom?: string,
        right?: string,
        fontWeight?: string,
        textDecoration?: string,
        fontStyle?: string,
        fontSize?: string,
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