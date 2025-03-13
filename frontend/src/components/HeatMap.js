import React, { useEffect, useState } from "react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("heatmapData"));
    return storedData || {};
  });

  useEffect(() => {
    localStorage.setItem("heatmapData", JSON.stringify(heatmapData));
  }, [heatmapData]);

  // Generate heatmap values
  const getHeatmapValues = () => {
    const today = new Date();
    return Array.from({ length: 180 }).map((_, index) => {
      const date = subDays(today, index);
      const dateString = format(date, "yyyy-MM-dd");
      return { date: dateString, count: heatmapData[dateString] || 0 };
    });
  };

  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Your Activity Heatmap
      </h2>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
        <ReactCalendarHeatmap
          startDate={subDays(new Date(), 179)}
          endDate={new Date()}
          values={getHeatmapValues()}
          classForValue={(value) => {
            if (!value || value.count === 0) return "color-empty";
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
        />
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .react-calendar-heatmap {
            width: 800px; /* Set width to 800px */
          }
          /* Light Mode Colors */
          .color-empty {
            fill: #ebedf0;
          }
          .color-scale-1 {
            fill: #9be9a8;
          }
          .color-scale-2 {
            fill: #40c463;
          }
          .color-scale-3 {
            fill: #30a14e;
          }
          .color-scale-4 {
            fill: #216e39;
          }
          /* Dark Mode Colors */
          .dark .color-empty {
            fill: #2d2d2d;
          }
          .dark .color-scale-1 {
            fill: #0e4429;
          }
          .dark .color-scale-2 {
            fill: #006d32;
          }
          .dark .color-scale-3 {
            fill: #26a641;
          }
          .dark .color-scale-4 {
            fill: #39d353;
          }
        `}
      </style>
    </div>
  );
};

export default HeatMap;
