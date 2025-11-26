import { useSearchStore, BookData } from '@/lib/store';

const MOCK_BOOKS: BookData[] = [
    { id: '1', title: 'ウェブの歴史', url: 'https://example.com/1', summary: 'インターネットの起源から現代までを網羅した一冊。', color: '#8B4513' },
    { id: '2', title: 'R3F ガイド', url: 'https://example.com/2', summary: 'React Three Fiberによる3D表現の完全ガイド。', color: '#556B2F' },
    { id: '3', title: 'Next.js 14 パターン', url: 'https://example.com/3', summary: 'App Router時代の最新アーキテクチャ設計論。', color: '#191970' },
    { id: '4', title: 'Dark Academia 美学', url: 'https://example.com/4', summary: '知的生活を彩る様式美について。', color: '#483D8B' },
    { id: '5', title: 'AIエージェントの未来', url: 'https://example.com/5', summary: '自律型AIがもたらす社会変革のシナリオ。', color: '#800000' },
];

export const useSearch = () => {
    const { setResults, setIsSearching, setQuery, setButlerMessage, apiKeys } = useSearchStore();

    const search = async (q: string) => {
        setQuery(q);
        setIsSearching(true);
        setResults([]); // Clear previous
        setButlerMessage(`「${q}」ですね... 少々お待ちください。書庫を確認してまいります。`);

        // Simulate "Thinking" / "Walking to archives"
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if we have API Keys
        if (apiKeys.bing) {
            try {
                // Real Search
                const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&apiKey=${apiKeys.bing}`);
                if (!res.ok) throw new Error('Search failed');
                const data = await res.json();

                setResults(data.books);
                setIsSearching(false);

                // Real Butler Comment
                if (apiKeys.openai) {
                    setButlerMessage("資料が見つかりました。内容を確認しております...");
                    const context = data.books.map((b: BookData) => `${b.title}: ${b.summary}`).join('\n');

                    const butlerRes = await fetch('/api/butler', {
                        method: 'POST',
                        body: JSON.stringify({ prompt: q, context, apiKey: apiKeys.openai }),
                    });

                    if (butlerRes.ok) {
                        const reader = butlerRes.body?.getReader();
                        const decoder = new TextDecoder();
                        let done = false;
                        let text = '';

                        if (reader) {
                            while (!done) {
                                const { value, done: doneReading } = await reader.read();
                                done = doneReading;
                                const chunkValue = decoder.decode(value);
                                text += chunkValue;
                                // Stream update if desired, but for now let's set at end or chunks
                                setButlerMessage(text);
                            }
                        }
                    }
                } else {
                    setButlerMessage(`お待たせいたしました。「${q}」に関する文献を${data.books.length}冊ほど選び出しました。`);
                }

            } catch (e) {
                console.error(e);
                setButlerMessage("申し訳ございません。外部書庫への接続に失敗しました。");
                setIsSearching(false);
            }
            return;
        }

        // --- MOCK FALLBACK ---
        setButlerMessage("ふむ... 興味深い資料がいくつか見つかりそうです。");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, we would fetch from Bing here.
        // For PoC, we generate some variations based on query or just return static mock.

        const generatedResults: BookData[] = Array.from({ length: 8 }).map((_, i) => {
            const base = MOCK_BOOKS[i % MOCK_BOOKS.length];
            return {
                ...base,
                id: `${Date.now()}-${i}`,
                title: i === 0 ? `「${q}」の真実` : `${base.title} (第${i + 1}巻)`,
                summary: i === 0 ? `あなたが探している「${q}」に関する核心的な情報が記されています。` : base.summary,
                color: ['#8B4513', '#556B2F', '#191970', '#483D8B', '#800000', '#2F4F4F'][Math.floor(Math.random() * 6)]
            };
        });

        setResults(generatedResults);
        setIsSearching(false);
        setButlerMessage(`お待たせいたしました。「${q}」に関する文献を${generatedResults.length}冊ほど選び出しました。特に左端の一冊は興味深いかと。`);
    };

    return { search };
};
