import React from "react";
import * as Yup from "yup";
import FormModal from "../Form/FormModal";
import EmployeeFormFields from "./EmployeeFormFields";
import { IUser } from "../../utils/interface";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IUser) => void;
}

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
    .required("Required"),
  address: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  companyAddress: Yup.string().required("Required"),
  experience: Yup.number().required("Required"),
});

const EmployeeModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const initialValues: IUser = {
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    companyAddress: "",
    experience: 0,
    deactive: false,
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      formFields={<EmployeeFormFields />}
    />
  );
};

export default EmployeeModal;
