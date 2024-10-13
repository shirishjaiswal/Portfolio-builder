import { NavigationSectionContentMap } from "./type";

export type ReactSelectOption = {
  value: string;
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
};

const InputType: ReactSelectOption[] = [
  {
    value: "calendar",
    label: "Calendar",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "email",
    label: "Email",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "droplinks",
    label: "Droplinks",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "dropdown",
    label: "Dropdown",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "duration",
    label: "Duration",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "image",
    label: "Image",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "link",
    label: "Link",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "list",
    label: "List",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "phone",
    label: "Phone",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "text",
    label: "Text",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "textarea",
    label: "Textarea",
    isSelected: false,
    isDisabled: false,
  },
];

const SectionAndSelectionType: ReactSelectOption[] = [
  { value: "single", label: "Single", isSelected: false, isDisabled: false },
  { value: "multi", label: "Multi", isSelected: false, isDisabled: false },
];

const DurationData: ReactSelectOption[] = [
  { value: "start-date", label: "Start Date", isSelected: false, isDisabled: false },
  { value: "end-date", label: "End Date", isSelected: false, isDisabled: false },
  { value: "ongoing", label: "On Going", isSelected: false, isDisabled: false },
];

export { InputType, SectionAndSelectionType, DurationData };

export const navigationSectionContentData: NavigationSectionContentMap =
  new Map([
    [
      "personal",
      {
        navigationName: "Personal",
        isActive: true,
        navigationSection: [
          {
            sectionName: "Introduction",
            isRequired: true,
            isSectionNameVisible: true,
            isMulti: false,
            isCollapsed: false,
            sectionFields: [
              {
                key: "title",
                selectionType: "text",
                isRequired: true,
                label: "Title",
                placeholder: "Enter title",
                textarea: "",
                dropdownSelection: "single",
                dropdownOptions: [],
                startDate: false,
                endDate: false,
                onGoing: false,
              },
              {
                key: "description",
                selectionType: "textarea",
                isRequired: true,
                label: "Description",
                placeholder: "Enter description",
                textarea: "Description goes here",
                dropdownSelection: "single",
                dropdownOptions: [],
                startDate: false,
                endDate: false,
                onGoing: false,
              },
              {
                key: "category",
                selectionType: "dropdown",
                isRequired: true,
                label: "Category",
                placeholder: "",
                textarea: "",
                dropdownSelection: "multi",
                dropdownOptions: ["Option 1", "Option 2", "Option 3"],
                startDate: false,
                endDate: false,
                onGoing: false,
              },
              {
                key: "duration",
                selectionType: "duration",
                isRequired: true,
                label: "Project Duration",
                placeholder: "",
                textarea: "",
                dropdownSelection: "single",
                dropdownOptions: [],
                startDate: true,
                endDate: true,
                onGoing: false,
              },
            ],
          },
        ],
      },
    ],
    [
      "contact",
      {
        navigationName: "Contact",
        isActive: false,
        navigationSection: [
          {
            sectionName: "Additional Info",
            isSectionNameVisible: true,
            isRequired: false,
            isMulti: true,
            isCollapsed: true,
            sectionFields: [
              {
                key: "eventDate",
                selectionType: "calendar",
                isRequired: true,
                label: "Event Date",
                placeholder: "Select date",
                textarea: "",
                dropdownSelection: "single",
                dropdownOptions: [],
                startDate: false,
                endDate: false,
                onGoing: false,
              },
              {
                key: "referenceLink",
                selectionType: "link",
                isRequired: true,
                label: "Reference Link",
                placeholder: "Enter URL",
                textarea: "",
                dropdownSelection: "single",
                dropdownOptions: [],
                startDate: false,
                endDate: false,
                onGoing: false,
              },
            ],
          },
        ],
      },
    ],
  ]);
