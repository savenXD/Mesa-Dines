import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp, businessName, city, interests } = body;

    // Validate fields
    if (!name || !whatsapp || !businessName || !city) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("GOOGLE_SHEET_WEBHOOK_URL environment variable is not defined. Simulating successful local save.");
      // In local dev without env config, simulate success to allow testing
      return NextResponse.json({ status: 'success', message: 'Demo success (No webhook URL configured)' });
    }

    // Forward payload to Google Sheets webhook script
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        whatsapp,
        businessName,
        city,
        interests: interests || [],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Sheet Webhook returned error status ${response.status}:`, errorText);
      return NextResponse.json(
        { status: 'error', message: 'Failed to write lead to Google Sheets' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
