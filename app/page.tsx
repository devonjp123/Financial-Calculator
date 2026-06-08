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
    const months = Math.max(0, years * 12);
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
    <main className="min-h-screen p-8 w-full">
     <div className="bg-blue-400 text-white p-6 rounded-lg mb-6">
     <h1 className="text-5xl text-center text-black font-bold">Investment Calculator</h1>
      <p className="text-xl text-center text-gray-800 mt-2">
          See where your money is headed.
      </p>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start w-full">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Starting Investment</label> 
          <input
            type="number"
            value={initialAmount}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setInitialAmount(Number(e.target.value) || 0)}
            className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Monthly Contribution:</label>
            <input
              type="number"
              value={monthlyContribution}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Expected Annual Return (%):</label>
            <input
              type="number"
              value={annualInterest}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setAnnualInterest(Number(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Years Invested:</label>
            <input
              type="number"
              value={years}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-6 p-4 bg-yellow-200 rounded">
          <div className="text-center">
        </div>

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
            cursor={false}
            content={({ active, payload }) => {
            if (active && payload && payload.length) {
            return (
          <div className="h-[500px] p-6 bg-white border rounded-xl shadow-lg w-full h-fit">
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