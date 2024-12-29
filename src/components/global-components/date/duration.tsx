import { DatePicker } from "@nextui-org/date-picker";
import React, { useState, useCallback } from "react";
import SelectableCheckbox from "@/components/global-components/checkbox/selectable-checkbox";
import { DateValue } from "@nextui-org/calendar";
import { parseAbsoluteToLocal } from "@internationalized/date";

interface DurationProps {
  label: string;
  description: string;
  required: boolean;
  startDateValue: string | null;
  endDateValue: string | null;
  isOngoingValue?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  containerClassName?: string;
  onStartDateChange?: (value: DateValue | null, type: "startDate" | "endDate") => void;
  onEndDateChange?: (value: DateValue | null, type: "startDate" | "endDate") => void;
  onOngoingChange?: (value: string[]) => void;
}

const Duration: React.FC<DurationProps> = ({
  label,
  description,
  required,
  containerClassName,
  startDateValue,
  endDateValue,
  isOngoingValue,
  errorMessage,
  labelClassName,
  onStartDateChange,
  onEndDateChange,
  onOngoingChange,
}) => {
  const [startDate, setStartDate] = useState<string | null>(startDateValue || null);
  const [endDate, setEndDate] = useState<string | null>(endDateValue || null);
  const [isOngoing, setIsOngoing] = useState(isOngoingValue || false);

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0] + "T00:00:00Z";
  };

  const handleStartDateChange = useCallback(
    (value: DateValue | null) => {
      if (value) {
        const localStartDate = formatDate(value.toDate("Asia/Kolkata"));
        setStartDate(localStartDate);
        if (endDate && new Date(localStartDate) > new Date(endDate)) {
          setEndDate(null);
        }
        if (onStartDateChange) onStartDateChange(value, "startDate");
      }
    },
    [endDate, onStartDateChange]
  );

  const handleEndDateChange = useCallback(
    (value: DateValue | null) => {
      if (value) {
        const localEndDate = formatDate(value.toDate("Asia/Kolkata"));
        setEndDate(localEndDate);
        if (onEndDateChange) onEndDateChange(value, "endDate");
      }
    },
    [onEndDateChange]
  );

  const handleOngoingChange = useCallback(
    (value: string[]) => {
      setIsOngoing(value.includes("On Going"));
      if (onOngoingChange) onOngoingChange(value);
    },
    [onOngoingChange]
  );

  const getError = () => {
    return ""; // Implement error logic if necessary
  };

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div>
        {label && (
          <label className={`text-sm font-medium text-zinc-900 ${labelClassName}`}>
            {label} {required && <span className="text-red-500">*</span>}
            <span className="text-sm text-red-700">{errorMessage || getError()}</span>
          </label>
        )}

<p
          id="input-description"
          className="font-light text-xs h-2 text-gray-400"
        >
          {description}
        </p>

      </div>
      <div className="flex gap-4 items-center justify-around border rounded-md px-2 py-0.5 bg-white">
        {/* Start Date */}
        <div className="flex justify-center items-baseline">
          <p className="text-sm text-nowrap">From : </p>
          <DatePicker
            value={startDate ? parseAbsoluteToLocal(startDate) : null} // Pass full ISO string with time
            onChange={(e) => handleStartDateChange(e)}
            granularity="day"
            data-slot="startDate"
            maxValue={endDate ? parseAbsoluteToLocal(endDate) : undefined}
            variant="bordered"
            size="sm"
          />
        </div>

        {/* End Date */}
        <div className="flex justify-center items-baseline">
          <p className="text-sm text-nowrap">To : </p>
          <DatePicker
            value={endDate ? parseAbsoluteToLocal(endDate) : null}
            onChange={(e) => handleEndDateChange(e)}
            isDisabled={isOngoing}
            granularity="day"
            data-slot="endDate"
            minValue={startDate ? parseAbsoluteToLocal(startDate) : undefined}
            variant="bordered"
            size="sm"
          />
        </div>

        {/* Ongoing Checkbox */}
        <SelectableCheckbox
          containerClass="w-2/6"
          optionLableClass="text-nowrap text-sm"
          options={["On Going"]}
          isMultiSelect={false}
          value={isOngoing ? ["On Going"] : []}
          onChange={handleOngoingChange}
        />
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Duration;
