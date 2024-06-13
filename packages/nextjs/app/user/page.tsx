"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "~~/components/ui/button";
import useUserData from "~~/hooks/contract-interactions/useUserData";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const Page = () => {
  const { address, chainId } = useAccount();
  const allowedNetworks = getTargetNetworks();
  const isNetworkAllowed = (chainId: number | undefined) => {
    if (!chainId) return false;
    for (let i = 0; i < allowedNetworks.length; i++) {
      if (allowedNetworks[i].id === chainId) return true;
    }
    return false;
  };

  const userData: any = useUserData(address);
  const nickname = userData?.name ? (userData.name === "" ? "New User" : userData.name) : "New User";
  const [nicknameVal, setNicknameVal] = useState(nickname);
  useEffect(() => {
    setNicknameVal(nickname);
  }, [nickname]);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const bio = userData?.bio ? userData.bio : "";
  const [bioVal, setBioVal] = useState(bio ? bio : "");
  useEffect(() => {
    setBioVal(bio);
  }, [bio]);

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("CRYPTOFUND");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {address && chainId && isNetworkAllowed(chainId) ? (
        <div className="flex flex-col w-2/3 gap-4">
          <div className="flex flex-row gap-2">
            <img
              className="rounded-full w-24 h-24"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3YHpBO6H4AAzdPVkor5syi5Tl8eUgkAcUA8akut98g&s"
              alt="Error"
            />
            <div className="flex flex-col">
              <div className="flex items-center px-4">
                <div className="font-semibold text-4xl outline-none bg-transparent h-14 flex gap-4 p-1">
                  <input
                    onChange={evt => setNicknameVal(evt.target.value)}
                    value={nicknameVal}
                    className="border-none h-16 outline-none bg-transparent"
                    placeholder="New User"
                    style={{ width: `${nicknameVal.length + 1}ch` }}
                    ref={nicknameInputRef}
                  />
                  <button
                    className=" text-lg text-muted-foreground hover:text-foreground self-end"
                    onClick={() => nicknameInputRef.current?.focus()}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
              </div>
              <div className="flex justify-between px-6 items-center h-4 gap-2 mt-1">
                <span className="text-muted-foreground text-sm">{address}</span>
                <Button size={"sm"}>
                  <i className="fa-regular fa-copy"></i>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start w-full gap-2">
            <span className="font-semibold text-lg">Bio</span>
            <textarea
              className="p-2 rounded-lg resize-none text-lg border border-b-border "
              rows={4}
              placeholder="Enter your bio"
              value={bioVal}
              onChange={evt => setBioVal(evt.target.value)}
            />
            <div className="flex w-full justify-end">
              <Button
                onClick={async () => {
                  try {
                    await writeYourContractAsync({
                      functionName: "updateUser",
                      args: [nicknameVal, bioVal],
                      // value: parseEther("0.1"),
                    });
                  } catch (e) {
                    console.error("Error saving the changes:", e);
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
