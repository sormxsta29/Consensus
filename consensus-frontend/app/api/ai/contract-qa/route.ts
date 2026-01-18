import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { contractText, question } = await req.json();
    
    if (!contractText || !question) {
      return NextResponse.json({ error: "Contract text and question required" }, { status: 400 });
    }

    // Mock Q&A response (production: use RAG with source citations)
    const mockAnswers: Record<string, any> = {
      "payment": {
        answer: "Payment is due within thirty (30) days from the invoice date. Late payments are subject to interest at a rate of 1.5% per month.",
        sources: [
          { text: "Client shall pay Provider within thirty (30) days of invoice date.", location: "Section 4.2, Line 45" },
          { text: "Late payments subject to 1.5% monthly interest.", location: "Section 4.2, Line 47" }
        ],
        confidence: 0.95
      },
      "termination": {
        answer: "Either party may terminate this Agreement by providing thirty (30) days written notice. Immediate termination is allowed in case of material breach by the other party.",
        sources: [
          { text: "Either party may terminate this Agreement with thirty (30) days written notice.", location: "Section 8.1, Line 102" },
          { text: "Immediate termination allowed for material breach.", location: "Section 8.1, Line 104" }
        ],
        confidence: 0.97
      }
    };

    // Determine which mock answer to use based on question keywords
    let response = {
      answer: "I cannot find specific information about that in the contract. Please rephrase your question or ask about payment terms, termination, liability, or confidentiality provisions.",
      sources: [],
      confidence: 0.0
    };

    const questionLower = question.toLowerCase();
    if (questionLower.includes("payment") || questionLower.includes("pay") || questionLower.includes("invoice")) {
      response = mockAnswers.payment;
    } else if (questionLower.includes("terminat") || questionLower.includes("cancel") || questionLower.includes("end")) {
      response = mockAnswers.termination;
    }

    // Production OpenAI RAG example:
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
            content: "You are a contract analysis assistant. Answer questions based ONLY on the provided contract text. Always cite specific sections and line numbers. If the answer isn't in the contract, say so clearly."
          },
          {
            role: "user",
            content: `Contract:\n${contractText}\n\nQuestion: ${question}\n\nProvide answer with exact quotes and source citations.`
          }
        ],
        temperature: 0.2
      })
    });
    */

    return NextResponse.json({ success: true, ...response });
  } catch (error) {
    console.error("Q&A error:", error);
    return NextResponse.json({ error: "Failed to answer question" }, { status: 500 });
  }
}
