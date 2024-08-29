import { Lato } from "next/font/google";
import "./globals.css";
// import Cursor from "@/components/Cursor";
import { CursorProvider } from "@/context/CursorContext";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Mock.io",
  description: "AI Powered Interview Prep",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={lato.className}>
          <CursorProvider>
            <div className="w-[100%] h-screen overflow-x-hidden  bg-[#F1F0EE]">   
              {children}
            </div>
          </CursorProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
