import { User } from "./user";

export type CreateAdminResponse = {
  message: string;
  user: User;
};