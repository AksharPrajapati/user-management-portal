import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { getUser, updateUser } from "../../utils/helper";
import { IUser } from "../../utils/interface";
import { employeeValidationSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<IUser>({});
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const data = await getUser(id as string);
      user?.role === "admin"
        ? setEmployee(data)
        : setEmployee(data?.workspaceId === user?.workspaceId ? data : null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch employee details");
    }
  };

  const initialValues = employee?.email
    ? {
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        company: employee.company,
        companyAddress: employee.companyAddress,
        experience: employee.experience,
        deactive: employee.deactive,
      }
    : {
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
        companyAddress: "",
        experience: 0,
        deactive: false,
      };

  const handleUpdateEmployee = async (values: IUser) => {
    try {
      await updateUser(employee?.id as string, values);

      fetchEmployee();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update employee details");
    }
  };

  const handleSubmit = (
    values: IUser,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    handleUpdateEmployee(values);
    setIsEditing(false);
    setSubmitting(false);
  };

  return (
    <>
      <Header />

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">
          Employee Details
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {employee?.email && (
            <Formik
              initialValues={initialValues}
              validationSchema={employeeValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                      { label: "Name", name: "name" },
                      { label: "Email", name: "email" },
                      { label: "Phone Number", name: "phone" },
                      { label: "Address", name: "address", type: "textarea" },
                      { label: "Company Name", name: "company" },
                      { label: "Company Address", name: "companyAddress" },
                      { label: "Experience", name: "experience" },
                      { label: "Activate/Deactivate", name: "deactive" },
                    ].map(({ label, name, type = "text" }) => (
                      <div className="mb-4" key={name}>
                        <label className="block text-sm font-medium text-gray-700">
                          {label}
                        </label>
                        {isEditing ? (
                          type === "textarea" ? (
                            <Field
                              as="textarea"
                              name={name}
                              rows={4}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          ) : name === "email" ? (
                            <Field
                              name={name}
                              type={type}
                              disabled
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          ) : name === "deactive" ? (
                            <Field name={name}>
                              {({ field, form }: FieldProps) => (
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    {...field}
                                    checked={field.value}
                                    disabled={user?.role === "employee"}
                                    onChange={() =>
                                      form.setFieldValue(
                                        field.name,
                                        !field.value
                                      )
                                    }
                                    className="h-4 w-4 border-gray-300 rounded text-red-600 focus:ring-blue-500"
                                  />
                                  <span className="ml-2 text-gray-700">
                                    Deactivate
                                  </span>
                                </label>
                              )}
                            </Field>
                          ) : (
                            <Field
                              name={name}
                              type={type}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          )
                        ) : (
                          <p className="mt-1 text-gray-900">
                            <Field
                              name={name}
                              type={type}
                              disabled
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </p>
                        )}
                        <ErrorMessage
                          name={name}
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6 space-x-4">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Update"}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
