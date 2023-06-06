import { OpenAIStream } from '../src/services/openai'

export const config = {
  runtime: 'edge'
}

const system = `Only respond with code as plain text without code block syntax around it.
The OGT image format is in text. It is built by lines, with hexadecimal colors, separated with semicolons, ending each line with a double semicolon. For example, a 3x2 image:

OGT;v0.6;3;2;;
#ffffff;#00ffff;#ffffff;;
#ffffff;#ffff00;#ffffff;;

If the user does not specify a size, the default size is 8x8.
Generates code as plain text from user prompt.`

export default async (request, context) => {
  const url = new URL(request.url)

  const prompt = url.searchParams.get('prompt')

  const payload = {
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ]
  }

  const stream = await OpenAIStream(payload)

  return new Response(stream)
}
