import { 
    createDataStreamResponse,
    // streamText // دیگر لازم نیست
  } from 'ai';
  import { ChatOpenAI } from '@langchain/openai';
  import { PromptTemplate } from '@langchain/core/prompts';
  import { HttpResponseOutputParser } from 'langchain/output_parsers';
  
  export const dynamic = 'force-dynamic';
  
  export async function POST(req: Request) {
    try {
      const { messages } = await req.json();
      const message = messages.at(-1)?.content;
  
      const prompt = PromptTemplate.fromTemplate("{message}");
      const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
      });
      const parser = new HttpResponseOutputParser();
  
      // این زنجیره در نهایت استریمی از بایت برمی‌گرداند
      const chain = prompt.pipe(model).pipe(parser);
      const chainStream = await chain.stream({ message });
  
      // چون باینری داریم، دیگر تبدیلش به متن لازم نیست
      // مستقیماً آن را به ریسپانس داده‌ای تبدیل می‌کنیم
      return createDataStreamResponse(chainStream as any);
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
      return Response.json({ error: String(error) }, { status: 500 });
    }
  }
  




// import {
//     StreamingTextResponse,
//     createStreamDataTransformer
// } from 'ai';
// import { ChatOpenAI } from '@langchain/openai';
// import { PromptTemplate } from '@langchain/core/prompts';
// import { HttpResponseOutputParser } from 'langchain/output_parsers';

// export const dynamic = 'force-dynamic'

// export async function POST(req: Request) {
//     try {
//         // Extract the `messages` from the body of the request
//         const { messages } = await req.json();
//         const message = messages.at(-1).content;

//         const prompt = PromptTemplate.fromTemplate("{message}");

//         const model = new ChatOpenAI({
//             apiKey: process.env.OPENAI_API_KEY!,
//             model: 'gpt-3.5-turbo',
//             temperature: 0.8,
//         });

//         /**
//        * Chat models stream message chunks rather than bytes, so this
//        * output parser handles serialization and encoding.
//        */
//         const parser = new HttpResponseOutputParser();

//         const chain = prompt.pipe(model).pipe(parser);

//         // Convert the response into a friendly text-stream
//         const stream = await chain.stream({ message });

//         //const decoder = new TextDecoder()

//         // Each chunk has the same interface as a chat message
//         // for await (const chunk of stream) {
//         //     //console.log(chunk?.content);
//         //     if (chunk) {
//         //         console.log(decoder.decode(chunk))
//         //     }
//         // }

//         // Respond with the stream
//         return new StreamingTextResponse(
//             stream.pipeThrough(createStreamDataTransformer()),
//         );
//     } catch (e: any) {
//         return Response.json({ error: e.message }, { status: e.status ?? 500 });
//     }
// }






// AISDKError: [Getter],
// APICallError: [Getter],
// AssistantResponse: [Getter],
// DownloadError: [Getter],
// EmptyResponseBodyError: [Getter],
// InvalidArgumentError: [Getter],
// InvalidDataContentError: [Getter],
// InvalidMessageRoleError: [Getter],
// InvalidPromptError: [Getter],
// InvalidResponseDataError: [Getter],
// InvalidToolArgumentsError: [Getter],
// JSONParseError: [Getter],
// LangChainAdapter: [Getter],
// LlamaIndexAdapter: [Getter],
// LoadAPIKeyError: [Getter],
// MessageConversionError: [Getter],
// NoContentGeneratedError: [Getter],
// NoImageGeneratedError: [Getter],
// NoObjectGeneratedError: [Getter],
// NoOutputSpecifiedError: [Getter],
// NoSuchModelError: [Getter],
// NoSuchProviderError: [Getter],
// NoSuchToolError: [Getter],
// Output: [Getter],
// RetryError: [Getter],
// StreamData: [Getter],
// ToolCallRepairError: [Getter],
// ToolExecutionError: [Getter],
// TypeValidationError: [Getter],
// UnsupportedFunctionalityError: [Getter],
// appendClientMessage: [Getter],
// appendResponseMessages: [Getter],
// convertToCoreMessages: [Getter],
// coreAssistantMessageSchema: [Getter],
// coreMessageSchema: [Getter],
// coreSystemMessageSchema: [Getter],
// coreToolMessageSchema: [Getter],
// coreUserMessageSchema: [Getter],
// cosineSimilarity: [Getter],
// createDataStream: [Getter],
// createDataStreamResponse: [Getter],
// createIdGenerator: [Getter],
// customProvider: [Getter],
// embed: [Getter],
// embedMany: [Getter],
// experimental_createProviderRegistry: [Getter],
// experimental_customProvider: [Getter],
// experimental_generateImage: [Getter],
// experimental_wrapLanguageModel: [Getter],
// extractReasoningMiddleware: [Getter],
// formatAssistantStreamPart: [Getter],
// formatDataStreamPart: [Getter],
// generateId: [Getter],
// generateObject: [Getter],
// generateText: [Getter],
// jsonSchema: [Getter],
// parseAssistantStreamPart: [Getter],
// parseDataStreamPart: [Getter],
// pipeDataStreamToResponse: [Getter],
// processDataStream: [Getter],
// processTextStream: [Getter],
// simulateReadableStream: [Getter],
// smoothStream: [Getter],
// streamObject: [Getter],
// streamText: [Getter],
// tool: [Getter],
// wrapLanguageModel: [Getter],
// zodSchema: [Getter]
