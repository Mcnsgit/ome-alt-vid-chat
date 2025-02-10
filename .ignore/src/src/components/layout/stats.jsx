export const Stats = () => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <p className="text-3xl font-bold text-indigo-500">2,547</p>
          <p className="text-gray-400">Active Users</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-indigo-500">1,234</p>
          <p className="text-gray-400">Current Matches</p>
        </div>
      </div>
    </div>
  );
};
