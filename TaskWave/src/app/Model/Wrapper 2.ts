import { Card } from './Card';
export interface Wrapper {
    id: number | null | undefined;
    title: string | null | undefined;
    position: number | null | undefined;
    cards: Card[];
    projectsId: number | null | undefined;
}