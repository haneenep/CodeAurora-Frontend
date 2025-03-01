import { Field, ErrorMessage } from "formik";
import React from "react";

interface InputFieldPropsTypes {
  type: string;
  placeholder: string;
  name: string
}

const InputField: React.FC<InputFieldPropsTypes> = ({ type, placeholder, name }) => {
  return (
    <>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
      />
      <ErrorMessage
        className="text-xs font-semibold text-red-500 ml-3"
        name={name}
        component="span"
      />
    </>
  );
};

export default InputField;
