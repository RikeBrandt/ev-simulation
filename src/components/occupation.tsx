export const OccupationGrid = () => {
  const utilizationData = [2, 2, 5, 6, 10, 12, 1];
  const chargePoints = 20;
  return (
    <div className="grid grid-cols-12 gap-1">
      {utilizationData.map((occupied, hour) => (
        <div key={hour} className="flex flex-col items-center">
          <span className="text-xs">{hour + 6}:00</span>
          <div className="grid grid-cols-5 gap-1">
            {[...Array(chargePoints)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < occupied ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
