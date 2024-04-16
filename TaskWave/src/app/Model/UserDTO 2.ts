export interface UserDTO {
	id: number | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    firstname: string | null | undefined;
    lastname: string | null | undefined;
    projectsIds: (number | null | undefined)[] | undefined;
}