'use client';

import { useSearchStore } from '@/lib/store';

export const Reader = () => {
    const { selectedBook, setSelectedBook } = useSearchStore();

    if (!selectedBook) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-500 pointer-events-auto" onClick={() => setSelectedBook(null)}>
            <div
                className="bg-[#f5e6d3] text-[#2a1b0e] w-full max-w-4xl h-[80vh] rounded-lg shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-90 slide-in-from-bottom-10 duration-500 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-[#2a1b0e]/20 flex justify-between items-center bg-[#e8dcc5]">
                    <h2 className="text-2xl font-serif font-bold truncate pr-4">{selectedBook.title}</h2>
                    <button
                        onClick={() => setSelectedBook(null)}
                        className="text-[#2a1b0e]/60 hover:text-[#2a1b0e] transition-colors font-serif px-4 py-2 border border-[#2a1b0e]/20 rounded hover:bg-[#2a1b0e]/5"
                    >
                        Close Book
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 overflow-y-auto font-serif leading-relaxed text-lg">
                    <p className="mb-6 text-xl italic opacity-80 border-l-4 border-[#2a1b0e]/40 pl-4">{selectedBook.summary}</p>

                    <div className="prose prose-stone max-w-none">
                        <p>
                            (This is a Proof of Concept. In the full version, this reader would display the actual content from the source URL: <a href={selectedBook.url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline decoration-dotted hover:decoration-solid">{selectedBook.url}</a>)
                        </p>
                        <hr className="border-[#2a1b0e]/20 my-8" />
                        <h3 className="text-xl font-bold mb-4">Chapter I: The Beginning</h3>
                        <p className="mb-4">
                            It was a dark and stormy night; the rain fell in torrents—except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets (for it is in London that our scene lies), rattling along the housetops, and fiercely agitating the scanty flame of the lamps that struggled against the darkness.
                        </p>
                        <p className="mb-4">
                            Through this obscure state of things, the search for knowledge continued. The user, seated at their digital desk, sought answers from the vast repository of the web, now visualized as a grand library of infinite depth.
                        </p>
                        <p>
                            The Butler stood by, ever vigilant, ready to serve the next query with wit and precision.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
