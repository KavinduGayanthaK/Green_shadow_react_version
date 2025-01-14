import { useState } from "react";
import Input from "antd/es/input";
import Select from "antd/es/select";
import DatePicker from "antd/es/date-picker";
import { useDispatch } from "react-redux";
import { addStaff } from "@/reducers/StaffSlice";
import Button from "antd/es/button";

const StaffForm = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [joinedDate, setJoinedDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [buildingNo, setBuildingNo] = useState("");
  const [lane, setLane] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [fields, setFields] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [equipments, setEquipments] = useState([]);

  const handleSubmit = () => {
    const address = `${buildingNo}, ${lane}, ${city}, ${state}, ${postalCode}`.trim();
    const newStaff = {
      
      firstName,
      lastName,
      designation,
      gender,
      joinedDate,
      dateOfBirth,
      address,
      contactNumber,
      email,
      role,
      fields,
      vehicles,
      equipments,
    };
    dispatch(addStaff(newStaff));

    setFirstName("");
    setLastName("");
    setDesignation("");
    setGender("");
    setJoinedDate(null);
    setDateOfBirth(null);
    setBuildingNo("");
    setCity("");
    setLane("");
    setState("");
    setPostalCode("");
    setContactNumber("");
    setEmail("");
    setRole("");
    setFields([]);
    setVehicles([]);
    setEquipments([]);

    // Close the modal
    onclose();
  };

  
  return (
    <form>
      {/* Personal Information */}
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
          onChange={(value) => setDesignation(value)}
        />
        <Select
          placeholder="Select gender"
          options={[
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
          ]}
          onChange={(value) => setGender(value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <DatePicker
          placeholder="Enter join date"
          onChange={(date) => setJoinedDate(date)}
        />
        <DatePicker
          placeholder="Enter date of birth"
          onChange={(date) => setDateOfBirth(date)}
        />
      </div>

      {/* Address Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          placeholder="Enter building no or name"
          showCount
          maxLength={30}
          onChange={(e) => setBuildingNo(e.target.value)}
        />
        <Input
          placeholder="Enter lane"
          showCount
          maxLength={30}
          onChange={(e) => setLane(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          placeholder="Enter main city"
          showCount
          maxLength={30}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          placeholder="Enter main state"
          showCount
          maxLength={30}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          placeholder="Enter postal code"
          showCount
          maxLength={30}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Input placeholder="Enter contact number" showCount maxLength={30} />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          placeholder="Enter contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Role and Assignments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Select
          placeholder="Select a role"
          options={[
            { value: "MANAGER", label: "Manager" },
            { value: "TECHNICIAN", label: "Technician" },
            { value: "OTHER", label: "Other" },
          ]}
          onChange={(value) => setRole(value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Select
          mode="multiple"
          placeholder="Select fields"
          onChange={(value) => setFields(value)}
        />
        <Select
          mode="multiple"
          placeholder="Select vehicles"
          onChange={(value) => setVehicles(value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Select
          mode="multiple"
          placeholder="Select equipment"
          onChange={(value) => setEquipments(value)}
        />
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Save
      </Button>
    </form>
  );
};

export default StaffForm;
