import { useState } from "react";
import { SelectOutlined } from "@ant-design/icons";
import Button from "antd/es/button"; // Import the Ant Design Button
import TableComponent from "@/component/table/TableComponent";
import ModalComponent from "@/component/Modal";
import Select, { SelectProps } from "antd/es/select";
import StaffForm from "@/component/staffComponent/StaffForm";
import { useSelector } from "react-redux";

const StaffSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEmployeeClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };
  const staffData = useSelector((state) => state.addStaff.staff);
 
  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Joined Date", dataIndex: "joinedDate", key: "joinedDate" },
    { title: "Date of Birth", dataIndex: "dateOfBirth", key: "dateOfBirth" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Contact Number", dataIndex: "contactNumber", key: "contactNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Fields", dataIndex: "fields", key: "fields" },
    { title: "Vehicles", dataIndex: "vehicles", key: "vehicles" },
    { title: "Equipments", dataIndex: "equipments", key: "equipments" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>UPDATE</a>,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>DELETE</a>,
    },
  ];

  const staffData1 = [
    {
      key: "1", // Unique identifier
      firstName: "John",
      lastName: "Doe",
      designation: "Manager",
      gender: "Male",
      joinedDate: "2023-01-15",
      dateOfBirth: "1990-05-12",
      address: "123 Main St, Springfield, IL",
      contactNumber: "123-456-7890",
      email: "john.doe@example.com",
      role: "Admin",
      fields:"asasa",
      vehicles:"asdasd",
      equipments:"sdsds"
    },
    // Add more rows
  ];
  
  const staffDataWithKeys = staffData1.map((staff, index) => ({
    ...staff,
    key: staff.id || `staff-${index}`, // Use `id` if available, fallback to a generated key
  }));
  

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <section id="staff-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">Staff</h1>
            </div>
            <div className="flex items-end me-3">
              <form className="max-w-sm mr-4">
                <Select
                  showSearch
                  placeholder="Select a designation"
                  optionFilterProp="label"
                  options={[
                    { value: "ASSISTANTMANAGER", label: "ASSISTANT MANAGER" },
                    { value: "ADMINANDHRSTAFF", label: "ADMIN AND HR STAFF" },
                    { value: "OFFICEASSISTANT", label: "OFFICE ASSISTANT" },
                    { value: "SENIORAGRONOMIST", label: "SENIOR AGRONOMIST" },
                    { value: "AGRONOMIST", label: "AGRONOMIST" },
                    { value: "SOILSCIENTIST", label: "SOILS SCIENTIST" },
                    { value: "SENIORTECHNICIAN", label: "SENIOR TECHNICIAN" },
                    { value: "TECHNICIAN", label: "TECHNICIAN" },
                    { value: "SUPERVISOR", label: "SUPERVISOR" },
                    { value: "LABOUR", label: "LABOUR" },
                  ]}
                />
              </form>
              {/* Use Ant Design Button */}
              <Button
                type="primary"
                icon={<SelectOutlined />}
                onClick={handleAddEmployeeClick}
              >
                Add Employee
              </Button>
            </div>
          </div>
        </header>

        <TableComponent dataSource={staffDataWithKeys} columns={columns} />
      </div>

      <ModalComponent isOpen={isModalOpen} onClose={handleModalClose}>
  <StaffForm onClose={handleModalClose} />
</ModalComponent>


    </section>
  );
};

export default StaffSection;
