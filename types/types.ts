export interface UsersResponse {
  id: string;
  name: string;
  email: string;
}

export interface PillResponse {
  id: string;
  name: string;
  quantity: number;
  hours: string[];
  measure: string;
  when?: string;
  description?: string;
}
export interface PacientResponse {
  id: string;
  name: string;
  description: string;
  users: UsersResponse[];
  pills: PillResponse[];
}