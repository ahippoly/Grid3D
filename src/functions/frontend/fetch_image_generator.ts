
export const fetchImageGenerator = async (prompt: string): Promise<{imageDescription: string, imageUrl: string}> => {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    }),
  })

  if (!response.ok) {
    throw new Error('Error generating image')
  }

  const data = await response.json()
  console.log('🚀 ~ fetchImageGenerator ~ data:', data)
  return {
    imageDescription: data?.data?.[0]?.revised_prompt || '',
    imageUrl: data?.data?.[0]?.url || '',
  }
}
