"use client";

import React from "react";
import ConnectBannerLogo from "./ConnectBannerLogo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "~~/components/ui/button";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center flex-1">
      <div className="bg-background border border-border rounded-xl shadow-sm flex flex-col items-center justify-center overflow-hidden">
        <div
          style={{
            background: `url("/assets/Halo1.png")`,
            backgroundSize: "cover",
          }}
          className="w-full flex flex-col items-center justify-center border-b border-b-border py-4"
        >
          <img src={ConnectBannerLogo.src} className="h-16" />
          <h1 className="font-bold text-xl mt-1 text-white">BlockAssist</h1>
        </div>
        <div className="w-[264px] flex flex-col items-center justify-start py-4 px-8 gap-2">
          <section className="text-center leading-snug">
            Connect your Web3 wallet to get started with AI powered transactions.
          </section>
          <ConnectButton.Custom>
            {({ openConnectModal }) => {
              return (
                <Button className="mt-2" onClick={openConnectModal}>
                  Connect
                </Button>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
};

export default Page;
