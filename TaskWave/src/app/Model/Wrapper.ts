import { Card } from './Card';
export interface Wrapper {
    id: number | null | undefined;
    title: string | null | undefined;
    position: number;
    cardsIds: number[];
    projectId: number;
}