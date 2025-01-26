import { useState, useEffect } from "react";
import { DatePicker, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import ModalComponent from "./Modal";
import { LogModel } from "@/models/LogModel";
import moment from "moment";
import { addLog, updateLog } from "@/reducers/LogSlice";

const LogForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isType: string;
  buttonType: string;
  log?: LogModel | null;
}> = ({ isOpen, onClose, isType, buttonType, log }) => {
  const dispatch = useDispatch();

  const [logCode, setLogCode] = useState("");
  const [logDate, setLogDate] = useState<moment.Moment | null>(null);
  const [logDetails, setLogDetails] = useState("");
  const [logType, setLogType] = useState<string | null>(null);
  const [logImage, setLogImage] = useState<File | null>(null);
  const [logFields, setLogFields] = useState<string[]>([]);
  const [logCrops, setLogCrops] = useState<string[]>([]);
  const [logStaff, setLogStaff] = useState<string[]>([]);

  // Function to generate field code
  const generateLogCode = (name: string) => {
    return `LOG-${name.toUpperCase().replace(/\s+/g, "-").slice(0, 10)}`;
  };

  // On field load or update, pre-fill the form
  useEffect(() => {
    if (log) {
      setLogCode(log.logCode || "");
      setLogDate(log.logDate ? moment(log.logDate) : null);
      setLogDetails(log.logDetails || "");
      setLogType(log.logType || null);
      setLogImage(null);
      setLogFields(log.logFields || []);
      setLogCrops(log.logCrops || []);
      setLogStaff(log.logStaff || []);
    }
  }, [log]);

  // Generate field code for new field if it is the "ADD FIELD" form
  useEffect(() => {
    if (isType === "ADD LOG" && logDetails) {
      setLogCode(generateLogCode(logDetails)); // Generate based on field name
    }
  }, [logDetails, isType]);

  // Handle file image change (for uploading an image)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setLogImage(file);
      }
    }
  };

  // Handle form submission (add or update field)
  const handleSubmit = () => {
    const formattedLogDate = logDate ? logDate.format("YYYY-MM-DD") : null;

    if (!logDetails || !logFields || !logCrops || !logStaff) {
      message.error("Please fill all required fields!");
      return;
    }

    const newLog: LogModel = {
      logCode,
      logDate: formattedLogDate,
      logDetails,
      logType: logType || "",
      logImage: logImage ? URL.createObjectURL(logImage) : "",
      logFields,
      logCrops,
      logStaff,
    };

    if (isType === "UPDATE LOG" && log) {
      dispatch(updateLog(newLog));
      message.success("Log updated successfully");
    } else {
      dispatch(addLog(newLog));
      message.success("log added successfully");
    }

    // Reset form after submission
    setLogCode("");
    setLogDate(null);
    setLogDetails("");
    setLogType(null);
    setLogImage(null);
    setLogFields([]);
    setLogCrops([]);
    setLogStaff([]);
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
            placeholder="Log Code (auto-generated)"
            value={logCode}
            disabled
          />
          <DatePicker
            placeholder="Enter log date"
            value={logDate}
            onChange={(date) => setLogDate(date)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Enter Log Details"
            value={logDetails}
            onChange={(e) => setLogDetails(e.target.value)}
            required
          />
          <Select
            mode="multiple"
            placeholder="Select fields"
            value={logFields}
            onChange={(value) => setLogFields(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Staff 1">Field 1</Select.Option>
            <Select.Option value="Staff 2">Field 2</Select.Option>
            <Select.Option value="Staff 3">Field 3</Select.Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Select
            mode="multiple"
            placeholder="Select Crops"
            value={logCrops}
            onChange={(value) => setLogCrops(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Staff 1">Field 1</Select.Option>
            <Select.Option value="Staff 2">Field 2</Select.Option>
            <Select.Option value="Staff 3">Field 3</Select.Option>
          </Select>
          <Select
            mode="multiple"
            placeholder="Select Staff"
            value={logStaff}
            onChange={(value) => setLogStaff(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Staff 1">Field 1</Select.Option>
            <Select.Option value="Staff 2">Field 2</Select.Option>
            <Select.Option value="Staff 3">Field 3</Select.Option>
          </Select>
        </div>
        {/* Image Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            {logImage && (
              <div style={{ marginTop: "8px" }}>
                <h4>Uploaded Image Preview:</h4>
                <img
                  src={URL.createObjectURL(logImage)}
                  alt="Uploaded Preview"
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
            )}
          </div>

          <Select
            placeholder="Select Type"
            options={[
              { value: "NORMAL", label: "NORMAL " },
              { value: "DANGER", label: "DANGER " },
            ]}
            value={logType}
            onChange={(value) => setLogType(value)}
          />
        </div>
      </form>
    </ModalComponent>
  );
};

export default LogForm;
