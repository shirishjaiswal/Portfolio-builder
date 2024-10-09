import type { Metadata } from "next";
import Navigation from "@/components/navigation/navigation";
import "@/app/globals.css";
import localFont from "next/font/local";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { LoadingContextProvider } from "@/context/loading-context";

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
  return (
    <html lang="en">
      <body className={`${Roboto.variable} w-full h-full`}>
        <LoadingContextProvider>
          <Navigation />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </LoadingContextProvider>
      </body>
    </html>
  );
}
