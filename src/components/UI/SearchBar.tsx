'use client';

import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useSearchStore } from '@/lib/store';

export const SearchBar = () => {
    const [input, setInput] = useState('');
    const { search } = useSearch();
    const { isSearching } = useSearchStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            search(input);
        }
    };

    return (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-xl z-20 pointer-events-auto">
            <form onSubmit={handleSubmit} className="relative group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What knowledge do you seek?"
                    disabled={isSearching}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-full outline-none focus:border-white/50 transition-all font-serif text-lg placeholder-white/30 shadow-2xl"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {isSearching ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white/50 border-t-transparent rounded-full" />
                    ) : (
                        <span className="text-white/50 text-sm">↵</span>
                    )}
                </div>
            </form>
        </div>
    );
};
