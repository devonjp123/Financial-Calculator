"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [initialAmount, setInitialAmount] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [annualInterest, setAnnualInterest] = useState(5); // percentage
  const [years, setYears] = useState(10);
  

  const calculateFutureValue = () => {
    const monthlyRate = annualInterest / 100 / 12;
    const months = years * 12;
    const futureValue =
      initialAmount * Math.pow(1 + monthlyRate, months) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return futureValue.toFixed(2);
  };
  const chartData = Array.from({ length: years + 1 }, (_, year) => {
  const months = year * 12;
  const monthlyRate = annualInterest / 100 / 12;

  const value =
    initialAmount * Math.pow(1 + monthlyRate, months) +
    monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return {
    year,
    value: Math.round(value),
  };
});

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
     <div className="bg-blue-900 text-white p-6 rounded-lg mb-6">
     <h1 className="text-5xl text-center font-bold">Investment Calculator</h1>
      <p className="text-xl text-center mt-2">
          See where your money is headed.
      </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Starting Investment</label> 
         <input type="number"
         value={initialAmount}
         onChange={(e) => setInitialAmount(parseFloat(e.target.value))}
         className="w-full p-2 border rounded"
        />
        </div>
        <div>
          <label className="block">Monthly Contribution:</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Expected Annual Return (%):</label>
          <input
            type="number"
            value={annualInterest}
            onChange={(e) => setAnnualInterest(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Years Invested:</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-6 p-4 bg-gray-100 rounded">
         <div className="text-center">
          <h2 className="text-lg text-gray-600">
            Future Portfolio Value
          </h2>

          <p className="text-5xl font-bold mt-2">
            $
            {Math.round(
            Number(calculateFutureValue())
            ).toLocaleString()}
          </p>
        </div>
        </div>
        <div className="mt-8 h-80 p-4 bg-white border rounded">
  <h2 className="text-xl font-bold mb-4">
    Projected Growth
  </h2>

  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis
        tickFormatter={(value) => value.toLocaleString()} />
      <Tooltip
        content={({ active, payload }) => {
        if (active && payload && payload.length) {
        return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <div className="text-3xl font-bold text-blue-900">
            $
            {payload[0].value?.toLocaleString()}
          </div>

          <div className="text-gray-500 mt-1">
            {payload[0].payload.year} Years
          </div>
        </div>
      );
    }

    return null;
  }}
/>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#1e40af"
        strokeWidth={3}
        dot={false}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
      </div>
    </main>
  );
}