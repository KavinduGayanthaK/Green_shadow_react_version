import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(children.form); // Using Ant Design form to manage inputs

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
      onOk: () => onClose(), // Close the modal when confirming cancel
    });
  };

  return (
    <Modal
      width={800}
      title="Add Employee"
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
      {children}
    </Modal>
  );
};

export default ModalComponent;
