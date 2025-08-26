import { useState } from "react";
import { useMetamask, useDisconnect, useWallet } from "@thirdweb-dev/react";

export default function WalletConnect() {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const wallet = useWallet();

  const isConnected = !!wallet?.address;

  return (
    <div className="wallet-connect">
      {isConnected ? (
        <div>
          <p>Connected Wallet: {wallet.address}</p>
          <button
            onClick={() => disconnectWallet()}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => connectWithMetamask()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
