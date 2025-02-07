import { Role } from "@prisma/client";

export interface LoginAuthBodyDTO {
  email: string;
  password: string;
}

export interface RegisterAuthBodyDTO {
  email: string;
  name: string;
  password: string;
  role: Role;
}

export interface RegisterAuthResponse {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  role?: Role;
}

export interface LoginAuthResponse {
  access_token: string;
}

export interface IFilterUser {
  search?: string;
  page?: number;
  perPage?: number;
  role?: Role;
}
