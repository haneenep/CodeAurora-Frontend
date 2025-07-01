import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Camera, Check, X, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "../common/users/Header";
import Footer from "../common/users/Footer";
import { updateUserNameAction } from "@/redux/store/actions/user/updateUserNameAction";
import { getUserDataAction } from "@/redux/store/actions/auth/getUserDataAction";
import { updateUserPasswordAction } from "@/redux/store/actions/user/updateUserPasswordAction";
import { toast } from "sonner";
import { UploadImage } from "@/utils/cloudinary/uploadImage";
import {
  validateName,
  validatePasswords,
  validateProfilePicture,
} from "@/utils/validationSchemas/editProfileSchemas";

interface StatusMessage {
  success: boolean;
  error: boolean;
  message: string;
}

interface ValidationError {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  profilePicture?: string;
}

const EditProfile = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(userData?.userName || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [personalInfoStatus, setPersonalInfoStatus] = useState<StatusMessage>({
    success: false,
    error: false,
    message: "",
  });

  const [passwordStatus, setPasswordStatus] = useState<StatusMessage>({
    success: false,
    error: false,
    message: "",
  });

  const [error, setError] = useState<ValidationError>({});

  const handleNameValidation = () => {
    return validateName(name, setError);
  };

  const handleProfilePictureValidation = (file: File | null) => {
    return validateProfilePicture(file, setError);
  };

  const handlePasswordValidation = () => {
    return validatePasswords(
      currentPassword,
      newPassword,
      confirmPassword,
      setError
    );
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files, "image");
    if (files && files[0]) {
      const file = files[0];

      if (handleProfilePictureValidation(file)) {
        setProfilePicture(file);
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.error(error.profilePicture || "Invalid image file");
      }
    }
  };

  const triggerFileInput = (): void => {
    console.log("triggerfile");
    if (fileInputRef.current) {
      console.log("clicked", fileInputRef.current);
      fileInputRef.current.click();
    }
  };

  const handleUpdatePersonalInfo = async (): Promise<void> => {
    if (!handleNameValidation()) {
      toast.error("Please fix the error before saving");
      return;
    }

    if (profilePicture && !handleProfilePictureValidation(profilePicture)) {
      toast.error("Please select a valid JPG image");
      return;
    }

    try {
      let profileUrl = null;

      if (profilePicture) {
        profileUrl = await UploadImage(profilePicture);
      }

      let data = {
        userName: name,
        email: userData?.email || "",
        profile: profileUrl || userData?.profileImage,
      };

      const r = await dispatch(updateUserNameAction(data));
      console.log(r, "updateUserNameAction response");

      const res = await dispatch(getUserDataAction());
      console.log(res, "getUserDataAction response");

      setPersonalInfoStatus({
        success: true,
        error: false,
        message: "Personal information updated successfully!",
      });

      setTimeout(() => {
        setPersonalInfoStatus({ success: false, error: false, message: "" });
      }, 3000);
    } catch (error) {
      setPersonalInfoStatus({
        success: false,
        error: true,
        message: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (!handlePasswordValidation()) {
      toast.error("Please fix the password errors before updating");
      return;
    }

    const response = await dispatch(
      updateUserPasswordAction({
        currentPassword,
        newPassword,
        email: userData?.email,
      })
    );

    console.log(response, "updatepassword reponse");

    if (updateUserPasswordAction.fulfilled.match(response)) {
      setTimeout(() => {
        setPasswordStatus({
          success: true,
          error: false,
          message: "Password updated successfully!",
        });

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setPasswordStatus({ success: false, error: false, message: "" });
        }, 3000);
      }, 1000);
    } else {
      toast.error("Current password is not matching");
    }
  };

  const handleCancel = (): void => {
    navigate("/user-profile");
  };

  const renderFieldError = (errorMsg?: string) => {
    if (!errorMsg) return null;
    return (
      <div className="text-red-500 text-sm flex items-center mt-1">
        <AlertCircle className="w-3 h-3 mr-1" />
        {errorMsg}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <Button variant="outline" onClick={handleCancel}>
              Back to Profile
            </Button>
          </div>

          <Tabs defaultValue="personal-info" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal-info" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Account Settings
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal-info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center space-y-4">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-background dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center cursor-pointer relative group"
                      onClick={triggerFileInput}
                    >
                      {profilePicture ? (
                        <img
                          src={URL.createObjectURL(profilePicture)}
                          className="w-full h-full object-cover"
                          alt="Profile Preview"
                        />
                      ) : userData?.profileImage ? (
                        <img
                          src={userData?.profileImage}
                          className="w-full h-full object-cover"
                          alt="Profile Preview"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                          {userData?.userName?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/jpg"
                      onChange={handleProfilePictureChange}
                    />
                    <span className="text-sm text-muted-foreground">
                      Click to upload a new profile picture(JPG only)
                    </span>
                    {renderFieldError(error.profilePicture)}
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      placeholder="Your name"
                      className={error.name ? "border-red-500" : ""}
                    />
                    {renderFieldError(error.name)}
                  </div>

                  {/* Email Input (Non-editable) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={userData?.email || "user@example.com"}
                      readOnly
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Status Message */}
                  {personalInfoStatus.message && (
                    <Alert
                      className={`${
                        personalInfoStatus.success
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {personalInfoStatus.success ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <AlertDescription>
                          {personalInfoStatus.message}
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}

                  {/* Save Button */}
                  <div className="pt-4">
                    <Button
                      onClick={handleUpdatePersonalInfo}
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCurrentPassword(e.target.value)
                      }
                      placeholder="Enter your current password"
                      className={error.currentPassword ? "border-red-500" : ""}
                    />
                    {renderFieldError(error.currentPassword)}
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewPassword(e.target.value)
                      }
                      placeholder="Enter your new password"
                      className={error.newPassword ? "border-red-500" : ""}
                    />
                    {renderFieldError(error.newPassword)}
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your new password"
                      className={error.confirmPassword ? "border-red-500" : ""}
                    />
                    {renderFieldError(error.confirmPassword)}
                  </div>

                  {/* Status Message */}
                  {passwordStatus.message && (
                    <Alert
                      className={`${
                        passwordStatus.success
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {passwordStatus.success ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <AlertDescription>
                          {passwordStatus.message}
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}

                  {/* Save Button */}
                  <div className="pt-4">
                    <Button
                      onClick={handleUpdatePassword}
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
