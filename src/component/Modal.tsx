import React, { useState } from "react";
import { Modal, Button, Form } from "antd";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;  // Typing children as ReactNode
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const handleAdd = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      form.resetFields(); // Clears the form fields
      onClose(); // Close the modal after "Add"
    }, 2000);
  };

  const handleCancel = () => {
    Modal.confirm({
      title: "Are you sure you want to cancel?",
      content: "You will lose any unsaved changes.",
      onOk: () =>{
        form.resetFields(),
         onClose() // Close the modal when confirming cancel
      
      }
    });
  };

  return (
    <Modal
      width={800}
      title={title}
      open={isOpen}
      onCancel={handleCancel} // Call handleCancel on modal close
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="add"
          type="primary"
          loading={confirmLoading}
          onClick={handleAdd}
        >
          Add
        </Button>,
      ]}
    >
      {children} {/* Render children here */}
    </Modal>
  );
};

export default ModalComponent;
