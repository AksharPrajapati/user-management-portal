import React, { useEffect, useState } from "react";
import WorkspaceModal from "../components/Workspace/WorkspaceModel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, createWorkspace, getWorkspaces } from "../utils/helper";
import { IWorkspace } from "../utils/interface";
import { toast } from "react-toastify";

function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<any>([]);

  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchWorkspaces = async () => {
    if (user?.role === "employee") return;
    try {
      const response = await getWorkspaces();

      const filteredResponse = response.filter(
        (workspace: IWorkspace) => user?.email === workspace.email
      );

      setWorkspaces(user?.role === "admin" ? response : filteredResponse);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch workspaces");
    }
  };

  const handleSubmit = async (values: IWorkspace) => {
    try {
      const response = await createWorkspace(values);

      const workspaceAdmin = {
        email: values.email,
        password: values.password,
        role: "workspaceadmin",
        workspaceId: response.id,
      };

      await createUser(workspaceAdmin);

      fetchWorkspaces();
      toast.success("Workspace created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create workspace");
    }
  };

  return (
    <div className="px-4 flex flex-col space-y-4 mt-5">
      {user?.role === "admin" && (
        <button
          className="self-end bg-red-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto hover:bg-red-700 transition duration-300"
          onClick={handleOpenModal}
        >
          + Add Workspace
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces?.map((workspace: IWorkspace) => (
          <div
            key={workspace.id}
            className={`p-4 bg-white rounded-lg shadow-lg shadow-gray-500/40 cursor-pointer transition transform hover:scale-105 flex items-center space-x-4 ${
              workspace.deactive && user?.role !== "admin"
                ? "opacity-50"
                : "opacity-100"
            }`}
            onClick={() =>
              !workspace.deactive || user?.role === "admin"
                ? navigate(`/dashboard/${workspace.id}`)
                : null
            }
          >
            {workspace.logo ? (
              <img
                src={workspace.logo}
                alt={`${workspace.name} Logo`}
                className="w-12 h-12 object-cover rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                N/A
              </div>
            )}

            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{workspace.name}</h1>
            </div>
          </div>
        ))}
      </div>
      {user?.role === "admin" && (
        <WorkspaceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Workspace;
