import { ReactSelectOption } from "@/utils/types/react-select";

export const getReactSelectOptions = (
  data: string[]
): ReactSelectOption[] => {
  const options: ReactSelectOption[] = [];
  data.forEach((option) => {
    options.push({
      value: option,
      label: option,
      isSelected: false,
      isDisabled: false,
    });
  });
  return options;
};
