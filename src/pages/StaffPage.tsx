// import { SelectOutlined } from "@ant-design/icons";
// import Button from "antd/es/button"; // Import the Ant Design Button
// import TableComponent from "@/component/table/TableComponent";
// import ModalComponent from "@/component/Modal";
// import Select from "antd/es/select";
// import StaffForm from "@/component/staffComponent/StaffForm";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { TableColumnsType } from "antd";

// const StaffSection = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState<any>(null);
//   const staffData = useSelector((state: any) => state.addStaff.staff);

//    const handleAddEmployeeClick = () => {
//     setSelectedStaff(null); // Clear selected staff for a new entry
//     setIsModalOpen(true);
//   };

//   const handleUpdateClick = (staff: any) => {
//     setSelectedStaff(staff); // Set the staff data to be updated
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false); // Close the modal
//   };


//   const columns: TableColumnsType<any> = [
//     {title: "Staff Id",dataIndex: "staffId",key: "staffId",width: 120,},
//     {title: "First Name",dataIndex: "firstName",key: "firstName",width: 120,},
//     { title: "Last Name", dataIndex: "lastName", key: "lastName", width: 120 },
//     {title: "Designation",dataIndex: "designation",key: "designation",width: 120},
//     { title: "Gender", dataIndex: "gender", key: "gender", width: 100 },
//     {title: "Joined Date",dataIndex: "joinedDate",key: "joinedDate",width: 120},
//     {title: "Date of Birth",dataIndex: "dateOfBirth",key: "dateOfBirth",width: 120},
//     { title: "Address", dataIndex: "address", key: "address" },
//     {title: "Contact Number",dataIndex: "contactNumber",key: "contactNumber", width:100},
//     { title: "Email", dataIndex: "email", key: "email" , width:100},
//     { title: "Role", dataIndex: "role", key: "role", width:100 },
//     { title: "Fields", dataIndex: "fields", key: "fields", width: 120 },
//     { title: "Vehicles", dataIndex: "vehicles", key: "vehicles", width: 120 },
//     {title: "Equipments",dataIndex: "equipments",key: "equipments",width: 120},
//     {title: "Action",key: "update",fixed: "right",width: 100,render: (_, record) => (
//       <>
//         <a onClick={() => handleUpdateClick(record)}>UPDATE</a>
       
//       </>
      
//     ),},
//     {title: "Action",key: "operation", fixed: "right",width: 100,render: () => <a>DELETE</a>},
//   ];

//   const staffDataWithKeys = staffData.map((staff: { id: any }, index: any) => ({
//     ...staff,
//     key: staff.id || `staff-${index}`, // Use `id` if available, fallback to a generated key
//   }));




//   return (
//     <section id="staff-section" className="w-full overflow-auto">
//       <div className="flex-grow-1 overflow-y-auto">
//         <header className="border-b pt-6 mb-2">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl mb-0 ls-tight">Staff</h1>
//             </div>
//             <div className="flex items-end me-3">
//               <form className="max-w-sm mr-4">
//                 <Select
//                   showSearch
//                   placeholder="Select a designation"
//                   optionFilterProp="label"
//                   options={[
//                     { value: "ASSISTANTMANAGER", label: "ASSISTANT MANAGER" },e
//                     { value: "ADMINANDHRSTAFF", label: "ADMIN AND HR STAFF" },
//                     { value: "OFFICEASSISTANT", label: "OFFICE ASSISTANT" },
//                     { value: "SENIORAGRONOMIST", label: "SENIOR AGRONOMIST" },
//                     { value: "AGRONOMIST", label: "AGRONOMIST" },
//                     { value: "SOILSCIENTIST", label: "SOILS SCIENTIST" },
//                     { value: "SENIORTECHNICIAN", label: "SENIOR TECHNICIAN" },
//                     { value: "TECHNICIAN", label: "TECHNICIAN" },
//                     { value: "SUPERVISOR", label: "SUPERVISOR" },
//                     { value: "LABOUR", label: "LABOUR" },
//                   ]}
//                 />
//               </form>
//               {/* Use Ant Design Button */}
//               <Button
//                 type="primary"
//                 icon={<SelectOutlined />}
//                 onClick={handleAddEmployeeClick}
//               >
//                 Add Employee
//               </Button>
//             </div>
//           </div>
//         </header>

//         <TableComponent dataSource={staffDataWithKeys} columns={columns} />
//       </div>

//       <ModalComponent
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         title={selectedStaff ? "Update Employee" : "Add Employee"} 
//       >
//         <StaffForm  initialValues={selectedStaff}  onClose={handleModalClose} />
//       </ModalComponent>
//     </section>
//   );
// };

// export default StaffSection;
