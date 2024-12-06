import MapView from './components/MapView';
import ComparisonFeed from './components/ComparisonFeed';
import Leaderboard from './components/Leaderboard';
import Sidebar from './components/Sidebar';
import ComparisonWidget from './components/ComparisonWidget';
import PredictionsWidget from './components/PredictionsWidget';
import CommunityFeed from './components/CommunityFeed';

export default async function Page() {
  
  const eventInfo = { name: "Dakar Rally 2024", stage: "Stage 5" };
  const highlightCompetitor = 302; 
 const leaderboardData = [
  {
    pos: 1,
    num: 301,
    name: "N. Al-Attiyah",
    class: "Car",
    stageTime: "2:13:45",
    overallTime: "12:45:30",
    gap: "--",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 12,        // 12 meters deviation
    consistencyScore: 95,      // Very consistent
    lastCheckpointTrend: "gaining", // Gaining time at last WP compared to previous

    lastWPs: [
      { wp: 1, time: "0:30:00", avgSpeed: "100 km/h" },
      { wp: 2, time: "1:00:00", avgSpeed: "102 km/h" },
      { wp: 3, time: "1:30:00", avgSpeed: "95 km/h" },
      { wp: 4, time: "1:45:00", avgSpeed: "98 km/h" },
      { wp: 5, time: "2:00:00", avgSpeed: "101 km/h" },
      { wp: 6, time: "2:13:45", avgSpeed: "100 km/h" }
    ],
    events: []
  },
  {
    pos: 2,
    num: 302,
    name: "S. Peterhansel",
    class: "Car",
    stageTime: "2:14:10",
    overallTime: "12:46:20",
    gap: "+0:25",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 25,       
    consistencyScore: 88,      // Slightly less consistent due to navigation error
    lastCheckpointTrend: "losing", // Lost some time at last WP

    lastWPs: [
      { wp: 1, time: "0:30:20", avgSpeed: "99 km/h" },
      { wp: 2, time: "1:01:00", avgSpeed: "101 km/h" },
      { wp: 3, time: "1:31:30", avgSpeed: "90 km/h" },
      { wp: 4, time: "1:46:00", avgSpeed: "93 km/h" },
      { wp: 5, time: "2:01:10", avgSpeed: "96 km/h" },
      { wp: 6, time: "2:14:10", avgSpeed: "95 km/h" }
    ],
    events: [
      { type: "Navigation Error", description: "Lost 30s at WP3" }
    ]
  },
  {
    pos: 3,
    num: 101,
    name: "T. Price",
    class: "Bike",
    stageTime: "2:20:00",
    overallTime: "13:00:00",
    gap: "+6:15",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 40,       
    consistencyScore: 80,      
    lastCheckpointTrend: "losing", // Falling a bit behind leader pace

    lastWPs: [
      { wp: 1, time: "0:31:00", avgSpeed: "94 km/h" },
      { wp: 2, time: "1:03:00", avgSpeed: "97 km/h" },
      { wp: 3, time: "1:35:00", avgSpeed: "89 km/h" },
      { wp: 4, time: "1:50:00", avgSpeed: "92 km/h" },
      { wp: 5, time: "2:05:00", avgSpeed: "95 km/h" },
      { wp: 6, time: "2:20:00", avgSpeed: "93 km/h" }
    ],
    events: [
      { type: "Mechanical Issue", description: "Minor engine trouble at WP2" }
    ]
  },
  {
    pos: 4,
    num: 102,
    name: "S. Sunderland",
    class: "Bike",
    stageTime: "2:22:10",
    overallTime: "13:05:00",
    gap: "+8:25",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 33,
    consistencyScore: 85,
    lastCheckpointTrend: "gaining", // Slight improvement at last WP

    lastWPs: [
      { wp: 1, time: "0:32:00", avgSpeed: "95 km/h" },
      { wp: 2, time: "1:04:00", avgSpeed: "94 km/h" },
      { wp: 3, time: "1:37:00", avgSpeed: "88 km/h" },
      { wp: 4, time: "1:52:30", avgSpeed: "91 km/h" },
      { wp: 5, time: "2:07:00", avgSpeed: "93 km/h" },
      { wp: 6, time: "2:22:10", avgSpeed: "92 km/h" }
    ],
    events: [
      { type: "Speed Gain", description: "Improved pace after WP4" }
    ]
  },
  {
    pos: 5,
    num: 501,
    name: "M. Macik",
    class: "Truck",
    stageTime: "2:30:00",
    overallTime: "13:20:00",
    gap: "+16:15",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 50,
    consistencyScore: 75,
    lastCheckpointTrend: "steady", // Neither gaining nor losing significantly at last WP

    lastWPs: [
      { wp: 1, time: "0:35:00", avgSpeed: "90 km/h" },
      { wp: 2, time: "1:10:00", avgSpeed: "91 km/h" },
      { wp: 3, time: "1:45:00", avgSpeed: "85 km/h" },
      { wp: 4, time: "2:00:00", avgSpeed: "88 km/h" },
      { wp: 5, time: "2:15:00", avgSpeed: "90 km/h" },
      { wp: 6, time: "2:30:00", avgSpeed: "87 km/h" }
    ],
    events: []
  },
  {
    pos: 6,
    num: 600,
    name: "G. Farrés",
    class: "SSV",
    stageTime: "2:35:20",
    overallTime: "13:40:00",
    gap: "+21:35",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 60,
    consistencyScore: 70,
    lastCheckpointTrend: "losing",

    lastWPs: [
      { wp: 1, time: "0:36:00", avgSpeed: "89 km/h" },
      { wp: 2, time: "1:12:00", avgSpeed: "87 km/h" },
      { wp: 3, time: "1:48:00", avgSpeed: "92 km/h" },
      { wp: 4, time: "2:03:00", avgSpeed: "85 km/h" },
      { wp: 5, time: "2:19:00", avgSpeed: "88 km/h" },
      { wp: 6, time: "2:35:20", avgSpeed: "86 km/h" }
    ],
    events: [
      { type: "Navigation Error", description: "Lost track near WP4" }
    ]
  },
  {
    pos: 7,
    num: 700,
    name: "M. Andújar",
    class: "Quad",
    stageTime: "2:45:00",
    overallTime: "14:00:00",
    gap: "+31:15",
    currentWP: 6,
    totalWPs: 10,
    routeDeviation: 55,
    consistencyScore: 78,
    lastCheckpointTrend: "steady",

    lastWPs: [
      { wp: 1, time: "0:38:00", avgSpeed: "87 km/h" },
      { wp: 2, time: "1:16:00", avgSpeed: "85 km/h" },
      { wp: 3, time: "1:54:00", avgSpeed: "86 km/h" },
      { wp: 4, time: "2:10:00", avgSpeed: "88 km/h" },
      { wp: 5, time: "2:28:00", avgSpeed: "89 km/h" },
      { wp: 6, time: "2:45:00", avgSpeed: "88 km/h" }
    ],
    events: [
      { type: "Puncture", description: "Flat tire at WP2" }
    ]
  },
  {
    pos: 8,
    num: 303,
    name: "C. Sainz",
    class: "Car",
    stageTime: "1:45:00",
    overallTime: "12:50:00",
    gap: "+5:00",
    currentWP: 4,
    totalWPs: 10,
    routeDeviation: 22,
    consistencyScore: 90,
    lastCheckpointTrend: "gaining",

    lastWPs: [
      { wp: 1, time: "0:30:30", avgSpeed: "97 km/h" },
      { wp: 2, time: "1:02:00", avgSpeed: "99 km/h" },
      { wp: 3, time: "1:25:00", avgSpeed: "92 km/h" },
      { wp: 4, time: "1:45:00", avgSpeed: "94 km/h" }
    ],
    events: []
  },
  {
    pos: 9,
    num: 304,
    name: "Y. Al-Rajhi",
    class: "Car",
    stageTime: "2:05:00",
    overallTime: "12:55:00",
    gap: "+9:30",
    currentWP: 5,
    totalWPs: 10,
    routeDeviation: 30,
    consistencyScore: 85,
    lastCheckpointTrend: "steady",

    lastWPs: [
      { wp: 1, time: "0:31:00", avgSpeed: "98 km/h" },
      { wp: 2, time: "1:03:30", avgSpeed: "95 km/h" },
      { wp: 3, time: "1:30:00", avgSpeed: "90 km/h" },
      { wp: 4, time: "1:47:00", avgSpeed: "93 km/h" },
      { wp: 5, time: "2:05:00", avgSpeed: "94 km/h" }
    ],
    events: []
  },
  {
    pos: 10,
    num: 305,
    name: "G. De Villiers",
    class: "Car",
    stageTime: "2:50:00",
    overallTime: "13:10:00",
    gap: "+24:30",
    currentWP: 7,
    totalWPs: 10,
    routeDeviation: 45,
    consistencyScore: 82,
    lastCheckpointTrend: "gaining",

    lastWPs: [
      { wp: 1, time: "0:35:00", avgSpeed: "96 km/h" },
      { wp: 2, time: "1:07:00", avgSpeed: "94 km/h" },
      { wp: 3, time: "1:40:00", avgSpeed: "89 km/h" },
      { wp: 4, time: "2:00:00", avgSpeed: "90 km/h" },
      { wp: 5, time: "2:20:00", avgSpeed: "91 km/h" },
      { wp: 6, time: "2:35:00", avgSpeed: "88 km/h" },
      { wp: 7, time: "2:50:00", avgSpeed: "87 km/h" }
    ],
    events: []
  },
  {
    pos: 11,
    num: 306,
    name: "B. Ten Brinke",
    class: "Car",
    stageTime: "1:40:00",
    overallTime: "13:15:00",
    gap: "+29:30",
    currentWP: 3,
    totalWPs: 10,
    routeDeviation: 60,
    consistencyScore: 50, // Low because stopped
    lastCheckpointTrend: "losing", // Not moving, losing ground

    lastWPs: [
      { wp: 1, time: "0:32:00", avgSpeed: "95 km/h" },
      { wp: 2, time: "1:05:00", avgSpeed: "93 km/h" },
      { wp: 3, time: "1:40:00", avgSpeed: "80 km/h" }
    ],
    events: [
      { type: "Stationary", description: "Standing still for last 30 min at WP3" }
    ]
  },
  {
    pos: 12,
    num: 307,
    name: "L. Alvarez",
    class: "Car",
    stageTime: "0:45:00",
    overallTime: "13:30:00",
    gap: "+44:30",
    currentWP: 2,
    totalWPs: 10,
    routeDeviation: 35,
    consistencyScore: 65,
    lastCheckpointTrend: "losing",

    lastWPs: [
      { wp: 1, time: "0:20:00", avgSpeed: "99 km/h" },
      { wp: 2, time: "0:45:00", avgSpeed: "90 km/h" }
    ],
    events: []
  }
];



  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar eventInfo={eventInfo} />
      <main className="flex-1 flex flex-col p-4 space-y-4">

        {/* Header and Main Views */}
        <h1 className="text-2xl font-bold mb-4">Stage Leaderboard</h1>
        <div className="flex flex-col lg:flex-row gap-4 h-[500px]">
          <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden flex flex-col">
            {/* This could be your MapView/Analytics/Video toggler */}
            <MapView /> 
          </div>
          <div className="w-full lg:w-1/3 bg-gray-800 rounded-xl overflow-hidden flex flex-col">
            {/* ComparisonFeed replaces SecondaryFeed */}
            <ComparisonFeed data={leaderboardData} highlightCompetitor={highlightCompetitor} />
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">Stage Leaderboard</h2>
          <Leaderboard data={leaderboardData} />
        </div>

        {/* Additional Widgets */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-gray-800 rounded-xl p-4">
            <ComparisonWidget />
          </div>
          <div className="flex-1 bg-gray-800 rounded-xl p-4">
            <PredictionsWidget />
          </div>
          <div className="flex-1 bg-gray-800 rounded-xl p-4">
            <CommunityFeed />
          </div>
        </div>

      </main>
    </div>
  );
}