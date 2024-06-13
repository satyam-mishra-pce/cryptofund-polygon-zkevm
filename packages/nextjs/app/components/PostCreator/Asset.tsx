import React from "react";

type AssetProps = {
  name: string;
  link: string;
  index: number;
  removeAssetByIndex: (index: number) => void;
};

const Asset = ({ name, link, index, removeAssetByIndex }: AssetProps) => {
  return (
    <div className=" h-auto gap-1 rounded-xl border border-borderLight bg-background hover:border-primary relative">
      <a href={link} className="inline-flex flex-col p-2" target="_blank">
        <div className="h-[100px] w-[100px] flex items-center justify-center">
          <i className="fa-regular fa-file text-primary/30 text-4xl"></i>
        </div>
        <span className="text-base w-[100px] truncate font-bold">{name}</span>
      </a>
      <button
        className="h-6 w-6 rounded-full bg-foreground/10 hover:bg-foreground/30 text-foreground/80 hover:text-foreground absolute z-30 top-1 right-1"
        onClick={() => removeAssetByIndex(index)}
      >
        <i className="fa-regular fa-xmark"></i>
      </button>
    </div>
  );
};

export default Asset;
