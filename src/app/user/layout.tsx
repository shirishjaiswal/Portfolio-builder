"use client";

import { UserNavigationContenContextProvider } from "@/context/user-navigation-content-context";
import { UserProfileContextProvider } from "@/context/user-profile-context";
import SidebarComponent from "@/components/app/user/sidebar/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageTitle from "@/components/app/admin-control/page-title/page-title";
import { ProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { UniqueKeyContextProvider } from "@/context/uniquekey-context";
import { UserProfileContextsProvider } from "@/context/user-profile-contexts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pathname, setPathname] = useState<string | null>(null);
  const path = usePathname();
  const [title, setTitle] = useState<string>();
  useEffect(() => {
    if (path.includes("home")) {
      setPathname("home");
      setTitle("Home");
    }
    if (path.includes("profile")) {
      setPathname("profile");
      setTitle("Profile");
    }
    if (path.includes("profile-configuration")) {
      setPathname("profile-configuration");
      setTitle("Profile Configuration");
    }
    if (path.includes("settings")) {
      setPathname("settings");
      setTitle("Settings");
    }
  }, [path]);
  return (
    <UserProfileContextsProvider>
      <UniqueKeyContextProvider>
        <ProfileConfigurationContextProvider>
          <UserNavigationContenContextProvider>
            <UserProfileContextProvider>
              <div className="flex h-92p gap-4">
                <div className="h-full">
                  <SidebarComponent pathName={pathname} />
                </div>
                <div className="w-94p pt-2 mr-4">
                  <PageTitle title={title ?? ""} />
                  {children}
                </div>
              </div>
            </UserProfileContextProvider>
          </UserNavigationContenContextProvider>
        </ProfileConfigurationContextProvider>
      </UniqueKeyContextProvider>
    </UserProfileContextsProvider>
  );
}
