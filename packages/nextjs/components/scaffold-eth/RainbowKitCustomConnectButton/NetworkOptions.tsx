import { DropDownButton } from "./DropdownButton";
import { useAccount } from "wagmi";
import { useSwitchChain } from "wagmi";
import useTheme from "~~/contexts/ThemeContext";
import { getNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

export const NetworkOptions = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { switchChain } = useSwitchChain();
  const { chain } = useAccount();

  return (
    <>
      {allowedNetworks
        .filter(allowedNetwork => allowedNetwork.id !== chain?.id)
        .map(allowedNetwork => (
          <DropDownButton
            {...props}
            key={allowedNetwork.id}
            onClick={() => {
              switchChain?.({ chainId: allowedNetwork.id });
            }}
          >
            <span className="ml-2">
              <span
                style={{
                  color: getNetworkColor(allowedNetwork, isDarkMode),
                }}
              >
                {allowedNetwork.name}
              </span>
            </span>
          </DropDownButton>
        ))}
    </>
  );
};
