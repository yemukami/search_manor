'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BookData = {
    id: string;
    title: string;
    url: string;
    summary: string;
    color: string;
};

type SearchContextType = {
    query: string;
    setQuery: (q: string) => void;
    results: BookData[];
    setResults: (results: BookData[]) => void;
    isSearching: boolean;
    setIsSearching: (is: boolean) => void;
    selectedBook: BookData | null;
    setSelectedBook: (book: BookData | null) => void;
    butlerMessage: string;
    setButlerMessage: (msg: string) => void;
    apiKeys: { openai: string; bing: string };
    setApiKeys: (keys: { openai: string; bing: string }) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookData[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
    const [butlerMessage, setButlerMessage] = useState('ようこそ、知識の館へ。本日はどのようなことをお調べでしょうか？');
    const [apiKeys, setApiKeys] = useState({ openai: '', bing: '' });

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                results,
                setResults,
                isSearching,
                setIsSearching,
                selectedBook,
                setSelectedBook,
                butlerMessage,
                setButlerMessage,
                apiKeys,
                setApiKeys,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchStore = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchStore must be used within a SearchProvider');
    }
    return context;
};
