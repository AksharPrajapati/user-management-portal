import React from "react";
import FormField from "../Form/FormField";

const WorkspaceFormFields: React.FC = () => (
  <>
    <FormField name="logo" type="text" label="Logo URL" />
    <FormField name="name" type="text" label="Name" />
    <FormField name="email" type="text" label="Email" />
    <FormField name="phone" type="text" label="Phone Number" />
    <FormField name="password" type="password" label="Password" />
    <FormField name="address" as="textarea" label="Address" type={""} />
  </>
);

export default WorkspaceFormFields;
