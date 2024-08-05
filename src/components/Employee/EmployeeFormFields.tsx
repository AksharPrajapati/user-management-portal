import React from "react";
import FormField from "../Form/FormField";
import { Field, FieldProps } from "formik";

const EmployeeFormFields: React.FC = () => (
  <>
    <FormField name="name" type="text" label="Name" />
    <FormField name="email" type="text" label="Email" />
    <FormField name="phone" type="text" label="Phone Number" />
    <FormField name="address" as="textarea" rows={4} label="Address" />
    <FormField name="company" type="text" label="Company Name" />
    <FormField name="companyAddress" type="text" label="Company Address" />
    <FormField name="experience" type="text" label="Experience" />
    <div className="mb-4 mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Active/Deactive
      </label>
      <Field name="deactive">
        {({ field, form }: FieldProps) => (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              onChange={() => form.setFieldValue(field.name, !field.value)}
              className="h-4 w-4 border-gray-300 rounded text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-gray-700">Deactivate</span>
          </label>
        )}
      </Field>
    </div>
  </>
);

export default EmployeeFormFields;
