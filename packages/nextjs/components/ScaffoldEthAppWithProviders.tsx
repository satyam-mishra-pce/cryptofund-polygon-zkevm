"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { Toaster } from "./ui/toaster";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import useTheme, { ThemeProvider } from "~~/contexts/ThemeContext";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return <>{children}</>;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const dmSans = localFont({
  src: [
    {
      path: "assets/fonts/DMSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "assets/fonts/DMSans-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "assets/fonts/DMSans-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--dm-sans",
});

export const Web3Providers = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <html suppressHydrationWarning className={isDarkMode ? "dark" : ""}>
      <body style={{ "--font-dm": dmSans.style.fontFamily } as React.CSSProperties}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ProgressBar />
            <RainbowKitProvider
              avatar={BlockieAvatar}
              theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
              data-superparent=""
            >
              <ScaffoldEthApp>{children}</ScaffoldEthApp>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <Toaster />
      </body>
    </html>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Web3Providers>{children}</Web3Providers>
    </ThemeProvider>
  );
};
