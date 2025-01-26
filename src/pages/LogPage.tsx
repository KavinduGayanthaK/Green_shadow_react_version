import { useState, useEffect } from "react";
import { SelectOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import GenericCard from "@/component/ImageCard";

import { deleteLog } from "@/reducers/LogSlice";
import { LogModel } from "@/models/LogModel";
import LogForm from "@/component/LogForm";

interface LogDataType {
  key: React.Key;
logCode: string;
logDate: string | null;
logDetails: string;
logType: string;
logImage: string;
logFields: string[];
logCrops: string[];
logStaff: string[];
 
  
}

const LogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"ADD LOG" | "UPDATE LOG">(
    "ADD LOG"
  );
  const [selectedLog, setSelectedLog] = useState<LogModel | null>(null);
  const [selectedLogType, setSelectedLogType] = useState("ALL");

  // Get fields from Redux store
  const log = useSelector((state: any) => state.log.log) || [];
  const dispatch = useDispatch();

  // Open the "Add Crop" modal
  const openAddModal = () => {
    setModalType("ADD LOG");
    setSelectedLog(null); // No pre-filled data
    setIsModalOpen(true);
  };

  // Open the "Update Crop" modal
  const openUpdateModal = (log: LogModel) => {
    setModalType("UPDATE LOG");
    setSelectedLog(log); // Pre-fill data for update
    setIsModalOpen(true);
  };

  // Delete a crop by its code
  const deleteLogByCode = (logCode: string) => {
    dispatch(deleteLog({ logCode }));
  };

  // Filter fields based on selected size
  const filteredLog =
  selectedLogType === "ALL"
      ? log
      : log.filter(
            (log: LogDataType) => log.logType === selectedLogType
        );

  useEffect(() => {
    // Reset filter or perform other side effects here
  }, [log]);

  return (
    <section id="log-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">LOG</h1>
            </div>
            <div className="flex items-end me-3">
              <form className="max-w-sm mr-4">
              <Select
                  style={{ color: "red" }}
                  showSearch
                  placeholder="Select a Type of fields"
                  optionFilterProp="label"
                  onChange={(value) => setSelectedLogType(value)}
                  options={[
                    { value: "ALL", label: "ALL" },
                    { value: "NORMAL", label: "NORMAL" },
                    { value: "DANGER", label: "DANGER" },
                  ]}
                />
              </form>
              <Button
                type="primary"
                icon={<SelectOutlined />}
                onClick={openAddModal}
              >
                ADD LOG
              </Button>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredLog.length > 0 ? (
            filteredLog.map((log: LogDataType) => (
          <GenericCard
            key={log.logCode}
            title={log.logCode}
            image={
              log.logImage instanceof File
                ? URL.createObjectURL(log.logImage)
                : log.logImage || undefined
            }
            details={[
              { label: "Log Details", value: log.logDetails },
              { label: "Log Date", value: log.logDate || ""},
              {label: "field", value: log.logFields.join(", ")},
              {label: "crop", value: log.logCrops.join(", ")},
              {label: "staff", value: log.logStaff.join(", ")},
              
              
            ]}
            actions={[
              {
                label: "Update",
                onClick: () => openUpdateModal(log),
                type: "primary",
              },
              {
                label: "Delete",
                onClick: () => deleteLogByCode(log.logCode),
                type: "danger",
              },
            ]}
          />
            ))
          ) : (
          (<p>No crops available</p>)
        )}
        </div>


        {isModalOpen && (
          <LogForm
            isType={modalType}
            buttonType={modalType === "ADD LOG" ? "Save" : "Update"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            log={selectedLog || undefined} 
          />
        )}
      </div>
      
    </section>
  );    
};

export default LogPage;
