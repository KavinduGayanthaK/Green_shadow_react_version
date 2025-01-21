import { useState, useEffect } from "react";
import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FieldModel } from "@/models/FieldModel";
import { deleteField} from "@/reducers/FieldSlice";
import FieldForm from "@/component/FieldForm";
import GenericCard from "@/component/ImageCard";

interface FieldDataType {
  key: React.Key;
  fieldCode: string;
  fieldLocation: string;
  extentSizeOfTheField: number;
  fieldCrops: string[];
  fieldStaff: string[];
  fieldImage: string;
  
}

const FieldPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"ADD FIELD" | "UPDATE FIELD">("ADD FIELD");
  const [selectedField, setSelectedField] = useState<FieldModel | null>(null);
  const [selectedSize, setSelectedSize] = useState("ALL");

  // Get fields from Redux store
  const fields = useSelector((state: any) => state.field.field) || [];
  const dispatch = useDispatch();

  // Open the "Add Field" modal
  const openAddModal = () => {
    setModalType("ADD FIELD");
    setSelectedField(null); // No pre-filled data
    setIsModalOpen(true);
  };

  // Open the "Update Field" modal
  const openUpdateModal = (field: FieldModel) => {
    setModalType("UPDATE FIELD");
    setSelectedField(field); // Pre-fill data for update
    setIsModalOpen(true);
  };

  // Delete a field by its code
  const deleteFieldById = (fieldCode: string) => {
    dispatch(deleteField({ fieldCode }));
  };

  // Filter fields based on selected size
  const filteredFields =
    selectedSize === "ALL"
      ? fields
      : fields.filter((field: FieldDataType) => {
          if (selectedSize === "ASCENDING") {
            return field.extentSizeOfTheField >= 10; // Example filter logic
          } else if (selectedSize === "DESCENDING") {
            return field.extentSizeOfTheField <= 10; // Example filter logic
          }
          return true;
        });

  useEffect(() => {
    // Reset filter or perform other side effects here
  }, [fields]);

  return (
    <section id="field-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">Field</h1>
            </div>
            <div className="flex items-end me-3">
              <form className="max-w-sm mr-4">
                <Select
                  style={{ color: "red" }}
                  showSearch
                  placeholder="Select a Size of fields"
                  optionFilterProp="label"
                  onChange={(value) => setSelectedSize(value)}
                  options={[
                    { value: "ALL", label: "ALL" },
                    { value: "ASCENDING", label: "ASCENDING" },
                    { value: "DESCENDING", label: "DESCENDING" },
                  ]}
                />
              </form>
              <Button type="primary" icon={<SelectOutlined />} onClick={openAddModal}>
                ADD FIELD
              </Button>
            </div>
          </div>
        </header>

        {/* Fields Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredFields.length > 0 ? (
            filteredFields.map((field: FieldDataType) => (
              <GenericCard
              key={field.fieldCode}
              title={field.fieldCode}
              image={
                field.fieldImage instanceof File
                  ? URL.createObjectURL(field.fieldImage)
                  : field.fieldImage || undefined
              }
              details={[
                { label: "Location", value: field.fieldLocation },
                { label: "Extent", value: field.extentSizeOfTheField },
                { label: "Crops", value: field.fieldCrops.join(" ") },
                { label: "Staff", value: field.fieldStaff.join(" ") },
              ]}
              actions={[
                {
                  label: "Update",
                  onClick: () => openUpdateModal(field),
                  type: "primary",
                },
                {
                  label: "Delete",
                  onClick: () => deleteFieldById(field.fieldCode),
                  type: "danger",
                },
              ]}
            />
            ))
          ) : (
            <p>No fields available</p>
          )}
        </div>

        {/* Field Form Modal */}
        {isModalOpen && (
          <FieldForm
            isType={modalType}
            buttonType={modalType === "ADD FIELD" ? "Save" : "Update"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            field={selectedField || undefined} // Pass field only for update
          />
        )}
      </div>
    </section>
  );
};

export default FieldPage;
