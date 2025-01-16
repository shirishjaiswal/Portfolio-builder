import type { Metadata } from "next";
import Navigation from "@/components/navigation/navigation";
import "@/app/globals.css";
import localFont from "next/font/local";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { LoadingContextProvider } from "@/context/loading-context";
import ToastNotification from "@/components/global-components/toast/toast-notification";
import { UserRoleContextProvider } from "@/context/user-role-context";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { CustomJwtPayload } from "@/lib/session";


export const metadata: Metadata = {
  title: "Portfolio Builder",
  description: "Portfolio Builder Description",
};

const Roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("pb_session_token")?.value;

  let decodedToken: CustomJwtPayload| null = null;
  if (cookie) {
    decodedToken = jwtDecode<CustomJwtPayload>(cookie);
  }

  const role = decodedToken?.roles?.[0];
  return (
    <html lang="en" className="h-full">
      <body className={`${Roboto.variable} h-full`}>
        <UserRoleContextProvider role={role}>
          <LoadingContextProvider>
            <Navigation />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <ToastNotification />
          </LoadingContextProvider>
        </UserRoleContextProvider>
      </body>
    </html>
  );
}
