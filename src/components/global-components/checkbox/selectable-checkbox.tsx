import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

interface SelectableCheckboxProps {
  label?: string;
  required?: boolean;
  description?: string;
  options: string[];
  isMultiSelect: boolean;
  value?: string | string[];
  onChange: (value: string[]) => void;
  containerClass?: string;
  optionLableClass?: string;
  checkboxContainerClass?: string;
  labelClass?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  errorMessage?: string;
}

const SelectableCheckbox: React.FC<SelectableCheckboxProps> = ({
  label,
  options,
  description,
  required = false,
  isMultiSelect = true,
  value,
  onChange,
  containerClass = "",
  checkboxContainerClass = "",
  color = "default",
  labelClass: labelClassName = "",
  optionLableClass = "",
  errorMessage,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const handleSingleSelect = (option: string) => {
    const newValue = selectedValues[0] === option ? [] : [option];
    setSelectedValues(newValue);
    onChange([newValue[0]]);
  };

  const handleMultiSelect = (option: string) => {
    const newValue: string[] = selectedValues.includes(option)
      ? selectedValues.filter((val) => val !== option)
      : [...selectedValues, option];
    setSelectedValues(newValue);
    onChange(newValue);
  };

  const handleChange = (option: string) => {
    if (!isMultiSelect) {
      handleSingleSelect(option);
    } else {
      handleMultiSelect(option);
    }
  };

  const getError = () => {
    return "";
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClass}`}>
      <div>
        {label && (
          <label
            className={`text-base font-medium text-zinc-900
             ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">* </span>}
            {
              <span className="text-sm text-red-700">
                {errorMessage || getError()}
              </span>
            }
          </label>
        )}

        <p id="input-description" className="font-light text-xs text-gray-400">
          {description}
        </p>
      </div>
      <div className={`${checkboxContainerClass}`}>
      {options.map((option) => (
        <Checkbox
          className="flex items-center"
          key={option}
          isSelected={selectedValues.includes(option)}
          onChange={() => handleChange(option)}
          color={color}
        >
          <span className={`text-sm items-center ${optionLableClass}`}>{option}</span>
        </Checkbox>
      ))}
      </div>
    </div>
  );
};

export default SelectableCheckbox;
