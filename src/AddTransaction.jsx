import React, { useState, useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import "./AddTransaction.css";

const AddTransaction = () => {
  const { addTransaction } = useContext(TransactionContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || amount === "" || isNaN(amount)) return; // Prevent invalid entries

    addTransaction(description, parseFloat(amount), type);

    // Reset input fields
    setDescription("");
    setAmount("");
    setType("expense");
  };

  return (
    <div className="transaction-container">
      <h3 className="new-transaction">Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="amount"
          />
        </div>

        <div className="action-group">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="type"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button type="submit" className="add-transaction">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
