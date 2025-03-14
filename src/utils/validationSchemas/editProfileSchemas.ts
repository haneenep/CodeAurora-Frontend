export const validateName = (
  name: string,
  setError: (errorSetter: (prev: any) => any) => void
): boolean => {
  if (!name.trim()) {
    setError((prev) => ({ ...prev, name: "Name is required" }));
    return false;
  }

  if (name.trim().length < 3) {
    setError((prev) => ({
      ...prev,
      name: "Name must be at least 3 characters",
    }));
    return false;
  }

  setError((prev) => ({ ...prev, name: undefined }));
  return true;
};

export const validateProfilePicture = (
  file: File | null,
  setError: (errorSetter: (prev: any) => any) => void
): boolean => {
  if (!file) return true;

  const validExtensions = ["image/jpeg", "image/jpg"];
  if (!validExtensions.includes(file.type)) {
    setError((prev) => ({
      ...prev,
      profilePicture: "Only JPG/JPEG images are allowed",
    }));
    return false;
  }

  if (file.size > 2 * 1024 * 1024) {
    setError((prev) => ({
      ...prev,
      profilePicture: "Image size should be less than 2MB",
    }));
    return false;
  }

  setError((prev) => ({ ...prev, profilePicture: undefined }));
  return true;
};

export const validatePasswords = (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  setError: (errorSetter: (prev: any) => any) => void
): boolean => {
  let isValid = true;
  const newErrors: any = {};

  const isPasswordUpdateAttempted =
    currentPassword || newPassword || confirmPassword;

  if (isPasswordUpdateAttempted) {
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase & number";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
  }

  setError((prev) => ({ ...prev, ...newErrors }));
  return isValid;
};
