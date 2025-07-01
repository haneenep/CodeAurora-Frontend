import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "@/components/common/skeleton/InputField";

interface PasswordFieldProps {
  name: string;
  placeholder?: string;
  showDuration?: number;
  className?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  placeholder = "Password",
  showDuration = 3000,
  className = ""
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleShowPassword = () => {
    setShowPassword(true);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowPassword(false);
    }, showDuration);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const togglePasswordVisibility = () => {
    if (showPassword) {
      handleHidePassword();
    } else {
      handleShowPassword();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <InputField
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors"
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5 text-indigo-500 hover:text-indigo-600" />
        ) : (
          <Eye className="w-5 h-5 text-indigo-500 hover:text-indigo-600" />
        )}
      </button>
    </div>
  );
};

export default PasswordField;