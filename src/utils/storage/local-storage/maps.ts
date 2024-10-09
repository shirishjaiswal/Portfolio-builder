import { NavigationSectionContentMap } from "@/components/admin-control/page-navigation/type";
import localstorage from ".";
import Serialize from "@/utils/encode-decode/serialize";
import Deserialize from "@/utils/encode-decode/deserialize";

const NavigationSectionContentMapKey = "Navigation_Section_Content_Map";

const setNavigationSectionContentMap = (data: NavigationSectionContentMap) => {
  localstorage.setData(
    NavigationSectionContentMapKey,
    Serialize.navigationSectionContentMap(data)
  );
};

const getNavigationSectionContentMap = () => {
  const data = localstorage.getData(NavigationSectionContentMapKey);
  if (data) return Deserialize.navigationSectionContentMap(data);
};
const maps = {
  setNavigationSectionContentMap,
  getNavigationSectionContentMap,
};

export default maps;
