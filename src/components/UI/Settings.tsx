'use client';

import { useState, useEffect } from 'react';
import { useSearchStore } from '@/lib/store';

export const Settings = () => {
    const { apiKeys, setApiKeys } = useSearchStore();
    const [isOpen, setIsOpen] = useState(false);
    const [localKeys, setLocalKeys] = useState({ openai: '', bing: '' });

    // Load from localStorage on mount
    useEffect(() => {
        const savedOpenAI = localStorage.getItem('hondana_openai_key') || '';
        const savedBing = localStorage.getItem('hondana_bing_key') || '';
        setLocalKeys({ openai: savedOpenAI, bing: savedBing });
        setApiKeys({ openai: savedOpenAI, bing: savedBing });
    }, [setApiKeys]);

    const handleSave = () => {
        localStorage.setItem('hondana_openai_key', localKeys.openai);
        localStorage.setItem('hondana_bing_key', localKeys.bing);
        setApiKeys(localKeys);
        setIsOpen(false);
    };

    return (
        <>
            {/* Gear Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors p-2 pointer-events-auto"
                title="Settings"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </button>

            {/* Panel */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={() => setIsOpen(false)}>
                    <div
                        className="bg-[#1a1a1a] border border-white/10 p-8 rounded-xl w-full max-w-md shadow-2xl animate-in slide-in-from-top-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-serif text-[#e0d0b0] mb-6">Settings</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">OpenAI API Key</label>
                                <input
                                    type="password"
                                    value={localKeys.openai}
                                    onChange={(e) => setLocalKeys({ ...localKeys, openai: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-[#e0d0b0] outline-none transition-colors"
                                    placeholder="sk-..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Bing Search API Key</label>
                                <input
                                    type="password"
                                    value={localKeys.bing}
                                    onChange={(e) => setLocalKeys({ ...localKeys, bing: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-[#e0d0b0] outline-none transition-colors"
                                    placeholder="Enter your Bing API Key"
                                />
                                <p className="text-xs text-white/30 mt-2">
                                    Required for real search results. Without this, mock data is used.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-[#e0d0b0] text-black font-bold rounded hover:bg-white transition-colors"
                            >
                                Save Configuration
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
