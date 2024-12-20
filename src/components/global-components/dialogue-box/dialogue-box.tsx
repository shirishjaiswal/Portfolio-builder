import React from "react";
import InputTextField from "../input-field/input-text-field";
import { Checkbox } from "@nextui-org/checkbox";

interface InputField {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "dialogueBox";
  placeholder?: string;
  options?: string[];
  value?: string;
  checkboxValue?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warning?: string;
  isInvalid?: boolean;
}

interface Button {
  label: string;
  type: "blue" | "green" | "red" | "gray";
  onClick: () => void;
}

interface DialogBoxProps {
  className?: string;
  title: string;
  subtitle?: string;
  inputFields?: InputField[];
  buttons: Button[];
  isOpen: boolean;
  onClose: () => void;
}

const getButtonStyles = (type: "blue" | "green" | "red" | "gray"): string => {
  const transation = "transition duration-200 drop-shadow-lg ease-in-out rounded-lg";
  if (type === "gray") return `bg-gray-200 text-gray-700 hover:bg-gray-300 hov ${transation}`;
  if (type === "red") return `border-2 border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white ${transation}`;
  if (type === "green") return `bg-green-500 text-white hover:bg-green-600 ${transation}`;
  if (type === "blue") return `bg-sky-700 text-white hover:bg-sky-800 ${transation}`;
  return `bg-blue-500 text-white hover:bg-blue-600 ${transation}`;
};

const DialogBox: React.FC<DialogBoxProps> = ({
  className,
  title,
  subtitle,
  inputFields = [],
  buttons,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <dialog
      className={`fixed inset-0 flex items-center justify-center z-50 min-w-40p ${className}`}
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Dialog Box */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-75p w-full relative z-10 ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none "
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        {/* Horizontal Line */}
        <div className="border-b border-gray-200 mb-4"></div>

        {/* Sub Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Body */}

        {inputFields.map((field) =>
          field.type === "dialogueBox" ? (
            <div className="mb-6" key={field.id}>
              <Checkbox
                className="text-sm"
                isSelected={field.checkboxValue}
                color="success"
                onChange={field.onChange}
              >
                {field.label}
              </Checkbox>
            </div>
          ) : (
            <div className="mb-6" key={field.id}>
              <InputTextField
                key={field.id}
                type={field.type ?? "text"}
                label={field.label}
                placeholder={field.placeholder ?? ""}
                value={field.value}
                onChange={field.onChange}
                isInvalid={field.isInvalid}
                errorMessage={field.warning}
              />
            </div>
          )
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`px-4 py-2 rounded-md font-semibold ${getButtonStyles(
                button.type
              )}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default DialogBox;
