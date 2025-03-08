import React from "react"; // Import React

const TransactionItem = ({ transaction, onDelete }) => {
  return (
    <li>
      {transaction.description} - ${transaction.amount} ({transaction.type})
      <button onClick={() => onDelete(transaction.id)}>X</button>
    </li>
  );
};

export default TransactionItem; 
