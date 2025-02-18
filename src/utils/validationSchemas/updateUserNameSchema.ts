import * as Yup from "yup";

export const updateUsernameSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[^\s].*[^\s]$/, "Username cannot have spaces at start or end")
    .matches(/^\S*$/, "Username cannot contain spaces between characters")
    .required("Username is required"),
});
