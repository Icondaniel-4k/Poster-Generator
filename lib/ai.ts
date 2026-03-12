// /lib/ai.ts
import { generateText } from 'ai'

export async function generatePoster(prompt: string, imageBase64: string) {
  try {
    const result = await generateText({
      model: 'openai/gpt-4-vision',
      system: 'You are a professional campaign poster designer. Analyze the provided image and describe how to transform it into a professional campaign poster with the given specifications. Provide detailed visual guidance for creating the poster.',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image',
              image: imageBase64,
            },
          ],
        },
      ],
    })

    return result.text
  } catch (error) {
    console.error('[v0] Error generating poster:', error)
    throw new Error('Failed to generate poster. Please try again.')
  }
}
