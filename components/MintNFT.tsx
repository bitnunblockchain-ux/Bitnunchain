import { useActiveAccount, useMintNFT } from "@thirdweb-dev/react";
import { getContract } from "@thirdweb-dev/sdk";
import { polygon } from "@thirdweb-dev/chains";

// Directly use your NFT Drop contract address
const NFT_ADDRESS = "0x81d05436CB7D571954407F2B7775c8D9Ab45d70D";

export default function MintNFT() {
  const account = useActiveAccount();

  const contract = getContract({
    chain: polygon,
    address: NFT_ADDRESS,
  });

  const { mutate: mintNFT, isLoading } = useMintNFT(contract);

  const mint = () => {
    if (!account) return;
    mintNFT({
      to: account.address,
      quantity: 1,
    });
  };

  return (
    <div>
      <button onClick={mint} disabled={isLoading || !account}>
        {isLoading ? "Minting..." : "Mint NFT"}
      </button>
    </div>
  );
}
