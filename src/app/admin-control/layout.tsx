import Sidebar from "@/components/side-bar/side-bar-panel";
import { NavigationSectionContentProvider } from "@/context/navigation-section-content";
import { SideBarContextProvider } from "@/context/side-bar-contest";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideBarContextProvider>
      <NavigationSectionContentProvider>
        <div className="w-full flex justify-end">
          <div className="w-20p h-100p bg-gray-50 py-2 fixed left-0">
            <Sidebar />
          </div>
          <div className="w-80p h-auto bg-white">
            <div className="bg-white mx-8 py-10">{children}</div>
          </div>
        </div>
      </NavigationSectionContentProvider>
    </SideBarContextProvider>
  );
}
