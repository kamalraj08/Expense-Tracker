import React, { useState } from "react";
import Balance from "./Balance";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import { TransactionProvider } from "./TransactionContext";
import PieChartPage from "./PieChartPage"; // Updated import
import "./App.css";

const App = () => {
  const [showChart, setShowChart] = useState(false); // Toggle state

  return (
    <TransactionProvider>
      <div className="container">
        <h2 className="header">Expense Tracker</h2>
        {!showChart ? (
          <>
            <Balance />
            <AddTransaction />
            <TransactionList />
          </>
        ) : (
          <PieChartPage /> // Show Pie Chart page instead
        )}

        {/* Button to toggle chart */}
        <button 
          className="chart-toggle-btn" 
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? "Back to Transactions" : "Show Charts"}
        </button>
      </div>
    </TransactionProvider>
  );
};

export default App;
