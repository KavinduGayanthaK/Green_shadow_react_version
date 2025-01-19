import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button, Popconfirm, TableColumnsType } from "antd";
import TableComponent from "@/component/table/TableComponent";
import VehicleForm from "@/component/VehicleForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";// Ensure this is the correct path
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { StaffModel } from "@/models/StaffModel";
import { deleteStaff } from "@/reducers/StaffSlice";
import StaffForm from "@/component/StaffForm";

interface StaffDataType {
  key: React.Key;
  staffId:string;
  firstName:string;
  lastName:string;
  designation:string
  gender:string;
  joinedDate:string;
  dateOfBirth:string;
  buildingNumber:string;
  lane:string;
  city:string;
  state:string;
  postalCode:string;
  contactNumber:number;
  email:string;
  role:string;
  fields:[];
  vehicles:[];
  equipments:[];
}

const StaffPage = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffModel | null>(null);
  const [selectedDesignation, setSelectedDesignation] = useState("ALL");

  const staff = useSelector((state: any) => state.staff.staff) || []; // Replace 'any' with your state type if available

  const dispatch = useDispatch();

  // Function to open the "Add Vehicle" modal
  function openAddModal() {
    setOpen(true);
    setModalType("add");
  }

  // Function to open the "Update Vehicle" modal
  const updateModal = (staff: StaffModel) => {
    setOpen(true);
    setSelectedStaff(staff);
    setModalType("update"); 
  };

  // Function to delete a vehicle by licensePlateNumber
  const deleteVehicleByStaffId = (staffId: string) => {
    console.log("Deleting staff:", staffId);
    dispatch(deleteStaff({ staffId }));
  };

  // Columns for the table
  const columns: TableColumnsType<StaffDataType> = [
    {title: "Staff Id",dataIndex: "staffId",key: "staffId",width: 120,},
    { title: "First Name", dataIndex: "firstName", key: "firstName", width: 120 },
    { title: "Last Name", dataIndex: "lastName", key: "lastName", width: 120 },
    {title: "Designation",dataIndex: "designation",key: "designation",width: 120,},
    {title: "Gender",dataIndex: "gender",key: "gender",width: 120},
    { title: "Joined Date",dataIndex: "joinedDate", key: "joinedDate",width: 120},
    { title: "Date Of Birth",dataIndex: "dateOfBirth", key: "dateOfBirth",width: 120},
    { title: "Buiding Number",dataIndex: "buildingNumber", key: "buildingNumber",width: 120},
    { title: "Lane",dataIndex: "lain", key: "lane",width: 120},
    { title: "City",dataIndex: "city", key: "city",width: 120},
    { title: "State",dataIndex: "state", key: "state",width: 120},
    { title: "Postal Code",dataIndex: "postalCode", key: "postalCode",width: 120},
    { title: "Contact Number",dataIndex: "contactNumber", key: "contactNumber",width: 120},
    { title: "Email",dataIndex: "email", key: "email",width: 120},
    { title: "Role",dataIndex: "role", key: "role",width: 120},
    { title: "Fields",dataIndex: "fields", key: "fields",width: 120},
    { title: "Vehicles",dataIndex: "vehicles", key: "vehicles",width: 120},
    { title: "Equipments",dataIndex: "equipments", key: "equipments",width: 120},

    
    {
        title: "Edit",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record: StaffDataType) => (
        <>
          <Button
            className="text-green-400 font-bold"
            onClick={() => {
              const staffToUpdate = staff.find(
                (s: StaffModel) =>
                  s.staffId === record.staffId
              );
              if (staffToUpdate) {
                updateModal(staffToUpdate);
              }
            }}
          >
           
           <FaUserEdit style={{ fontSize: "20px", color: "#00e62e" }}  />
          </Button>
          <Popconfirm
            title="Delete the Staff"
            description={`Are you sure you want to delete ${record.staffId}?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteVehicleByStaffId(record.staffId)}
          >
            <Button danger className="ml-2">
            <MdDeleteOutline style={{ fontSize: "20px", color: "#c0392b" }}  />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // Filter vehicles based on selected status
  const filteredStaff =
    selectedDesignation === "ALL"
      ? staff
      : staff.filter(
          (v: StaffDataType) => v.designation=== selectedDesignation
        );

  return (
    <section id="vehicle-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">Staff</h1>
            </div>
            <div className="flex items-end me-3">
              <form className="max-w-sm mr-4">
                <Select
                  style={{ color: "red" }}
                  showSearch
                  placeholder="Select a status of vehicle"
                  optionFilterProp="label"
                  onChange={(value) => setSelectedDesignation(value)}
                  options={[
                    { value: "ALL", label: "ALL" },
                    {value:"MANAGER", label:"MANAGER"},
                    {value:"SENIORASSISTANTMANAGER", label:"SENIOR ASSISTANT MANAGER"},
                    {value:"ASSISTANTMANAGER", label:"ASSISTANT MANAGER"},
                    {value:"ADMINANDHRSTAFF", label:"ADMIN AND HR STAFF"},
                    {value:"OFFICEASSISTANT", label:"OFFICE ASSISTANT"},
                    {value:"SENIORAGRONOMIST", label:"SENIOR AGRONOMIST"},
                    {value:"AGRONOMIST", label:"AGRONOMIST"},
                    {value:"SOILSCIENTIST", label:"SOIL SCIENTIST"},
                    {value:"SENIORTECHNICIAN", label:"SENIOR TECHNICIAN"},
                    {value:"TECHNICIAN", label:"TECHNICIAN"},
                    {value:"SUPERVISOR", label:"SUPERVISOR"},
                    {value:"LABOUR", label:"LABOUR"},
                    
                  ]}
                />
              </form>
              <Button
                type="primary"
                icon={<SelectOutlined />}
                onClick={() => openAddModal()}
              >
                ADD STAFF
              </Button>
            </div>
          </div>
        </header>

        <TableComponent
          dataSource={filteredStaff.map(
            (staff: StaffDataType, index: number) => ({
              ...staff,
              key: staff.staffId || index, // Unique key
            })
          )}
          columns={columns}
        />

        {/* Add Modal */}
        {open && modalType === "add" && (
          <StaffForm
            isType={"ADD STAFF"}
            buttonType={"Save"}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
        )}

        {/* Update Modal */}
        {open && modalType === "update" && selectedStaff && (
          <StaffForm
            isType="UPDATE VEHICLE"
            buttonType="Update"
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setSelectedStaff(null);
            }}
            staff={selectedStaff}
          />
        )}
      </div>
    </section>
  );
};

export default StaffPage;
