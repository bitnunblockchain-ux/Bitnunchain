import { useState } from "react";
import { useActiveAccount, useReadContract, useSendTransaction } from "@thirdweb-dev/react";
import { getContract, prepareContractCall } from "@thirdweb-dev/sdk";
import { polygon } from "@thirdweb-dev/chains";

// Directly use your token contract address
const TOKEN_ADDRESS = "0x89b0bf7cc5e4361D9dcfbD6a897437E416af4aa0";

export default function ClaimToken() {
  const account = useActiveAccount();

  // Connect to the token contract
  const contract = getContract({
    chain: polygon,
    address: TOKEN_ADDRESS,
  });

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
      params: [account.address, 1000n], // amount to claim
    });
    sendTransaction(tx);
  };

  return (
    <div>
      <p>Balance: {balance?.toString() || 0}</p>
      <button onClick={claim} disabled={isLoading || !account}>
        {isLoading ? "Claiming..." : "Claim Tokens"}
      </button>
    </div>
  );
}
