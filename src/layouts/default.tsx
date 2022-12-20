import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex justify-between py-5 overflow-auto space-x-20">
        <Sidebar />
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
