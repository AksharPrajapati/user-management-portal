import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAuthUser } from "../utils/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../utils/redux/store";
import { AuthUser } from "../utils/helper";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
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
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const actionResult = await AuthUser(values);
              if (actionResult) {
                dispatch(addAuthUser(actionResult));
                navigate("/");
                toast.success(`Login Successful`, {
                  position: "top-right",
                });
              }
            } catch (error: any) {
              toast.error(`Authentication failed: ${error.message}!`, {
                position: "top-right",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
              <h1 className="text-3xl font-bold mb-8 text-gray-800">Login</h1>

              <div className="mb-6">
                <Field
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-2"
                />
              </div>

              <div className="mb-6">
                <Field
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-2"
                />
              </div>

              <button
                className="bg-red-600 text-white py-3 rounded-lg w-full mt-4 hover:bg-red-700 transition duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="mt-6 text-center text-gray-600">
                Don't have an account?{" "}
                <span
                  className="font-bold text-black-600 cursor-pointer hover:underline"
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
