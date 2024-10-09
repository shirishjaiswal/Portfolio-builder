import { NavigationSectionContentMap } from "./type";

export type ReactSelectOption = {
  value: string;
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
};

const InputType: ReactSelectOption[] = [
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
    value: "calendar",
    label: "Calendar",
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
  }
];

const SectionAndSelectionType: ReactSelectOption[] = [
  { value: "single", label: "Single", isSelected: false, isDisabled: false },
  { value: "multi", label: "Multi", isSelected: false, isDisabled: false },
];

const DurationData: ReactSelectOption[] = [
  { value: "start", label: "Start Date", isSelected: false, isDisabled: false },
  { value: "end", label: "End Date", isSelected: false, isDisabled: false },
  { value: "ongoing", label: "On Going", isSelected: false, isDisabled: false },
];

export { InputType, SectionAndSelectionType, DurationData };

export const navigationSectionContentData: NavigationSectionContentMap = new Map([
  [
    "personal",
    {
      navigationName: "Personal",
      isSectionNameVisible : true,
      isActive: true,
      navigationSection: [
        {
          sectionName: "Introduction",
          isMulti: false,
          isCollapsed: false,
          sectionFields: [
            {
              key: "title",
              selectionType: "text",
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
      isSectionNameVisible: true,
      isActive: false,
      navigationSection: [
        {
          sectionName: "Additional Info",
          isMulti: true,
          isCollapsed: true,
          sectionFields: [
            {
              key: "eventDate",
              selectionType: "calendar",
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