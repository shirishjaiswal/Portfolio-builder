import { Input } from "@nextui-org/input";
import Select from "react-select";
import { MailIcon } from "lucide-react";
import { ReactSelectOption } from "@/components/admin-control/page-navigation/static-data";
import {
  reactSelectStyles,
  styleForTags,
} from "@/components/admin-control/page-navigation/styles";
import CreatableSelect from "react-select/creatable";
import { DatePicker } from "@nextui-org/date-picker";
import { Checkbox } from "@nextui-org/checkbox";
import { UserSectionField } from "./types";
import { useUSerProfileContextProvider } from "@/context/user-profile-context";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import React from "react";

type LoadFieldContentProps = {
  sectionField: UserSectionField;
  sectionFieldIdx: number;
  userProfileSectionIndex: number;
  userProfileSectionsKey: string;
  userProfileKey: string;
};

const getSelectedValue = (
  selectedValue: string[]
): ReactSelectOption | null => {
  return selectedValue?.length > 0
    ? {
        value:
          selectedValue.at(0)!.toLowerCase().trim().split(" ").join("-") ?? "",
        label: selectedValue?.at(0)?.trim() ?? "",
        isSelected: false,
        isDisabled: false,
      }
    : null;
};

const getDropDownOptions = (dropdownOptions: string[]) => {
  const options: ReactSelectOption[] = [];
  dropdownOptions.forEach((option) => {
    options.push({
      value: option.toLowerCase().trim().split(" ").join("-"),
      label: option.trim(),
      isSelected: false,
      isDisabled: false,
    });
  });
  return options;
};

const InputFields = ["text", "textarea", "link", "email", "phone"];

const LoadFieldContent: React.FC<LoadFieldContentProps> = ({
  sectionField,
  sectionFieldIdx,
  userProfileSectionIndex,
  userProfileSectionsKey,
  userProfileKey,
}: LoadFieldContentProps) => {
  const {
    setStartDate,
    setEndDate,
    setOnGoing,
    setDropdownValue,
    setListValue,
    setInputTexts,
    setDropLink,
  } = useUSerProfileContextProvider();

  const handleOnGoing = () =>
    setOnGoing(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx
    );

  const handleStartDate = (setDate: DateValue) =>
    setStartDate(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx,
      setDate.toDate("Asia/Kolkata").toISOString()
    );

  const handleEndDate = (setDate: DateValue) =>
    setEndDate(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx,
      setDate.toDate("Asia/Kolkata").toISOString()
    );

  const handleDropDownSelection = (option: string) => {
    setDropdownValue(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx,
      option
    );
  };

  const handleDropLinkSelection = (option: string) => {
    setDropLink(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx,
      option
    );
  };

  const handleListValue = (option: string[]) => {
    setListValue(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx,
      option
    );
  };

  const handleInputTexts = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value ?? null;
    setInputTexts(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex,
      sectionFieldIdx,
      value
    );
  };

  const loadInputType = (sectionField: UserSectionField) => {
    if (
      sectionField.selectionType === "text" ||
      sectionField.selectionType === "textarea"
    )
      return "text";
    if (sectionField.selectionType === "link") return "url";
    if (sectionField.selectionType === "email") return "email";
    if (sectionField.selectionType === "phone") return "tel";
  };

  const loadStartContent = (selectionType: string) => {
    if (selectionType === "link") {
      return (
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">https://</span>
        </div>
      );
    }

    if (selectionType === "email") {
      return (
        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      );
    }

    if (selectionType === "phone") {
      return (
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">+91</span>
        </div>
      );
    }
  };

  const loadEndContent = (selectionType: string) => {
    if (selectionType === "email") {
      return (
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">@gmail.com</span>
        </div>
      );
    }
  };

  return (
    <>
      {InputFields.includes(sectionField.selectionType) && (
        <Input
          className={`text-roboto text-sm z-0 ${
            sectionField.selectionType === "textarea" ? "w-full" : "w-1/2"
          }`}
          isClearable
          type={loadInputType(sectionField)}
          label={sectionField.label}
          labelPlacement="outside"
          placeholder={`Enter ${sectionField.label.toLowerCase()}`}
          value={sectionField.inputValue.at(0) ?? ""}
          variant="underlined"
          isInvalid={false}
          errorMessage="Field cannot be empty"
          startContent={loadStartContent(sectionField.selectionType)}
          endContent={loadEndContent(sectionField.selectionType)}
          onChange={(e) => handleInputTexts(e)}
          onClear={() => handleInputTexts()}
          isRequired={sectionField.isRequired}
        />
      )}
      {sectionField.selectionType === "dropdown" && (
        <div id="input-type" className="flex-col w-1/4 z-50">
          <p className="font-roboto text-sm pb-2">{sectionField.label}</p>
          <Select
            isClearable
            className="text-roboto text-sm"
            key="dropdown-selection-type"
            options={getDropDownOptions(sectionField.dropdownOptions)}
            isOptionDisabled={(option) => option.isDisabled}
            styles={reactSelectStyles}
            onChange={(option) => {
              handleDropDownSelection(option?.label as string);
            }}
            value={getSelectedValue(sectionField.inputValue)}
            menuPlacement="auto"
            menuPortalTarget={document.body}
          />
          <div className="solid h-0.5 bg-slate-300"></div>
        </div>
      )}
      {sectionField.selectionType === "calendar" && (
        <div className="w-1/4 flex flex-col gap-4">
          <DatePicker
            isRequired={false}
            granularity="day"
            label={sectionField.label}
            variant={"underlined"}
            size={"lg"}
            value={
              sectionField.startDate
                ? parseAbsoluteToLocal(sectionField.startDate)
                : null
            }
            onChange={(setDate) => handleStartDate(setDate)}
          />
        </div>
      )}
      {sectionField.selectionType === "duration" && (
        <div className="flex w-7/12 gap-8">
          <DatePicker
            isRequired={false}
            label={"Start Date"}
            granularity="day"
            variant={"underlined"}
            size={"lg"}
            value={
              sectionField.startDate
                ? parseAbsoluteToLocal(sectionField.startDate)
                : null
            }
            onChange={(setDate) => handleStartDate(setDate)}
          />
          <DatePicker
            isRequired={false}
            label={"End Date"}
            granularity="day"
            variant={"underlined"}
            size={"lg"}
            isDisabled={false}
            value={
              sectionField.endDate
                ? parseAbsoluteToLocal(sectionField.endDate)
                : null
            }
            onChange={(setDate) => handleEndDate(setDate)}
          />
          <Checkbox
            key={"ongoing"}
            isSelected={sectionField.onGoing}
            onClick={handleOnGoing}
            radius="sm"
          >
            {"OnGoing"}
          </Checkbox>
        </div>
      )}
      {sectionField.selectionType === "list" && (
        <div className="flex-col w-1/2">
          <p className="font-roboto text-sm">{sectionField.label}</p>
          <CreatableSelect
            isMulti
            placeholder="Options List"
            className="text-roboto text-sm"
            key="selection-type"
            styles={styleForTags}
            value={sectionField.inputValue.map((option) => ({
              label: option.toLowerCase(),
              value: option,
            }))}
            onChange={(e) => handleListValue(e.map((option) => option.label))}
          />
          <div className="solid h-0.5 bg-slate-300"></div>
        </div>
      )}
      {sectionField.selectionType === "droplinks" && (
        <div className="flex w-full gap-4">
          <div id="input-type" className="flex-col w-1/4 z-50">
            <p className="font-roboto text-sm pb-2">{sectionField.label}</p>
            <Select
              className="text-roboto text-sm"
              key="dropdown-selection-type"
              options={getDropDownOptions(sectionField.dropdownOptions)}
              value={getSelectedValue(sectionField.dropLinkSelection) ?? null}
              isOptionDisabled={(option) => option.isDisabled}
              styles={reactSelectStyles}
              onChange={(option) => {
                handleDropLinkSelection(option?.label as string);
              }}
              menuPlacement="auto"
              menuPortalTarget={document.body}
            />
            <div className="solid h-0.5 bg-slate-300"></div>
          </div>
          <Input
            isRequired
            className="w-1/2 text-roboto text-sm z-0"
            isClearable
            type={"url"}
            label={"Add Link"}
            labelPlacement="outside"
            placeholder={`Enter ${sectionField.label.toLowerCase()} link`}
            value={sectionField.inputValue.at(0) ?? ""}
            variant="underlined"
            isInvalid={false}
            errorMessage="Field cannot be empty"
            startContent={loadStartContent("link")}
            endContent={loadEndContent("link")}
            onChange={(e) => handleInputTexts(e)}
            onClear={() => handleInputTexts()}
          />
        </div>
      )}
    </>
  );
};

export default LoadFieldContent;
