import React, { createContext, useReducer, useEffect } from "react";

// Create Transaction Context
const TransactionContext = createContext();

// Reducer function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const newStateAdd = [...state, action.payload];
      localStorage.setItem("transactions", JSON.stringify(newStateAdd)); // Save to localStorage
      return newStateAdd;

    case "DELETE_TRANSACTION":
      const newStateDelete = state.filter(transaction => transaction.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(newStateDelete)); // Save to localStorage
      return newStateDelete;

    default:
      return state;
  }
};

// Transaction Provider Component
const TransactionProvider = ({ children }) => {
  // Retrieve stored transactions from localStorage safely
  const getStoredTransactions = () => {
    const storedData = localStorage.getItem("transactions");
    try {
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing transactions from localStorage:", error);
      return [];
    }
  };

  const [transactions, dispatch] = useReducer(transactionReducer, getStoredTransactions());

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Function to add a transaction
  const addTransaction = (description, amount, type) => {
    if (!description || isNaN(amount) || amount === 0) return; // Prevent empty or invalid transactions

    const newTransaction = {
      id: Date.now(),
      text: description,
      amount: type === "expense" ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)), // Ensure correct sign
      type,
    };
    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
  };

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, TransactionContext };
