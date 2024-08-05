import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character (@)."
    )
    .required("Required"),
  company: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  department: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
    .required("Required"),
  profilePicture: Yup.mixed().nullable().required("Required"),
  joiningDate: Yup.date().required("Required"),
});

export const employeeValidationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email address"),
  phone: Yup.string().matches(
    /^\d{10}$/,
    "Must be a valid 10-digit phone number"
  ),
  address: Yup.string(),
  company: Yup.string(),
  companyAddress: Yup.string(),
  experience: Yup.number().min(0, "Experience cannot be negative"),
});

export const workspaceValidationSchema = Yup.object({
  logo: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
    .required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character (@)."
    )
    .required("Required"),
  address: Yup.string().required("Required"),
});
