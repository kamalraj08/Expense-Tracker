import React, { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./PieChartPage.css"; // Add styling if needed

const COLORS = ["#2f9c14", "#db1421"]; // Colors for Income and Expense

const PieChartPage = () => {
  const { transactions } = useContext(TransactionContext);

  // Process transactions to get total income and expenses
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="chart-container">
      <h2>Income vs Expense</h2>
      <div className="responsive-chart">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={150} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: COLORS[0] }}></span>
          Income
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: COLORS[1] }}></span>
          Expense
        </div>
      </div>
    </div>
  );
};

export default PieChartPage;
