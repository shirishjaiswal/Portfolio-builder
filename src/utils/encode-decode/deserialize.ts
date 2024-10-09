import {
  NavigationSectionContent,
  NavigationSectionContentMap,
} from "@/components/admin-control/page-navigation/type";

const navigationSectionContentMap = (
  data: string
): NavigationSectionContentMap => {
  const deserialized: NavigationSectionContentMap = new Map();

  const d : { key: string; value: NavigationSectionContent }[] = JSON.parse(data);
  if(!d) return deserialized;
  console.log(typeof d);
  d.forEach(
    (section: { key: string; value: NavigationSectionContent }) => {
      deserialized.set(section.key, section.value);
    }
  );

  return deserialized;
};

const Deserialize = {
  navigationSectionContentMap,
};

export default Deserialize;
