"use client";
import { useState } from 'react';

export default function MapView() {
  const [viewMode, setViewMode] = useState<'map' | 'analytics' | 'mainVideo'>('map');

  return (
    <div className="relative flex-1 flex flex-col">
      <div className="p-2 flex space-x-2 bg-black/50">
        <button
          onClick={() => setViewMode('map')}
          className={`px-2 py-1 rounded ${viewMode === 'map' ? 'bg-cyan-500 text-black' : 'bg-gray-700'}`}>
          Map
        </button>
        <button
          onClick={() => setViewMode('analytics')}
          className={`px-2 py-1 rounded ${viewMode === 'analytics' ? 'bg-cyan-500 text-black' : 'bg-gray-700'}`}>
          Analytics
        </button>
        <button
          onClick={() => setViewMode('mainVideo')}
          className={`px-2 py-1 rounded ${viewMode === 'mainVideo' ? 'bg-cyan-500 text-black' : 'bg-gray-700'}`}>
          Main Video
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center text-gray-300">
        {viewMode === 'map' && <div>[MAIN VIEW: MAP PLACEHOLDER]</div>}
        {viewMode === 'analytics' && <div>[MAIN VIEW: ANALYTICAL GRAPH PLACEHOLDER]</div>}
        {viewMode === 'mainVideo' && <div>[MAIN VIEW: PRIMARY VIDEO FEED PLACEHOLDER]</div>}
      </div>

      <div className="p-2 bg-black/50 flex items-center space-x-2">
        <span>← Replay</span>
        <input type="range" className="flex-1 accent-cyan-500" />
        <span>Live →</span>
      </div>
    </div>
  );
}
