import { useState, useEffect } from "react";
import { Input, Button, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { FieldModel } from "@/models/FieldModel";
import { addField, updateField } from "@/reducers/FieldSlice";
import ModalComponent from "./Modal";

const FieldForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isType: string;
  buttonType: string;
  field?: FieldModel | null;
}> = ({ isOpen, onClose, isType, buttonType, field }) => {
  const dispatch = useDispatch();

  const [fieldCode, setFieldCode] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldLocation, setFieldLocation] = useState("");
  const [extentSizeOfTheField, setExtentSizeOfTheField] = useState("");
  const [fieldCrops, setFieldCrops] = useState<string[]>([]);
  const [fieldStaff, setFieldStaff] = useState<string[]>([]);
  const [fieldImage, setFieldImage] = useState<File | null>(null);

  // Function to generate field code
  const generateFieldCode = (name: string) => {
    return `FIELD-${name.toUpperCase().replace(/\s+/g, "-").slice(0, 10)}`;
  };

  // On field load or update, pre-fill the form
  useEffect(() => {
    if (field) {
      setFieldCode(field.fieldCode || "");
      setFieldName(field.fieldName || "");
      setFieldLocation(field.fieldLocation || "");
      setExtentSizeOfTheField(field.extentSizeOfTheField || "");
      setFieldCrops(field.fieldCrops || []);
      setFieldStaff(field.fieldStaff || []);
      setFieldImage(null); // Reset field image for now
    }
  }, [field]);

  // Generate field code for new field if it is the "ADD FIELD" form
  useEffect(() => {
    if (isType === "ADD FIELD" && fieldName) {
      setFieldCode(generateFieldCode(fieldName)); // Generate based on field name
    }
  }, [fieldName, isType]);

  // Handle file image change (for uploading an image)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setFieldImage(file);
      }
    }
  };

  // Handle form submission (add or update field)
  const handleSubmit = () => {
    if (!fieldName || !fieldLocation || !extentSizeOfTheField) {
      message.error("Please fill all required fields!");
      return;
    }

    const newField: FieldModel = {
      fieldCode,
      fieldName,
      fieldLocation,
      extentSizeOfTheField,
      fieldCrops,
      fieldStaff,
      fieldImage: fieldImage ? URL.createObjectURL(fieldImage) :  field ?.fieldImage || "",
    };

    if (isType === "UPDATE FIELD" && field) {
      dispatch(updateField(newField));
      message.success("Field updated successfully");
    } else {
      dispatch(addField(newField));
      message.success("Field added successfully");
    }

    // Reset form after submission
    setFieldCode("");
    setFieldName("");
    setFieldLocation("");
    setExtentSizeOfTheField("");
    setFieldCrops([]);
    setFieldStaff([]);
    setFieldImage(null);
    onClose(); // Close the modal after submission
  };

  return (
    <ModalComponent
      isType={isType}
      buttonType={buttonType}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <form className="space-y-4">
        {/* Field Name */}
        <div>
          <Input
            placeholder="Enter Field Name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            required
          />
        </div>

        {/* Field Code (generated) */}
        <div>
          <Input
            placeholder="Field Code (auto-generated)"
            value={fieldCode}
            disabled
          />
        </div>

        {/* Field Location */}
        <div>
          <Input
            placeholder="Enter Field Location"
            value={fieldLocation}
            onChange={(e) => setFieldLocation(e.target.value)}
            required
          />
        </div>

        {/* Extent Size of the Field */}
        <div>
          <Input
            placeholder="Enter Extent Size of the Field"
            value={extentSizeOfTheField}
            onChange={(e) => setExtentSizeOfTheField(e.target.value)}
            required
          />
        </div>

        {/* Crops Selection */}
        <div>
          <Select
            mode="multiple"
            placeholder="Select Crops"
            value={fieldCrops}
            onChange={(value) => setFieldCrops(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Crop 1">Crop 1</Select.Option>
            <Select.Option value="Crop 2">Crop 2</Select.Option>
            <Select.Option value="Crop 3">Crop 3</Select.Option>
          </Select>
        </div>

        {/* Staff Selection */}
        <div>
          <Select
            mode="multiple"
            placeholder="Select Staff"
            value={fieldStaff}
            onChange={(value) => setFieldStaff(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Staff 1">Staff 1</Select.Option>
            <Select.Option value="Staff 2">Staff 2</Select.Option>
            <Select.Option value="Staff 3">Staff 3</Select.Option>
          </Select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "block", marginTop: "8px" }}
          />
          {fieldImage && (
            <div style={{ marginTop: "8px" }}>
              <h4>Uploaded Image Preview:</h4>
              <img
                src={URL.createObjectURL(fieldImage)}
                alt="Uploaded Preview"
                style={{ width: "150px", height: "auto" }}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="primary"
            onClick={handleSubmit}
            icon={<PlusOutlined />}
            style={{ width: "100%" }}
          >
            {buttonType}
          </Button>
        </div>
      </form>
    </ModalComponent>
  );
};

export default FieldForm;
