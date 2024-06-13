import React from "react";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

const Header = () => {
  return (
    <section className="bg-background/40 backdrop-blur-lg w-full border-b border-b-border px-4 py-3 flex justify-end sticky top-0 z-10">
      <RainbowKitCustomConnectButton />
    </section>
  );
};

export default Header;
