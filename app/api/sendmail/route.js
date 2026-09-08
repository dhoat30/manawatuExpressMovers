
import { NextResponse } from 'next/server'

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const RECIPIENT = process.env.EMAIL_ADDRESS;
const FROM_EMAIL =
  process.env.MAILGUN_FROM_EMAIL || (DOMAIN ? `website@${DOMAIN}` : "");
const FROM_NAME =
  process.env.MAILGUN_FROM_NAME || "Manawatū Express Movers";

export async function GET(req, res) {
  const response = await res.json();

  return NextResponse.json(response)
}

export async function POST(req, res) {
  const { email, message, formName } = await req.json();
  const replyTo = typeof email === "string" ? email.trim() : "";

  if (!DOMAIN || !API_KEY || !RECIPIENT || !FROM_EMAIL) {
    return NextResponse.json(
      { message: "Email service is not configured", success: false },
      { status: 500 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    return NextResponse.json(
      { message: "A valid reply email is required", success: false },
      { status: 400 }
    );
  }

  // Mailgun API endpoint
  const url = `https://api.mailgun.net/v3/${DOMAIN}/messages`;
  // Prepare the form data as URL encoded
  const formData = new URLSearchParams();
  formData.append("from", `${FROM_NAME} <${FROM_EMAIL}>`);
  formData.append("h:Reply-To", replyTo);
  formData.append("to", RECIPIENT);
  formData.append("subject", formName || "New website enquiry");
  formData.append("text", String(message || ""));


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json({ message: "Failed", success: false, data: data }, {status: response.status});

    }

    // Use NextApiResponse type for auto-completion and proper response typing

    return NextResponse.json({ message: "This Worked", success: true, data: data },{ status: 200});

  } catch (error) {
    console.error(error);
    const err = await error.json();
    return NextResponse.json({ message: err, success: false }, {status: 400});
  }
};
