import { Input } from "@nextui-org/input";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button/button";
import { reactSelectStyles } from "./styles";
import { ReactSelectOption, SectionAndSelectionType } from "./static-data";
import { NavigationSection, NavigationSectionContentMap } from "./type";
import { useNavigationSectionContentProvider } from "@/context/navigation-section-content";
import { ChevronDown, CircleX } from "lucide-react";
import NavigationSectionFields from "./navigation-section-fields";

export const getCurrentSection = (
  navigationSectionContent: NavigationSectionContentMap
): string | undefined => {
  let currentSectionKey;
  navigationSectionContent.forEach((section, sectionKey) => {
    if (section.isActive) {
      currentSectionKey = sectionKey;
    }
  });
  return currentSectionKey ?? undefined;
};

type NavigationSectionProps = {
  readonly bottomRef: React.RefObject<HTMLDivElement>;
};
const NavigationSections: React.FC<NavigationSectionProps> = ({
  bottomRef,
}: NavigationSectionProps) => {
  const {
    navigationSectionContent,
    addNavigationSection,
    removeNavigationSection,
    setCollapseSection,
    updateSectionName,
    updateSectionIsMulti,
  } = useNavigationSectionContentProvider();

  const [activeNavigationTab, setActiveNavigationTab] = useState<
    NavigationSection[]
  >([]);

  useEffect(() => {
    setActiveNavigationTab(
      Array.from(navigationSectionContent.values()).find(
        (navigationTab) => navigationTab.isActive
      )?.navigationSection || []
    );
  }, [navigationSectionContent]);

  const editSectionName = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number
  ) => {
    updateSectionName(
      getCurrentSection(navigationSectionContent) as string,
      sectionIndex,
      e.currentTarget.value
    );
  };

  const setSectionIsMulti = (sectionIdx: number, option: ReactSelectOption) => {
    const currentSectionKey = getCurrentSection(navigationSectionContent);
    if (!currentSectionKey) return;
    updateSectionIsMulti(
      currentSectionKey,
      sectionIdx,
      option.value === "multi"
    );
  };

  const addNewSection = () => {
    const currentSectionKey = getCurrentSection(navigationSectionContent);
    if (!currentSectionKey) return;
    addNavigationSection(currentSectionKey, {
      sectionName: "",
      isMulti: false,
      isCollapsed: false,
      sectionFields: [],
    });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const removeSection = (sectionIndex: number) => {
    const currentSectionKey = getCurrentSection(navigationSectionContent);
    if (!currentSectionKey) return;
    removeNavigationSection(currentSectionKey, sectionIndex);
  };

  const collapseSection = (sectionIndex: number) => {
    const currentSectionKey = getCurrentSection(navigationSectionContent);
    if (!currentSectionKey) return;
    setCollapseSection(currentSectionKey, sectionIndex);
  };

  return (
    <>
      <div className="flex-col gap-4">
        {activeNavigationTab.map((section, index) => (
          <div key={index + section.sectionName} className="relative">
            <div id="field-action" className="absolute top-1 right-1 flex">
              <button>
                <ChevronDown
                  color="#708090"
                  size={28}
                  strokeWidth={2}
                  absoluteStrokeWidth
                  onClick={() => collapseSection(index)}
                  className={`transition-transform duration-300 ${
                    section.isCollapsed ? "rotate-180" : ""
                  }`}
                />
              </button>
              <button>
                <CircleX
                  color="#708090"
                  size={20}
                  strokeWidth={2}
                  absoluteStrokeWidth
                  onClick={() => removeSection(index)}
                />
              </button>
            </div>
            <div className="w-full bg-gray-100 rounded-md p-4 mb-4">
              <div
                id="section-info"
                className="flex w-full items-baseline gap-4 pb-4"
              >
                <Input
                  className="w-1/3 text-roboto text-sm font-semibold"
                  type="text"
                  label={section.sectionName}
                  labelPlacement="outside"
                  placeholder="Enter Page Title"
                  value={section.sectionName}
                  onChange={(e) => editSectionName(e, index)}
                  variant="underlined"
                  isInvalid={false}
                  errorMessage="Field cannot be empty"
                  autoFocus
                  autoCorrect="on"
                />
                <div className="flex-col w-1/3">
                  <Select
                    className="text-roboto text-sm"
                    key="selection-type"
                    name={section.isMulti ? "multi" : "single"}
                    options={SectionAndSelectionType}
                    defaultValue={SectionAndSelectionType[0]}
                    isOptionDisabled={(option) => option.isDisabled}
                    styles={reactSelectStyles}
                    value={SectionAndSelectionType.find(
                      (option) =>
                        option.value === (section.isMulti ? "multi" : "single")
                    )}
                    onChange={(option) => {
                      setSectionIsMulti(index, option as ReactSelectOption);
                    }}
                    menuPlacement="auto"
                    menuPortalTarget={document.body}
                  />
                  <div className="solid h-0.5 bg-slate-300"></div>
                </div>
              </div>
              {section.sectionName && !section.isCollapsed && (
                <NavigationSectionFields
                  navigationKey={
                    getCurrentSection(navigationSectionContent) ?? ""
                  }
                  sectionIdx={index}
                  sectionFields={section.sectionFields}
                />
              )}
            </div>
          </div>
        ))}
        <Button
          label={"Add New Section"}
          style="primary"
          onClick={addNewSection}
          type="button"
          isActive={false}
          isDisabled={false}
        >
          <p className=" border rounded bg-slate-200 text-slate-600 font-semibold fixed top-[68px] z-50 right-10 p-1 my-4 mx-auto">
            Add New Section
          </p>
        </Button>
      </div>
      {activeNavigationTab.length === 0 && (
        <div>
          <p className="text-roboto text-4xl font-semibold m-auto text-slate-600 w-full text-center p-7 rounded-lg bg-slate-200">
            No Section Present
          </p>
        </div>
      )}
    </>
  );
};

export default NavigationSections;
