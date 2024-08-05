import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../utils/redux/store";
import { addAuthUser } from "../utils/redux/user/userSlice";
import { getUser, updateUser } from "../utils/helper";
import UserForm from "../components/Form/UserForm";
import { IUser } from "../utils/interface";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData = await getUser(id as string);
    setUser(userData);
  };

  const handleSubmit: any = async (
    values: IUser,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (user?.isSubmitted) {
      toast.error("User already Registered");
    } else {
      try {
        await updateUser(id as string, { ...values, isSubmitted: true });

        dispatch(addAuthUser({ ...values, ...user, id, role: "employee" }));

        navigate("/");
      } catch (err) {
        console.error("Registration failed:", err);
        toast.error(`Registration failed: ${err}`);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-1 mt-5 flex items-center justify-center p-6">
        {user?.email && (
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
              joiningDate: user.joiningDate || "",
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Register;
