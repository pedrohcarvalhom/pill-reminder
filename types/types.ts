export interface UsersResponse {
  id: string;
  name: string;
  email: string;
}
export interface PacientResponse {
  id: string;
  name: string;
  description: string;
  users: UsersResponse[]
}