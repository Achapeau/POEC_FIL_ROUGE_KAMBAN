import { TaskStatus } from './TaskStatus';
export interface Card {
    id: number;
    title: string | null | undefined;
    description: string | null | undefined;
    position: number;
    wrapperId: number | null | undefined;
    status: string | null | undefined;
    dueDate: Date | null; 
    assignedTo: number | null; 
}
