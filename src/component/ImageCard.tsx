import React from "react";
import { Button } from "antd";

interface CardProps {
  image?: File | string; // Support both File objects and URLs
  title: string;
  details: { label: string; value: string | number }[]; // Flexible detail list
  actions?: {
    label: string;
    onClick: () => void;
    type?: "primary" | "default" | "danger";
  }[]; // Action buttons
}

const GenericCard: React.FC<CardProps> = ({ image, title, details, actions }) => {
  return (
    <div className="border rounded-lg bg-white shadow-black shadow-2xl text-black p-4">
      {image && (
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt={title}
          className="w-96 h-48 object-cover rounded-md mb-2"
        />
      )}
      <h4 className="text-lg font-semibold">{title}</h4>
      {details.map((detail, index) => (
        <p key={index} className="text-base font-normal">
          {detail.label}: {detail.value}
        </p>
      ))}
      {actions && (
        <div className="flex space-x-2 mt-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              type={action.type === "danger" ? "default" : action.type}
              className={`btn ${action.type === "danger" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-800 hover:bg-green-600 text-white"}`}
              style={{ width: "140px" }}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenericCard;
