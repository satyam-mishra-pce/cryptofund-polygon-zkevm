import React from "react";

type SidebarItem = {
  isActive?: boolean;
  icon: string;
  text: React.ReactNode;
};

const SidebarItem = ({ isActive, icon, text }: SidebarItem) => {
  return (
    <button
      className={`w-full text-left rounded-md font-medium flex gap-2 items-center ${
        isActive
          ? "text-secondary"
          : "text-muted-foreground hover:text-secondary hover:bg-foreground/5 active:bg-foreground/10"
      }`}
    >
      <div className={`h-10 w-10 rounded-md flex items-center justify-center ${isActive ? "bg-accent/50" : ""}`}>
        <i className={`fa-regular ${icon} ${isActive ? "fa-solid" : ""} `}></i>
      </div>
      <span className={`${isActive ? "font-bold" : ""}`}>{text}</span>
    </button>
  );
};

export default SidebarItem;
