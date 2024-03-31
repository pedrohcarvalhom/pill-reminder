export interface Pill {
  name: string;
  id: number;
  quantity: number;
  hour: {
    id: number;
    time: string;
    checked: boolean;
    checkedAt: Date | null;
  }[];
  measure: string;
  when: string | null;
  description: string | null;
}

export interface UsersResponse {
  id: string;
  name: string;
  email: string;
}

export interface HourResponse {
  id?: string;
  time?: string;
  checked?: boolean;
  checkedAt?: Date;
  pillId?: number;
}

export interface PillResponse {
  id: string;
  name: string;
  quantity: number;
  hours: HourResponse[];
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