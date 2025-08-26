import { useActiveAccount, useNFTDrop } from "@thirdweb-dev/react";
import { useState } from "react";

const NFT_DROP_ADDRESS = "0x81d05436CB7D571954407F2B7775c8D9Ab45d70D"; // Bitnun NFT Drop

export default function MintNFT() {
  const account = useActiveAccount();
  const nftDrop = useNFTDrop(NFT_DROP_ADDRESS);
  const [minting, setMinting] = useState(false);
  const [status, setStatus] = useState("");

  const mint = async () => {
    if (!account || !nftDrop) return;
    setMinting(true);
    setStatus("");
    try {
      await nftDrop.claimTo(account.address, 1); // mint 1 NFT
      setStatus("NFT Minted Successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Minting Failed!");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        onClick={mint}
        disabled={minting || !account}
      >
        {minting ? "Minting..." : "Mint Bitnun NFT"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
