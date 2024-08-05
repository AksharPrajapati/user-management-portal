import React from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import FormField from "./FormField";
import { userValidationSchema } from "../../utils/validationSchema";

interface UserFormProps {
  initialValues: any;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  isUpdate?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  isUpdate = false,
}) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            {isUpdate ? "Update Profile" : "Register"}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField name="name" type="text" label="Name" />
            <FormField
              name="email"
              type="email"
              label="Email"
              disabled={isUpdate}
            />
            {!isUpdate && (
              <FormField name="password" type="password" label="Password" />
            )}
            <FormField name="company" type="text" label="Company" />
            <FormField name="dob" type="date" label="Date of Birth" />
            <FormField name="department" type="text" label="Department" />
            <FormField name="phone" type="tel" label="Phone" />
            <FormField name="joiningDate" type="date" label="Joining Date" />

            <div className="relative sm:col-span-2">
              <input
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 peer"
                name="profilePicture"
                type="file"
                onChange={(event: any) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = Base64.encode(
                        reader.result as string
                      );
                      setFieldValue("profilePicture", base64String);
                      localStorage.setItem("profilePicture", base64String);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label
                htmlFor="profilePicture"
                className="absolute left-3 -top-2.5 bg-white px-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Profile Picture
              </label>
              <ErrorMessage
                name="profilePicture"
                component="div"
                className="text-red-600 text-sm mt-2"
              />
            </div>
          </div>

          <button
            className="bg-red-600 text-white py-3 rounded-lg w-full mt-6 hover:bg-red-700 transition duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isUpdate
                ? "Updating..."
                : "Registering..."
              : isUpdate
              ? "Update Profile"
              : "Register"}
          </button>

          {!isUpdate && (
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="font-bold text-black-600 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Sign In →
              </span>
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
