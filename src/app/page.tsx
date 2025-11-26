'use client';

import { Canvas } from '@react-three/fiber';
import { Experience } from '@/components/Scene/Experience';
import { SearchProvider } from '@/lib/store';
import { SearchBar } from '@/components/UI/SearchBar';
import { Butler } from '@/components/UI/Butler';
import { Reader } from '@/components/UI/Reader';
import { Settings } from '@/components/UI/Settings';

export default function Home() {
  return (
    <SearchProvider>
      <main className="w-full h-full relative">
        <div id="canvas-container">
          <Canvas
            shadows
            camera={{
              position: [0, 2, 5],
              fov: 45,
              near: 0.1,
              far: 100,
            }}
          >
            <Experience />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <div className="p-8">
            <h1 className="text-2xl font-serif text-white/80 tracking-widest">SEARCH MANOR</h1>
          </div>

          <SearchBar />
          <Butler />
          <Reader />
          <Settings />
        </div>
      </main>
    </SearchProvider>
  );
}
