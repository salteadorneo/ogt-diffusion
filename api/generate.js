import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const system = `Only respond with code as plain text without code block syntax around it.
The OGT image format is in text. It is built by lines, with hexadecimal colors, separated with semicolons, ending each line with a double semicolon. For example, a 3x2 image:

OGT;v0.6;3;2;;
#ffffff;#00ffff;#ffffff;;
#ffffff;#ffff00;#ffffff;;

If the user does not specify a size, the default size is 8x8.
Generates code as plain text from user prompt.`

const DEFAULT_MESSAGE = 'Error generating image.'

export default async function handler (req, res) {
  const { prompt } = req.query

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ]
  })

  const content = response?.data?.choices?.[0]?.message?.content.trim() || DEFAULT_MESSAGE

  res.status(200).json({ content })
}
