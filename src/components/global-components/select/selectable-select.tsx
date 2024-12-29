import { reactSelectStyles } from "@/utils/styles/react-select";
import { useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";

type OptionType = {
  label: string;
  value: string;
};

type SelectableSelectProps = {
  label: string;
  description?: string;
  required: boolean;
  options: string[];
  value: string[];
  isMultiSelect: boolean;
  onChange: (value: string[]) => void;
  containerClassName?: string;
  labelClassName?: string;
  errorMessage?: string;
};

const SelectableSelect: React.FC<SelectableSelectProps> = ({
  label,
  description,
  required = false,
  options,
  isMultiSelect = true,
  value,
  onChange,
  containerClassName = "",
  labelClassName = "",
  errorMessage = "",
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  const handleSingleSelect = (option: SingleValue<OptionType>) => {
    const newValue = option ? [option.value] : [];
    setSelectedValues(newValue);
    onChange([newValue[0]] || "");
  };

  const handleMultiSelect = (option: MultiValue<OptionType>) => {
    const newValue = option.map((opt) => opt.value);
    setSelectedValues(newValue);
    onChange(newValue);
  };

  const handleChange = (
    option: MultiValue<OptionType> | SingleValue<OptionType>
  ) => {
    if (isMultiSelect) {
      handleMultiSelect(option as MultiValue<OptionType>);
    } else {
      handleSingleSelect(option as SingleValue<OptionType>);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label
          className={`text-base font-medium text-zinc-900 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
          {errorMessage && (
            <span className="text-sm text-red-700">{errorMessage}</span>
          )}
          <p
            id="input-description"
            className="font-light h-2 text-xs text-gray-400"
          >
            {description}
          </p>
        </label>
      )}

      <div className="relative">
        <Select
          className="text-roboto text-sm"
          isMulti={isMultiSelect}
          placeholder={isMultiSelect ? "Select Options" : "Select Option"}
          styles={reactSelectStyles}
          options={options.map((option) => ({ value: option, label: option }))}
          value={selectedValues.map((val) => ({
            value: val,
            label: val,
          }))}
          onChange={handleChange}
          menuPlacement="auto"
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  );
};

export default SelectableSelect;
