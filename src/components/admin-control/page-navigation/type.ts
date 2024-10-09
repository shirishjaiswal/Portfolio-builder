export type InputTypeSelection = "text" | "textarea" | "dropdown" | "duration" | "calendar" | "link" | "list" | "email" | "phone" | "checkbox" |"image";

export type SectionField = {
  key: string;
  selectionType: InputTypeSelection;
  label: string;
  placeholder: string;
  textarea: string;
  dropdownSelection: "single" | "multi";
  dropdownOptions: string[];
  startDate: boolean;
  endDate: boolean;
  onGoing: boolean;
};

export type NavigationSection = {
  sectionName: string;
  isMulti: boolean;
  isCollapsed: boolean;
  sectionFields: SectionField[];
};

export type NavigationSectionContent = {
  isActive: boolean;
  navigationName: string;
  isSectionNameVisible: boolean;
  navigationSection: NavigationSection[];
};

export type NavigationSectionContentMap = Map<string, NavigationSectionContent>;
