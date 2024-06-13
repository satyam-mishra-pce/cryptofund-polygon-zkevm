import React from "react";
import Hero from "./Hero";
import SidebarList from "./SidebarList";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Sidebar = () => {
  return (
    <div
      className="bg-background border border-border w-72 flex flex-col overflow-y-auto sticky top-4 rounded-xl"
      style={{
        height: "calc(100vh - 32px)",
      }}
    >
      <Hero />
      <div className="p-3">
        <RainbowKitCustomConnectButton />
      </div>
      <SidebarList />
    </div>
  );
};

export default Sidebar;
