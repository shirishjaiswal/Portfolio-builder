import React, { useState } from 'react';

type CheckboxOption = {
  id: string;
  label: string;
  value?: string; // Optional value parameter
};

type CheckboxGroupProps = {
  options: CheckboxOption[];
  multiple?: boolean; // Toggle between single or multiple mode
  value?: string[] | string; // Preselected values for checkboxes
  onChange: (selected: string[] | string) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, multiple = false, value, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const handleCheckboxChange = (id: string, optionValue?: string) => {
    let updatedValues: string[];
    const targetValue = optionValue || id; // Use value if provided, otherwise fallback to id

    if (multiple) {
      // For multiple selections, toggle the checkbox
      if (selectedValues.includes(targetValue)) {
        updatedValues = selectedValues.filter((val) => val !== targetValue);
      } else {
        updatedValues = [...selectedValues, targetValue];
      }
    } else {
      // For single selection, replace with the current checkbox
      updatedValues = [targetValue];
    }

    setSelectedValues(updatedValues);
    onChange(multiple ? updatedValues : updatedValues[0]);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.id} style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value || option.id)}
            onChange={() => handleCheckboxChange(option.id, option.value)}
            disabled={!multiple && selectedValues.includes(option.value || option.id)} // Disable other checkboxes if not in 'multiple' mode
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
