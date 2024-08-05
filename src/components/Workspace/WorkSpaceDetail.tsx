import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkSpaceForm from "./WorkSpaceForm";
import Header from "../Header";
import EmployeeList from "../Employee/EmployeeList";
import { useSelector } from "react-redux";
import EmployeeModal from "../Employee/EmployeeModal";
import { createUser, getUsers, getWorkspace } from "../../utils/helper";
import { IUser } from "../../utils/interface";
import { toast } from "react-toastify";

function WorkSpaceDetail() {
  const { id } = useParams();
  const { user } = useSelector((state: any) => state.user);
  const [workspace, setWorkspace] = useState<any>({});
  const [employee, setEmployee] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWorkspace();
    fetchUsers();
  }, [id]); // Depend on `id` to refetch if it changes

  const fetchWorkspace = async () => {
    try {
      const data = await getWorkspace(id as string);
      user?.role === "admin"
        ? setWorkspace(data)
        : setWorkspace(data.id === user?.workspaceId ? data : null);
    } catch (err) {
      console.log("Error fetching workspace:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      const employeeData = data.filter(
        (user: IUser) => user?.role === "employee" && user?.workspaceId === id
      );
      setEmployee(employeeData);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (values: IUser) => {
    try {
      await createUser({
        ...values,
        role: "employee",
        workspaceId: id,
      });
      fetchUsers();
      toast.success("Employee created successfully");
    } catch (err) {
      console.log("Error creating employee:", err);
      toast.error("Failed to add employee");
    }
  };

  return (
    <>
      <Header />
      <p className="text-3xl font-bold mb-4 px-8 pt-8">Workspace</p>
      {workspace === null ? (
        <div className="p-4 text-center">
          <h1 className="text-xl font-semibold">Workspace not found</h1>
        </div>
      ) : (
        (workspace?.id === user?.workspaceId || user?.role === "admin") && (
          <div className="p-0">
            {workspace?.email && (
              <WorkSpaceForm workspace={workspace} user={user} />
            )}

            <hr className="mt-4" />
            <div className="mt-4 flex flex-col gap-4 px-8">
              {user?.role !== "employee" && (
                <button
                  className="self-end bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
                  onClick={handleOpenModal}
                >
                  + Add Employee
                </button>
              )}

              {employee.length > 0 && <EmployeeList employee={employee} />}
            </div>

            {user?.role !== "employee" && (
              <EmployeeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        )
      )}
    </>
  );
}

export default WorkSpaceDetail;
