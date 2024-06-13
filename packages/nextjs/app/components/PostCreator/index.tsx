"use client";

import { useEffect, useRef, useState } from "react";
import TokenSwitcher from "../common/TokenSwitcher";
import Asset from "./Asset";
import AssetAdder from "./AssetAdder";
import halo from "./assets/halo.svg";
import rocket from "./assets/rocket.webp";
import autoAnimate from "@formkit/auto-animate";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import TooltipQuick from "~~/components/ui/tooltip-quick";
import { useToast } from "~~/components/ui/use-toast";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { generateUniqueString } from "~~/lib/utils";

const PostCreator = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const [pitchVal, setPitchVal] = useState("");
  const [title, setTitle] = useState("");
  const askAmountState = useState("");
  const [askAmount, setAskAmount] = askAmountState;
  const askAmountInDollarState = useState(0);
  const [askAmountInDollar] = askAmountInDollarState;
  const [interestRate, setInterestRate] = useState("10");
  const [returnTimeInDays, setReturnTimeInDays] = useState("30");
  type AssetType = {
    link: string;
    id: string;
  };
  const [assets, setAssets] = useState<AssetType[]>([]);
  const removeAssetByIndex = (index: number): void => {
    const assetsCopy = [...assets];
    if (index > -1 && index < assetsCopy.length) {
      assetsCopy.splice(index, 1);
    }
    setAssets(assetsCopy);
  };

  const { writeContractAsync: publishCampaign } = useScaffoldWriteContract("CRYPTOFUND");
  const [isPublishing, setPublishing] = useState(false);
  const { toast } = useToast();

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    formRef.current && autoAnimate(formRef.current);
  }, [formRef]);

  const resetThis = () => {
    setPageIndex(0);
    setPitchVal("");
    setTitle("");
    setAskAmount("");
    setInterestRate("");
    setReturnTimeInDays("");
  };

  return (
    <div className="w-full pt-10 relative mb-8">
      <img src={rocket.src} className="absolute h-20 right-0 top-0 z-30" />
      <div className="border border-border rounded-xl p-4 bg-background relative z-20 overflow-hidden">
        <div className="">
          <img src={halo.src} className="w-full absolute -top-8 left-0 right-0 z-10" />
          <h1 className="font-bold text-xl relative z-20">
            {pageIndex === 0 ? (
              <>
                <i className="fa-regular fa-rocket mr-2"></i>Create a new campaign
              </>
            ) : (
              <div className="flex items-center">
                <Button variant={"secondaryGhost"} onClick={() => setPageIndex(0)} className="text-lg mr-2 font-normal">
                  <i className="fa-regular fa-chevron-left mr-1"></i> Edit
                </Button>
                <span>Add details about campaign</span>
              </div>
            )}
          </h1>
          <div className="w-full" ref={formRef}>
            {pageIndex === 0 ? (
              <>
                <textarea
                  className={`w-full h-20 rounded-lg border border-border bg-background/30 backdrop-blur-sm resize-none relative z-20 mt-2 shadow-sm p-2 ${
                    pitchVal !== "" && pitchVal.length < 50 ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  placeholder="Start writing your pitch here."
                  value={pitchVal}
                  onChange={evt => setPitchVal(evt.target.value)}
                />
              </>
            ) : (
              <>
                <div className="w-full relative z-20 py-4">
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <span className="font-bold">Title</span>
                    <Input
                      placeholder="My Awesome Campaign"
                      value={title}
                      onChange={evt => setTitle(evt.target.value)}
                      className={`${
                        title !== "" && title.length < 4 ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                    <span className="font-bold">Ask</span>
                    <div className="flex items-center gap-1.5">
                      <Input
                        value={askAmount}
                        type="number"
                        onChange={evt => setAskAmount(evt.target.value)}
                        placeholder="Ask Amount"
                        className={`${
                          askAmount !== "" && askAmountInDollar < 1000
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      <TokenSwitcher
                        valueState={askAmountState}
                        dollarValueState={askAmountInDollarState}
                        className={"w-24 ml-1"}
                      />
                    </div>
                    <span className="font-bold">Interest Rate</span>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="number"
                        placeholder=""
                        min={0}
                        max={100}
                        value={interestRate}
                        onChange={evt => setInterestRate(evt.target.value)}
                        className={`${
                          interestRate !== "" &&
                          (isNaN(Number(interestRate)) || Number(interestRate) < 0 || Number(interestRate) > 100)
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      <span className="w-28">%</span>
                    </div>
                    <span className="font-bold">Return Time</span>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="number"
                        placeholder=""
                        min={1}
                        value={returnTimeInDays}
                        onChange={evt => setReturnTimeInDays(evt.target.value)}
                        className={`${
                          (returnTimeInDays !== "" && isNaN(Number(returnTimeInDays))) || Number(returnTimeInDays) < 30
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      <span className="w-28">days</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <span className="font-bold mr-2">Assets</span>
                      <TooltipQuick
                        triggerContent={
                          <>
                            <i className="fa-regular fa-circle-info"></i>
                          </>
                        }
                      >
                        Assets are documents that back your campaign, or some collateral proof.
                      </TooltipQuick>
                    </div>
                    <div className="bg-background-2/60 rounded-xl flex items-center p-3 gap-2">
                      {assets.map((asset, idx) => {
                        return (
                          <Asset
                            link={asset.link}
                            name={"Asset " + (idx + 1)}
                            key={asset.id}
                            index={idx}
                            removeAssetByIndex={removeAssetByIndex}
                          />
                        );
                      })}
                      {assets.length < 5 && (
                        <AssetAdder
                          addAsset={(value: string) => {
                            const newAsset = {
                              id: generateUniqueString(),
                              link: value,
                            };
                            setAssets(prev => [...prev, newAsset]);
                          }}
                        >
                          <Button
                            variant={"primaryPlain"}
                            className="inline-flex flex-col items-center h-auto gap-1 rounded-xl border border-borderLight"
                          >
                            <div className="h-[100px] w-[100px] flex items-center justify-center">
                              <i className="fa-solid fa-circle-plus text-primary/30 text-4xl"></i>
                            </div>
                            <span className="text-base">Add asset</span>
                          </Button>
                        </AssetAdder>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex w-full justify-end mt-2">
            {pageIndex === 0 ? (
              <Button disabled={pitchVal.length < 50} onClick={() => setPageIndex(1)}>
                Next
              </Button>
            ) : (
              <Button
                variant={"secondary"}
                disabled={
                  isPublishing ||
                  pitchVal.length < 50 ||
                  title.length < 4 ||
                  askAmountInDollar < 1000 ||
                  isNaN(Number(interestRate)) ||
                  Number(interestRate) < 0 ||
                  Number(interestRate) > 100 ||
                  isNaN(Number(returnTimeInDays)) ||
                  Number(returnTimeInDays) < 30 ||
                  assets.length === 0 ||
                  assets.length > 5
                }
                onClick={async () => {
                  if (isPublishing) return;
                  const assetLinks = assets.map(asset => asset.link);
                  setPublishing(true);
                  toast({
                    title: "Publishing...",
                    description: "Please wait while your campaign is publishing.",
                  });
                  try {
                    await publishCampaign({
                      functionName: "createCampaign",
                      args: [pitchVal, BigInt(askAmount), BigInt(interestRate), assetLinks, BigInt(returnTimeInDays)],
                      // value: parseEther("0.1"),
                    });
                    setPublishing(false);
                    toast({
                      title: "Campaign published",
                      description: "Your campaign was published succesfully! Please wait while it appears.",
                    });
                    resetThis();
                  } catch (e) {
                    setPublishing(false);
                    console.error("Error publishing the campaign:", e);
                    toast({
                      title: "Error",
                      description: "There was an error publishing the campaign.",
                    });
                  }
                }}
              >
                {isPublishing ? (
                  <>
                    <i className="fa-regular fa-spinner-third animate-spin mr-2"></i>
                    Publishing...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane-top mr-2"></i>
                    Publish
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-background w-full border border-border rounded-lg flex flex-col gap-2">
    //   <span className="font-semibold border-b border-b-border p-2 flex gap-2 items-center">
    //     <i className="fa-regular fa-pen-line"></i>List your Project
    //   </span>
    //   <textarea
    //     className="px-2 outline-none resize-none text-sm border-b border-b-border h-20"
    //     placeholder="Descrbe your Project"
    //     name="pitch"
    //     id=""
    //     value={pitchVal}
    //     onChange={evt => setPitchVal(evt.target.value)}
    //   ></textarea>
    //   <div className="flex flex-col gap-2 p-4 text-sm">
    //     <div>
    //       <label className="flex flex-row items-center gap-2">
    //         <span className="font-bold">Ask Amount (USD)</span>
    //         <Input
    //           type="number"
    //           className="flex-1 text-sm"
    //           onChange={evt => {
    //             setAskAmount(Number(evt.target.value));
    //           }}
    //           value={askAmount}
    //           name="askAmount"
    //           placeholder="Ask Amount (USD)"
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label className="flex flex-row items-center gap-2">
    //         <span className="font-bold">Interest Rate</span>
    //         <Input
    //           type="number"
    //           className="flex-1"
    //           onChange={evt => {
    //             setInterestRate(Number(evt.target.value));
    //           }}
    //           value={interestRate}
    //           name="interestRate"
    //           placeholder="Interest Rate"
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label className="flex flex-row items-center gap-2">
    //         <span className="font-bold">Payout Duration (days)</span>
    //         <Input
    //           type="number"
    //           className="flex-1"
    //           onChange={evt => {
    //             setReturnTimeInDays(Number(evt.target.value));
    //           }}
    //           value={returnTimeInDays}
    //           name="returnTimeInDays"
    //           placeholder="Payout Duration (days)"
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <label className="flex flex-row items-center gap-2">
    //         <span className="font-bold">Asset Link</span>
    //         <Input
    //           type="string"
    //           className="flex-1"
    //           onChange={evt => {
    //             setAsset(evt.target.value);
    //           }}
    //           value={asset}
    //           name="asset"
    //           placeholder="Asset Link"
    //         />
    //       </label>
    //     </div>
    //   </div>

    //   <div className="p-2 border-t border-t-border w-full flex justify-end">
    //
    //       <i className="fa-solid fa-paper-plane-top"></i>
    //       Publish
    //     </Button>
    //   </div>
    // </div>
  );
};

export default PostCreator;
