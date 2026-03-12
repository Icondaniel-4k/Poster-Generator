// /lib/ai.ts
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function generatePoster(
  prompt: string,
  imageBase64: string,
  candidateName: string,
  position: string,
  slogan: string,
  style: string
) {
  try {
    console.log('[v0] Generating professional campaign poster with design elements')
    
    // Create a detailed poster generation prompt that includes the candidate image
    // Using a more explicit prompt structure for better results
    const designPrompt = `Create a professional campaign poster with the following specifications:

CANDIDATE IMAGE: Include the candidate photo prominently on the right side of the poster

DESIGN LAYOUT:
- Left side: Bold design elements with geometric shapes, diagonal lines, and color accents
- Right side: Candidate's portrait photo
- Top: Large "VOTE" text with a checkmark symbol in white/light color
- Center-Left: Candidate name "${candidateName}" in very large, bold letters (minimum 40pt equivalent)
- Below name: Position "${position}" in clear, medium-sized text
- Bottom: Campaign slogan "${slogan}" as a powerful tagline
- Bottom-Right corner: Election date or "Coming Soon"

DESIGN STYLE: ${style}
- Use professional color palette with high contrast
- Implement dynamic geometric shapes and lines
- Ensure all text is highly readable and stands out
- Professional typography suitable for printing and social media

QUALITY REQUIREMENTS:
- High resolution (poster-quality 1080x1350 or similar dimensions)
- Professional appearance suitable for campaign materials
- Attention-grabbing design that draws focus to the candidate
- Balanced composition with candidate image and design elements

The candidate image provided should be integrated as the main focal point. Create a complete, finished campaign poster.`

    console.log('[v0] Sending request to Replicate for poster generation')
    
    // Convert base64 to data URL if not already
    const imageDataUrl = imageBase64.startsWith('data:') 
      ? imageBase64 
      : `data:image/png;base64,${imageBase64}`

    // Use FLUX Schnell for faster generation of complex designs, or FLUX Pro for higher quality
    const output = await replicate.run(
      'black-forest-labs/flux-pro',
      {
        input: {
          prompt: designPrompt,
          image: imageDataUrl,
          guidance: 4.0, // Increased guidance for better adherence to prompt
          num_inference_steps: 30,
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
