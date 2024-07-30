import React from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            company: "",
            dob: "",
            department: "",
            mobile: "",
            profilePicture: null,
            joiningDate: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/,
                "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character (@)."
              )
              .required("Required"),
            company: Yup.string().required("Required"),
            dob: Yup.date().required("Required"),
            department: Yup.string().required("Required"),
            mobile: Yup.string()
              .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
              .required("Required"),
            profilePicture: Yup.mixed().nullable().required("Required"),
            joiningDate: Yup.date().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(addUser(values));
            setSubmitting(false);
            navigate("/");
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
              <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                Register
              </h1>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="company"
                  type="text"
                  placeholder="Company"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="dob"
                  type="date"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="department"
                  type="text"
                  placeholder="Department"
                />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="mobile"
                  type="tel"
                  placeholder="Mobile"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="profilePicture"
                  type="file"
                  onChange={(event: any) => {
                    setFieldValue(
                      "profilePicture",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                <ErrorMessage
                  name="profilePicture"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <Field
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  name="joiningDate"
                  type="date"
                />
                <ErrorMessage
                  name="joiningDate"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                className="bg-red-600 text-white p-3 rounded-lg w-full mt-6 hover:bg-red-700"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </button>

              <p className="mt-4 text-center">
                Already have an account?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign In →
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
