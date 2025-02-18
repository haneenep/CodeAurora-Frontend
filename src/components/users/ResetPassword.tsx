import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import InputField from "../common/skeleton/InputField";
import { ResetPasswordSchema } from "@/utils/validationSchemas/resetPasswordSchema";
import { useAppDispatch } from "@/hooks/useRedux";
import { resetPasswordAction } from "@/redux/store/actions/auth/resetPasswordAction";
import { toast } from "sonner";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {

  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
  };

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  console.log(searchParams,"paaraams",token);
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    console.log(values, "resetpassword");

    setServerError("");

    if(!token){
        console.error("Token is missing");
        return;        
    }

    try {
        const response = await dispatch(resetPasswordAction({token, password: values.password}));

        if(response.payload.success){
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSuccess(true);
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
        } else {
            toast.error("Password change failed");
        }

    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Button>

        <Card className="w-full border-none shadow-lg">
          <CardHeader className="space-y-6">
            <div className="w-full flex justify-center">
              <div className="w-40 h-40 relative">
                <DotLottieReact
                  src="https://lottie.host/ef4ffb52-1037-43db-9629-65cb75a8204e/f0dRsfO7Po.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-center text-base">
                Please enter your new password below.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {!isSuccess ? (
              <Formik
                initialValues={initialValues}
                validationSchema={ResetPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <InputField
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2.5 h-8 w-8 px-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>
                      </div>

                      <div className="relative">
                        <InputField
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2.5 h-8 w-8 px-0"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>
                      </div>
                    </div>

                    {serverError && (
                      <Alert variant="destructive" className="text-base">
                        <AlertDescription>{serverError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="text-sm text-muted-foreground">
                      Password must contain:
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                        <li>One special character</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Resetting Password...
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : (
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 text-base">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Your password has been successfully reset! Redirecting to
                  login...
                </AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <span className="text-muted-foreground text-base">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-orange-600 dark:text-orange-400 font-medium"
              >
                Log in
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
