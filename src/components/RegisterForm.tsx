import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../utils/redux/store";
import { addAuthUser } from "../utils/redux/user/userSlice";
import { updateUser } from "../utils/helper";
import UserForm from "./Form/UserForm";
import { IUser } from "../utils/interface";
import { toast } from "react-toastify";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.user);

  const handleUpdate = async (userId: string, userData: IUser) => {
    try {
      await updateUser(userId, userData);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Update failed!");
    }
  };

  const handleSubmit: any = async (
    values: IUser,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      if (user) {
        handleUpdate(user?.id, values);
        dispatch(addAuthUser({ ...values, id: user?.id, role: user?.role }));
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(`Registration failed: ${err}`);
      console.error("Registration failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <UserForm
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          password: user?.password || "",
          company: user?.company || "",
          dob: user?.dob || "",
          department: user?.department || "",
          phone: user?.phone || "",
          profilePicture: user?.profilePicture || null,
          joiningDate: user?.joiningDate || "",
          role: user?.role || "employee",
          experience: user?.experience || 0,
          address: user?.address || "",
          companyAddress: user?.companyAddress || "",
        }}
        onSubmit={handleSubmit}
        isUpdate={!!user}
      />
    </div>
  );
}

export default RegisterForm;
