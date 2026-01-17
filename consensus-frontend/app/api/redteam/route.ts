import { NextRequest, NextResponse } from "next/server";

/**
 * RED TEAM AI ENDPOINT
 * Analyzes sanitized contract text for vulnerabilities
 * Uses aggressive prompting to find worst-case scenarios
 */
export async function POST(request: NextRequest) {
  try {
    const { sanitizedText } = await request.json();

    if (!sanitizedText) {
      return NextResponse.json(
        { error: "Missing sanitized text" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return mock response for demo purposes
      return NextResponse.json({
        vulnerabilities: [
          {
            severity: "HIGH",
            category: "Termination Clause",
            description: "Unilateral termination rights favor one party heavily. No notice period specified.",
            worstCase: "Party A could terminate without cause, leaving Party B with no recourse or compensation.",
            recommendation: "Add 30-day notice period and mutual termination rights with cause."
          },
          {
            severity: "MEDIUM",
            category: "Payment Terms",
            description: "Payment schedule lacks penalty clauses for late payment.",
            worstCase: "Indefinite delays in payment without consequences could occur.",
            recommendation: "Include late payment interest (e.g., 1.5% monthly) and escalation procedures."
          },
          {
            severity: "LOW",
            category: "Dispute Resolution",
            description: "Arbitration clause does not specify jurisdiction or governing law.",
            worstCase: "Legal disputes could be costly and drawn out across multiple jurisdictions.",
            recommendation: "Specify arbitration location, governing law, and arbitrator selection process."
          }
        ],
        riskScore: 67,
        summary: "This contract contains several high-risk clauses that heavily favor one party. Termination rights are asymmetric, payment terms lack enforcement mechanisms, and dispute resolution is ambiguous.",
        recommendation: "NEGOTIATE before signing. Request legal review and push for balanced amendments."
      });
    }

    // If API key is available, use OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a RED TEAM legal analyst. Your job is to aggressively find vulnerabilities, loopholes, and worst-case scenarios in contracts. Be paranoid and adversarial. 
            
Output JSON with:
- vulnerabilities: array of {severity: "HIGH"|"MEDIUM"|"LOW", category: string, description: string, worstCase: string, recommendation: string}
- riskScore: number 0-100
- summary: string
- recommendation: string (overall advice)`
          },
          {
            role: "user",
            content: `Analyze this sanitized contract and find ALL vulnerabilities:\n\n${sanitizedText}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Red Team analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
