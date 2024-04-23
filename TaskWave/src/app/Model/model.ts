export interface Card {
  id: number;
  title: string;
  description: string;
  position: number;
  wrapperId: number;
  status: string;
  dueDate: string | null;
  assignedTo: number | null;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  background: string;
  wrappersIds: number[];
  userIds: number[];
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  projectsIds: number[];
  token: Token;
}

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

export interface Themes {
  name: string;
  background: string;
}

export interface Token {
  token: string;
  expiresIn: number;
}
