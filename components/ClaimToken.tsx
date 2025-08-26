import { useSendTransaction, useActiveAccount, useThirdwebClient } from "thirdweb/react";
import { getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc20";
import { polygon } from "thirdweb/chains";

const TOKEN_CONTRACT = "0x89b0bf7cc5e4361D9dcfbD6a897437E416af4aa0";

export default function ClaimToken() {
  const account = useActiveAccount();
  const client = useThirdwebClient(); // get the client from provider
  const contract = getContract({
    client,
    address: TOKEN_CONTRACT,
    chain: polygon,
  });

  const { mutate: sendTx, isLoading, isSuccess } = useSendTransaction();

  const handleClaim = () => {
    if (!account) return;
    sendTx(
      claimTo({
        contract,
        to: account.address,
        amount: 10n, // adjust as needed
      }),
    );
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleClaim}
        disabled={isLoading || !account}
      >
        {isLoading ? "Claiming..." : "Claim 10 BTN"}
      </button>
      {isSuccess && <p className="text-green-600 mt-2">Tokens claimed!</p>}
    </div>
  );
}
