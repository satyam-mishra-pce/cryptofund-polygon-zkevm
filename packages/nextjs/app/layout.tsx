import Sidebar from "./components/Sidebar/index";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import "~~/styles/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

const title = "Home";
const titleTemplate = "%s | CryptoFund";
const description = "Empower your campaigns with secure, transparent blockchain listing.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScaffoldEthAppWithProviders>
      <div className="flex flex-1 w-full flex-row max-w-[1200px] items-start gap-2 p-4">
        <Sidebar />
        <main className="flex flex-col flex-1 gap-10">
          {/* <Header /> */}
          {children}
        </main>
      </div>
    </ScaffoldEthAppWithProviders>
  );
};

export default ScaffoldEthApp;
