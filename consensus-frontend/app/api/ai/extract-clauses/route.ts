import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { contractText } = await req.json();
    
    if (!contractText) {
      return NextResponse.json({ error: "Contract text required" }, { status: 400 });
    }

    // Mock clause extraction (in production, use OpenAI with structured output)
    const clauses = [
      {
        type: "Payment Terms",
        content: "Client shall pay Provider within thirty (30) days of invoice date. Late payments subject to 1.5% monthly interest.",
        source: "Section 4.2, Lines 45-47",
        importance: "Critical"
      },
      {
        type: "Termination",
        content: "Either party may terminate this Agreement with thirty (30) days written notice. Immediate termination allowed for material breach.",
        source: "Section 8.1, Lines 102-104",
        importance: "High"
      },
      {
        type: "Liability Cap",
        content: "Provider's total liability shall not exceed fees paid in the twelve (12) months preceding the claim.",
        source: "Section 7.4, Lines 89-91",
        importance: "High"
      },
      {
        type: "Confidentiality",
        content: "All proprietary information disclosed under this Agreement shall remain confidential for five (5) years post-termination.",
        source: "Section 6.1, Lines 72-74",
        importance: "Critical"
      },
      {
        type: "Governing Law",
        content: "This Agreement shall be governed by the laws of Delaware, excluding conflict of law provisions.",
        source: "Section 11.3, Lines 145-146",
        importance: "Medium"
      },
      {
        type: "Indemnification",
        content: "Each party shall indemnify the other against third-party claims arising from breach of representations or negligence.",
        source: "Section 7.3, Lines 85-88",
        importance: "High"
      }
    ];

    // Production OpenAI example:
    /*
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Extract and structure important clauses from contracts. Always cite source location."
          },
          {
            role: "user",
            content: `Extract key clauses (payment, termination, liability, confidentiality, governing law, indemnification) from:\n\n${contractText}`
          }
        ]
      })
    });
    */

    return NextResponse.json({ success: true, clauses });
  } catch (error) {
    console.error("Clause extraction error:", error);
    return NextResponse.json({ error: "Failed to extract clauses" }, { status: 500 });
  }
}
