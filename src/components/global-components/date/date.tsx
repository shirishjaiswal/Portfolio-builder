import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/calendar";
import { DatePicker } from "@nextui-org/date-picker";
import React, { useCallback } from "react";

type DateProps = {
  label: string;
  description: string;
  required: boolean;
  dataValue: string | null;
  errorMessage?: string;
  labelClassName?: string;
  onDateChange?: (value: DateValue | null, type: "startDate") => void;
};

const Date: React.FC<DateProps> = ({
  label,
  description,
  required,
  dataValue,
  errorMessage,
  labelClassName,
  onDateChange,
}) => {
  const handleDateChange = useCallback(
    (value: DateValue | null) => {
      if (value) {
        if (onDateChange) onDateChange(value, "startDate");
      }
    },
    [onDateChange]
  );

  const getError = () => {
    return "";
  };

  return (
    <div className={`flex flex-col gap-1`}>
      <div>
        {label && (
          <label
            className={`text-sm font-medium text-zinc-900 ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">*</span>}
            <span className="text-sm text-red-700">
              {errorMessage || getError()}
            </span>
            <p
              id="input-description"
              className="font-light text-xs h-2 text-gray-400"
            >
              {description}
            </p>
          </label>
        )}
      </div>
      <div>
        <div className="flex justify-center items-baseline">
          <DatePicker
            value={dataValue ? parseAbsoluteToLocal(dataValue) : null}
            onChange={(e) => handleDateChange(e)}
            granularity="day"
            data-slot="startDate"
            variant="bordered"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default Date;
