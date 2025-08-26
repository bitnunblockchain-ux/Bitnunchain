import type { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";
import "../styles/globals.css";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider client={client} activeChain={polygon}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
