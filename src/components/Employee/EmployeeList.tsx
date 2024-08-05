import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../utils/interface";

function EmployeeList({ employee }: { employee: IUser[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [girdView, setGridView] = useState(false);

  const itemsPerPage = 1;

  const totalPages = Math.ceil(employee.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const exportToCSV = () => {
    const csvRows = [];

    csvRows.push(
      [
        "Name",
        "Email",
        "Department",
        "Phone Number",
        "Address",
        "Experience",
      ].join(",")
    );

    employee?.forEach((emp: IUser) => {
      csvRows.push(
        [
          emp.name,
          emp.email,
          emp.department,
          emp.phone,
          emp.address,
          emp.experience,
        ].join(",")
      );
    });

    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvData);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "employees.csv";
    link.click();

    URL.revokeObjectURL(csvUrl);
  };

  const filteredData = employee?.filter((emp: IUser) => {
    const joinDate = new Date(emp.joiningDate || "");
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      (emp?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) &&
      (selectedDepartment === "" || emp.department === selectedDepartment) &&
      (startDate ? joinDate >= start : true) &&
      (endDate ? joinDate <= end : true)
    );
  });

  const dataToDisplay = !girdView
    ? filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredData;

  return (
    <div className="mb-10">
      <p className="text-3xl font-bold mb-4 pb-4">Employee List</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearchTerm(event.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">All Departments</option>

          {employee.map((emp: IUser) => (
            <option key={emp.id} value={emp.department}>
              {emp.department}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="">
          <button
            className={`px-4 py-2 mx-1 border rounded-lg ${
              !girdView ? "bg-gray-200" : "bg-red-500 text-white"
            }`}
            onClick={() => setGridView(true)}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 mx-1 border rounded-lg ${
              girdView ? "bg-gray-200" : "bg-red-500 text-white"
            }`}
            onClick={() => setGridView(false)}
          >
            List View
          </button>
          <button
            className="px-4 py-2 mx-1 mt-3 sm:mt-0 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200"
            onClick={exportToCSV}
          >
            Export as CSV
          </button>
        </div>
      </div>

      {!girdView && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
                <th className="py-2 px-4 text-left text-gray-600">
                  Department
                </th>
                <th className="py-2 px-4 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((employee: IUser) => (
                <tr key={employee.id} className="border-b">
                  <td className="py-2 px-4 text-gray-800">{employee.name}</td>
                  <td className="py-2 px-4 text-gray-800">{employee.email}</td>
                  <td className="py-2 px-4 text-gray-800">
                    {employee.department}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        navigate(`/employee-detail/${employee.id}`)
                      }
                    >
                      view
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button
                className="px-4 py-2 mx-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 mx-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {girdView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataToDisplay?.map((employee: IUser) => (
            <div
              key={employee.id}
              className="p-4 border border-gray-200 rounded-lg shadow-lg"
            >
              <h2 className="text-lg font-semibold">{employee.name}</h2>
              <p className="text-gray-600">{employee.email}</p>
              <p className="text-gray-600">{employee.department}</p>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate(`/employee-detail/${employee.id}`)}
              >
                view
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
