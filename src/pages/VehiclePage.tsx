import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button, Popconfirm, TableColumnsType } from "antd";
import TableComponent from "@/component/table/TableComponent";
import VehicleForm from "@/component/VehicleForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VehicleModel } from "@/models/VehicleModel";
import { deleteVehicle } from "@/reducers/VehicleSlice"; // Ensure this is the correct path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface VehicleDataType {
  key: React.Key;
  licensePlateNumber: string;
  category: string;
  fuelType: string;
  vehicleStatus: string;
  specialRemark: string;
}

const VehiclePage = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const vehicle = useSelector((state: any) => state.vehicle.vehicle) || []; // Replace 'any' with your state type if available

  const dispatch = useDispatch();

  // Function to open the "Add Vehicle" modal
  function openAddModal() {
    setOpen(true);
    setModalType("add");
  }

  // Function to open the "Update Vehicle" modal
  const updateModal = (vehicle: VehicleModel) => {
    setOpen(true);
    setSelectedVehicle(vehicle);
    setModalType("update");
  };

  // Function to delete a vehicle by licensePlateNumber
  const deleteVehicleByLicensePlate = (licensePlateNumber: string) => {
    console.log("Deleting vehicle:", licensePlateNumber);
    dispatch(deleteVehicle({ licensePlateNumber }));
  };

  // Columns for the table
  const columns: TableColumnsType<VehicleDataType> = [
    {
      title: "License Plate Number",
      dataIndex: "licensePlateNumber",
      key: "licensePlateNumber",
      width: 120,
    },
    { title: "Category", dataIndex: "category", key: "category", width: 120 },
    { title: "Fuel Type", dataIndex: "fuelType", key: "fuelType", width: 120 },
    {
      title: "Vehicle Status",
      dataIndex: "vehicleStatus",
      key: "vehicleStatus",
      width: 120,
    },
    {
      title: "Special Remark",
      dataIndex: "specialRemark",
      key: "specialRemark",
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
      render: (_, record: VehicleDataType) => (
        <>
          <Button
            className="text-green-400 font-bold"
            onClick={() => {
              const vehicleToUpdate = vehicle.find(
                (v: VehicleModel) =>
                  v.licensePlateNumber === record.licensePlateNumber
              );
              if (vehicleToUpdate) {
                updateModal(vehicleToUpdate);
              }
            }}
          >
           
           <FaUserEdit style={{ fontSize: "20px", color: "#00e62e" }}  />
          </Button>
          <Popconfirm
            title="Delete the vehicle"
            description={`Are you sure you want to delete ${record.licensePlateNumber}?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteVehicleByLicensePlate(record.licensePlateNumber)}
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
  const filteredVehicles =
    selectedStatus === "ALL"
      ? vehicle
      : vehicle.filter(
          (v: VehicleDataType) => v.vehicleStatus === selectedStatus
        );

  return (
    <section id="vehicle-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">Vehicle</h1>
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
                ADD VEHICLE
              </Button>
            </div>
          </div>
        </header>

        <TableComponent
          dataSource={filteredVehicles.map(
            (vehicle: VehicleDataType, index: number) => ({
              ...vehicle,
              key: vehicle.licensePlateNumber || index, // Unique key
            })
          )}
          columns={columns}
        />

        {/* Add Modal */}
        {open && modalType === "add" && (
          <VehicleForm
            isType={"ADD VEHICLE"}
            buttonType={"Save"}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
        )}

        {/* Update Modal */}
        {open && modalType === "update" && selectedVehicle && (
          <VehicleForm
            isType="UPDATE VEHICLE"
            buttonType="Update"
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setSelectedVehicle(null);
            }}
            vehicle={selectedVehicle}
          />
        )}
      </div>
    </section>
  );
};

export default VehiclePage;
