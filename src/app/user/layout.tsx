import { UserNavigationContenContextProvider } from "@/context/user-navigation-content-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserNavigationContenContextProvider>
      <div className="w-80p h-auto bg-white mx-8 py-8">{children}</div>
    </UserNavigationContenContextProvider>
  );
}
