import ClaimToken from "../components/ClaimToken";
import MintNFT from "../components/MintNFT";
import WalletConnect from "../components/WalletConnect";

export default function Home() {
  return (
    <div>
      <h1>Bitnun - NFT & Token Dashboard</h1>
      <WalletConnect />
      <ClaimToken />
      <MintNFT />
    </div>
  );
}
