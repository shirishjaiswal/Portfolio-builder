import { getReactSelectOptions } from "@/utils/helper/user-info-group";
import { styleForTags } from "@/utils/styles/react-select";
import { useState } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type SelectableCreatableSelectProps = {
  label: string;
  description: string;
  required: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  containerClassName?: string;
  labelClassName?: string;
  errorMessage?: string;
};

const SelectableCreatableSelect: React.FC<SelectableCreatableSelectProps> = ({
  label,
  description,
  required,
  value,
  onChange,
  containerClassName = "",
  labelClassName = "",
  errorMessage = "",
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const handleChange = (
    option: MultiValue<{ value: string; label: string }>
  ) => {
    const newValue = option.map((item) => item.value);
    setSelectedValues(newValue);
    onChange(newValue);
  };

  const getError = () => {
    return errorMessage || "";
  };

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <div>
        {label && (
          <label
            className={`text-base font-medium text-zinc-900 ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">*</span>}
            <span className="text-sm text-red-700">{getError()}</span>
          </label>
        )}


          <p
            id="input-description"
            className="font-light text-xs h-2 text-gray-400"
          >
            {description}
          </p>
      
      </div>

      <div className="relative">
        <CreatableSelect
          isMulti={true}
          placeholder="Options List"
          className="text-roboto text-sm"
          key="selection-type"
          styles={styleForTags}
          value={getReactSelectOptions(selectedValues) ?? []}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SelectableCreatableSelect;
