import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { contractText } = await req.json();
    
    if (!contractText) {
      return NextResponse.json({ error: "Contract text required" }, { status: 400 });
    }

    // Mock AI summarization (in production, call OpenAI API)
    const summary = {
      overview: "This contract establishes a service agreement between two parties with specified terms and conditions.",
      keyTerms: [
        { term: "Service Duration", value: "12 months from effective date", source: "Section 2.1" },
        { term: "Payment Terms", value: "Net 30 days from invoice date", source: "Section 4.2" },
        { term: "Termination Notice", value: "30 days written notice required", source: "Section 8.1" }
      ],
      obligations: [
        { party: "Provider", obligation: "Deliver services as specified in SOW", source: "Section 3.1" },
        { party: "Client", obligation: "Pay invoices within 30 days", source: "Section 4.2" },
        { party: "Both", obligation: "Maintain confidentiality of proprietary information", source: "Section 6.1" }
      ],
      risks: [
        { level: "Medium", description: "Broad indemnification clause may expose significant liability", source: "Section 7.3" },
        { level: "Low", description: "Auto-renewal clause requires attention to termination timeline", source: "Section 8.2" }
      ]
    };

    // For production OpenAI integration:
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
            content: "You are a legal AI assistant. Analyze contracts and provide structured summaries with source references."
          },
          {
            role: "user",
            content: `Summarize this contract and identify key terms, obligations, and risks. For each item, cite the specific section or clause:\n\n${contractText}`
          }
        ],
        temperature: 0.3
      })
    });
    */

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Summarization error:", error);
    return NextResponse.json({ error: "Failed to summarize contract" }, { status: 500 });
  }
}
