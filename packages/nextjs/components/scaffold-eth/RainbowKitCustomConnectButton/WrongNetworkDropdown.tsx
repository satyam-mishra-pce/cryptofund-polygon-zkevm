import { DropDownButton } from "./DropdownButton";
import { NetworkOptions } from "./NetworkOptions";
import { useDisconnect } from "wagmi";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="w-full relative">
        <div className={`w-full rounded-xl p-2 bg-destructive/10 flex items-center justify-between gap-2`}>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="p-2 px-4 shrink-0 text-xl text-destructive">
                <i className="fa-regular fa-triangle-exclamation"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">The connected network is not supported currently.</span>
              </div>
            </div>
            <hr className="mt-3 mb-2" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">Switch to supported networks.</span>
              <div className="mt-2 mb-1">
                <NetworkOptions className="bg-background hover:bg-background-2" />
                <DropDownButton className="bg-background hover:bg-background-2" onClick={() => disconnect()}>
                  <i className="w-4 fa-regular fa-xmark text-destructive"></i>
                  <span className="whitespace-nowrap ml-2">Disconnect</span>
                </DropDownButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant={"destructiveTertiary"} size={"sm"} className="rounded-full px-2">
    //       <i className="fa-regular fa-circle-exclamation"></i>
    //       <span className="ml-1 mr-1">Wrong Network</span>
    //       <i className="fa-regular fa-chevron-down text-2xs"></i>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <NetworkOptions />
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem onClick={() => disconnect()} variant="destructive">
    //       <i className="w-4 fa-regular fa-xmark"></i>
    //       <span className="whitespace-nowrap ml-2">Disconnect</span>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};
