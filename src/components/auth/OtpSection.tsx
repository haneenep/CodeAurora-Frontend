import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useRedux";
import { verifyOtpAction } from "@/redux/store/actions/auth/verifyOtpAction";
import { signupAction } from "@/redux/store/actions/auth/signupActions";
import { toast } from "react-toastify";

const OtpSection = () => {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  let length = 6;

  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value;

    if (!isNaN(Number(value))) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (index < length - 1 && value) {
        inputRef.current[index + 1]?.focus();
      }

    }
  };

  const handleDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if(!otp[index] && e.key === "Backspace" && index > 0){
      inputRef.current[index - 1]?.focus();
    }

  };

  const handleSubmit = async () => {

    console.log(location,"location")

    const submittedOtp = otp.join('');

    const response = await dispatch(verifyOtpAction({email: location.state.email, otp: submittedOtp}));

    console.log(response,"response after verifying")

    if(!response.payload.success){
      toast.error(response.payload.message || response.payload.error)
    } else {

      const response1 = await dispatch(signupAction(location.state));
      console.log("response after signuped",response1)
  
      if(response1.payload.success){
  
        navigate('/')
      } else {
        toast.error(response.payload.message || response.payload.error)
      }

    }

  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>
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
        <button onClick={handleSubmit} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpSection;
