import { StylesConfig } from "react-select";

interface OptionType {
  label: string;
  value: string;
}

export const reactSelectStyles: StylesConfig<OptionType, boolean> = {
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
    fontSize: "0.75rem", // text-xs
    padding: "6px 10px", // Adjusted padding for uniformity
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
    fontSize: "0.75rem", // text-xs
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9CA3AF", // text-gray-400
    "&:hover": {
      color: "#374151", // hover:text-gray-700
    },
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    padding: "0 6px", // Adjust horizontal padding for a neat appearance
    height: "30px", // Set control height to 30px
    backgroundColor: "#F9FAFB", // bg-gray-100
    border: "1px solid #D1D5DB", // border-gray-300
    borderRadius: "6px",
    boxShadow: "none",
    cursor: "text",
    display: "flex", // Flexbox to align items
    alignItems: "center", // Vertically center content
    justifyContent: "flex-start", // Align items to the left
    fontSize: "0.75rem", // Proportional text size (12px)
    lineHeight: "1.2", // Adjust line height for centering
    "&:hover": {
      borderColor: "#3B82F6", // hover:border-blue-500
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E0F2FE", // bg-blue-100
    borderRadius: "9999px", // Fully rounded for pill-shaped tags
    padding: "2px 8px", // Reduced padding for smaller tag size
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem", // text-xs (12px)
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#0F172A", // text-gray-900
    fontSize: "0.75rem", // text-xs (12px)
    fontWeight: 500,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#3B82F6", // text-blue-500
    cursor: "pointer",
    marginLeft: "4px", // Smaller margin to fit reduced size
    borderRadius: "50%", // Make the button round
    width: "16px", // Set width for circular shape
    height: "16px", // Set height for circular shape
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "#EF4444", // hover:text-red-500
      backgroundColor: "#FEE2E2", // hover:bg-red-100
    },
  }),
  indicatorSeparator: () => ({
    display: "none", // Removes the separator
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "wrap",
    gap: "4px", // Smaller gap to match reduced control size
    padding: "0", // Remove extra padding for perfect centering
    alignItems: "center", // Ensure tags are vertically centered
  }),
  indicatorsContainer: () => ({
    display: "none", // Hide all indicators for tags
  }),
};


export const styleForTags: StylesConfig<OptionType, boolean> = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    padding: "0 6px", // Adjust horizontal padding for a neat appearance
    height: "30px", // Set control height to 30px
    backgroundColor: "#F9FAFB", // bg-gray-100
    border: "1px solid #D1D5DB", // border-gray-300
    borderRadius: "6px",
    boxShadow: "none",
    cursor: "text",
    display: "flex", // Flexbox to align items
    alignItems: "center", // Vertically center content
    justifyContent: "flex-start", // Align items to the left
    fontSize: "0.875rem", // Proportional text size (14px)
    lineHeight: "1.2", // Adjust line height for centering
    "&:hover": {
      borderColor: "#3B82F6", // hover:border-blue-500
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "wrap",
    gap: "4px", // Smaller gap to match reduced control size
    padding: "0", // Remove extra padding for perfect centering
    alignItems: "center", // Ensure tags are vertically centered
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E0F2FE", // bg-blue-100
    borderRadius: "9999px", // Fully rounded for pill-shaped tags
    padding: "2px 8px", // Reduce padding to match control size
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem", // text-xs (12px)
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#0F172A", // text-gray-900
    fontSize: "0.75rem", // text-xs (12px)
    fontWeight: 500,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#3B82F6", // text-blue-500
    cursor: "pointer",
    marginLeft: "4px", // Smaller margin to fit reduced size
    borderRadius: "50%", // Make the button round
    width: "16px", // Set width for circular shape
    height: "16px", // Set height for circular shape
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

