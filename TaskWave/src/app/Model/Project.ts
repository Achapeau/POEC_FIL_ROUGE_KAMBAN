import { Wrapper } from './Wrapper';
import { User } from './User';
export interface Project {
    id: number;
    title: string | null | undefined;
    description: string | null | undefined;
    background: string | null | undefined;
    wrappers: Wrapper[] | [];
    users: User[] | null | undefined;
}