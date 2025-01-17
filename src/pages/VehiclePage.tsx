import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button, TableColumnsType } from "antd";
//import { useSelector } from "react-redux";
import TableComponent from "@/component/table/TableComponent";
import VehicleForm from "@/component/VehicleForm";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const vehicle = useSelector((state) => state.vehicle.vehicle) || [];

  function openAddModal() {
    setOpen(true);
    setModalType("add");
  }

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
          dataSource={vehicle.map((vehicle: VehicleDataType) => ({
            ...vehicle,
          }))}
          columns={columns}
        />
        {open && modalType === "add" && (
          <VehicleForm
            isType={"ADD Vehicle"}
            buttonType={"Save"}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default VehiclePage;
