import { NextResponse } from "next/server"

/**
 * POST /api/notify-whatsapp
 * Body: { message: string }
 * Makes a server-side request to CallMeBot and returns { success: boolean }.
 */
export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ success: false, error: "No message supplied" }, { status: 400 })
    }

    const encoded = encodeURIComponent(message.trim())
    const url = `https://api.callmebot.com/whatsapp.php?phone=966552012122&text=${encoded}&apikey=9044197`

    const res = await fetch(url)

    if (!res.ok) {
      console.error("CallMeBot error:", res.status, res.statusText)
      return NextResponse.json({ success: false }, { status: res.status })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("notify-whatsapp route error:", err)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
