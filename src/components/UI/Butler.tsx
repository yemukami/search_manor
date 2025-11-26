'use client';

import { useSearchStore } from '@/lib/store';
import { useEffect } from 'react';

export const Butler = () => {
    const { butlerMessage, selectedBook, setButlerMessage } = useSearchStore();

    useEffect(() => {
        if (selectedBook) {
            setButlerMessage(`Ah, "${selectedBook.title}". An excellent choice.`);
        }
    }, [selectedBook, setButlerMessage]);

    return (
        <div className="absolute bottom-0 right-0 p-8 flex items-end space-x-4 pointer-events-none z-20">
            {/* Speech Bubble */}
            <div className="bg-white/90 text-black p-6 rounded-2xl rounded-br-none max-w-md shadow-lg mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="font-serif italic text-lg leading-relaxed">"{butlerMessage}"</p>
            </div>

            {/* Avatar */}
            <div className="w-32 h-40 bg-gray-900 rounded-t-full border-2 border-[#2a1b0e] shadow-2xl relative overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/butler_portrait.png"
                    alt="Butler"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                    <span className="text-[#e0d0b0] text-xs tracking-[0.2em] font-serif uppercase">Butler</span>
                </div>
            </div>
        </div>
    );
};
