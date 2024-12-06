"use client";
import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend);

interface WPData {
  wp: number;
  time: string;     // "H:MM:SS"
  avgSpeed: string; // e.g., "100 km/h"
}

interface EventData {
  type: string;
  description: string;
  icon?: JSX.Element;
}

interface Competitor {
  pos: number;
  num: number;
  name: string;
  class: string;
  stageTime: string;
  overallTime: string;
  gap: string;
  currentWP: number;
  totalWPs: number;
  lastWPs: WPData[];
  events?: EventData[];
}

// Color map for classes
const classColors: Record<string, {border: string; background: string}> = {
  Car: { border: '#FF0000', background: 'rgba(255,0,0,0.2)' },
  Bike: { border: '#00FF00', background: 'rgba(0,255,0,0.2)' },
  Truck: { border: '#0000FF', background: 'rgba(0,0,255,0.2)' },
  SSV: { border: '#FFFF00', background: 'rgba(255,255,0,0.2)' },
  Quad: { border: '#FF00FF', background: 'rgba(255,0,255,0.2)' }
};

interface ComparisonFeedProps {
  data: Competitor[];
  highlightCompetitor?: number; 
}

export default function ComparisonFeed({ data, highlightCompetitor }: ComparisonFeedProps) {
  const [selectedCompetitors, setSelectedCompetitors] = useState<Competitor[]>([]);
  const [viewMode, setViewMode] = useState<'speed' | 'gap'>('speed'); 
  const [gapMode, setGapMode] = useState<'overall' | 'class'>('overall'); // New toggle: overall leader vs class leader gap

  const availableCompetitors = useMemo(() => {
    const selectedNums = new Set(selectedCompetitors.map(c => c.num));
    return data.filter(c => !selectedNums.has(c.num));
  }, [data, selectedCompetitors]);

  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const handleAddCompetitor = () => {
    if (selectedNum !== null) {
      const comp = data.find(d => d.num === selectedNum);
      if (comp) {
        setSelectedCompetitors(prev => [...prev, comp]);
      }
      setSelectedNum(null);
    }
  };

  const parseSpeed = (speedStr: string) => {
    const number = parseFloat(speedStr);
    return isNaN(number) ? 0 : number;
  };

  const timeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    const [h, m, s] = parts.length === 3 ? parts : [0, parts[0], parts[1]]; 
    return h * 3600 + m * 60 + s;
  };

  // Find overall leader = data[0] (lowest pos)
  const overallLeader = data[0];

  // For class leader, we find the best positioned competitor in each class
  const classLeaders = useMemo(() => {
    const leaders: Record<string, Competitor> = {};
    // Sort data by position
    const sorted = [...data].sort((a,b) => a.pos - b.pos);
    for (const comp of sorted) {
      if (!leaders[comp.class]) {
        leaders[comp.class] = comp;
      }
    }
    return leaders;
  }, [data]);

  // Leader WP times for gap calculation
  const leaderWPs = (leader: Competitor) => leader.lastWPs.map(wp => timeToSeconds(wp.time));

  const overallLeaderTimes = leaderWPs(overallLeader);

  const chartData = useMemo(() => {
    if (selectedCompetitors.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Find max WP count among selected
    let maxWPCount = 0;
    selectedCompetitors.forEach(c => {
      if (c.lastWPs.length > maxWPCount) maxWPCount = c.lastWPs.length;
    });

    const labels = Array.from({ length: maxWPCount }, (_, i) => `WP${i + 1}`);

    const datasets = selectedCompetitors.map(c => {
      const isHighlighted = highlightCompetitor === c.num;

      let dataPoints: number[] = [];
      const colorSet = classColors[c.class] || {border: '#FFFFFF', background: 'rgba(255,255,255,0.2)'};

      if (viewMode === 'speed') {
        dataPoints = c.lastWPs.map(wp => parseSpeed(wp.avgSpeed));
      } else {
        // Gap mode
        const leader = (gapMode === 'overall') ? overallLeader : classLeaders[c.class];
        const leaderTimes = leaderWPs(leader);
        dataPoints = c.lastWPs.map((wp, idx) => {
          const competitorTime = timeToSeconds(wp.time);
          const leaderTime = leaderTimes[idx] ?? leaderTimes[leaderTimes.length - 1];
          const gapInSeconds = competitorTime - leaderTime;
          return gapInSeconds / 60; // gap in minutes
        });
      }

      return {
        label: `${c.name} (#${c.num})`,
        data: dataPoints,
        borderColor: isHighlighted ? 'rgb(255, 99, 132)' : colorSet.border,
        backgroundColor: isHighlighted ? 'rgba(255, 99, 132, 0.2)' : colorSet.background,
        tension: 0.3,
        pointRadius: 4,
        borderWidth: isHighlighted ? 3 : 2
      };
    });

    return { labels, datasets };
  }, [selectedCompetitors, highlightCompetitor, viewMode, gapMode, classLeaders, overallLeader]);

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: '#444' }, ticks: { color: '#fff' } },
      y: {
        grid: { color: '#444' },
        ticks: { color: '#fff' },
        title: {
          display: true,
          text: viewMode === 'speed' ? 'Speed (km/h)' : `Gap to ${gapMode === 'overall' ? 'Overall Leader' : 'Class Leader'} (minutes)`,
          color: '#fff'
        }
      }
    },
    plugins: {
      legend: { labels: { color: '#fff' } },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const competitor = selectedCompetitors.find(c => tooltipItem.dataset.label.startsWith(c.name));
            if (!competitor) return tooltipItem.formattedValue;
            const wpIndex = tooltipItem.dataIndex;
            const wpDetail = competitor.lastWPs[wpIndex];
            if (viewMode === 'speed') {
              return `${tooltipItem.dataset.label}: ${wpDetail.time}, ${wpDetail.avgSpeed}`;
            } else {
              const gapMinutes = tooltipItem.formattedValue; 
              return `${tooltipItem.dataset.label}: ${gapMinutes} min behind ${gapMode === 'overall' ? 'overall leader' : 'class leader'}`;
            }
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-700 text-gray-300">
      <div className="p-2 bg-black/50 flex flex-col gap-2">
        <h2 className="font-bold text-white">Comparison</h2>
        {/* View Mode Toggles */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('speed')}
            className={`px-2 py-1 rounded ${viewMode === 'speed' ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-white'}`}
          >
            Speed
          </button>
          <button
            onClick={() => setViewMode('gap')}
            className={`px-2 py-1 rounded ${viewMode === 'gap' ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-white'}`}
          >
            Gap
          </button>
          {viewMode === 'gap' && (
            <>
              <button
                onClick={() => setGapMode('overall')}
                className={`px-2 py-1 rounded ${gapMode === 'overall' ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-white'}`}
              >
                Overall Leader
              </button>
              <button
                onClick={() => setGapMode('class')}
                className={`px-2 py-1 rounded ${gapMode === 'class' ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-white'}`}
              >
                Class Leader
              </button>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <select
            className="bg-gray-800 text-white p-1 border border-gray-600"
            value={selectedNum ?? ''}
            onChange={(e) => setSelectedNum(Number(e.target.value) || null)}
          >
            <option value="">Select Competitor</option>
            {availableCompetitors.map(c => (
              <option key={c.num} value={c.num}>
                #{c.num} {c.name} ({c.class})
              </option>
            ))}
          </select>
          <button
            onClick={handleAddCompetitor}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
        {selectedCompetitors.length > 0 && (
          <div className="text-sm text-gray-200">
            Comparing: {selectedCompetitors.map(c => `#${c.num} ${c.name}`).join(', ')}
          </div>
        )}
      </div>

      <div className="flex-1 relative p-2">
        {selectedCompetitors.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select competitors to visualize their {viewMode === 'speed' ? 'speed' : `gap to ${gapMode} leader`}.
          </div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
