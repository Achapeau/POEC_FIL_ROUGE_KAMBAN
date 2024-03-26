export interface ProjectDTO {
	id: number | null | undefined;
	title: string | null | undefined;
	description: string | null | undefined;
	background: string | null | undefined;
	wrappersIds: number[] | null | undefined;
	userIds: number[] | null | undefined;
}