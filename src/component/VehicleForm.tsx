import { useEffect, useState } from "react";
import Input from "antd/es/input";
import Select from "antd/es/select";
import { useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { VehicleModel } from "@/models/VehicleModel";
import { saveVehicle, updateVehicle } from "@/reducers/VehicleSlice";
import ModalComponent from "./Modal";
import { AppDispatch } from "@/store/Store";

const VehicleForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isType: string;
  buttonType: string;
  vehicle?: VehicleModel | null; 
}> = ({ isOpen, onClose, isType, buttonType,vehicle }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [licensePlateNumber, setLicensePlateNumber] = useState("");
  const [category, setCategory] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [specialRemark, setSpecialRemark] = useState("");
  const [vehicleStaffMember, setVehicleStaffMember] = useState("");

  useEffect(() => {
    if (vehicle) {
      setLicensePlateNumber(vehicle.licensePlateNumber || "");
      setCategory(vehicle.category || "");
      setFuelType(vehicle.fuelType || "");
      setVehicleStatus(vehicle.vehicleStatus || "");
      setSpecialRemark(vehicle.specialRemark || "");
      setVehicleStaffMember(vehicle.vehicleStaffMember || "");
    }
  }, [vehicle]);

  const handleSubmit = () => {
    const newVehicle: VehicleModel = {
      licensePlateNumber,
      category,
      fuelType: fuelType || "", 
    vehicleStatus: vehicleStatus || "",
      specialRemark,
      vehicleStaffMember,
    };
    if (isType === "UPDATE VEHICLE") {
        dispatch(updateVehicle(newVehicle));
      } else {
        dispatch(saveVehicle(newVehicle));
      }

    setLicensePlateNumber("");
    setCategory("");
    setFuelType("");
    setVehicleStatus("");
    setSpecialRemark("");
    setVehicleStaffMember("");
  };
  const MAX_COUNT = 1;
  const suffix = (
    <>
      <span>
        {vehicleStaffMember.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <ModalComponent
      isType={isType}
      buttonType={buttonType}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter License plate number"
            value={licensePlateNumber}
            onChange={(e) => setLicensePlateNumber(e.target.value)}
          />

          <Input
            placeholder="Enter vehicle category(ex:Van)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select
            placeholder="Select fuel type"
            value={fuelType||null} 
            options={[
              { value: "PETROL", label: "PETROL" },
              { value: "DIESEL", label: "DIESEL" },
              { value: "ELECTRIC", label: "ELECTRIC" },
            ]}
            onChange={(value) => setFuelType(value)}
          />

          <Select
            placeholder="Select availability"
            value={vehicleStatus||null}
            options={[
              { value: "AVAILABLE", label: "AVAILABLE" },
              { value: "OUTOFSERVICE", label: "OUT OF SERVICE" },
            ]}
            onChange={(value) => setVehicleStatus(value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter special remark"
            value={specialRemark}
            onChange={(e) => setSpecialRemark(e.target.value)}
          />

          <Select
            
            maxCount={MAX_COUNT}
            value={vehicleStaffMember||null}
            style={{ width: "100%"}}
            onChange={setVehicleStaffMember}
            suffixIcon={suffix}
            placeholder="Please select staff member"
            options={[
              { value: "Ava Swift", label: "Ava Swift" },
              { value: "Cole Reed", label: "Cole Reed" },
              { value: "Mia Blake", label: "Mia Blake" },
              { value: "Jake Stone", label: "Jake Stone" },
              { value: "Lily Lane", label: "Lily Lane" },
              { value: "Ryan Chase", label: "Ryan Chase" },
              { value: "Zoe Fox", label: "Zoe Fox" },
              { value: "Alex Grey", label: "Alex Grey" },
              { value: "Elle Blair", label: "Elle Blair" },
            ]}
          />
        </div>
      </form>
    </ModalComponent>
  );
};

export default VehicleForm;
