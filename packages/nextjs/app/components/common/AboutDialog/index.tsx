"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "~~/components/ui/halo-dialog";

type AboutDialogProps = {
  trigger?: React.ReactNode;
};

const AboutDialog = ({}: AboutDialogProps) => {
  const [open, setOpen] = React.useState(false);
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* {trigger ? (
          trigger
        ) : ( */}
        <button
          className={`w-full text-left rounded-md font-medium flex gap-2 items-center ${
            false
              ? "text-secondary"
              : "text-muted-foreground hover:text-secondary hover:bg-foreground/5 active:bg-foreground/10"
          }`}
        >
          <div className={`h-10 w-10 rounded-md flex items-center justify-center ${false ? "bg-accent/50" : ""}`}>
            <i className={`fa-regular ${"fa-circle-info"} ${false ? "fa-solid" : ""} `}></i>
          </div>
          <span className={`${false ? "font-bold" : ""}`}>{"About"}</span>
        </button>
        {/* )} */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" title="About" description={<>About CryptoFund</>}>
        <div className="w-full flex flex-col items-center">
          <img src="/assets/images/logo-gradient-inset-shadow.png" className="h-24 mb-6" />
          <h1 className="font-bold text-3xl">CryptoFund</h1>
          <h2 className="font-bold text-muted-foreground">Powered by Polygon zkEVM Testnet</h2>
          <div className="w-full bg-muted rounded-xl p-2 mt-6 flex flex-col items-center">
            <span className="block w-full text-center">
              Developed by <span className="font-bold ml-1">Binary Bois</span>
            </span>
            <span>at</span>
            <span className="text-lg font-bold">HACKTHELEAGUE 2024</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
