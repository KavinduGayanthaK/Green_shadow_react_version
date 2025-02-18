import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button, Popconfirm, TableColumnsType } from "antd";
import TableComponent from "@/component/table/TableComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { EquipmentModel } from "@/models/EquipmentModel";
import { deleteEquipment } from "@/reducers/EquipmentSlice";
import EquipmentForm from "@/component/EquipmentForm";
import { AppDispatch } from "@/store/Store";

interface EquipmentDataType {
  key:React.Key;
  equipmentId:string;
  equipmentName:string;
  type:string;
  totalCount:number;
  status:string;
  allocatedFields:string[];
  allocatedStaffMembers:string[]
}

const EquipmentPage = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedEquipment, setselectedEquipment] = useState<EquipmentModel | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const equipment = useSelector((state: any) => state.equipment.equipment) || []; // Replace 'any' with your state type if available

  const dispatch = useDispatch<AppDispatch>();

  // Function to open the "Add Vehicle" modal
  function openAddModal() {
    setOpen(true);
    setModalType("add");
  }

  // Function to open the "Update Vehicle" modal
  const updateModal = (equipment: EquipmentModel) => {
    setOpen(true);
    setselectedEquipment(equipment);
    setModalType("update");
  };

  // Function to delete a vehicle by licensePlateNumber
  const deleteEquipmentById = (equipmentId: string) => {
    console.log("Deleting equipment:", equipmentId);
    dispatch(deleteEquipment(equipmentId));
  };

  // Columns for the table
  const columns: TableColumnsType<EquipmentDataType> = [
    {
      title: "Equipment Id",
      dataIndex: "equipmentId",
      key: "equipmentId",
      width: 120,
    },
    { title: "Equipment Name", dataIndex: "equipmentName", key: "equipmentName", width: 120 },
    { title: "Type", dataIndex: "type", key: "type", width: 120 },
    {
      title: "Total Count",
      dataIndex: "totalCount",
      key: "totalCount",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
    },
    {
      title: "Allocated Fields",
      dataIndex: "allocatedFields",
      key: "allocatedFields",
      width: 120,
    },
    {
      title: "Allocated Staff Member",
      dataIndex: "allocatedStaffMember",
      key: "allocatedStaffMember",
      width: 120,
    },
    {
      title: "Edit",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record: EquipmentDataType) => (
        <>
          <Button
            className="text-green-400 font-bold"
            onClick={() => {
              const equipmentToUpdate = equipment.find(
                (v: EquipmentModel) =>
                  v.equipmentId === record.equipmentId
              );
              if (equipmentToUpdate) {
                updateModal(equipmentToUpdate);
              }
            }}
          >
           
           <FaUserEdit style={{ fontSize: "20px", color: "#00e62e" }}  />
          </Button>
          <Popconfirm
            title="Delete the Equipment"
            description={`Are you sure you want to Equipment ${record.equipmentId}?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteEquipmentById(record.equipmentId)}
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
  const filteredEquipment =
    selectedStatus === "ALL"
      ? equipment
      : equipment.filter(
          (v: EquipmentDataType) => v.status === selectedStatus
        );

  return (
    <section id="equipment-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">Equipment</h1>
            </div>
            <div className="flex items-end me-3">
              <form className="max-w-sm mr-4">
                <Select
                  style={{ color: "red" }}
                  showSearch
                  placeholder="Select a status of vehicle"
                  optionFilterProp="label"
                  onChange={(value) => setSelectedStatus(value)}
                  options={[
                    { value: "ALL", label: "ALL" },
                    { value: "AVAILABLE", label: "AVAILABLE" },
                    { value: "OUTOFSERVICE", label: "OUT OF SERVICE" },
                  ]}
                />
              </form>
              <Button
                type="primary"
                icon={<SelectOutlined />}
                onClick={() => openAddModal()}
              >
                ADD EQUIPMENT
              </Button>
            </div>
          </div>
        </header>

        <TableComponent
          dataSource={filteredEquipment.map(
            (equipment: EquipmentDataType, index: number) => ({
              ...equipment,
              key: equipment.equipmentId || index, // Unique key
            })
          )}
          columns={columns}
        />

        {/* Add Modal */}
        {open && modalType === "add" && (
          <EquipmentForm
            isType={"ADD EQUIPMENT"}
            buttonType={"Save"}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
        )}

        {/* Update Modal */}
        {open && modalType === "update" && selectedEquipment && (
          <EquipmentForm
            isType="UPDATE EQUIPMENT"
            buttonType="Update"
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setselectedEquipment(null);
            }}
            equipment={selectedEquipment}
          />
        )}
      </div>
    </section>
  );
};

export default EquipmentPage;
