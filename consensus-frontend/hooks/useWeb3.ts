"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

/**
 * useWeb3 Hook
 * Handles wallet connection, contract interactions, and blockchain state
 */
export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const network = await provider.getNetwork();
          setAccount(accounts[0].address);
          setProvider(provider);
          setSigner(signer);
          setChainId(Number(network.chainId));
        }
      } catch (err: any) {
        console.error("Check connection error:", err);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("MetaMask not installed. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      setAccount(address);
      setProvider(provider);
      setSigner(signer);
      setChainId(Number(network.chainId));
    } catch (err: any) {
      console.error("Connect wallet error:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  const switchToPolygonAmoy = async () => {
    if (!(window as any).ethereum) return;

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13882" }], // Polygon Amoy Testnet
      });
    } catch (switchError: any) {
      // Chain not added, try adding it
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13882",
                chainName: "Polygon Amoy Testnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-amoy.polygon.technology/"],
                blockExplorerUrls: ["https://amoy.polygonscan.com/"],
              },
            ],
          });
        } catch (addError: any) {
          setError("Failed to add Polygon Amoy network");
        }
      }
    }
  };

  // Register contract on blockchain
  const registerContract = async (
    contractId: string,
    documentHash: string,
    signerAddresses: string[]
  ) => {
    if (!signer || !provider) {
      throw new Error("Wallet not connected");
    }

    // This would use your deployed Registry contract
    // For now, returning mock transaction
    const tx = {
      hash: "0x" + Math.random().toString(16).substr(2, 64),
      wait: async () => ({ status: 1 }),
    };

    return tx;
  };

  // Create escrow contract
  const createEscrow = async (
    amount: string,
    milestones: string[],
    beneficiary: string
  ) => {
    if (!signer || !provider) {
      throw new Error("Wallet not connected");
    }

    // Mock escrow deployment
    const tx = {
      hash: "0x" + Math.random().toString(16).substr(2, 64),
      wait: async () => ({ 
        status: 1,
        contractAddress: "0x" + Math.random().toString(16).substr(2, 40)
      }),
    };

    return tx;
  };

  return {
    account,
    provider,
    signer,
    chainId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchToPolygonAmoy,
    registerContract,
    createEscrow,
    isConnected: !!account,
  };
}
