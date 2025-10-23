import React from "react";
import "@/assets/styles/globals.css";
import { mainLayoutProps } from "@/types/basicTypes";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find Your Dream Rental Property",
  keywords: "rental,find rentals, find properties",
};

const mainLayout: React.FC<mainLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />  
        <div>{children}</div>
      </body>
    </html>
  );
};

export default mainLayout;
