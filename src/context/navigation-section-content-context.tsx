"use client";

import {
  InputTypeSelection,
  NavigationSection,
  NavigationSectionContent,
  NavigationSectionContentMap,
  SectionField,
} from "@/components/admin-control/page-navigation/type";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface NavigationSectionContentProps {
  navigationSectionContent: NavigationSectionContentMap;
  updateNavigationSectionContent: (
    navigationSectionContent: NavigationSectionContentMap
  ) => void;
  addNavigationTab: (navigationKey: string) => void;
  removeSection: (navigationKey: string, sectionIdx: number) => void;
  addSection: (
    navigationKey: string,
    value: NavigationSection
  ) => void;
  updateNavigationTabName: (navigationKey: string, value: string) => void;
  updateIsSectionRequired: (navigationKey: string, value: number) => void;
  updateShowSectionName: (
    navigationKey: string,
    value: number
  ) => void;
  updateSectionIsMulti: (
    navigationKey: string,
    sectionIdx: number,
    value: boolean
  ) => void;
  updateSectionName: (
    navigationKey: string,
    sectionIdx: number,
    value: string
  ) => void;
  addSectionField: (
    navigationKey: string,
    sectionIdx: number,
    value: SectionField
  ) => void;
  updateSectionFieldIsRequired: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number,
  ) => void;
  updateNavigationTabIsActive: (navigationKey: string) => void;
  removeNavigationTab: (navigationKey: string) => void;
  removeSectionField: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number
  ) => void;
  updateSectionField: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number,
    value: SectionField
  ) => void;
  setCollapseSection: (navigationKey: string, sectionIdx: number) => void;
  updateFieldLabel: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number,
    value: string
  ) => void;
  updateFieldDropdownSelection: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number,
    value: "single" | "multi"
  ) => void;
  updateFieldDropdownOptions: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number,
    value: string[]
  ) => void;
  updateFieldStartDate: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number
  ) => void;
  updateFieldEndDate: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number
  ) => void;
  updateFieldOnGoing: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number
  ) => void;
  updateSelectionType: (
    navigationKey: string,
    sectionIdx: number,
    fieldIdx: number,
    value: InputTypeSelection
  ) => void;
}

const NavigationSectionContentContext = createContext<
  NavigationSectionContentProps | undefined
>(undefined);

interface NavigationSectionContentProviderProps {
  children: ReactNode;
}

const NavigationSectionContentProvider = ({
  children,
}: NavigationSectionContentProviderProps) => {
  const [navigationSectionContent, setNavigationSectionContent] =
    useState<NavigationSectionContentMap>(
      new Map() as NavigationSectionContentMap
    );

  const updateNavigationSectionContent = useCallback(
    (navigationSectionContent: NavigationSectionContentMap) => {
      setNavigationSectionContent(new Map(navigationSectionContent));
    },
    []
  );

  const updateNavigationTabIsActive = useCallback(
    (navigationKey: string) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      updatedNavigationSectionContent.forEach((section) => {
        section.isActive = false;
      });
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.isActive = true;
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const removeNavigationTab = useCallback(
    (navigationTabKey: string) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      updatedNavigationSectionContent.delete(navigationTabKey);
      updateNavigationSectionContent(updatedNavigationSectionContent);
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateNavigationTabName = useCallback(
    (navigationKey: string, value: string) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationName = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const addNavigationTab = useCallback(
    (navigationKey: string) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      updatedNavigationSectionContent.forEach((section) => {
        section.isActive = false;
      });
      const value = {
        navigationName:
          navigationKey.charAt(0).toUpperCase() + navigationKey.slice(1),
        isRequired: false,
        isActive: true,
        navigationSection: [],
      } as NavigationSectionContent;
      updatedNavigationSectionContent.set(navigationKey.toLowerCase(), value);
      updateNavigationSectionContent(updatedNavigationSectionContent);
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateShowSectionName = useCallback(
    (navigationKey: string, sectionIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue =
        updatedNavigationSectionContent.get(navigationKey)?.navigationSection[
          sectionIdx
        ];
      if (currentValue) {
        currentValue.isSectionNameVisible = !currentValue.isSectionNameVisible;
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const addSection = useCallback(
    (navigationKey: string, value: NavigationSection) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection.push(value);
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const removeSection = useCallback(
    (navigationKey: string, sectionIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection.splice(sectionIdx, 1);
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateIsSectionRequired = useCallback(
    (navigationKey: string, sectionIndex: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIndex].isRequired =
          !currentValue.navigationSection[sectionIndex].isRequired;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateSectionName = useCallback(
    (navigationKey: string, sectionIdx: number, value: string) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionName = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateSectionIsMulti = useCallback(
    (navigationKey: string, sectionIdx: number, value: boolean) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].isMulti = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateSelectionType = useCallback(
    (
      navigationKey: string,
      sectionIdx: number,
      fieldIdx: number,
      value: InputTypeSelection
    ) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].selectionType = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const addSectionField = useCallback(
    (navigationKey: string, sectionIdx: number, value: SectionField) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        console.log(currentValue);
        currentValue.navigationSection[sectionIdx].sectionFields.push(value);
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const removeSectionField = useCallback(
    (navigationKey: string, sectionIdx: number, fieldIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields.splice(
          fieldIdx,
          1
        );
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateSectionFieldIsRequired = useCallback(
    (navigationKey: string, sectionIdx: number, fieldIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].isRequired = !currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].isRequired;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  )
  const updateFieldLabel = useCallback(
    (
      navigationKey: string,
      sectionIdx: number,
      fieldIdx: number,
      value: string
    ) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        console.log(navigationKey, sectionIdx, fieldIdx, value);
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].label = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateFieldDropdownSelection = useCallback(
    (
      navigationKey: string,
      sectionIdx: number,
      fieldIdx: number,
      value: "single" | "multi"
    ) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].dropdownSelection = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateFieldDropdownOptions = useCallback(
    (
      navigationKey: string,
      sectionIdx: number,
      fieldIdx: number,
      value: string[]
    ) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].dropdownOptions = value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateFieldStartDate = useCallback(
    (navigationKey: string, sectionIdx: number, fieldIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].startDate =
          !currentValue.navigationSection[sectionIdx].sectionFields[fieldIdx]
            .startDate;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateFieldEndDate = useCallback(
    (navigationKey: string, sectionIdx: number, fieldIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].endDate =
          !currentValue.navigationSection[sectionIdx].sectionFields[fieldIdx]
            .endDate;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateFieldOnGoing = useCallback(
    (navigationKey: string, sectionIdx: number, fieldIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[
          fieldIdx
        ].onGoing =
          !currentValue.navigationSection[sectionIdx].sectionFields[fieldIdx]
            .onGoing;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const updateSectionField = useCallback(
    (
      navigationKey: string,
      sectionIdx: number,
      fieldIdx: number,
      value: SectionField
    ) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(navigationKey);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].sectionFields[fieldIdx] =
          value;
        updatedNavigationSectionContent.set(navigationKey, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const setCollapseSection = useCallback(
    (key: string, sectionIdx: number) => {
      const updatedNavigationSectionContent = new Map(navigationSectionContent);
      const currentValue = updatedNavigationSectionContent.get(key);
      if (currentValue) {
        currentValue.navigationSection[sectionIdx].isCollapsed =
          !currentValue.navigationSection[sectionIdx].isCollapsed;
        updatedNavigationSectionContent.set(key, currentValue);
        updateNavigationSectionContent(updatedNavigationSectionContent);
      }
    },
    [navigationSectionContent, updateNavigationSectionContent]
  );

  const value = useMemo(
    () => ({
      navigationSectionContent,
      updateNavigationSectionContent,
      addNavigationTab,
      updateNavigationTabName,
      updateNavigationTabIsActive,
      removeNavigationTab,
      addSection,
      removeSection,
      updateSectionIsMulti,
      updateIsSectionRequired,
      updateShowSectionName,
      updateSectionName,
      addSectionField,
      updateSelectionType,
      removeSectionField,
      updateSectionField,
      setCollapseSection,
      updateSectionFieldIsRequired,
      updateFieldLabel,
      updateFieldDropdownSelection,
      updateFieldDropdownOptions,
      updateFieldStartDate,
      updateFieldEndDate,
      updateFieldOnGoing,
    }),
    [
      navigationSectionContent,
      updateNavigationSectionContent,
      addNavigationTab,
      updateNavigationTabName,
      updateNavigationTabIsActive,
      removeNavigationTab,
      addSection,
      removeSection,
      updateSectionIsMulti,
      updateIsSectionRequired,
      updateShowSectionName,
      updateSectionName,
      addSectionField,
      updateSelectionType,
      removeSectionField,
      updateSectionField,
      setCollapseSection,
      updateSectionFieldIsRequired,
      updateFieldLabel,
      updateFieldDropdownSelection,
      updateFieldDropdownOptions,
      updateFieldStartDate,
      updateFieldEndDate,
      updateFieldOnGoing,
    ]
  );

  return (
    <NavigationSectionContentContext.Provider value={value}>
      {children}
    </NavigationSectionContentContext.Provider>
  );
};

const useNavigationSectionContentProvider = () => {
  const context = useContext(NavigationSectionContentContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationSectionContent must be used within a NavigationSectionContent"
    );
  }
  return context;
};

export {
  NavigationSectionContentProvider,
  useNavigationSectionContentProvider,
};
