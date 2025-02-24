
export interface UserType {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
  subscriptionType?: string;
  isGAuth?: boolean;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
