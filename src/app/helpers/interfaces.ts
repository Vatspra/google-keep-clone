export interface UserInfo {
    email: string;
    password: string,
    notes?: NoteItem[]
}

export interface NoteItem {
    title: string;
    list?: List[];
    note?: string;
    img?: string;
    id: number;
}

export interface List {
    completed: boolean;
    item: string;
    id: number;
}

export enum FileType {
    Image = 'image'
}