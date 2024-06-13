"use client";

import halo from "./assets/halo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "~~/components/ui/button";

const WalletOnboarding = () => {
  return (
    <div className="w-full relative mb-8">
      <div className="border border-border rounded-xl p-4 bg-background relative z-20 overflow-hidden">
        <div className="">
          <img src={halo.src} className="w-full absolute -top-8 left-0 right-0 z-10" />
          <h1 className="font-bold text-xl relative z-20">Want to create a campaign, or fund it?</h1>
          <div className="w-full">
            You would need to connect your wallet to be able to create a campaign, or fund it. Finish the onboarding, by
            clicking the Connect button.
          </div>
          <div className="flex w-full justify-end mt-2">
            <ConnectButton.Custom>
              {({ openConnectModal }) => {
                return (
                  <Button onClick={openConnectModal}>
                    <i className="fa-regular fa-wallet mr-2"></i>Connect
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletOnboarding;
