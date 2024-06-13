"use client";

import { useState } from "react";
import PostCreator from "../PostCreator";
import UserOnboarding from "../PostCreator/UserOnboarding";
import WalletOnboarding from "../PostCreator/WalletOnboarding";
import PostItem from "./PostItem";
import { useAccount } from "wagmi";
import useUserData from "~~/hooks/contract-interactions/useUserData";
import useUserFeed from "~~/hooks/contract-interactions/useUserFeed";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const PostItemsList = ({}) => {
  const postItems = useUserFeed();
  const { address, chainId } = useAccount();
  const allowedNetworks = getTargetNetworks();
  const isNetworkAllowed = (chainId: number | undefined) => {
    if (!chainId) return false;
    for (let i = 0; i < allowedNetworks.length; i++) {
      if (allowedNetworks[i].id === chainId) return true;
    }
    return false;
  };
  const [, setUserDataRefresh] = useState(false);
  const userData = useUserData(address);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-[800px]">
        {address ? (
          userData?.userAddress === address ? (
            isNetworkAllowed(chainId) && <PostCreator />
          ) : (
            <UserOnboarding setRefresh={setUserDataRefresh} />
          )
        ) : (
          <WalletOnboarding />
        )}
        <div className="w-full">
          <h1 className="font-bold text-xl">Latest</h1>
          <div className="flex flex-col gap-4 w-full">
            {postItems &&
              [...postItems].reverse().map(postItem => {
                return (
                  <PostItem
                    {...{
                      projectIdx: Number(postItem.metadata.idx),
                      address: postItem.metadata.createdBy.userAddress,
                      accountName: postItem.metadata.createdBy.name,
                      pitch: postItem.data.pitch,
                      assetLinks: postItem.data.assetLinks,
                      likes: Number(postItem.statistics.likeCount),
                      proposals: Number(postItem.statistics.fundingCount),
                      askAmount: Number(postItem.data.askAmount),
                      totalFunded: Number(postItem.statistics.amountFunded),
                      interestRate: Number(postItem.data.interestRate),
                      likers: postItem.likers,
                      funders: postItem.funders,
                    }}
                    key={Number(postItem.metadata.idx)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItemsList;
