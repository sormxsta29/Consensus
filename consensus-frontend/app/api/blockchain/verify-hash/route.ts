import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { hash } = await req.json();
    
    if (!hash) {
      return NextResponse.json({ error: "Hash required" }, { status: 400 });
    }

    // Mock verification response
    const exists = Math.random() > 0.3; // 70% chance of existing
    
    if (exists) {
      return NextResponse.json({
        success: true,
        verified: true,
        contractId: "C-" + Math.floor(Math.random() * 9000 + 1000),
        timestamp: Date.now() - Math.floor(Math.random() * 86400000 * 30), // Up to 30 days ago
        blockNumber: Math.floor(Math.random() * 1000000) + 5000000,
        message: "Hash verified on blockchain"
      });
    } else {
      return NextResponse.json({
        success: true,
        verified: false,
        message: "Hash not found on blockchain"
      });
    }

    // Production: Call smart contract verifyHash()
    /*
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const result = await contract.verifyHash(hash);
    
    return NextResponse.json({
      success: true,
      verified: result.exists,
      contractId: result.contractId,
      timestamp: result.timestamp.toNumber() * 1000,
      blockNumber: await provider.getBlockNumber()
    });
    */
  } catch (error) {
    console.error("Verify hash error:", error);
    return NextResponse.json({ error: "Failed to verify hash" }, { status: 500 });
  }
}
