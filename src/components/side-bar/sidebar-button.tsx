"use client";
import { useSideBarContextProvider } from "@/context/side-bar-contest-context";
import { SideBarItems } from "./type";
import { useRouter } from "next/navigation";
import { useLoadingContextProvider } from "@/context/loading-context";

type Props = SideBarItems;
const SideBarItem: React.FC<Props> = ({
  id,
  label,
  redirectTo,
  isActive,
  isDisabled,
}: Props) => {
  const { sideBarItems, updateSideBarItems } = useSideBarContextProvider();
  const router = useRouter();
  const { updateIsLoading } = useLoadingContextProvider();

  const handleClick = () => {
    if (!isDisabled && !isActive) {
      updateIsLoading(true);
      router.push(redirectTo);
      const updatedSideBarItems: SideBarItems[] = sideBarItems.map((item) => {
        return item.id === id
          ? { ...item, isActive: true }
          : { ...item, isActive: false };
      });
      updateSideBarItems([...updatedSideBarItems]);
    }
  };

  return (
    <button
      key={id}
      className={`w-full h-11 ${isActive ? "bg-gray-200" : "bg-gray-50"} ${
        isDisabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"
      } justify-self-center items-center flex ${
        !isActive ? "hover:bg-gray-100 " : ""
      } transition duration-600 ease-in-out`}
      onClick={handleClick}
    >
      <label className="font-roboto text-l font-medium pl-4">{label}</label>
    </button>
  );
};

export default SideBarItem;
