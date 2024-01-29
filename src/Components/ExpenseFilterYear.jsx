import React from "react";
const ExpenseFilterYear = (props) => {
  return (
    <div className="EXPENSE_FILTER_YEAR">
      {props.hasValues ? (
        <>
          <h3>Expense data for {props.year}:</h3>
          <div className="LIST_BOX_MAIN">
            {props.filteredData.map((item, index) => (
              <div key={index} className="LIST_BOX_U">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.date}</p>
                <p>{`${item.day} - ${item.month} - ${item.year}`}</p>
                <button onClick={()=>props.onDelete(item.id)}>DEL</button>
                <button onClick={()=>props.onEdit(item.id)}>UPD</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3>No expenses for the year {props.year}</h3>
      )}
    </div>
  );
};
export default ExpenseFilterYear;