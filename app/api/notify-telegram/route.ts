import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const startTime = Date.now()

  try {
    console.log("[v0] ========== TELEGRAM API BAŞLADI ==========")
    console.log("[v0] Zaman:", new Date().toISOString())

    const body = await request.json()
    const { message } = body
    console.log("[v0] Gelen Message Uzunluğu:", message?.length || 0)

    if (!message) {
      console.error("[v0] HATA: Message boş!")
      return NextResponse.json({ success: false, error: "No message provided" }, { status: 400 })
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    console.log("[v0] BOT TOKEN Kontrolü:", botToken ? `✓ (${botToken.substring(0, 20)}...)` : "✗ YOK")
    console.log("[v0] CHAT ID Kontrolü:", chatId ? `✓ (${chatId})` : "✗ YOK")

    if (!botToken) {
      console.error("[v0] KRITIK HATA: TELEGRAM_BOT_TOKEN ortam değişkeni yok!")
      return NextResponse.json({ success: false, error: "TELEGRAM_BOT_TOKEN not configured" }, { status: 500 })
    }

    if (!chatId) {
      console.error("[v0] KRITIK HATA: TELEGRAM_CHAT_ID ortam değişkeni yok!")
      return NextResponse.json({ success: false, error: "TELEGRAM_CHAT_ID not configured" }, { status: 500 })
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    console.log("[v0] API URL:", telegramUrl.substring(0, 40) + "...")

    const requestPayload = {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }
    console.log("[v0] Request Payload:", JSON.stringify(requestPayload))

    const fetchStartTime = Date.now()
    const res = await fetch(telegramUrl, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    })

    const fetchDuration = Date.now() - fetchStartTime
    console.log("[v0] Fetch Süresi:", fetchDuration + "ms")
    console.log("[v0] HTTP Status Code:", res.status)
    console.log("[v0] Content-Type:", res.headers.get("content-type"))

    let data
    try {
      const responseText = await res.text()
      console.log("[v0] Raw Response (ilk 200 char):", responseText.substring(0, 200))

      data = JSON.parse(responseText)
      console.log("[v0] Parsed JSON:", JSON.stringify(data).substring(0, 300))
    } catch (parseErr) {
      console.error("[v0] JSON Parse HATASI:", parseErr)
      return NextResponse.json({ success: false, error: "Invalid response from Telegram API" }, { status: 500 })
    }

    if (!data.ok) {
      console.error("[v0] TELEGRAM API HATASI!")
      console.error("[v0] Error Code:", data.error_code)
      console.error("[v0] Description:", data.description)
      console.error("[v0] Full Response:", data)

      return NextResponse.json(
        {
          success: false,
          error: data.description,
          errorCode: data.error_code,
        },
        { status: 500 },
      )
    }

    const totalTime = Date.now() - startTime
    console.log("[v0] ✅ BAŞARI! Message ID:", data.result.message_id)
    console.log("[v0] Toplam Süre:", totalTime + "ms")
    console.log("[v0] ========== TELEGRAM API TAMAMLANDI ==========\n")

    return NextResponse.json({
      success: true,
      messageId: data.result.message_id,
      chatId: data.result.chat.id,
    })
  } catch (err) {
    const totalTime = Date.now() - startTime
    console.error("[v0] ❌ KRITIK SERVER HATASI!")
    console.error("[v0] Error Tipi:", err instanceof Error ? err.name : typeof err)
    console.error("[v0] Error Mesajı:", err instanceof Error ? err.message : String(err))
    console.error("[v0] Stack:", err instanceof Error ? err.stack : "N/A")
    console.error("[v0] Toplam Süre:", totalTime + "ms")
    console.error("[v0] ========== HATA LOGLANDI ==========\n")

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    )
  }
}
