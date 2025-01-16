import { Form, Input, Select, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { addStaff, updateStaff } from "@/reducers/StaffSlice";
import { StaffModel } from "@/models/StaffModel";
import moment from "moment";

const generateStaffId = () => {
  return 'S-' + Math.floor(Math.random() * 1000000); // Generate a random ID, e.g., S-123456
};

const { Option } = Select;

const StaffForm: React.FC<{ initialValues?: StaffModel; onClose: () => void }> = ({
  initialValues,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (values: StaffModel) => {
    const staffId = initialValues?.staffId || generateStaffId();

    const { buildingNumber, lane, city, state, postalCode } = values; // Destructure values
    const address = `${buildingNumber || ""}, ${lane || ""}, ${city || ""}, ${state || ""}, ${postalCode || ""}`
      .replace(/, ,/g, ",")
      .replace(/^, |, $/g, "")
      .trim();
    // Convert date values to strings before dispatching
    const formattedValues = {
      ...values,
      staffId,
      address,
      joinedDate: values.joinedDate
        ? values.joinedDate.format("YYYY-MM-DD") // Convert to desired string format
        : null,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD") // Convert to desired string format
        : null,
    };
  
    const updatedStaff = {
      ...initialValues,
      ...formattedValues,
    };
  
    if (initialValues) {
      // Update staff logic
      dispatch(updateStaff(updatedStaff)); // Dispatch the updated staff
    } else {
      // Add new staff logic
      dispatch(addStaff(formattedValues));
    }
  
    form.resetFields(); // Reset the form after submit
    onClose(); // Close the modal after submitting
  };
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={{
      ...initialValues,
      joinedDate: initialValues?.joinedDate ? moment(initialValues.joinedDate) : null,
      dateOfBirth: initialValues?.dateOfBirth ? moment(initialValues.dateOfBirth) : null,
    }}>
      {/* Personal Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: "Please select a designation" }]}
        >
          <Select placeholder="Select a designation">
            <Option value="ASSISTANTMANAGER">Assistant Manager</Option>
            <Option value="ADMINANDHRSTAFF">Admin and HR Staff</Option>
            <Option value="OFFICEASSISTANT">Office Assistant</Option>
            <Option value="SENIORAGRONOMIST">Senior Agronomist</Option>
            <Option value="AGRONOMIST">Agronomist</Option>
            <Option value="SOILSCIENTIST">Soil Scientist</Option>
            <Option value="SENIORTECHNICIAN">Senior Technician</Option>
            <Option value="TECHNICIAN">Technician</Option>
            <Option value="SUPERVISOR">Supervisor</Option>
            <Option value="LABOUR">Labour</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select placeholder="Select gender">
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.Item
          name="joinedDate"
          label="Join Date"
          rules={[{ required: true, message: "Please select join date" }]}
        >
          <DatePicker placeholder="Enter join date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: "Please select date of birth" }]}
        >
          <DatePicker placeholder="Enter date of birth" style={{ width: "100%" }} />
        </Form.Item>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item 
        name="buildingNo"
         label="Building No">
          <Input placeholder="Enter building no or name" showCount maxLength={30} />
        </Form.Item>

        <Form.Item name="lane" label="Lane">
          <Input placeholder="Enter lane" showCount maxLength={30} />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item name="city" label="City">
          <Input placeholder="Enter main city" showCount maxLength={30} />
        </Form.Item>

        <Form.Item name="state" label="State">
          <Input placeholder="Enter main state" showCount maxLength={30} />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item name="postalCode" label="Postal Code">
          <Input placeholder="Enter postal code" showCount maxLength={30} />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input placeholder="Enter contact number" showCount maxLength={30} />
        </Form.Item>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select a role">
            <Option value="MANAGER">Manager</Option>
            <Option value="TECHNICIAN">Technician</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>
      </div>

    

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.Item name="fields" label="Fields">
          <Select mode="multiple" placeholder="Select fields">
            {/* Dynamic field options can go here */}
          </Select>
        </Form.Item>

        <Form.Item name="vehicles" label="Vehicles">
          <Select mode="multiple" placeholder="Select vehicles">
            {/* Dynamic vehicle options can go here */}
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Form.Item name="equipments" label="Equipments">
          <Select mode="multiple" placeholder="Select equipment">
            {/* Dynamic equipment options can go here */}
          </Select>
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default StaffForm;
