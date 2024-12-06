export default function ComparisonWidget() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Comparison</h3>
      <div className="flex space-x-2 mb-2">
        <select className="bg-gray-700 border border-gray-600 text-white p-1">
          <option>#301 N. Driver</option>
          <option>#202 S. Rider</option>
          <option>#405 M. Pilot</option>
        </select>
        <select className="bg-gray-700 border border-gray-600 text-white p-1">
          <option>#202 S. Rider</option>
          <option>#301 N. Driver</option>
          <option>#405 M. Pilot</option>
        </select>
      </div>
      <div className="text-sm text-gray-300">Speed last 10km: #301 (110km/h) vs #202 (108km/h)</div>
    </div>
  );
}
