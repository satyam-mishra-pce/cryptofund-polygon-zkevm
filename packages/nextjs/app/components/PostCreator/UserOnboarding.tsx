"use client";

import { useState } from "react";
import halo from "./assets/halo.svg";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import { useToast } from "~~/components/ui/use-toast";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type UserOnboardingProps = {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserOnboarding = ({ setRefresh }: UserOnboardingProps) => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isProcessing, setProcessing] = useState(false);
  const { toast } = useToast();

  const { writeContractAsync: createUserAsync } = useScaffoldWriteContract("CRYPTOFUND");

  return (
    <div className="w-full relative mb-8">
      <div className="border border-border rounded-xl p-4 bg-background relative z-20 overflow-hidden">
        <div className="">
          <img src={halo.src} className="w-full absolute -top-8 left-0 right-0 z-10" />
          <h1 className="font-bold text-xl relative z-20">Seems like you are a new user...</h1>
          <div className="w-full relative z-20">
            This is the final step of your onboarding. Let&apos;s create your account on-chain...
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              <span className="font-bold">Display Name</span>
              <Input placeholder="John Doe" value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
            </div>
            <span className="font-bold">
              Bio <span className="text-muted-foreground text-sm">(Optional)</span>
            </span>
            <textarea
              className="w-full border border-border resize-none rounded-xl mb-2"
              value={bio}
              onChange={evt => setBio(evt.target.value)}
            />
          </div>
          <div className="flex w-full justify-end mt-2">
            <Button
              variant={"secondary"}
              disabled={displayName.length < 2 || isProcessing}
              onClick={async () => {
                setProcessing(true);
                if (displayName.length < 2) {
                  toast({
                    title: "Error",
                    description: "Display Name should be at least 2 characters long.",
                  });
                  return;
                }

                try {
                  toast({
                    title: "Creating account",
                    description: "Your account is being created.",
                  });
                  await createUserAsync({
                    functionName: "createUser",
                    args: [displayName, bio],
                  });
                  setRefresh(prev => !prev);
                  toast({
                    title: "Account created",
                    description:
                      "Your account was created succesfully. Refresh the dApp or please wait while it updates.",
                  });
                  setProcessing(false);
                } catch (e) {
                  console.error("Error creating account:", e);
                  toast({
                    title: "Error",
                    description: "There was an error creating your account.",
                  });
                  setProcessing(false);
                }
              }}
            >
              {isProcessing ? (
                <i className="fa-regular fa-spinner-third animate-spin mr-2"></i>
              ) : (
                <i className="fa-regular fa-wallet mr-2"></i>
              )}
              Finish Onboarding
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
