import { useState, useEffect } from "react";
import { Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import ModalComponent from "./Modal";
import { CropModel } from "@/models/CropModel";
import { addCrop, updateCrop } from "@/reducers/CropSlice";

const CropForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isType: string;
  buttonType: string;
  crop?: CropModel | null;
}> = ({ isOpen, onClose, isType, buttonType, crop }) => {
  const dispatch = useDispatch();

  const [cropCode, setCropCode] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [cropCategory, setCropCategory] = useState("");
  const [cropSeason, setCropSeason] = useState("");
  const [cropFields, setCropFields] = useState<string[]>([]);
  const [cropImage, setCropImage] = useState<File | null>(null);

  // Function to generate field code
  const generateCropCode = (name: string) => {
    return `CROP-${name.toUpperCase().replace(/\s+/g, "-").slice(0, 10)}`;
  };

  // On field load or update, pre-fill the form
  useEffect(() => {
    if (crop) {
      setCropCode(crop.cropCode || "");
      setCommonName(crop.commonName || "");
      setScientificName(crop.scientificName || "");
      setCropCategory(crop.cropCategory || "");
      setCropSeason(crop.cropSeason || "");
      setCropFields(crop.cropFields || []);
      setCropImage(null); 
    }
  }, [crop]);

  // Generate field code for new field if it is the "ADD FIELD" form
  useEffect(() => {
    if (isType === "ADD CROP" && scientificName) {
      setCropCode(generateCropCode(scientificName)); // Generate based on field name
    }
  }, [scientificName, isType]);

  // Handle file image change (for uploading an image)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setCropImage(file);
      }
    }
  };

  // Handle form submission (add or update field)
  const handleSubmit = () => {
    if (!commonName || !scientificName || !cropCategory || !cropSeason) {
      message.error("Please fill all required fields!");
      return;
    }

    const newCrop: CropModel = {
      cropCode,
      commonName,
      scientificName,
      cropCategory,
      cropSeason,
      cropFields,
      cropImage: cropImage ? URL.createObjectURL(cropImage) : "",
    };

    if (isType === "UPDATE CROP" && crop) {
      dispatch(updateCrop(newCrop));
      message.success("Field updated successfully");
    } else {
      dispatch(addCrop(newCrop));
      message.success("Field added successfully");
    }

    // Reset form after submission
    setCommonName("");
    setScientificName("");
    setCropCategory("");
    setCropSeason("");
    setCropFields([]);
    setCropImage(null);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter crop common name"
            value={commonName}
            onChange={(e) => setCommonName(e.target.value)}
            required
          />
          <Input
            placeholder="Crop Code (auto-generated)"
            value={cropCode}
            disabled
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter Scientific name"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
            required
          />
          <Select
            placeholder="Select Category"
            options={[
              { value: "CEREAL", label: "Cereal " },
              { value: "PULSES", label: "Pulses " },
              { value: "OILSEED", label: "Oilseed " },
              { value: "FIBER", label: "Fiber " },
              { value: "SUGAR", label: "Sugar " },
              { value: "SPICE", label: "Spice " },
            ]}
            value={cropCategory}
            onChange={(value) => setCropCategory(value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select
            placeholder="Select Season"
            options={[
              { value: "YALA", label: "Yala Season " },
              { value: "MAHA", label: "Maha Season " },
            ]}
            value={cropSeason}
            onChange={(value) => setCropSeason(value)}
          />
          <Select
            mode="multiple"
            placeholder="Select fields"
            value={cropFields}
            onChange={(value) => setCropFields(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Staff 1">Field 1</Select.Option>
            <Select.Option value="Staff 2">Field 2</Select.Option>
            <Select.Option value="Staff 3">Field 3</Select.Option>
          </Select>
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              display: "block",
              backgroundColor: "gray",
              marginTop: "8px",
            }}
          />
          {cropImage && (
            <div style={{ marginTop: "8px" }}>
              <h4>Uploaded Image Preview:</h4>
              <img
                src={URL.createObjectURL(cropImage)}
                alt="Uploaded Preview"
                style={{ width: "150px", height: "auto" }}
              />
            </div>
          )}
        </div>
      </form>
    </ModalComponent>
  );
};

export default CropForm;
