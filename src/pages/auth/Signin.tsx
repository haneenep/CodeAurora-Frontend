import Footer from "../../components/common/users/Footer";
import Header from "../../components/common/users/Header";
import { Github } from "lucide-react";
import Button from "../../components/common/skeleton/FormSubmitButton";
import TechIcon from "../../components/common/skeleton/FormTechIcon";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { signinSchema } from "@/utils/validationSchemas/signinSchema";
import InputField from "@/components/common/skeleton/InputField";
import { UserSiginFormType, UserSignupFormType } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/useRedux";
import { toast } from "sonner";
import { signinAction } from "@/redux/store/actions/auth/signinAction";
import { signupAction } from "@/redux/store/actions/auth/signupActions";
import { googleAuthAction } from "@/redux/store/actions/auth/googleAuthAction";
import { setUserData } from "@/redux/store/slices/user";
import { GoogleLogin } from "@react-oauth/google";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (data: UserSiginFormType) => {
    const response = await dispatch(signinAction(data));

    console.log(response, "after signin");

    if (response.payload.success) {
      const userRole = response.payload.data.role;
      dispatch(setUserData(response.payload.data));
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      console.log("error side", response.payload.message);
      toast.error(response.payload.message);
    }
    
  };

  const handleLoginWithGoogle = async (credential: any) => {
    console.log(credential, "google credentials");
    try {
      const response = await dispatch(googleAuthAction(credential));

      if (
        response.payload.existingUser &&
        response.payload.data.isGAuth &&
        !response.payload.data.isBlocked
      ) {
        console.log("existing user and google auth is here");
        dispatch(setUserData(response.payload.data));
        navigate("/");
        return;
      } else if (
        response.payload.existingUser &&
        !response.payload.data.isGAuth
      ) {
        toast.error("Account is allready registered", {
          description:
            "Account allready created without using google auth, can't login using google",
          duration: 5000,
          position: "top-right",
        });
        return;
      } else if (
        response.payload.existingUser &&
        response.payload.data.isBlocked
      ) {
        toast.error("Account is blocked", {
          description:
            "CodeAurora team blocked your account",
          duration: 5000,
        });
        return;
      } else {
        const allDatas: UserSignupFormType = {
          email: response.payload.data.email,
          password: response.payload.data.password,
          userName: response.payload.data.userName,
          isGAuth: true,
          role: "user",
        };
        const responseSignup = await dispatch(signupAction(allDatas));

        if (responseSignup.payload.success) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error, "login failed");
      toast.error("Something is wrong while logging with google");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Static Tech Icons Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Left side icons */}
          <div className="absolute top-16 left-20">
            <TechIcon
              label="JS"
              bgColor="bg-yellow-400"
              textColor="text-black"
            />
          </div>
          <div className="absolute top-40 left-40">
            <TechIcon label="Py" bgColor="bg-blue-500" />
          </div>
          <div className="absolute top-72 left-24">
            <TechIcon label="TS" bgColor="bg-blue-600" />
          </div>
          <div className="absolute top-96 left-48">
            <TechIcon label="Go" bgColor="bg-cyan-500" />
          </div>

          {/* Right side icons */}
          <div className="absolute top-20 right-32">
            <TechIcon label="⚛️" bgColor="bg-cyan-400" textColor="text-black" />
          </div>
          <div className="absolute top-48 right-20">
            <TechIcon label="Vue" bgColor="bg-green-500" />
          </div>
          <div className="absolute top-80 right-36">
            <TechIcon label="Rust" bgColor="bg-orange-500" />
          </div>
          <div className="absolute bottom-32 right-24">
            <TechIcon label="SQL" bgColor="bg-purple-500" />
          </div>

          {/* Additional scattered icons */}
          <div className="absolute bottom-40 left-32">
            <TechIcon label="C++" bgColor="bg-blue-700" />
          </div>
          <div className="absolute top-60 right-60">
            <TechIcon label="PHP" bgColor="bg-indigo-500" />
          </div>
          <div className="absolute bottom-60 right-52">
            <TechIcon label="Java" bgColor="bg-red-500" />
          </div>

          {/* Code symbols */}
          <div className="absolute top-32 left-96">
            <TechIcon label="{ }" bgColor="bg-gray-700" />
          </div>
          <div className="absolute bottom-48 right-96">
            <TechIcon label="</>" bgColor="bg-gray-800 dark:bg-violet-700" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-ubuntu-mono mb-2 dark:text-white">
              Sign in
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Welcome Back to CodeAurora
            </p>
          </div>

          {/* Sign-in Buttons */}
          <div className="space-y-4">
            {/* Google Sign In */}
            <GoogleLogin
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
              width="380"
            />

            {/* GitHub Sign In */}
            {/* <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-50 transition-colors">
              <Github className="w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">Sign in with GitHub</span>
            </button> */}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Input Fields */}
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={signinSchema}
            >
              <Form className="flex flex-col gap-3 m-1">
                <InputField
                  type="email"
                  placeholder="Email address"
                  name="email"
                />
                <div className="space-y-1">
                  <InputField
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <div className="text-right">
                    <Link
                      to="/confirm-mail"
                      className="text-sm text-indigo-400 hover:text-indigo-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <Button type="submit">Sign in</Button>
              </Form>
            </Formik>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            No account?{" "}
            <Link to={"/signup"} className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
