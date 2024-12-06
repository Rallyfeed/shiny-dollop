"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface WPData {
  wp: number;
  time: string;
  avgSpeed: string;
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
  routeDeviation: number;       // New KPI
  consistencyScore: number;     // New KPI
  lastCheckpointTrend: string;  // "gaining" | "losing" | "steady"
  lastWPs: WPData[];
  events?: EventData[];
}

export default function Leaderboard({ data }: { data: Competitor[] }) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  // Ensure data is sorted by position
  const sortedData = [...data].sort((a, b) => a.pos - b.pos);

  const toggleRow = (num: number) => {
    setExpandedRows(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const trendColor = (trend: string) => {
    switch (trend) {
      case 'gaining':
        return 'text-green-400';
      case 'losing':
        return 'text-red-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <table className="w-full border-collapse text-sm">
      <thead className="bg-gray-700">
        <tr>
          <th className="text-left p-2"></th>
          <th className="text-left p-2">Pos</th>
          <th className="text-left p-2">Num</th>
          <th className="text-left p-2">Name</th>
          <th className="text-left p-2">Class</th>
          <th className="text-left p-2">Stage Time</th>
          <th className="text-left p-2">Overall Time</th>
          <th className="text-left p-2">Gap</th>
          <th className="text-left p-2">WP Progress</th>
          <th className="text-left p-2">Deviation (m)</th>
          <th className="text-left p-2">Consistency</th>
          <th className="text-left p-2">Trend</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => {
          const isExpanded = expandedRows[row.num] || false;
          const progressPercent = (row.currentWP / row.totalWPs) * 100;

          return (
            <React.Fragment key={row.num}>
              <tr className={i === 0 ? "bg-cyan-900/50 border-b border-gray-600" : "border-b border-gray-600"}>
                <td className="p-2">
                  <button onClick={() => toggleRow(row.num)} className="focus:outline-none">
                    {isExpanded ? <ChevronUpIcon className="h-4 w-4 text-gray-200" /> : <ChevronDownIcon className="h-4 w-4 text-gray-200" />}
                  </button>
                </td>
                <td className="p-2">{row.pos}</td>
                <td className="p-2">#{row.num}</td>
                <td className="p-2">{row.name}</td>
                <td className="p-2">{row.class}</td>
                <td className="p-2">{row.stageTime}</td>
                <td className="p-2">{row.overallTime}</td>
                <td className="p-2">{row.gap}</td>
                <td className="p-2 w-48">
                  <div className="flex flex-col">
                    <div className="w-full bg-gray-600 h-2 rounded">
                      <div className="bg-cyan-500 h-full rounded" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <span className="text-gray-400 text-xs mt-1">
                      WP {row.currentWP}/{row.totalWPs}
                    </span>
                  </div>
                </td>
                <td className="p-2">{row.routeDeviation}</td>
                <td className="p-2">{row.consistencyScore}</td>
                <td className={`p-2 font-semibold ${trendColor(row.lastCheckpointTrend)}`}>
                  {row.lastCheckpointTrend}
                </td>
              </tr>
              {isExpanded && (
                <tr className="bg-gray-800">
                  <td colSpan={12} className="p-4">
                    <h4 className="font-semibold mb-2">Recent WP Data for #{row.num} ({row.name})</h4>
                    <table className="w-full text-sm border-collapse">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="p-2 text-left">WP</th>
                          <th className="p-2 text-left">Time</th>
                          <th className="p-2 text-left">Avg Speed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {row.lastWPs.map((wpData, idx) => (
                          <tr key={idx} className="border-b border-gray-600">
                            <td className="p-2">WP{wpData.wp}</td>
                            <td className="p-2">{wpData.time}</td>
                            <td className="p-2">{wpData.avgSpeed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {row.events && row.events.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Events</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {row.events.map((event, eventIdx) => (
                            <li key={eventIdx}>{event.type}: {event.description}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
