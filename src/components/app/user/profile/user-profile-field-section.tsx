import InputTextField from "@/components/global-components/input-field/input-text-field";
import SelectableCheckbox from "@/components/global-components/checkbox/selectable-checkbox";
import SelectableSelect from "@/components/global-components/select/selectable-select";
import SelectableCreatableSelect from "@/components/global-components/select/selectable-creatable-select";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import { useEffect, useState } from "react";
import { UserProfileDetailsField } from "@/components/app/user/profile/types";
import Duration from "@/components/global-components/date/duration";
import { DateValue } from "@nextui-org/calendar";
import Date from "@/components/global-components/date/date";

type UserProfileFieldSectionProps = {
  parentUniqueKey: string;
  field: UserProfileDetailsField;
};

const similarFieldParamaters: string[] = ["TEXT", "TEXTAREA", "EMAIL", "PHONE"];

const UserProfileFieldSection: React.FC<UserProfileFieldSectionProps> = ({
  parentUniqueKey,
  field,
}: UserProfileFieldSectionProps) => {
  const { activeTab, updateTextFieldValue, updateInputArrayField, updateDateValue } = useUserProfileContexts();

  const [currentField, setCurrentField] = useState<UserProfileDetailsField>(field);

  if(!activeTab) return null;
  
  useEffect(() => {
    setCurrentField(field);
  }, [field]);

  const handleCheckboxSelection = (value: string[]) => {
    setCurrentField({
      ...currentField,
      value: {
        ...currentField.value,
        inputValueArray: value,
      },
      hasUnsavedChanges: true,
    });
    updateInputArrayField(
      activeTab?.configKey,
      parentUniqueKey,
      field.uniqueKey,
      value
    );
  };

  const handleInputTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentField({
      ...currentField,
      value: {
        ...currentField.value,
        inputValue: e.target.value,
      },
    });
  };

  const handleInputTextFieldBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTextFieldValue(
       activeTab?.configKey,
      parentUniqueKey,
      field.uniqueKey,
      e.target.value
    );
  };

  const handleDropDownSelection = (value: string[]) => {
    updateInputArrayField(
       activeTab?.configKey,
      parentUniqueKey,
      field.uniqueKey,
      value
    );
  };

  const handleCreatableSelect = (value: string[]) => {
    updateInputArrayField(
       activeTab?.configKey,
      parentUniqueKey,
      field.uniqueKey,
      value
    );
  };

  const handleDateValueChange = (
    value: DateValue | null,
    type: "startDate" | "endDate"
  ) => {
    updateDateValue(
      activeTab?.configKey,
      parentUniqueKey,
      field.uniqueKey,
      type,
      value?.toDate("Asia/Kolkata").toISOString() ?? ""
    );
  };

  return (
    <div
      key={field.configKey}
      className={`${field.input === "DURATION" ? "5/12" : "w-3/12"} flex-none`}
    >
      {similarFieldParamaters.includes(field.input) && (
        <InputTextField
          key={field.input}
          containerClassName="w-full min-w-52"
          required={field.required}
          type={field.input.toLocaleLowerCase()}
          label={field.label}
          placeholder={"Enter " + field.label}
          description={field.description}
          defaultValue={field.value?.inputValue || ""}
          value={field.value?.inputValue || ""}
          onChange={handleInputTextFieldChange}
          onBlur={handleInputTextFieldBlur}
        />
      )}
      {field.input === "CHECKBOX" &&
        field.options &&
        field?.options!.length > 0 && (
          <SelectableCheckbox
            key={field.input}
            label={field.label}
            description={field.description}
            required={field.required}
            containerClass="w-full min-w-52"
            value={field.value?.inputValueArray || []}
            options={field.options}
            isMultiSelect={field.hasMultiSelection ?? true}
            onChange={handleCheckboxSelection}
            color="default"
          />
        )}
      {field.input === "DROPDOWN" &&
        field.options &&
        field?.options!.length > 0 && (
          <SelectableSelect
            label={field.label}
            description={field.description}
            required={field.required}
            containerClassName="w-full min-w-52"
            value={field.value?.inputValueArray || []}
            isMultiSelect={field.hasMultiSelection ?? true}
            labelClassName="text-roboto text-sm"
            key="selection-type"
            options={field!.options ?? []}
            onChange={handleDropDownSelection}
          />
        )}
      {field.input === "LIST" && (
        <SelectableCreatableSelect
          label={field.label}
          description={field.description}
          required={field.required}
          containerClassName="w-full min-w-52"
          value={field.value?.inputValueArray || []}
          labelClassName="text-roboto text-sm"
          key="selection-type"
          onChange={handleCreatableSelect}
        />
      )}
      {field.input === "DURATION" && (
        <Duration
          label={field.label}
          description={field.description}
          required={field.required}
          containerClassName="min-w-full"
          startDateValue={field.value?.startDate || null}
          endDateValue={field.value?.endDate || null}
          isOngoingValue={field.value?.onGoing || false}
          onStartDateChange={handleDateValueChange}
          onEndDateChange={handleDateValueChange}
          onOngoingChange={handleCheckboxSelection}
        />
      )}
      {field.input === "CALENDAR" && (
        <Date
          label={field.label}
          description={field.description}
          required={field.required}
          dataValue={field.value?.startDate || null}
          onDateChange={handleDateValueChange}
        />
      )}
      {field.input === "LINK" && (
        <InputTextField
          key={field.input}
          containerClassName="w-full min-w-52"
          required={field.required}
          type={"url"}
          label={field.label}
          placeholder={"Enter " + field.label}
          description={field.description}
          defaultValue={currentField.value?.inputValue || ""}
          value={field.value?.inputValue || ""}
          onChange={handleInputTextFieldChange}
          onBlur={handleInputTextFieldBlur}
        />
      )}
    </div>
  );
};

export default UserProfileFieldSection;
