"use client";

import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc20";
import { polygon } from "thirdweb/chains";

export default function ClaimToken() {
  const account = useActiveAccount();
  const { mutate: sendTx, isPending, isSuccess, error } = useSendTransaction();

  const handleClaim = async () => {
    if (!account) return;

    try {
      // Connect to your deployed contract
      const contract = getContract({
        client: { chain: polygon }, // client is already provided by ThirdwebProvider
        address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string,
      });

      const tx = claimTo({
        contract,
        to: account.address,
        quantity: "10", // number of tokens to claim
      });

      sendTx(tx);
    } catch (err) {
      console.error("Claim failed:", err);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">Claim BTN Tokens</h2>
      <button
        onClick={handleClaim}
        disabled={!account || isPending}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isPending ? "Claiming..." : "Claim 10 BTN"}
      </button>
      {isSuccess && <p className="text-green-600 mt-2">✅ Tokens claimed!</p>}
      {error && <p className="text-red-600 mt-2">❌ Error: {error.message}</p>}
    </div>
  );
}
