"use client"
import userDetailsFieldInputType from "@/utils/api-connections/admin/user-details-field-input-type";

const userDetailsFieldInputDataTypes = async () => {
  try {
    const response = await userDetailsFieldInputType();
    console.log(response);
  } catch (error) {
    console.error("Error fetching user details data types:", error);
    return [];
  }
}
const UserSettingsMain: React.FC = () => {
  const handleClick = async () => {
    await userDetailsFieldInputDataTypes()
  }
  return <div><button onClick={handleClick}>Click</button></div>;
};

export default UserSettingsMain;