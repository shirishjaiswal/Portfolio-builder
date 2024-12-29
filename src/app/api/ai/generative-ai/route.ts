import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { inputText, history, responseType } = await req.json();

    generationConfig.responseMimeType = responseType;

    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    const result = await chatSession.sendMessage(inputText);
    
    const responseText = result.response.text();

    const response = NextResponse.json({ data: responseText }, { status: 200 });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: 'Error generating AI response' },
      { status: 500 }
    );
  }
}


