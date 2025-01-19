import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import { StaffModel } from "@/models/StaffModel";
import { addStaff, updateStaff } from "@/reducers/StaffSlice";
import MainModal from "../Modal";

const StaffForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isType: string;
  buttonType: string;
  staff?: StaffModel | null;
}> = ({ isOpen, onClose, isType, buttonType, staff }) => {
  const dispatch = useDispatch();

  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [joinedDate, setJoinedDate] = useState<moment.Moment | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<moment.Moment | null>(null);
  const [buildingNo, setBuildingNo] = useState("");
  const [lane, setLane] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [equipments, setEquipments] = useState<string[]>([]);

  // Populate form on staff edit
  useEffect(() => {
    if (staff) {
      setFirstName(staff.firstName || "");
      setLastName(staff.lastName || "");
      setDesignation(staff.designation || null);
      setGender(staff.gender || null);
      setJoinedDate(staff.joinedDate ? moment(staff.joinedDate) : null);
      setDateOfBirth(staff.dateOfBirth ? moment(staff.dateOfBirth) : null);
      setBuildingNo(staff.buildingNumber || "");
      setLane(staff.lane || "");
      setCity(staff.city || "");
      setState(staff.state || "");
      setPostalCode(staff.postalCode || "");
      setContactNumber(staff.contactNumber || "");
      setEmail(staff.email || "");
      setRole(staff.role || null);
      setFields(staff.fields || []);
      setVehicles(staff.vehicles || []);
      setEquipments(staff.equipments || []);
    }
  }, [staff]);

  // Reset form fields
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDesignation(null);
    setGender(null);
    setJoinedDate(null);
    setDateOfBirth(null);
    setBuildingNo("");
    setLane("");
    setCity("");
    setState("");
    setPostalCode("");
    setContactNumber("");
    setEmail("");
    setRole(null);
    setFields([]);
    setVehicles([]);
    setEquipments([]);
  };

  // Handle form submission
  const handleSubmit = () => {
    const formattedJoinedDate = joinedDate
      ? joinedDate.format("YYYY-MM-DD")
      : null;
    const formattedDateOfBirth = dateOfBirth
      ? dateOfBirth.format("YYYY-MM-DD")
      : null;

    const newStaff: StaffModel = {
      staffId: "",
      firstName,
      lastName,
      designation: designation || "",
      gender: gender || "",
      joinedDate: formattedJoinedDate,
      dateOfBirth: formattedDateOfBirth,
      buildingNumber: buildingNo,
      lane,
      city,
      state,
      postalCode,
      contactNumber,
      email,
      role: role || "",
      fields,
      vehicles,
      equipments,
      
    };

    if (isType === "UPDATE STAFF") {
      dispatch(updateStaff(newStaff));
    } else {
      dispatch(addStaff(newStaff));
    }

    resetForm();
    onClose();
  };

  

  return (
    <MainModal
      isType={isType}
      buttonType={buttonType}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select
            placeholder="Select a designation"
            options={[
              { value: "ASSISTANTMANAGER", label: "Assistant Manager" },
              { value: "ADMINANDHRSTAFF", label: "Admin and HR Staff" },
              { value: "OFFICEASSISTANT", label: "Office Assistant" },
              { value: "SENIORAGRONOMIST", label: "Senior Agronomist" },
              { value: "AGRONOMIST", label: "Agronomist" },
              { value: "SOILSCIENTIST", label: "Soil Scientist" },
              { value: "SENIORTECHNICIAN", label: "Senior Technician" },
              { value: "TECHNICIAN", label: "Technician" },
              { value: "SUPERVISOR", label: "Supervisor" },
              { value: "LABOUR", label: "Labour" },
            ]}
            value={designation}
            onChange={(value) => setDesignation(value)}
          />
          <Select
            placeholder="Select gender"
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
            ]}
            value={gender}
            onChange={(value) => setGender(value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <DatePicker
            placeholder="Enter join date"
            value={joinedDate}
            onChange={(date) => setJoinedDate(date)}
          />
          <DatePicker
            placeholder="Enter date of birth"
            value={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter building no or name"
            value={buildingNo}
            onChange={(e) => setBuildingNo(e.target.value)}
          />
          <Input
            placeholder="Enter lane"
            value={lane}
            onChange={(e) => setLane(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter main city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            placeholder="Enter main state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Input
            placeholder="Enter contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            placeholder="Select a role"
            options={[
              { value: "MANAGER", label: "Manager" },
              { value: "TECHNICIAN", label: "Technician" },
              { value: "OTHER", label: "Other" },
            ]}
            value={role}
            onChange={(value) => setRole(value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select
            mode="multiple"
            placeholder="Select fields"
            value={fields}
            onChange={(value) => setFields(value)}
          />
          <Select
            mode="multiple"
            placeholder="Select vehicles"
            value={vehicles}
            onChange={(value) => setVehicles(value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select
            mode="multiple"
            placeholder="Select equipment"
            value={equipments}
            onChange={(value) => setEquipments(value)}
          />
        </div>
      </form>
    </MainModal>
  );
};

export default StaffForm;
