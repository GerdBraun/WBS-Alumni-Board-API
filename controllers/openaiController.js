import OpenAI from 'openai';
import OpenAIMock from '../utils/OpenAIMock.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const createChat = asyncWrapper(async (req, res) => {
  const {
    body: { stream, ...request },
    headers: { mode }
  } = req;

  let openai;

  mode === 'production'
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());

  const completion = await openai.chat.completions.create({
    stream,
    ...request
  });

  if (stream) {
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream'
    });
    for await (const chunk of completion) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
    res.on('close', () => res.end());
  } else {
    res.json(completion.choices[0]);
  }
});
