// /lib/ai.ts
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function generatePoster(prompt: string, imageBase64: string) {
  try {
    console.log('[v0] Generating poster with Replicate using FLUX model')
    
    // Convert base64 to data URL if not already
    const imageDataUrl = imageBase64.startsWith('data:') 
      ? imageBase64 
      : `data:image/png;base64,${imageBase64}`

    // Use FLUX model with the image as reference
    const output = await replicate.run(
      'black-forest-labs/flux-pro',
      {
        input: {
          prompt: prompt,
          image: imageDataUrl,
          guidance: 3.5,
          num_inference_steps: 25,
        },
      }
    )

    console.log('[v0] Poster generation successful')
    
    // Output is typically an array with image URLs
    const imageUrl = Array.isArray(output) ? output[0] : output
    return imageUrl as string
  } catch (error) {
    console.error('[v0] Error generating poster:', error)
    throw new Error('Failed to generate poster. Please try again.')
  }
}
