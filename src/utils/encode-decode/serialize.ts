import {
  NavigationSectionContent,
  NavigationSectionContentMap,
} from "@/components/admin-control/page-navigation/type";


const navigationSectionContentMap = (
  data: NavigationSectionContentMap
): { key: string; value: NavigationSectionContent }[] => {
  const serialize: { key: string; value: NavigationSectionContent }[] = [];

  data.forEach((value, key) => {
    serialize.push({ key: key, value: value });
  });

  return serialize;
};

const Serialize = {
  navigationSectionContentMap,
};

export default Serialize;
