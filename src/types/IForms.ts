export interface UserSignupFormType {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    isGAuth?: boolean;
    role?: string;
    isBlocked?: boolean;
    isAdmin?: boolean;
    profileImage?: string
  }

export interface UserSiginFormType {
  email: string;
  password: string;
}