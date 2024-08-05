import React from "react";
import { useFormikContext, Formik, Field, FieldProps } from "formik";
import { updatehWorkspace } from "../../utils/helper";
import { IUser, IWorkspace } from "../../utils/interface";
import FormField from "../Form/FormField";
import { useSelector } from "react-redux";
import { workspaceValidationSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";

const WorkSpaceFormFields: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<IWorkspace>();
  const user = useSelector((state: any) => state.user.user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <FormField name="logo" type="text" label="Logo URL" />
      <FormField name="name" type="text" label="Name" />
      <FormField
        name="email"
        type="text"
        label="Email"
        disabled={!!values.email}
      />
      <FormField name="phone" type="text" label="Phone Number" />
      <FormField
        name="password"
        type="password"
        label="Password"
        disabled={!!values.email}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Active/Deactive
        </label>
        <Field name="deactive">
          {({ field, form }: FieldProps) => (
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...field}
                checked={field.value}
                disabled={user?.role !== "admin"}
                onChange={() => setFieldValue(field.name, !field.value)}
                className="h-4 w-4 border-gray-300 rounded text-red-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Deactivate</span>
            </label>
          )}
        </Field>
      </div>
      <div className="md:col-span-2">
        <FormField
          name="address"
          as="textarea"
          rows={4}
          label="Address"
          type={""}
        />
      </div>
    </div>
  );
};

function WorkSpaceForm({
  workspace,
  user,
}: {
  workspace: IWorkspace;
  user: IUser;
}) {
  const handleSubmit = async (values: IWorkspace, { setSubmitting }: any) => {
    try {
      await updatehWorkspace(workspace?.id as string, values);
      toast.success("Workspace Updated");
    } catch (err) {
      console.log("Error updating workspace:", err); // Debugging
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8">
      <Formik
        initialValues={{
          logo: workspace?.logo || "",
          name: workspace?.name || "",
          email: workspace?.email || "",
          phone: workspace?.phone || "",
          password: workspace?.password || "",
          address: workspace?.address || "",
          deactive: workspace?.deactive || false,
        }}
        validationSchema={workspaceValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, { setSubmitting });
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <WorkSpaceFormFields />
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default WorkSpaceForm;
