import { openai, createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { prompt, context, apiKey } = await req.json();

    if (!apiKey) {
        return new Response('Missing OpenAI API Key', { status: 400 });
    }

    const client = createOpenAI({
        apiKey: apiKey,
    });

    const result = streamText({
        model: client('gpt-4o'),
        system: `あなたは「Dark Academia」風の館に仕える、知的で少し皮肉屋な老執事です。
    主人は知識を求めて検索を行っています。
    あなたは主人を「旦那様」または「お嬢様」と呼びます（文脈で判断、または中立的に）。
    口調は丁寧ですが、ウィットに富み、少し古風な言い回しを好みます。
    回答は簡潔に（100文字以内）。`,
        prompt: `ユーザーの検索ワード: "${prompt}". \n\n検索結果/コンテキスト: ${context}. \n\nこれに対する執事としてのコメントを述べてください。`,
    });

    return result.toTextStreamResponse();
}
