export default function BasicDataCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Revenue</h3>
            <p className="text-sm text-gray-500">Monthly earnings</p>
          </div>
        </div>
        <span className="text-green-500 text-sm font-semibold px-2 py-1 bg-green-100 rounded">
          +12.5%
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold">$24,580</div>
          <p className="text-sm text-gray-500">Current month</p>
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Target</span>
            <span className="font-semibold">$25,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Month</span>
            <span className="font-semibold">$21,840</span>
          </div>
        </div>
      </div>
    </div>
  );
}
