import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "", // keep in Vercel
});

// 🟢 Hardcoded Bitnun contracts
export const TOKEN_ADDRESS = "0x89b0bf7cc5e4361D9dcfbD6a897437E416af4aa0"; // Bitnun ERC20 Token
export const NFT_ADDRESS   = "0x81d05436CB7D571954407F2B7775c8D9Ab45d70D"; // Bitnun NFT Drop
export const CHAIN = polygon;
