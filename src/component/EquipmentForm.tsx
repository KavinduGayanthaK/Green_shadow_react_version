import { useEffect, useState } from "react";
import Input from "antd/es/input";
import Select from "antd/es/select";
import { useDispatch } from "react-redux";
import ModalComponent from "./Modal";
import { addEquipment, updateEquipment } from "@/reducers/EquipmentSlice";
import { EquipmentModel } from "@/models/EquipmentModel";

const EquipmentForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isType: string;
  buttonType: string;
  equipment?: EquipmentModel | null; 
}> = ({ isOpen, onClose, isType, buttonType,equipment }) => {
  const dispatch = useDispatch();

  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [equipmentFields, setEquipmentFields] = useState<string[]>([]);
  const [equipmentStaffMembers, setEquipmentStaffMember] = useState<string[]>([]);

  useEffect(() => {
    if (equipment) {
        setEquipmentId(equipment.equipmentId || "");
        setEquipmentName(equipment.equipmentName || "");
        setEquipmentType(equipment.equipmentType || null);
        setTotalCount(equipment.totalCount || 0);
        setStatus(equipment.status || null);
        setEquipmentFields(equipment.equipmentFields || []);
        setEquipmentStaffMember(equipment.equipmentStaffMembers || []);
    }
  }, [equipment]);

  const resetForm = () => {
    setEquipmentId("");
    setEquipmentName( "");
    setEquipmentType( null);
    setTotalCount( 0);
    setStatus( null);
    setEquipmentFields([]);
    setEquipmentStaffMember([]);
  };

  const handleSubmit = () => {
    const newEquipment: EquipmentModel = {
        equipmentId,
        equipmentName,
        equipmentType: equipmentType || "", 
        totalCount,
        status: status || "",
        equipmentFields,
        equipmentStaffMembers,
    };
    if (isType === "UPDATE EQUIPMENT") {
        dispatch(updateEquipment(newEquipment));
      } else {
        dispatch(addEquipment(newEquipment));
      }

      resetForm();
  };

  
  
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
            placeholder="Enter Equipment name"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
          />

        <Select
            placeholder="Select  type"
            value={equipmentType||null} 
            options={[
              { value: "ELECTRICAL", label: "ELECTRICAL" },
              { value: "MECHANICAL", label: "MECHANICAL" },
            ]}
            onChange={(value) => setEquipmentType(value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
            type="number"
            placeholder="Enter total count"
            value={totalCount}
            onChange={(e) => setTotalCount(Number(e.target.value))}
          />

          <Select
            placeholder="Select availability"
            value={status||null}
            options={[
              { value: "AVAILABLE", label: "AVAILABLE" },
              { value: "OUTOFSERVICE", label: "OUT OF SERVICE" },
            ]}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Select
            mode="multiple"
            placeholder="Select fields"
            value={equipmentFields}
            onChange={(value) => setEquipmentFields(value)}
          />

        <Select
            mode="multiple"
            placeholder="Select staffMember"
            value={equipmentStaffMembers}
            onChange={(value) => setEquipmentStaffMember(value)}
          />
        </div>
      </form>
    </ModalComponent>
  );
};

export default EquipmentForm;
