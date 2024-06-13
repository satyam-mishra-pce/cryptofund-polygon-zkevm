import React, { useState } from "react";
import TokenSwitcher from "../common/TokenSwitcher";
import { parseEther } from "viem";
import { Button } from "~~/components/ui/button";
import { useToast } from "~~/components/ui/use-toast";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type ProgressProps = {
  percentage: number;
  className?: string;
};
const Progress = ({ percentage, className }: ProgressProps) => {
  return (
    <div className={`bg-secondary/30 w-full h-4 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-secondary h-4"
        style={{
          width: `calc(${percentage}% + ${8 - percentage / 12.5}px)`,
        }}
      ></div>
    </div>
  );
};

type StatsProps = {
  address: string;
  myAddress: string | undefined;
  askAmount: number;
  totalFunded: number;
  interestRate: number;
  campaignIdx: number;
  funders: readonly string[];
};

const Stats = ({ address, myAddress, askAmount, totalFunded, interestRate, campaignIdx, funders }: StatsProps) => {
  const fundAmountState = useState("");
  const [fundAmount, setFundAmount] = fundAmountState;
  const fundAmountInDollarState = useState(0);
  const [fundAmountInDollar] = fundAmountInDollarState;
  const fundAmountInEthState = useState(0);
  const [fundAmountInEth] = fundAmountInEthState;
  const percentageFunded = (totalFunded * 100) / askAmount;
  const [tokenSwitcherRefresh, setTokenSwitcherRefresh] = useState(false);
  const { writeContractAsync: fundCampaignAsync } = useScaffoldWriteContract("CRYPTOFUND");
  const [isFunding, setFunding] = useState(false);
  const { toast } = useToast();
  // YOU hace already funded.

  console.log("debug fund", fundAmount, fundAmountInDollar, fundAmountInEth, askAmount);
  return (
    <div className="flex flex-col gap-2 w-72 p-2">
      {/* Ask */}
      <div className="flex flex-col bg-accent/40 p-2 rounded-xl gap-3">
        <div className="flex flex-col">
          <span className="font-bold">Ask</span>
          <span className="font-bold text-xl text-secondary">USD {askAmount}</span>
        </div>
        <div className="flex flex-col mt-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">
              <span className="mr-2">Funded</span>
              <span className="text-secondary">USD {totalFunded}</span>
            </span>
            <span className="font-bold text-sm text-secondary">{percentageFunded}%</span>
          </div>
          <Progress percentage={percentageFunded} className={"mt-1"} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col bg-accent/20 p-2 rounded-xl gap-1">
          <span className="font-bold">Interest Rate</span>
          <span className="font-bold text-xl text-secondary">
            {interestRate}
            {"% "}
            <span className="text-xs text-muted-foreground">per month</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col bg-accent/20 p-2 rounded-xl gap-1">
          <span className="font-bold">Return Time</span>
          <span className="font-bold text-xl text-secondary">
            {"30 "}
            <span className="text-xs text-muted-foreground">days</span>
          </span>
        </div>
      </div>
      <>
        {address.toLowerCase() === myAddress?.toLowerCase() ? (
          <div className="text-sm mt-2">
            {" "}
            <i className="fa-regular fa-circle-info mr-2"></i>Use another account to fund this campaign.
          </div>
        ) : funders.filter(addr => myAddress?.toLowerCase() === addr.toLowerCase()).length === 1 ? (
          <>
            <div className="text-sm mt-2">
              {" "}
              <i className="fa-regular fa-circle-info mr-2"></i>Use another account to fund this campaign.
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2">
              <div
                className={`flex border border-border rounded-lg focus-within:border-secondary ${
                  fundAmount !== "" && fundAmountInDollar > askAmount
                    ? "border-destructive/50 focus-within:border-destructive"
                    : ""
                }`}
              >
                <input
                  type="number"
                  placeholder="0"
                  className={`w-full rounded-lg px-1.5 focus:outline-none`}
                  value={fundAmount}
                  onChange={evt => setFundAmount(evt.target.value)}
                />
                <button
                  className="px-1 text-secondary/70 hover:text-secondary text-sm uppercase"
                  onClick={() => {
                    setTokenSwitcherRefresh(value => !value);
                    setTimeout(() => {
                      setFundAmount(askAmount.toString());
                    });
                  }}
                >
                  Remaining
                </button>
              </div>
              <TokenSwitcher
                valueState={fundAmountState}
                dollarValueState={fundAmountInDollarState}
                ethValueState={fundAmountInEthState}
                defaultCurrencyIndex={0}
                refresh={tokenSwitcherRefresh}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button
                variant={"secondary"}
                disabled={isFunding || fundAmountInDollar === 0 || fundAmountInDollar > askAmount}
                onClick={async () => {
                  if (isFunding) return;
                  if (fundAmountInDollar === 0 || fundAmountInDollar > askAmount) return;
                  setFunding(true);
                  toast({
                    title: "Funding...",
                    description: "Please wait while the campaign is beging funded.",
                  });
                  try {
                    await fundCampaignAsync({
                      functionName: "createFunding",
                      args: [BigInt(campaignIdx)],
                      value: parseEther(fundAmountInEth.toString()),
                      //HATA DE
                    });
                    setFunding(false);
                    toast({
                      title: "Campaign funded",
                      description: "The campaign was funded succesfully! Please wait while it shows up.",
                    });
                  } catch (e) {
                    setFunding(false);
                    console.error("Error funding the campaign:", e);
                    toast({
                      title: "Error",
                      description: "There was an error funding the campaign.",
                    });
                  }
                }}
              >
                Fund Campaign
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
    // <div className="flex flex-col p-2 w-[300px] shrink-0 bg-accent/15 rounded-lg">
    //   <div className="flex-1 flex flex-col gap-2">
    //     <div className="flex flex-col">
    //       <span className="text-sm font-bold">Total Ask</span>
    //       <span className="text-2xl font-bold text-secondary">${askAmount}</span>
    //     </div>
    //     <div className="flex flex-col">
    //       <span className="text-sm font-bold">Total Remaining</span>
    //       <span className="text-2xl font-bold text-secondary">${totalFunded}</span>
    //     </div>
    //   </div>
    //   {address === myAddress && (
    //     <div className="flex flex-col gap-2">
    //       <div className="flex flex-row w-[165px] px-1 justify-between items-center">
    //         <div className="flex flex-col ">
    //           <span className="text-sm font-bold leading-none">Interest Rate</span>
    //           <span className="text-muted-foreground text-xs leading-none">per 30 day</span>
    //         </div>
    //         <div>
    //           <span className="font-bold text-lg">{interestRate}%</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-row gap-2 items-center">
    //         <div className="px-2 flex-1 flex flex-row border border-border rounded-lg focus-within:border-secondary">
    //           <input
    //             size={10}
    //             className="h-[30px] rounded-md bg-transparent focus:outline-none"
    //             type="text"
    //             value={proposalAmount}
    //             placeholder="Amount"
    //             onChange={evt => setProposalAmount(Number(evt.target.value))}
    //           />
    //           <button className="text-primary font-bold leading-loose">MANTA</button>
    //         </div>
    //         <Button
    //           className="rounded-lg bg-accent p-2 shrink-0 text-sm text-primary font-bold "
    //           onClick={async () => {
    //             try {
    //               await proposeProjectAsync({
    //                 functionName: "createProposal",
    //                 args: [BigInt(projectIdx)],
    //                 value: parseEther(proposalAmount.toString()),
    //               });
    //             } catch (e) {
    //               console.error("Error proposing the project:", e);
    //             }
    //           }}
    //         >
    //           Propose
    //         </Button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Stats;
