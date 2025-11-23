import React from "react";
import { ToastContainer } from "react-toastify";
import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import { mainLayoutProps } from "@/types/basicTypes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find Your Dream Rental Property",
  keywords: "rental,find rentals, find properties",
};
import {GlobalProvider} from "@/context/GlobalContext";
const mainLayout: React.FC<mainLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
          <ToastContainer />
        </body>
      </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default mainLayout;
