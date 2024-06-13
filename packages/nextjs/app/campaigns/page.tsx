"use client";

import PostItem from "../components/Post/PostItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Button } from "~~/components/ui/button";
import useProject from "~~/hooks/contract-interactions/useProjectByIdx";
import useUserProjects from "~~/hooks/contract-interactions/useUserProjects";

const ProjectLoader = ({ idx }: { idx: number }) => {
  const postItem = useProject(idx);
  return (
    <>
      {postItem && (
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
      )}
    </>
  );
};

const Page = ({}) => {
  const { address } = useAccount();
  const myProjectsIdxs = useUserProjects(address);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full max-w-[800px] gap-4">
        {address ? (
          myProjectsIdxs ? (
            myProjectsIdxs.length === 0 ? (
              <>
                <div className="bg-background border border-border rounded-xl p-4">You do not have any campaigns.</div>
              </>
            ) : (
              myProjectsIdxs.map(projectIdx => {
                return <ProjectLoader idx={Number(projectIdx)} key={projectIdx} />;
              })
            )
          ) : (
            <>
              <div className="bg-background border border-border rounded-xl p-4">Loading...</div>
            </>
          )
        ) : (
          <>
            <div className="bg-background border border-border rounded-xl p-4 flex items-center justify-between">
              <span>Please connect your wallet.</span>
              <ConnectButton.Custom>
                {({ openConnectModal }) => {
                  return (
                    <Button onClick={openConnectModal}>
                      <i className="fa-regular fa-wallet mr-2"></i>Connect
                    </Button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
