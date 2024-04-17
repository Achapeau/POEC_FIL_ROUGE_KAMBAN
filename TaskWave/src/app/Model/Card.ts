
export interface Card {
    id: number;
    title: string | null | undefined;
    description: string | null | undefined;
    position: number;
    wrapperId: number | null | undefined;
    status: string | null | undefined;
} 