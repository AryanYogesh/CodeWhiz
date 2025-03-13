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
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Your Progress Map 📈
      </h2>

      {/* Heatmap */}
      <div className="w-full flex justify-center overflow-x-auto">
        <ReactCalendarHeatmap
          startDate={subDays(new Date(), 179)}
          endDate={new Date()}
          values={getHeatmapValues()}
          gutterSize={6} // More space between boxes
          showWeekdayLabels
          weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          horizontal={true}
          transformDayElement={(rect) => {
            return React.cloneElement(rect, {
              width: 16, // Larger size for better visibility
              height: 16,
              rx: 4,
              ry: 4,
            });
          }}
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
            width: 100%; /* Ensure it fits container */
            max-width: 750px; /* Prevent excessive stretching */
          }
          /* Weekday Labels Styling */
          .react-calendar-heatmap .react-calendar-heatmap-weekday-labels {
            font-size: 12px;
            fill: #6b7280;
          }
          .dark .react-calendar-heatmap .react-calendar-heatmap-weekday-labels {
            fill: #d1d5db;
          }
          /* Heatmap Colors */
          .color-empty {
            fill: #e5e7eb;
          }
          .color-scale-1 {
            fill: #cce5ff;
          }
          .color-scale-2 {
            fill: #66b2ff;
          }
          .color-scale-3 {
            fill: #007bff;
          }
          .color-scale-4 {
            fill: #004085;
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
