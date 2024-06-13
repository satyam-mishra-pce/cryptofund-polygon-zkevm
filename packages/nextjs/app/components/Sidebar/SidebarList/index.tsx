"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AboutDialog from "../../common/AboutDialog";
import SidebarItem from "./SidebarItem";

const SidebarList = () => {
  const router = usePathname();
  const tabIndex: { [key: string]: number } = {
    "/home": 1,
    "/": 1,
    "/myprojects": 2,
    "/myproposals": 3,
    "/user": 4,
  };
  console.log(router);
  const activeTab = tabIndex[router];
  console.log("ActiveTab:", activeTab);
  return (
    <section className="px-4 flex flex-1 flex-col justify-between py-2 mt-4">
      <ul className="flex-1 flex flex-col gap-1">
        <li>
          <Link href="/">
            <SidebarItem isActive={router === "/"} icon="fa-home" text="Home" />
          </Link>
        </li>
        <li>
          <Link href="/campaigns">
            <SidebarItem isActive={router === "/campaigns"} icon="fa-rocket" text="My Campaigns" />
          </Link>
        </li>
        <li>
          <Link href="/fundings">
            <SidebarItem isActive={router === "/fundings"} icon="fa-circle-dollar" text="My Fundings" />
          </Link>
        </li>
        {/* <li>
          <Link href="/settings">
          <SidebarItem isActive={router === "/settings"} icon="fa-gear" text="Settings" />
          </Link>
        </li> */}
      </ul>
      <ul className="flex flex-col">
        <li>
          <AboutDialog trigger={<SidebarItem icon="fa-circle-info" text="About" />} />
        </li>
      </ul>
    </section>
  );
};

export default SidebarList;
