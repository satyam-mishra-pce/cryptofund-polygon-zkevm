import { useTargetNetwork } from "./useTargetNetwork";
import useTheme from "~~/contexts/ThemeContext";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

export const DEFAULT_NETWORK_COLOR: [string, string] = ["#666666", "#bbbbbb"];

export function getNetworkColor(network: ChainWithAttributes, isDarkMode: boolean) {
  const colorConfig = network.color ?? DEFAULT_NETWORK_COLOR;
  return Array.isArray(colorConfig) ? (isDarkMode ? colorConfig[1] : colorConfig[0]) : colorConfig;
}

/**
 * Gets the color of the target network
 */
export const useNetworkColor = () => {
  const { targetNetwork } = useTargetNetwork();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return getNetworkColor(targetNetwork, isDarkMode);
};
