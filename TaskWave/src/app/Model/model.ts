export interface Card {
    id: number;
    title: string;
    description: string;
    position: number;
    wrapperId: number;
    status: string;
    deadline: string; 
    memberId: number; 
}

// export interface CardDTO {
//     title: string;
//     description: string;
//     position: number;
//     wrapperId: number;
//     status: string;
// }

export type Project =  {
    id: number;
    title: string;
    description: string;
    background: string;
    wrappersIds: number[];
    usersId: number[];
}

export interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    projectsIds: number[];
}

// export interface UserDTO {
// 	id: number;
//     email: string;
//     password: string;
//     firstname: string;
//     lastname: string;
//     projectsIds: (number)[];
// }

export interface Wrapper {
    id: number;
    title: string;
    position: number;
    cardsIds: number[];
    projectId: number;
}

export interface CardDTO {
    title: string;
    description: string;
    position: number;
    wrapperId: number;
    status: string;
}

export interface LogsDTO {
	email: string;
	password: string;
}