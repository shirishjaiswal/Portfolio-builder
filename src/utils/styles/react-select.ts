import { StylesConfig } from "react-select";

interface OptionType {
  label: string;
  value: string;
}

export const reactSelectStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    padding: "0px 8px",
    marginTop: "6px",
    fontSize: "0.875rem", // text-sm
    backgroundColor: state.isDisabled ? "#F3F4F6" : "#FFFFFF", // bg-gray-100 when disabled
    border: state.isFocused
      ? "1px solid #3B82F6" // focus:border-blue-500
      : "1px solid #D1D5DB", // border-gray-300
    borderRadius: "6px", // rounded-md
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(59, 130, 246, 0.5)" // focus:ring-blue-300
      : "none",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: state.isFocused ? "none" : "0 0 0 1px rgba(0, 0, 0, 0.1)", // hover:shadow-sm
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    padding: "0",
    zIndex: 1000,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#075985" // selected: bg-blue-500
      : state.isFocused
      ? "#bfdbfe" // focus:bg-gray-100
      : "transparent",
    color: state.isSelected ? "#FFFFFF" : "#111827", // selected: text-white
    fontSize: "0.875rem", // text-sm
    padding: "10px 12px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF", // placeholder: text-gray-400
    fontStyle: "italic",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#111827", // text-gray-900
    fontWeight: 400, // text-thin
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9CA3AF", // text-gray-400
    "&:hover": {
      color: "#374151", // hover:text-gray-700
    },
  }),
  indicatorSeparator: () => ({
    display: "none", // Removes the separator
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0px", // Align with InputTextField padding
  }),
};

export const styleForTags: StylesConfig<OptionType, true> = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    padding: "4px 8px",
    minHeight: "40px",
    backgroundColor: "#F9FAFB", // bg-gray-100
    border: "1px solid #D1D5DB", // border-gray-300
    borderRadius: "6px",
    boxShadow: "none",
    cursor: "text",
    "&:hover": {
      borderColor: "#3B82F6", // hover:border-blue-500
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "4px 8px",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E0F2FE", // bg-blue-100
    borderRadius: "9999px", // Fully rounded for pill-shaped tags
    padding: "4px 12px",
    display: "flex",
    alignItems: "center",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#0F172A", // text-gray-900
    fontSize: "0.875rem", // text-sm
    fontWeight: 500,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#3B82F6", // text-blue-500
    cursor: "pointer",
    marginLeft: "8px",
    borderRadius: "50%", // Make the button round
    width: "20px", // Set width for circular shape
    height: "20px", // Set height for circular shape
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "#EF4444", // hover:text-red-500
      backgroundColor: "#FEE2E2", // hover:bg-red-100
    },
  }),
  menu: () => ({
    display: "none", // Hide the menu
  }),
  indicatorsContainer: () => ({
    display: "none", // Hide all indicators
  }),
};

