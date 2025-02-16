import { Github } from "lucide-react";
import Footer from "@/components/common/users/Footer";
import Header from "@/components/common/users/Header";
import Button from "@/components/common/skeleton/FormSubmitButton";
import TechIcon from "@/components/common/skeleton/FormTechIcon";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { signupSchema } from "@/utils/validationSchemas/signupSchema";
import InputField from "@/components/common/skeleton/InputField";
import { UserSignupFormType } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/useRedux";
import { findUserEmailAction } from "@/redux/store/actions/auth/findEmailAction";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { sendVerificationEmail } from "@/redux/store/actions/auth/sendVerificationEmail";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (data: UserSignupFormType) => {

    const response1 = await dispatch(findUserEmailAction(data.email));

    console.log(response1, "response");

    if (response1.payload.success) {
      return toast.error("Email already exists!!");
    } else {

      let allDatas = {
        ...data
      }

      dispatch(sendVerificationEmail(data.email));

      navigate('/otp', {state: allDatas})

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
            <TechIcon label="JS" bgColor="bg-yellow-400" textColor="text-black" />
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
            <h1 className="text-4xl font-ubuntu-mono mb-2 dark:text-white">Sign Up</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Welcome to CodeAurora</p>
          </div>

          {/* Sign-in Buttons */}
          <div className="space-y-4">
            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-50 transition-colors">
              <img src="/api/placeholder/24/24" alt="Google logo" className="w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">Sign in with Google</span>
            </button>

            {/* GitHub Sign In */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-50 transition-colors">
              <Github className="w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">Sign in with GitHub</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
              <Form className="flex flex-col gap-3 m-1">
                {/* Input Fields */}
                <InputField type="text" placeholder="Username" name="userName" />
                <InputField type="email" placeholder="Email address" name="email" />
                <InputField type="password" placeholder="Password" name="password" />
                <InputField type="password" placeholder="Confirm Password" name="confirmPassword" />
                <Button type="submit">Sign up</Button>
              </Form>
            </Formik>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Already have an account on CodeAurora?{" "}
            <Link to={"/signin"} className="text-orange-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Signup;