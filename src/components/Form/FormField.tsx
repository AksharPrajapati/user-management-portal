import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";

interface FormFieldProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  as?: string;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type = "text",
  label,
  placeholder,
  disabled,
  as,
  rows,
}) => {
  return (
    <div className="relative mt-8">
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            {as === "textarea" ? (
              <textarea
                {...field}
                rows={rows}
                placeholder={placeholder || " "}
                disabled={disabled}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
              />
            ) : (
              <input
                {...field}
                type={type}
                placeholder={placeholder || " "}
                disabled={disabled}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
              />
            )}
          </>
        )}
      </Field>
      <label
        htmlFor={name}
        className="absolute left-3 -mt-2 -top-2.5 bg-white px-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
      >
        {label}
      </label>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-2"
      />
    </div>
  );
};

export default FormField;
