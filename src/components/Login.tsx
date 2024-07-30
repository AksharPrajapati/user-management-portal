import React from "react";
import Header from "./Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAuthUser } from "../utils/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/,
                "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character (@)."
              )
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(addAuthUser(values));
            setSubmitting(false);
            navigate("/");
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
              <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                Login
              </h1>

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

              <button
                className="bg-red-600 text-white p-3 rounded-lg w-full mt-6 hover:bg-red-700"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>

              <p className="mt-4 text-center">
                Create new account?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register →
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
