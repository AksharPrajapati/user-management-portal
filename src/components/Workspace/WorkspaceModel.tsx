import React from "react";
import FormModal from "../Form/FormModal";
import WorkspaceFormFields from "./WorkSpaceFormField";
import { IWorkspace } from "../../utils/interface";
import { workspaceValidationSchema } from "../../utils/validationSchema";

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IWorkspace) => void;
}

const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const initialValues: IWorkspace = {
    logo: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      initialValues={initialValues}
      validationSchema={workspaceValidationSchema}
      onSubmit={onSubmit}
      formFields={<WorkspaceFormFields />}
    />
  );
};

export default WorkspaceModal;
