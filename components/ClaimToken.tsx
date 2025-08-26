import { useState } from "react";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "../thirdweb";

const contract = getContract({
  client,
  chain: polygon,
  address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string, // ✅ make sure set in Vercel
});

export default function ClaimToken() {
  const account = useActiveAccount();
  const { data: balance } = useReadContract({
    contract,
    method: "balanceOf",
    params: [account?.address || ""],
  });

  const { mutate: sendTransaction, isLoading } = useSendTransaction();

  const claim = () => {
    if (!account) return;
    const tx = prepareContractCall({
      contract,
      method: "claim",
      params: [account.address, 1000n], // adjust amount
    });
    sendTransaction(tx);
  };

  return (
    <div>
      <p>Balance: {balance?.toString()}</p>
      <button onClick={claim} disabled={isLoading || !account}>
        {isLoading ? "Claiming..." : "Claim Tokens"}
      </button>
    </div>
  );
}
