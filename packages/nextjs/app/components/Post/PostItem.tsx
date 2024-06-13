"use client";

import { useState } from "react";
import Link from "next/link";
import Stats from "./Stats";
import { useAccount } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useToast } from "~~/components/ui/use-toast";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface PostItemProps {
  projectIdx: number;
  address: string;
  accountName: string;
  pitch: string;
  assetLinks: readonly string[];
  likes: number;
  proposals: number;
  askAmount: number;
  totalFunded: number;
  interestRate: number;
  likers: readonly string[];
  funders: readonly string[];
}

const PostItem = ({
  projectIdx,
  address,
  accountName,
  pitch,
  assetLinks,
  likes,
  proposals,
  askAmount,
  totalFunded,
  interestRate,
  likers,
  funders,
}: PostItemProps) => {
  const { address: myAddress } = useAccount();
  const { writeContractAsync: likeCampaign } = useScaffoldWriteContract("CRYPTOFUND");
  const [isLiked, setLiked] = useState(
    myAddress
      ? likers.filter(addr => myAddress.toLowerCase() === addr.toLowerCase()).length === 1
        ? true
        : false
      : false,
  );
  const [isLiking, setLiking] = useState(false);
  const [isTempLiked, setTempLiked] = useState(false);
  const { toast } = useToast();

  return (
    <div className="bg-background w-full min-h-[300px] border border-border rounded-xl flex flex-col">
      {/* Topbar */}
      <div className=" flex flex-row p-3 gap-3 items-center">
        <BlockieAvatar address={address} size={36} />
        <div className="flex flex-col">
          <span className="font-semibold">{accountName}</span>
          <span className="text-muted-foreground text-xs">{address}</span>
        </div>
      </div>

      {/* Main */}
      <div className="w-full flex flex-row flex-1 p-2 gap-2">
        {/* Main.Left */}
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-2 flex flex-col justify-between gap-8">
            <article className="font-medium">{pitch}</article>
            <section className="rounded-xl bg-accent/15 p-2">
              {assetLinks.map((assetLink, index) => {
                return (
                  <Link
                    key={index + Date.now()}
                    href={assetLink}
                    className="bg-background border border-borderLight rounded-xl p-2 inline-flex flex-col justify-between gap-1 hover:border-primary/60"
                  >
                    <div className="h-[100px] w-[100px] bg-gradient-to-b to-accent/0 from-accent/30 flex items-center justify-center rounded-md">
                      <i className=" fa-regular fa-file-invoice text-4xl text-primary"></i>
                    </div>
                    <div className="truncate w-[100px]">Asset {index + 1}</div>
                  </Link>
                );
              })}
            </section>
          </div>
          <div className="px-4 py-2 flex flex-row gap-12 items-end">
            <button
              className="hover:text-secondary text-sm"
              onClick={async () => {
                if (isLiking) return;
                setLiking(true);
                setLiked(true);
                setTempLiked(true);
                toast({
                  title: "Liking",
                  description: "Please wait while we are liking the campaign...",
                });
                try {
                  await likeCampaign({
                    functionName: "likeCampaign",
                    args: [BigInt(projectIdx)],
                    // value: parseEther("0.1"),
                  });
                  setLiking(false);
                } catch (e) {
                  setLiking(false);
                  setLiked(false);
                  setTempLiked(false);
                  console.error("Error liking the campaign:", e);
                  toast({
                    title: "Error",
                    description: "There was an error liking the campaign.",
                  });
                }
              }}
            >
              <i
                className={`${isTempLiked || isLiked ? "fa-solid text-secondary" : "fa-regular"} fa-heart mr-2 text-lg`}
              ></i>
              <span>{likes + (isTempLiked ? 1 : 0)}</span>
            </button>
            <button className="cursor-default text-sm">
              <i className="fa-regular fa-wallet mr-2 text-lg"></i>
              <span>{proposals}</span>
            </button>
          </div>
        </div>

        {/* Main.Right */}
        <Stats {...{ address, myAddress, askAmount, totalFunded, interestRate, campaignIdx: projectIdx, funders }} />
      </div>
    </div>
  );
};

export default PostItem;
