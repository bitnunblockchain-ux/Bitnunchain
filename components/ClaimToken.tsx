"use client";

import { useState } from "react";
import { useActiveAccount, useReadContract, useWriteContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "../thirdweb";

export default function ClaimToken() {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("0");

  // ✅ Correct contract config
  const contract = getContract({
    client, // only pass client here
    chain: polygon, // chain is its own property
    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string,
  });

  const { data: balance } = useReadContract({
    contract,
    method: "function balanceOf(address) view returns (uint256)",
    params: [account?.address || "0x"],
  });

  const { mutateAsync: claim } = useWriteContract({
    contract,
    method: "function claim(address,uint256)",
  });

  const handleClaim = async () => {
    if (!account) return alert("Connect your wallet first!");
    try {
      await claim({ params: [account.address, BigInt(amount)] });
      alert("Claim successful!");
    } catch (err) {
      console.error(err);
      alert("Error claiming tokens");
    }
  };

  return (
    <div className="p-6 rounded-xl shadow bg-white text-black">
      <h2 className="text-xl font-bold mb-4">Claim Tokens</h2>
      <p className="mb-2">
        Balance: {balance ? balance.toString() : "Loading..."}
      </p>
      <input
        type="number"
        className="border p-2 rounded mb-4 w-full text-black"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleClaim}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Claim
      </button>
    </div>
  );
}
