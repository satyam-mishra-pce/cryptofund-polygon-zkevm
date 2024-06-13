"use client";

// @refresh reset
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
import { Button } from "~~/components/ui/button";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const { targetNetwork } = useTargetNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <div className="w-full relative">
                    <div className={`w-full rounded-xl p-2 bg-accent/25 flex items-center justify-between gap-2`}>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <div className="p-2 px-4 shrink-0">
                            <img src="/assets/images/logo-gradient-inset-shadow.png" alt="" className="h-8" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm">
                              Empower your campaigns with secure, transparent blockchain listing.
                            </span>
                          </div>
                        </div>
                        <hr className="mt-3 mb-2" />
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-muted-foreground">Connect wallet to get started.</span>
                          <Button
                            onClick={openConnectModal}
                            size={"sm"}
                            variant={"secondary"}
                            className="rounded-full px-3 my-1"
                          >
                            <i className="fa-regular fa-wallet mr-2"></i>Connect Wallet
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <AddressInfoDropdown
                  address={account.address as Address}
                  displayName={account.displayName}
                  ensAvatar={account.ensAvatar}
                  blockExplorerAddressLink={blockExplorerAddressLink}
                  className="border-transparent bg-primary/20 rounded-full px-1.5 py-2 text-black hover:text-accent-foreground"
                />
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
