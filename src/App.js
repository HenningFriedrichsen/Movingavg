import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./App.css"; // Adding custom styles

function App() {
  const [avgData, setAvgData] = useState(null);
  const [days, setDays] = useState(3);
  const [inst, setInst] = useState("Inst1");

  // Function to fetch the data from the backend
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/movingavg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ days, inst }),
      });

      if (!res.ok) {
        throw new Error("Instrument not found or other error");
      }

      const data = await res.json();
      setAvgData(data);
    } catch (error) {
        setAvgData(null);
    }
  };

  // Prepare data for the chart
  const chartData = avgData && avgData.moving_average ? {
    labels: avgData.dates, // Use the dates from the response as labels for X-axis
    datasets: [
      {
        label: "Moving Average",
        data: avgData.moving_average, // Moving average values (Y-axis)
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false, // No fill under the line
      },
    ],
  } : null;

  return (
    <div className="container">
      {/* Display the chart if data is fetched */}
      {avgData ? (
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      ) : (
        <div></div>
      )}

      {/* Display input fields below after chart */}
      <div className="input-container">
        <h2>Enter new values to get a different moving average</h2>
        <div className="input-field">
          <label>Number of Days:</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            placeholder="Enter number of days"
          />
        </div>
        <div className="input-field">
          <label>Instrument Name:</label>
          <input
            type="text"
            value={inst}
            onChange={(e) => setInst(e.target.value)}
            placeholder="Enter instrument name"
          />
        </div>
        <button onClick={fetchData} className="fetch-btn">Get Moving Average</button>
      </div>
    </div>
  );
}

export default App;
