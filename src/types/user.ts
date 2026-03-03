export interface User {
  id: number;
  username: string;
  role: "admin" | "creator" | "user" | string;
}
