"use client";

import { useScaffoldReadContract } from "../scaffold-eth";

const useUserData = (address: string | undefined) => {
  const { data } = useScaffoldReadContract({
    contractName: "CRYPTOFUND",
    functionName: "getUserData",
    args: [address],
  });

  return data;
};

export default useUserData;
