import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import {
  Blocks,
  CircleUserRound,
  FileUserIcon,
  House,
  LogOut,
  Palette,
  Settings,
} from "lucide-react";
import { useUserRoleContextProvider } from "@/context/user-role-context";
import { useLoadingContext } from "@/context/loading-context";
import Loading from "@/components/loading/loading";
import logout from "@/utils/api-connections/auth/logout";
import { useRouter, usePathname } from "next/navigation"; 

const SidebarComponent = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const { userRole } = useUserRoleContextProvider();
  const [collapsed, setCollapsed] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const { isLoading, updateIsLoading } = useLoadingContext();

  useEffect(() => {
    const currentPath = pathname.split("/")[2];
    setActiveMenuItem(currentPath);
  }, [pathname]);

  const handleHomeClick = () => {
    router.push("/user/home");
  };

  const handleProfileClick = () => {
    router.push("/user/profile");
  };

  const handleResumeClick = () => {
    router.push("/user/resume");
  };

  const handleSettingsClick = () => {
    router.push("/user/settings");
  };

  const handleProfileConfigurationClick = () => {
    router.push("/user/profile-configuration");
  };

  const handleLogout = async () => {
    updateIsLoading(true);
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      updateIsLoading(false);
    }
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
      "&:hover": {
        backgroundColor: "lightgray", // Customize hover color
      },
      backgroundColor: "transparent", // Default background color
      borderRadius: "8px",
    },
    icon: ({ active }) => ({
      backgroundColor: active ? "#239ED0" : "transparent", // Blue background for active items
      color: active ? "white" : "black", // White icon color when active, black otherwise
      borderRadius: "50%", // Round background around the icon
      padding: "6px", // Padding around the icon for the background effect
    }),
    label: ({ open, active }) => ({
      fontWeight: open ? 800 : undefined,
      color: active ? "#239ED0" : "black", // Optional: highlight text color if needed
    }),
  };

  const logoutStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
      "&:hover": {
        backgroundColor: "lightgray", // Customize hover color
      },
      backgroundColor: "transparent", // Default background color
      borderRadius: "8px",
    },
    icon: () => ({
      backgroundColor: "#b23b3b", // Blue background for active items
      color: "white", // White icon color when active, black otherwise
      borderRadius: "50%", // Round background around the icon
      padding: "6px", // Padding around the icon for the background effect
    }),
    label: ({ open }) => ({
      fontWeight: open ? 800 : undefined,
      color: "#b23b3b", // Optional: highlight text color if needed
    }),
  };

  return (
    <div className="flex h-full">
      <Sidebar
        collapsed={collapsed}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="flex-col">
          <>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<House />}
                onClick={handleHomeClick}
                active={activeMenuItem === "home"}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<CircleUserRound />}
                onClick={handleProfileClick}
                active={activeMenuItem === "profile"}
              >
                Profile
              </MenuItem>
              <MenuItem icon={<Palette />} active={activeMenuItem === "theme"}>
                Theme
              </MenuItem>
              <MenuItem
                icon={<FileUserIcon />}
                onClick={handleResumeClick}
                active={activeMenuItem === "resume"}
              >
                Resume
              </MenuItem>
              <MenuItem
                icon={<Settings />}
                onClick={handleSettingsClick}
                active={activeMenuItem === "settings"}
              >
                Settings
              </MenuItem>
            </Menu>
            {userRole === "SUPER_ADMIN" && (
              <Menu menuItemStyles={menuItemStyles}>
                <MenuItem
                  icon={<Blocks />}
                  onClick={handleProfileConfigurationClick}
                  active={activeMenuItem === "profile-configuration"}
                >
                  Profile Configuration
                </MenuItem>
              </Menu>
            )}
          </>

          <div className="absolute bottom-0 w-full">
            <Menu menuItemStyles={logoutStyles}>
              <MenuItem icon={<LogOut />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      {isLoading && (
        <Loading
          spinColor="primary"
          spinSize="lg"
          label="Loading..."
          labelColor="primary"
        />
      )}
    </div>
  );
};

export default SidebarComponent;
