import { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { chains } from "../thirdweb";
import "../globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={chains[0]} clientId="51c2be1752db390a6fbbc44ed69ebdfc">
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

