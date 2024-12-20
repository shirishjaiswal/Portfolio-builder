import { NavigationSectionContentMap } from "@/components/app/admin-control/page-navigation/type";
import localstorage from ".";
import Serialize from "@/utils/encode-decode/serialize";
import Deserialize from "@/utils/encode-decode/deserialize";
import { UserProfile } from "@/components/app/user/profile-page/types";

const NavigationSectionContentMapKey = "Navigation_Section_Content_Map";
const UserProfileKey = "User_Profile";

const setNavigationSectionContentMap = (data: NavigationSectionContentMap) : void => {
  localstorage.setData(
    NavigationSectionContentMapKey,
    Serialize.navigationSectionContentMap(data)
  );
};

const getNavigationSectionContentMap = () : NavigationSectionContentMap | undefined => {
  const data = localstorage.getData(NavigationSectionContentMapKey);
  if (data) return Deserialize.navigationSectionContentMap(data);
};

const setUserProfile = (data : UserProfile) : void => {
  localstorage.setData(
    UserProfileKey,
    Serialize.userProfile(data)
  );
}

const getUserProfile = () : UserProfile | undefined => {
  const data = localstorage.getData(UserProfileKey);
  if (data) return Deserialize.userProfile(data);
}
const maps = {
  setNavigationSectionContentMap,
  getNavigationSectionContentMap,
  setUserProfile,
  getUserProfile
};

export default maps;
