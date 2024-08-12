import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import { CursorProvider } from "@/context/CursorContext";
import { ReactNode } from "react";

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
    <html lang="en">
      <body className={lato.className}>
        <CursorProvider>
          <div className="w-[100%] h-screen bg-[#F1F0EE]">
            <Cursor />
            <div>
              <Navbar />
            </div>
            {children}
          </div>
        </CursorProvider>
      </body>
    </html>
  );
}
