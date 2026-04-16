//C:\Users\Shanon\al-rajjak-1\app\api\send-email\route.ts



import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    console.log("API KEY CHECK:", process.env.BREVO_API_KEY ? "Found" : "Not Found");
  try {
    const body = await req.json();
    const { name, email, item, message, shopName } = body;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY as string,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: shopName || "LemonsKN AI", email: "shanonkhan47@gmail.com" },
        to: [{ email: "shanonkhan47@gmail.com" }], // আপনার নিজের ইমেইল
        subject: `New Lead from ${shopName}: ${name}`,
        textContent: `Customer Details:\nName: ${name}\nEmail: ${email}\nFurniture: ${item}\nMessage: ${message}`
      })
    });

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: errorData }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}