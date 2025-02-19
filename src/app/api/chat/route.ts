import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const runtime = "edge";

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  compatibility: "strict",
});


export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await streamText({
    model: openai("gpt-4o-mini"),
    messages: messages,
    temperature: 1,
  });
  return stream?.toDataStreamResponse();
}





//old versian
// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';

// export const runtime = 'edge';

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: Request) {
//     const { messages } = await req.json();

//     const response = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         stream: true,
//         messages: messages,
//     });

//     const stream = OpenAIStream(response);

//     return new StreamingTextResponse(stream);
// }