"use client";

import { useEffect, useRef, useState } from "react";
import { Address } from "../Address";
import { BlockieAvatar } from "../BlockieAvatar";
import { DropDownButton } from "./DropdownButton";
import { NetworkOptions } from "./NetworkOptions";
import autoAnimate from "@formkit/auto-animate";
import { QRCodeSVG } from "qrcode.react";
import { type Address as walletAddress } from "viem";
import { useDisconnect } from "wagmi";
import { ButtonProps } from "~~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~~/components/ui/dialog";
import useUserData from "~~/hooks/contract-interactions/useUserData";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

// import { Address } from "../Address";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: walletAddress;
  blockExplorerAddressLink: string | undefined;
  displayName: React.ReactNode;
  ensAvatar?: string;
  safeNetworkShortName?: string | undefined;
} & ButtonProps;

export const AddressInfoDropdown = ({ address, blockExplorerAddressLink }: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();

  const [addressCopied, setAddressCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const [isExpanded, setExpanded] = useState(false);
  const [isSwitchingNetwork, setSwitchingNetwork] = useState(false);

  const thisRef = useRef(null);

  useEffect(() => {
    thisRef.current && autoAnimate(thisRef.current);
  }, [thisRef]);

  const userData = useUserData(address);

  return (
    <div className="w-full relative">
      <div
        className={`w-full rounded-xl p-2 bg-accent/25 flex ${
          isExpanded ? "items-start" : "items-center"
        } justify-between gap-2`}
      >
        <div className="w-full" ref={thisRef}>
          {!isExpanded ? (
            <div className="flex items-center gap-2">
              <BlockieAvatar address={address} size={36} />
              <div className="flex flex-col">
                <span className="font-bold">{userData?.name}</span>
                <span className="w-40 truncate text-sm text-muted-foreground">{address}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex flex-col items-center gap-2 w-full p-2">
                <BlockieAvatar address={address} size={60} />
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg">{userData?.name}</span>
                  <span className="w-48 truncate text-base text-muted-foreground">{address}</span>
                </div>
              </div>
              <ul className="w-full p-1 flex flex-col gap-0.5">
                <DropDownButton
                  onClick={() => {
                    copy(address);
                    setAddressCopied(true);
                    setTimeout(() => setAddressCopied(false), 800);
                  }}
                >
                  {addressCopied ? (
                    <i className="w-4 text-secondary fa-regular fa-check-circle"></i>
                  ) : (
                    <i className="w-4 text-secondary fa-regular fa-copy"></i>
                  )}
                  <span className="whitespace-nowrap ml-2">{addressCopied ? "Copied" : "Copy Address"}</span>
                </DropDownButton>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropDownButton>
                      <i className="w-4 text-secondary fa-regular fa-qrcode"></i>
                      <span className="whitespace-nowrap ml-2">View QR Code</span>
                    </DropDownButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>QR Code</DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-col items-center gap-4 pt-10">
                          <QRCodeSVG value={address} size={256} />
                          <Address address={address} format="long" disableAddressLink />
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <DropDownButton>
                  <i className="w-4 text-secondary fa-regular fa-arrow-up-right-from-square"></i>
                  <a
                    target="_blank"
                    href={blockExplorerAddressLink}
                    rel="noopener noreferrer"
                    className="whitespace-nowrap ml-2"
                  >
                    View on Block Explorer
                  </a>
                </DropDownButton>
                {allowedNetworks.length > 1 && (
                  <>
                    <DropDownButton onClick={() => setSwitchingNetwork(!isSwitchingNetwork)}>
                      <i className="w-4 text-secondary fa-regular fa-arrows-repeat"></i>
                      <span className="ml-2">Switch Network</span>
                    </DropDownButton>
                    <div className="w-full">{isSwitchingNetwork && <NetworkOptions />}</div>
                  </>
                )}
                <DropDownButton onClick={() => disconnect()}>
                  <i className="w-4 text-secondary fa-regular fa-xmark"></i>
                  <span className="whitespace-nowrap ml-2">Disconnect</span>
                </DropDownButton>
              </ul>
            </div>
          )}
        </div>
        <button
          className={`w-8 h-8 shrink-0 rounded-full text-secondary hover:bg-secondary/20 ${
            isExpanded ? "absolute right-2 top-2" : ""
          }`}
          onClick={() => setExpanded(!isExpanded)}
        >
          <i className={`fa-regular fa-chevron-down transition ${isExpanded ? "rotate-180" : ""}`}></i>
        </button>
      </div>
    </div>
  );
};
