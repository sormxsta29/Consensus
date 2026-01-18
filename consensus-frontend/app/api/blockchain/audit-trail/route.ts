import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const contractId = searchParams.get("contractId");
    
    if (!contractId) {
      return NextResponse.json({ error: "Contract ID required" }, { status: 400 });
    }

    // Mock audit trail
    const mockAuditTrail = [
      {
        eventType: "created",
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        actorName: "Alice (Legal)",
        timestamp: Date.now() - 86400000 * 5, // 5 days ago
        versionHash: "0xabc123...",
        details: "Initial version created",
        blockNumber: 5234567,
        transactionHash: "0x" + Math.random().toString(16).substring(2, 66)
      },
      {
        eventType: "modified",
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        actorName: "Alice (Legal)",
        timestamp: Date.now() - 86400000 * 4, // 4 days ago
        versionHash: "0xdef456...",
        details: "Updated payment terms",
        blockNumber: 5245678,
        transactionHash: "0x" + Math.random().toString(16).substring(2, 66)
      },
      {
        eventType: "approved",
        actor: "0x853e46Dd7747D1643C1784dC553e8d96Aa1fCde",
        actorName: "Bob (Reviewer)",
        timestamp: Date.now() - 86400000 * 3, // 3 days ago
        versionHash: "0xdef456...",
        details: "Approved by Reviewer",
        blockNumber: 5256789,
        transactionHash: "0x" + Math.random().toString(16).substring(2, 66)
      },
      {
        eventType: "approved",
        actor: "0x964f57Ee8758E2674D623F975E9a97Bb2gDfEf",
        actorName: "Charlie (Approver)",
        timestamp: Date.now() - 86400000 * 2, // 2 days ago
        versionHash: "0xdef456...",
        details: "Approved by Approver",
        blockNumber: 5267890,
        transactionHash: "0x" + Math.random().toString(16).substring(2, 66)
      },
      {
        eventType: "finalized",
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        actorName: "Alice (Legal)",
        timestamp: Date.now() - 86400000, // 1 day ago
        versionHash: "0xdef456...",
        details: "Version finalized",
        blockNumber: 5278901,
        transactionHash: "0x" + Math.random().toString(16).substring(2, 66)
      }
    ];

    // Production: Call smart contract getAuditTrail()
    /*
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const events = await contract.getAuditTrail(contractId);
    
    const formattedEvents = events.map(e => ({
      eventType: e.eventType,
      actor: e.actor,
      timestamp: e.timestamp.toNumber() * 1000,
      versionHash: e.versionHash,
      details: e.details,
      blockNumber: e.blockNumber
    }));
    */

    return NextResponse.json({
      success: true,
      contractId,
      auditTrail: mockAuditTrail,
      totalEvents: mockAuditTrail.length
    });
  } catch (error) {
    console.error("Get audit trail error:", error);
    return NextResponse.json({ error: "Failed to retrieve audit trail" }, { status: 500 });
  }
}
