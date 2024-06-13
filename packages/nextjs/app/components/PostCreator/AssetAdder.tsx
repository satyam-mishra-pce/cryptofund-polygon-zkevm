import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import TooltipQuick from "~~/components/ui/tooltip-quick";

type AssetAdderProps = {
  children: React.ReactNode;
  addAsset: (value: string) => void;
};

const AssetAdder = ({ children, addAsset }: AssetAdderProps) => {
  const [link, setLink] = useState<string>("");
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="bg-background border border-border p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="font-bold">Enter the asset link:</span>
          <TooltipQuick
            triggerContent={
              <>
                <i className="fa-regular fa-circle-info"></i>
              </>
            }
          >
            We are soon shifting to IPFS based assets.
          </TooltipQuick>
        </div>
        <Input className="mt-2" value={link} onChange={evt => setLink(evt.target.value)} placeholder="Asset URL" />
        <div className="flex justify-end">
          <Button
            disabled={link === ""}
            onClick={() => {
              if (link === "") return;
              addAsset(link);
            }}
            className="mt-2"
          >
            <i className="fa-solid fa-circle-plus mr-2"></i> Add
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AssetAdder;
