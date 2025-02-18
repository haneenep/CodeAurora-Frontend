import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useRedux";
import { verifyOtpAction } from "@/redux/store/actions/auth/verifyOtpAction";
import { signupAction } from "@/redux/store/actions/auth/signupActions";
import { toast } from "sonner";
import { sendVerificationEmail } from "@/redux/store/actions/auth/sendVerificationEmail";

const OtpSection = () => {

  
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!location.state?.email){
      navigate('/signup')
      return;
    }
  },[location.state,navigate])

  let length = 6;
  let resentTime = 180

  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(resentTime);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResendOtp = async () => {

    try {
      setTimeLeft(resentTime);
      setCanResend(false);
      await dispatch(sendVerificationEmail(location.state.email));
      toast.success("OTP resent successfully");

    } catch (error) {
      toast.error("Failed to resend OTP");

    } finally {
      setOtp(new Array(length).fill(""));
      setIsComplete(false);
      inputRef.current[0]?.focus();
    }
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!isNaN(Number(value)) && value !== " ") {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (index < length - 1 && value) {
        inputRef.current[index + 1]?.focus();
      }

      setIsComplete(newOtp.every((digit) => digit !== ""));
    }
  };

  const handleDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!otp[index] && e.key === "Backspace" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (isComplete) {
      const submittedOtp = otp.join("");
  
      try {
        const response = await dispatch(
          verifyOtpAction({ email: location.state.email, otp: submittedOtp })
        );
  
        if (!response.payload?.success) {
          toast.error("you entered wrong otp");
          return;
        }
  
        const response1 = await dispatch(signupAction(location.state));
  
        if (response1.payload?.success) {
          window.location.reload()
          navigate("/");
        } else {
          toast.error(response1.payload?.error || "Signup failed");
        }
      } catch (error) {
        toast.error("An error occurred during OTP verification");
      } finally {
        setOtp(new Array(length).fill(""));
        setIsComplete(false);
        inputRef.current[0]?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Time remaining: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
        <div className="flex justify-center gap-x-4 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              className="rounded-lg border-2 border-gray-300 focus:border-purple-500 w-12 h-12 text-black text-center text-xl"
              type="text"
              maxLength={1}
              ref={(val) => (inputRef.current[index] = val)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleDown(index, e)}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Submit
        </button>
        <button
          onClick={handleResendOtp}
          disabled={!canResend}
          className={`w-full py-2 rounded-lg transition duration-300 text-center ${
            canResend
              ? "text-purple-600 hover:bg-purple-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Resend OTP {!canResend && `(${timeLeft}s)`}
        </button>
      </div>
    </div>
  );
};

export default OtpSection;
