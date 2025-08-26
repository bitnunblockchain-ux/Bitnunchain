import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { polygon } from "thirdweb/chains";

const NFT_CONTRACT = "0x81d05436CB7D571954407F2B7775c8D9Ab45d70D"; // <-- Must be a string

export default function MintNFT() {
  const account = useActiveAccount();
  const contract = getContract({
    address: NFT_CONTRACT,
    chain: polygon,
  });

  const { mutate: sendTx, isLoading, isSuccess } = useSendTransaction();

  const handleMint = () => {
    if (!account) return;
    sendTx(
      claimTo({
        contract,
        to: account.address,
        quantity: 1n,
      })
    );
  };

  return (
    <div>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={handleMint}
        disabled={isLoading || !account}
      >
        {isLoading ? "Minting..." : "Mint NFT"}
      </button>
      {isSuccess && <p className="text-green-600 mt-2">NFT minted!</p>}
    </div>
  );
}
