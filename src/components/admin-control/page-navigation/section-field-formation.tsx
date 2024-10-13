import Select from "react-select";
import { Checkbox } from "@nextui-org/checkbox";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { reactSelectStyles, styleForTags } from "./styles";
import {
  DurationData,
  InputType,
  ReactSelectOption,
  SectionAndSelectionType,
} from "./static-data";
import { Input } from "@nextui-org/input";
import { InputTypeSelection, SectionField } from "./type";
import { CircleX } from "lucide-react";
import { useNavigationSectionContentProvider } from "@/context/navigation-section-content-context";
import ModalPopup from "@/components/Button/modalPopup";

type FieldsEnabled = {
  text: boolean;
  textarea: boolean;
  dropdown: boolean;
  duration: boolean;
  calendar: boolean;
  link: boolean;
  list: boolean;
  email: boolean;
  phone: boolean;
  droplinks: boolean;
  image: boolean;
};

type SectionFieldProps = {
  navigationKey: string;
  sectionIdx: number;
  sectionFieldIdx: number;
  sectionField: SectionField;
};

const SectionFieldFormation: React.FC<SectionFieldProps> = ({
  navigationKey,
  sectionIdx,
  sectionFieldIdx,
  sectionField: sectionFields,
}: SectionFieldProps) => {
  const {
    removeSectionField,
    updateFieldLabel,
    updateFieldDropdownSelection,
    updateFieldDropdownOptions,
    updateFieldStartDate,
    updateFieldEndDate,
    updateFieldOnGoing,
    updateSelectionType,
    updateSectionFieldIsRequired,
  } = useNavigationSectionContentProvider();

  const [fieldsEnabled, setFieldsEnabled] = useState<FieldsEnabled>();

  useEffect(() => {
    setFieldsEnabled({
      text: sectionFields.selectionType === "text",
      textarea: sectionFields.selectionType === "textarea",
      dropdown: sectionFields.selectionType === "dropdown",
      duration: sectionFields.selectionType === "duration",
      calendar: sectionFields.selectionType === "calendar",
      link: sectionFields.selectionType === "link",
      list: sectionFields.selectionType === "list",
      email: sectionFields.selectionType === "email",
      phone: sectionFields.selectionType === "phone",
      droplinks: sectionFields.selectionType === "droplinks",
      image: sectionFields.selectionType === "image",
    });
  }, []);

  const handleChange = (option: ReactSelectOption) => {
    if (!option) {
      setFieldsEnabled({
        text: false,
        textarea: false,
        dropdown: false,
        duration: false,
        calendar: false,
        link: false,
        list: false,
        email: false,
        phone: false,
        droplinks: false,
        image: false,
      });
    } else {
      setFieldsEnabled({
        text: option.value === "text",
        textarea: option.value === "textarea",
        dropdown: option.value === "dropdown",
        duration: option.value === "duration",
        calendar: option.value === "calendar",
        link: option.value === "link",
        list: option.value === "list",
        email: option.value === "email",
        phone: option.value === "phone",
        droplinks: option.value === "droplinks",
        image: option.value === "image",
      });
    }
    updateSelectionType(
      navigationKey,
      sectionIdx,
      sectionFieldIdx,
      option.value as InputTypeSelection
    );
  };

  const deleteSectionField = () => {
    removeSectionField(navigationKey, sectionIdx, sectionFieldIdx);
  };

  const updateLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFieldLabel(
      navigationKey,
      sectionIdx,
      sectionFieldIdx,
      event.target.value
    );
  };

  const updateDropdownSelection = (option: ReactSelectOption) => {
    updateFieldDropdownSelection(
      navigationKey,
      sectionIdx,
      sectionFieldIdx,
      option.value as "single" | "multi"
    );
  };

  const updateSectionFieldRequired = () => {
    updateSectionFieldIsRequired(navigationKey, sectionIdx, sectionFieldIdx);
  };
  const updateOptions = (options: string[]) => {
    updateFieldDropdownOptions(
      navigationKey,
      sectionIdx,
      sectionFieldIdx,
      options.map((option) => option)
    );
  };

  const handleDuration = (type: string) => {
    if (type === "ongoing")
      updateFieldOnGoing(navigationKey, sectionIdx, sectionFieldIdx);
    if (type === "start")
      updateFieldStartDate(navigationKey, sectionIdx, sectionFieldIdx);
    if (type === "end")
      updateFieldEndDate(navigationKey, sectionIdx, sectionFieldIdx);
  };

  const getIsSelected = (type: string) => {
    if (type === "ongoing") return sectionFields.onGoing;
    if (type === "start") return sectionFields.startDate;
    if (type === "end") return sectionFields.endDate;
  };

  return (
    <div className="relative pb-2 drop-shadow-lg">
      <div id="field-action" className="absolute top-1 right-1 flex ">
        <ModalPopup
          warningTitle="Delete Section Field"
          warning="Are you sure you want to delete this field?"
          onConfirm={deleteSectionField}
          isActive
        >
          <CircleX
            color="#708090"
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
          />
        </ModalPopup>
      </div>
      <div className="flex-col w-full items-start justify-between pb-4 bg-slate-50 rounded-md p-4">
        <div className="flex w-full gap-4 align-baseline">
          <div id="input-type" className="flex-col w-1/2 z-50">
            <p className="font-roboto text-sm pb-2">Input Type</p>
            <Select
              className="text-roboto text-sm"
              key="selection-type"
              options={InputType}
              value={InputType.find(
                (option) => option.value === sectionFields.selectionType
              )}
              onChange={(option) => {
                handleChange(option as ReactSelectOption);
              }}
              isOptionDisabled={(option) => option.isDisabled}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              styles={reactSelectStyles}
            />
            <div className="solid h-0.5 mb-1 bg-slate-300"></div>
          </div>
          {(!fieldsEnabled ||
            fieldsEnabled.text ||
            fieldsEnabled.textarea ||
            fieldsEnabled.dropdown ||
            fieldsEnabled.link ||
            fieldsEnabled.calendar ||
            fieldsEnabled.list ||
            fieldsEnabled.email ||
            fieldsEnabled.droplinks ||
            fieldsEnabled.phone ||
            fieldsEnabled.image) && (
            <div
              id="text-textarea-dropdown-calendar"
              className="flex w-full gap-4"
            >
              <Input
                className="w-1/2 text-roboto text-sm z-0"
                type="text"
                label="Label"
                labelPlacement="outside"
                placeholder="Enter Label"
                variant="underlined"
                isInvalid={false}
                value={sectionFields.label}
                errorMessage="Field cannot be empty"
                onChange={(e) => updateLabel(e)}
              />
            </div>
          )}
          {(!fieldsEnabled || fieldsEnabled.duration) && (
            <div id="duration" className="flex w-full gap">
              {DurationData.map((item) => (
                <Checkbox
                  key={item.value}
                  isSelected={getIsSelected(item.value)}
                  onClick={() => handleDuration(item.value)}
                  radius="sm"
                >
                  {item.label}
                </Checkbox>
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full gap-4">
          {(!fieldsEnabled ||
            fieldsEnabled.dropdown ||
            fieldsEnabled.droplinks) && (
            <div id="input-type" className="flex-col w-1/3 z-50">
              <p className="font-roboto text-sm pb-2">
                Dropdown Selection Type
              </p>
              <Select
                className="text-roboto text-sm"
                key="dropdown-selection-type"
                options={SectionAndSelectionType}
                defaultValue={SectionAndSelectionType[0]}
                isOptionDisabled={(option) => option.isDisabled}
                styles={reactSelectStyles}
                value={SectionAndSelectionType.find(
                  (option) => option.value === sectionFields.dropdownSelection
                )}
                onChange={(option) => {
                  updateDropdownSelection(option as ReactSelectOption);
                }}
                menuPlacement="auto"
                menuPortalTarget={document.body}
              />
              <div className="solid h-0.5 bg-slate-300"></div>
            </div>
          )}
          {(!fieldsEnabled ||
            fieldsEnabled.dropdown ||
            fieldsEnabled.droplinks) && (
            <div className="flex-col w-1/3">
              <p className="font-roboto text-sm">Add Options</p>
              <CreatableSelect
                isMulti
                placeholder="Options List"
                className="text-roboto text-sm"
                key="selection-type"
                styles={styleForTags}
                value={sectionFields.dropdownOptions.map((option) => ({
                  label: option,
                  value: option.toLowerCase().trim().split(" ").join("-"),
                }))}
                onChange={(e) => updateOptions(e.map((option) => option.label))}
              />
              <div className="solid h-0.5 bg-slate-300"></div>
            </div>
          )}
        </div>
        <div className="w-full bg-slate-100 rounded">
          <Checkbox
            key={"ongoing"}
            isSelected={sectionFields.isRequired}
            onClick={updateSectionFieldRequired}
            radius="sm"
          >
            {"Required"}
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
export default SectionFieldFormation;
