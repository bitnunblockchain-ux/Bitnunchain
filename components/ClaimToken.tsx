import { useActiveAccount, useReadContract, useSendTransaction } from "@thirdweb-dev/react";
import { getContract, prepareContractCall } from "@thirdweb-dev/sdk";
import { polygon } from "@thirdweb-dev/chains";
import { useState } from "react";

const TOKEN_ADDRESS = "0x89b0bf7cc5e4361D9dcfbD6a897437E416af4aa0"; // Bitnun Token

const contract = getContract({
  address: TOKEN_ADDRESS,
  chain: polygon,
});

export default function ClaimToken() {
  const account = useActiveAccount();
  const { data: balance } = useReadContract({
    contract,
    method: "balanceOf",
    params: [account?.address || ""],
  });

  const { mutate: sendTransaction, isLoading } = useSendTransaction();
  const [txStatus, setTxStatus] = useState<string>("");

  const claim = () => {
    if (!account) return;
    const tx = prepareContractCall({
      contract,
      method: "claim",
      params: [account.address, 1000n], // adjust token amount
    });
    sendTransaction(tx, {
      onSuccess: () => setTxStatus("Claim successful!"),
      onError: () => setTxStatus("Claim failed!"),
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p>Token Balance: {balance?.toString() || 0}</p>
      <button
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        onClick={claim}
        disabled={isLoading || !account}
      >
        {isLoading ? "Claiming..." : "Claim Bitnun Tokens"}
      </button>
      {txStatus && <p>{txStatus}</p>}
    </div>
  );
}
