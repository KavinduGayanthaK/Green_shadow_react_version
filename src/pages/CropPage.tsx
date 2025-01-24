import { useState, useEffect } from "react";
import { SelectOutlined } from "@ant-design/icons";
import Select from "antd/es/select";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import GenericCard from "@/component/ImageCard";
import { CropModel } from "@/models/CropModel";
import { deleteCrop } from "@/reducers/CropSlice";
import CropForm from "@/component/CropForm";
;


interface CropDataType {
  key: React.Key;
  cropCode: string;
  commonName: string;
  scientificName: string;
  cropCategory: string;
  cropSeason: string;
  cropFields: string[];
  cropImage:string
  
}

const CropPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"ADD CROP" | "UPDATE CROP">("ADD CROP");
  const [selectedCrop, setSelectedCrop] = useState<CropModel | null>(null);
  const [selectedCropCategory, setSelectedCropCategory] = useState("ALL");

  // Get fields from Redux store
  const crop = useSelector((state:any) => state.crop.crop) || [];
  const dispatch = useDispatch();

  // Open the "Add Crop" modal
  const openAddModal = () => {
    setModalType("ADD CROP");
    setSelectedCrop(null); // No pre-filled data
    setIsModalOpen(true);
  };

  // Open the "Update Crop" modal
  const openUpdateModal = (crop: CropModel) => {
    setModalType("UPDATE CROP");
    setSelectedCrop(crop); // Pre-fill data for update
    setIsModalOpen(true);
  };

  // Delete a crop by its code
  const deleteCropByCode = (cropCode: string) => {
    dispatch(deleteCrop({ cropCode }));
  };

  // Filter fields based on selected size
  const filteredCrops =
  selectedCropCategory === "ALL"
      ? crop
      : crop.filter(
            (crop: CropDataType) => crop.cropCategory === selectedCropCategory
        );

  useEffect(() => {
    // Reset filter or perform other side effects here
  }, [crop]);

  return (
    <section id="crop-section" className="w-full overflow-auto">
      <div className="flex-grow-1 overflow-y-auto">
        <header className="border-b pt-6 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-0 ls-tight">Crop</h1>
            </div>
            <div className="flex items-end me-3">
              <form className="max-w-sm mr-4">
                <Select
                  style={{ color: "red" }}
                  showSearch
                  placeholder="Select a Size of fields"
                  optionFilterProp="label"
                  onChange={(value) => setSelectedCropCategory(value)}
                  options={[
                    { value: "ALL", label: "ALL" },
                    { value: "CEREAL", label: "CEREAL" },
                    { value: "PULSES", label: "PULSES" },
                    { value: "OILSEED", label: "OIL SEED" },
                    { value: "FIBER", label: "PULSES" },
                    { value: "SUGAR", label: "SUGAR" },
                    { value: "SPICE", label: "SPICE" },
                   
                  ]}
                />
              </form>
              <Button type="primary" icon={<SelectOutlined />} onClick={openAddModal}>
                ADD CROP
              </Button>
            </div>
          </div>
        </header>

        {/* Fields Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop: CropDataType) => (
              <GenericCard
              key={crop.cropCode}
              title={crop.cropCode}
              image={
                crop.cropImage instanceof File
                  ? URL.createObjectURL(crop.cropImage)
                  : crop.cropImage || undefined
              }
              details={[
                { label: "Common name", value: crop.commonName },
                { label: "Scientific name", value: crop.scientificName },
                { label: "category", value: crop.cropCategory },
                { label: "season", value: crop.cropSeason},
                { label: "field", value: crop.cropFields.join(", ") },
              ]}
              actions={[
                {
                  label: "Update",
                  onClick: () => openUpdateModal(crop),
                  type: "primary",
                },
                {
                  label: "Delete",
                  onClick: () => deleteCropByCode(crop.cropCode),
                  type: "danger",
                },
              ]}
            />
            ))
          ) : (
            <p>No crops available</p>
          )}
        </div>

        {/* Field Form Modal */}
        {isModalOpen && (
          <CropForm
            isType={modalType}
            buttonType={modalType === "ADD CROP" ? "Save" : "Update"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            crop={selectedCrop || undefined} // Pass field only for update
          />
        )}
      </div>
    </section>
  );
};

export default CropPage;
