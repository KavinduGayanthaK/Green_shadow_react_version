import { Form, Input, Select, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { addStaff } from "@/reducers/StaffSlice";
import { StaffModel } from "@/models/StaffModel";

const { Option } = Select;

const StaffForm = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm(); // Use the form instance from Ant Design

  const handleSubmit = (values: StaffModel) => {
    const { firstName, lastName, designation, gender, joinedDate, dateOfBirth, buildingNumber,city,lane, state, contactNumber,postalCode, email, role, fields, vehicles, equipments } = values;

    const newStaff = {
      firstName,
      lastName,
      designation,
      gender,
      joinedDate: joinedDate?joinedDate.toString():null,
      dateOfBirth: dateOfBirth?dateOfBirth.toString():null,
      buildingNumber,
      lane,
      city,
      state,
      postalCode,
      contactNumber,
      email,
      role,
      fields,
      vehicles,
      equipments,
    };

    dispatch(addStaff(newStaff));

    // Reset the form after submit
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
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
