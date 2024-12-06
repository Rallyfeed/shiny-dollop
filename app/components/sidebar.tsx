import Link from 'next/link';

export default function Sidebar({ eventInfo }: { eventInfo?: { name: string; stage: string } }) {
  const info = eventInfo || { name: "Dakar Rally 2024", stage: "Stage 5" };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-850 p-4 space-y-6 border-r border-gray-700">
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">{info.name} &gt; {info.stage}</span>
        <button className="text-sm text-cyan-400 hover:underline">Change</button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Filters</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="checkbox" defaultChecked /> Cars</label></li>
          <li><label><input type="checkbox" defaultChecked /> Bikes</label></li>
          <li><label><input type="checkbox" defaultChecked /> Trucks</label></li>
          <li><label><input type="checkbox" defaultChecked /> Quads</label></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Favorites</h3>
        <ul className="space-y-1 text-sm">
          <li>★ #301 N. Driver</li>
          <li>★ #202 S. Rider</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Event Info</h3>
        <ul className="space-y-1 text-sm">
          <li><Link href="#">Results Archive</Link></li>
          <li><Link href="#">Teams & Sponsors</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Community</h3>
        <button className="w-full bg-cyan-500 text-black py-1 rounded hover:bg-cyan-400 text-sm">Open Live Chat</button>
      </div>
    </aside>
  );
}
