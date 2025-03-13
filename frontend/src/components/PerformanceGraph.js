import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const PerformanceGraph = () => {
  const [view, setView] = useState("weekly"); // Toggle between weekly and monthly view
  const [data, setData] = useState([]);

  useEffect(() => {
    generateData();
  }, [view]);

  const generateData = () => {
    const today = new Date();
    const generatedData = [];
    
    for (let i = (view === "weekly" ? 6 : 29); i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      generatedData.push({ date: formattedDate, solved: Math.floor(Math.random() * 5) });
    }
    
    setData(generatedData);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Performance Graph 📊
        </h2>
        <select
          className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {view === "weekly" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="solved" stroke="#1d4ed8" strokeWidth={3} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip />
            <Bar dataKey="solved" fill="#3b82f6" barSize={30} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceGraph;
