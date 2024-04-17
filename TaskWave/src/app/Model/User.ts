import { Project } from './Project';
export interface User {
    id: number | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    firstname: string | null | undefined;
    lastname: string | null | undefined;
    projects: Project[];
}