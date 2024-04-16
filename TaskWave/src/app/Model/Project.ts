import { Wrapper } from './Wrapper';
import { User } from './User';
import { UserDTO } from './UserDTO';
export interface Project {
    id: number;
    title: string | null | undefined;
    description: string | null | undefined;
    background: string | null | undefined;
    wrappersIds: number[] | [];
    users: UserDTO[] | [];
}