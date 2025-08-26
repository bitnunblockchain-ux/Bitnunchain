import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { client, CHAIN, TOKEN_ADDRESS } from "../thirdweb";

const tokenContract = getContract({
  client,
  chain: CHAIN,
  address: TOKEN_ADDRESS,
});

export default function ClaimToken() {
  const account = useActiveAccount();

  const { data: balance } = useReadContract({
    contract: tokenContract,
    method: "balanceOf",
    params: [account?.address || ""],
  });

  const { mutate: sendTransaction, isLoading } = useSendTransaction();

  const claim = () => {
    if (!account) return;
    const tx = prepareContractCall({
      contract: tokenContract,
      method: "claim",
      params: [account.address, 1000n], // ✅ adjust claimable amount
    });
    sendTransaction(tx);
  };

  return (
    <div>
      <p>Balance: {balance?.toString()}</p>
      <button
        onClick={claim}
        disabled={isLoading || !account}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        {isLoading ? "Claiming..." : "Claim Bitnun Tokens"}
      </button>
    </div>
  );
}
