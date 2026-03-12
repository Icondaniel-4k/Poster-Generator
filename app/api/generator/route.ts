import { NextResponse } from "next/server"
import { buildPosterPrompt } from "@/lib/prompt"
import { generatePoster } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { candidateName, position, slogan, style, imageDataUrls } = body

    console.log("[v0] API received:", { candidateName, position, slogan, style, imageCount: imageDataUrls?.length })

    if (!candidateName || !position || !slogan || !style || !imageDataUrls || imageDataUrls.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: candidateName, position, slogan, style, and at least one image" },
        { status: 400 }
      )
    }

    const posters: Array<{ id: string; imageUrl: string; style: string; prompt: string }> = []

    // Generate posters for each uploaded image using Replicate
    for (let i = 0; i < imageDataUrls.length; i++) {
      const imageDataUrl = imageDataUrls[i]
      const prompt = buildPosterPrompt(candidateName, position, slogan, style)
      
      console.log(`[v0] Generating poster ${i + 1}/${imageDataUrls.length} with style: ${style}`)

      try {
        const imageUrl = await generatePoster(
          prompt,
          imageDataUrl,
          candidateName,
          position,
          slogan,
          style
        )
        posters.push({
          id: `poster-${i}`,
          imageUrl: imageUrl,
          style: style,
          prompt: prompt,
        })
      } catch (posterError) {
        console.error(`[v0] Error generating poster ${i}:`, posterError)
        // Continue with next image if one fails
        posters.push({
          id: `poster-${i}`,
          imageUrl: '',
          style: style,
          prompt: prompt,
        })
      }
    }

    console.log(`[v0] Successfully generated ${posters.length} posters`)
    return NextResponse.json({ posters })
  } catch (error: any) {
    console.error("[v0] Generator API Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate posters" },
      { status: 500 }
    )
  }
}
