import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { contractText } = await req.json();
    
    if (!contractText) {
      return NextResponse.json({ error: "Contract text required" }, { status: 400 });
    }

    // Mock risk detection (production: use AI to analyze unusual/risky patterns)
    const risks = [
      {
        severity: "High",
        category: "Liability",
        finding: "Unlimited indemnification obligation without cap or exclusions",
        explanation: "The indemnification clause in Section 7.3 does not limit liability amount or exclude certain claim types. This creates unlimited financial exposure for indemnifying party.",
        source: "Section 7.3, Lines 85-88",
        recommendation: "Add cap tied to contract value and exclude IP infringement claims",
        confidence: 0.92
      },
      {
        severity: "Medium",
        category: "Termination",
        finding: "Automatic renewal without opt-out notice requirement",
        explanation: "Section 8.2 includes auto-renewal clause but doesn't require provider to send renewal notice 60-90 days before renewal date, making it easy to miss termination window.",
        source: "Section 8.2, Lines 106-108",
        recommendation: "Add requirement for provider to send renewal notice 90 days prior",
        confidence: 0.88
      },
      {
        severity: "High",
        category: "Missing Clause",
        finding: "No data protection or privacy provisions",
        explanation: "Contract lacks clauses addressing data handling, GDPR/CCPA compliance, breach notification, or data retention. Critical for any agreement involving personal data.",
        source: "N/A - Missing from entire contract",
        recommendation: "Add comprehensive data protection schedule or reference DPA",
        confidence: 0.95
      },
      {
        severity: "Low",
        category: "Payment",
        finding: "Late payment interest rate may exceed state usury limits",
        explanation: "1.5% monthly interest (18% APR) specified in Section 4.2 may violate usury laws in some jurisdictions where caps are lower (e.g., 10-12% in some states).",
        source: "Section 4.2, Line 47",
        recommendation: "Cap interest at 'lesser of 1.5% monthly or maximum allowed by law'",
        confidence: 0.78
      },
      {
        severity: "Medium",
        category: "Dispute Resolution",
        finding: "Exclusive jurisdiction clause may limit remedies",
        explanation: "Section 11.4 mandates Delaware courts only, preventing parties from seeking injunctive relief in other jurisdictions where assets/operations exist.",
        source: "Section 11.4, Lines 148-150",
        recommendation: "Allow for injunctive relief in any competent jurisdiction",
        confidence: 0.85
      }
    ];

    return NextResponse.json({ success: true, risks });
  } catch (error) {
    console.error("Risk detection error:", error);
    return NextResponse.json({ error: "Failed to detect risks" }, { status: 500 });
  }
}
