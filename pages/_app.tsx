import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { polygon } from "@thirdweb-dev/chains";
import { createThirdwebClient } from "@thirdweb-dev/sdk";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider client={client} activeChain={polygon}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
