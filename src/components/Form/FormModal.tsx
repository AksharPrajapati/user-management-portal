import React from "react";
import { Formik, Form } from "formik";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any, formikHelpers: any) => void;
  formFields: React.ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formFields,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) => {
            onSubmit(values, formikHelpers);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormModal;
