import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { activity, visas, shareholders, officeSpace, name, email, phone, nationality } = body;

    if (!activity || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Activity, name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Forward to n8n webhook if configured
    const webhookUrl = process.env.N8N_CALCULATOR_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cost_calculator",
          activity,
          visas,
          shareholders,
          officeSpace,
          name,
          email,
          phone,
          nationality,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Quote request received. We'll send you a detailed breakdown shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
