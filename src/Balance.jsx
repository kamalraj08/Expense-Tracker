import React, { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import "./Balance.css";

const Balance = () => {
  const { transactions } = useContext(TransactionContext);

  // Calculate the balance correctly
  const balance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="balance">
      <h3>Balance</h3>
      <h1>${balance.toFixed(2)}</h1>
    </div>
  );
};

export default Balance;
