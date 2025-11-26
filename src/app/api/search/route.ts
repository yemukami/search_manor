import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const apiKey = searchParams.get('apiKey');

    if (!q || !apiKey) {
        return NextResponse.json({ error: 'Missing query or API Key' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(q)}&count=8&responseFilter=Webpages`,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': apiKey,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Bing API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform to BookData format
        const books = data.webPages.value.map((item: any, index: number) => ({
            id: item.id || `bing-${index}`,
            title: item.name,
            url: item.url,
            summary: item.snippet,
            color: ['#8B4513', '#556B2F', '#191970', '#483D8B', '#800000', '#2F4F4F'][Math.floor(Math.random() * 6)]
        }));

        return NextResponse.json({ books });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
