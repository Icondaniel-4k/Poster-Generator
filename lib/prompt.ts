// /lib/prompt.ts
export function buildPosterPrompt(
  name: string,
  position: string,
  slogan: string,
  style: string
) {
  const styleDescriptions = {
    modern: 'Contemporary and clean with bold typography, minimalist design, strategic use of whitespace, and modern color palette',
    community: 'Warm and inclusive with community imagery, diverse representation, vibrant colors, and approachable design',
    bold: 'High-contrast and dynamic with powerful imagery, strong geometric elements, striking typography, and maximum visual impact',
    professional: 'Elegant and sophisticated with executive imagery, balanced composition, refined typography, and premium feel',
  }

  const styleDesc = styleDescriptions[style as keyof typeof styleDescriptions] || styleDescriptions.modern

  return `You are a professional campaign poster designer. Create an enhanced campaign poster using the provided image.

CANDIDATE INFORMATION:
- Name: ${name}
- Position: ${position}
- Slogan: "${slogan}"

DESIGN REQUIREMENTS:
- Use the provided image as the primary visual element
- Overlay candidate name prominently at the top or center
- Display position running for in clear, readable text
- Feature the campaign slogan as a powerful tagline
- Apply the ${style} design style: ${styleDesc}
- Ensure excellent text contrast and readability
- Add professional typography and layout
- Make it suitable for social media and print distribution
- Keep the candidate image as the focal point
- Maintain high quality and professional appearance

Create a compelling, shareable campaign poster that combines the image with all text elements effectively.`
}
