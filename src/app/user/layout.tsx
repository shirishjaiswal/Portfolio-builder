import { UserNavigationContenContextProvider } from "@/context/user-navigation-content-context";
import { UserProfileContextProvider } from "@/context/user-profile-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserNavigationContenContextProvider>
      <UserProfileContextProvider>
        <div className="w-80p h-auto bg-white mx-8 py-8">{children}</div>
      </UserProfileContextProvider>
    </UserNavigationContenContextProvider>
  );
}
