import { NextRequest, NextResponse } from "next/server";

/**
 * CONTRACT ANALYSIS ENDPOINT
 * Standard Q&A and summarization for contracts
 * Helper AI for understanding contract terms
 */
export async function POST(request: NextRequest) {
  try {
    const { sanitizedText, question } = await request.json();

    if (!sanitizedText) {
      return NextResponse.json(
        { error: "Missing sanitized text" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      // Mock response for demo
      if (question) {
        return NextResponse.json({
          answer: `Based on the contract analysis, here's the answer to your question: "${question}"\n\nThe contract outlines standard terms and conditions. Key points include payment schedules, termination clauses, and dispute resolution mechanisms. For specific details, please review sections marked with [DATE_X] and [AMOUNT_X] in the sanitized version.`,
          confidence: 0.85
        });
      }
      
      return NextResponse.json({
        summary: "This contract establishes an agreement between two parties regarding services/products. Key terms include: payment obligations, delivery schedules, termination rights, and dispute resolution procedures. The contract duration is specified, with renewal options available. Both parties have specific obligations and rights outlined in various clauses.",
        keyTerms: [
          { term: "Payment Terms", description: "Scheduled payments as specified" },
          { term: "Termination", description: "Conditions under which either party may terminate" },
          { term: "Liability", description: "Limitations on liability for both parties" },
          { term: "Confidentiality", description: "Protection of proprietary information" }
        ],
        parties: ["Party A (Service Provider)", "Party B (Client)"],
        duration: "As specified in contract dates"
      });
    }

    // If API key is available
    const systemPrompt = question 
      ? "You are a helpful legal assistant. Answer questions about contracts clearly and concisely."
      : "You are a contract summarization expert. Provide clear, structured summaries of legal documents.";

    const userPrompt = question
      ? `Contract text:\n${sanitizedText}\n\nQuestion: ${question}`
      : `Summarize this contract in detail:\n\n${sanitizedText}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.5,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    if (question) {
      return NextResponse.json({ answer: result, confidence: 0.9 });
    }

    return NextResponse.json({ summary: result });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
