export const reactSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    padding: "0px",
    backgroundColor: "transparent",
    border: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "0px",
    zIndex: 9999, 
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999, 
  }),
  option: (provided: any, state: { isSelected: boolean; isFocused: boolean }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2D67BF" : state.isFocused ? "#EDEDED" : null,
    color: state.isSelected ? "#fff" : "#333",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#333",
    padding: "0px",
  }),
};


export const styleForTags = {
  ...reactSelectStyles,

  menu: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator : (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorContainer : (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
};