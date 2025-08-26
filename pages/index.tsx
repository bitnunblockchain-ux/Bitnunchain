import type { NextPage } from "next";
import WalletConnect from "../components/WalletConnect";
import ClaimToken from "../components/ClaimToken";
import MintNFT from "../components/MintNFT";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { polygon } from "thirdweb/chains";

const TOKEN_ADDRESS = "0x89b0bf7cc5e4361D9dcfbD6a897437E416af4aa0"; // Bitnun Token
const NFT_DROP_ADDRESS = "0x81d05436CB7D571954407F2B7775c8D9Ab45d70D"; // Bitnun NFT Drop

const Home: NextPage = () => {
  return (
    <ThirdwebProvider desiredChainId={polygon.chainId}>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-10 p-4">
        <h1 className="text-3xl font-bold mb-4">Bitnun Dashboard</h1>

        {/* Wallet Connect */}
        <WalletConnect />

        {/* Claim Bitnun Tokens */}
        <ClaimToken tokenAddress={TOKEN_ADDRESS} />

        {/* Mint Bitnun NF*
