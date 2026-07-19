import type { Metadata } from "next";
// @ts-ignore - allow side-effect import of global CSS without type declarations
import "./globals.css";
import { Toaster } from "sonner";

import ReduxProvider from "@/redux/ReduxProvider";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Greetely",
  icons: {
    icon: "/greetely.png",
  },
  description:
    "Employee recognition and rewards platform to boost morale and engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.className} antialiased`}>
        <Toaster position="bottom-right" richColors />

        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
