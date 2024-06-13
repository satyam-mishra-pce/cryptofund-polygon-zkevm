"use client";

import { useScaffoldReadContract } from "../scaffold-eth";

// import { Abi } from "abitype";
// import { useReadContract } from "wagmi";
// import externalContracts from "~~/contracts/externalContracts";

const useUserProjects = (address: string | undefined) => {
  // if (!(chainId in externalContracts)) return undefined;
  // let abi: Abi;
  // try {
  //   //@ts-ignore
  //   abi = externalContracts[chainId]["CRYPTOFUND"].abi as Abi;
  // } catch (error) {
  //   return undefined;
  // }

  // const { data } = useReadContract({
  //   address: "0xC0F012f7d60098D14bFC6A84D130c42a0975f40D",
  //   abi,
  //   functionName: "getUserData",
  //   args: [address],
  // });

  const { data } = useScaffoldReadContract({
    contractName: "CRYPTOFUND",
    functionName: "getUserCampaigns",
    args: [address],
  });

  if (!address) return undefined;
  return data;
};

export default useUserProjects;
