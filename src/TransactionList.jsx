import React, { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import { Trash2 } from "lucide-react"; // Import trash icon
import "./TransactionList.css";

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  return (
    <div className="transaction-list">
      <h3 className="transaction-history">Transaction History</h3>

      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions added yet.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => {
            if (!transaction || typeof transaction.amount !== "number") {
              console.error("Invalid transaction:", transaction);
              return null; // Skip rendering if transaction is invalid
            }

            const isExpense = transaction.amount < 0;
            const displayAmount = isExpense
              ? `- $${Math.abs(transaction.amount)}`
              : `$${transaction.amount}`;

            return (
              <li
                key={transaction.id}
                className={`transaction-item ${isExpense ? "expense" : "income"}`}
              >
                <span>
                  {transaction.text} : <strong>{displayAmount}</strong>
                </span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(transaction.id)}
                  aria-label="Delete transaction"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
