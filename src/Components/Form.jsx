import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import '../Style/Form.css';
import EList from "./EList";
import ExpenseFilterYear from "./ExpenseFilterYear";
import ExpenseFilter from "./ExpenseFilter";
const Form = () => {
    //AddExpenseButton
    const [DisplayButton, SetDisplayButton] = useState(false);
    const AddExpenseButton = () => {
        SetDisplayButton(true);
        SetIsEditing(false);
    }
    const CancelButton = () => {
        SetDisplayButton(false);
    }
    //Take Value From Input Fields
    const [ExpenseObj, SetExpenseObj] = useState({ id: "", name: "", price: "", date: "" });
    const SendExpense = (event) => {
        SetExpenseObj((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }
    //After Refresh Show The Data From Local Storage To UI
    const [LocalStorageData, SetLocalStorageData] = useState([]);
    useEffect(() => {
        const StoredData = Object.keys(localStorage).map(
            key => JSON.parse(localStorage.getItem(key)));
        SetLocalStorageData(StoredData);
    }, [])

    //Edit Operation
    const [IsEditing, SetIsEditing] = useState(false);
    const HandleEdit = (item) => {
        SetIsEditing(true);
        const filteredData = FilteredYear === "All" ? LocalStorageData : FilteredExpense;
        const editedItem = filteredData.find((data) => data.id === item.id);
        if (editedItem) {
            SetExpenseObj({
              id: editedItem.id,
              name: editedItem.name,
              price: editedItem.price,
              date: editedItem.date,
            });
          }
        SetDisplayButton(true); // Show the form when editing
    }
    //For Calculate Total Send The Data To The ExpenseFilter
    const [ExpenseData, SetExpenseData] = useState([]);

    //After Click On The Submit Button Of The Expense Form
    const SubmitExpense = (event) => {
        event.preventDefault();
        localStorage.setItem(`${ExpenseObj.id}`, JSON.stringify(ExpenseObj));
        SetLocalStorageData([...LocalStorageData, ExpenseObj]);
        SetExpenseObj({id: "", name: "", price: "", date: "" });
        if(IsEditing){
            const UpdateList = LocalStorageData.map((item)=>{
                if(item.id === ExpenseObj.id){
                    return ExpenseObj;
                } return item;
            });
            localStorage.setItem(`${ExpenseObj.id}`, JSON.stringify(ExpenseObj));
            SetLocalStorageData(UpdateList);
        } else {
            localStorage.setItem(`${ExpenseObj.id}`, JSON.stringify(ExpenseObj));
            SetLocalStorageData([...LocalStorageData, ExpenseObj]);
        }
        SetExpenseObj({id: "", name: "", price: "", date: "" });
        SetDisplayButton(false);
        SetIsEditing(false);
    };
    useEffect(() => {
        SetExpenseData(LocalStorageData);
    }, [LocalStorageData]);

    const CurrentYear = new Date().getFullYear();
    //FilterYear Logic & Operation
    const [FilteredYear, SetFilteredYear] = useState("All");
    const HandleFilterChange = (year) => {
        SetFilteredYear(year);
    }
    const DATE = (DateString) => {
        const date = new Date(DateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return { day, month, year };
    };
    const FilteredExpense =
        FilteredYear === "All" ? LocalStorageData :
            LocalStorageData.filter(
                (expense) => new Date(expense.date).getFullYear().toString() === FilteredYear
            );
    //Delete Operation
    const HandleDeleteExpense = (expenseId) => {
        const updateData = LocalStorageData.filter((item) => item.id !== expenseId);
        localStorage.removeItem(expenseId);
        SetLocalStorageData(updateData);
    }
    return (
        <>
            <div className="EXP_FORM">
                {
                    !DisplayButton ?
                        (
                            <div className="EXP_FORM_BUTTON">
                                <button onClick={AddExpenseButton} className="AEBTN">
                                    <FontAwesomeIcon icon={faPlus} size="xl" style={{ color: "#000000", }} />
                                    Add Expense
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="EXP_FORM_BOX_FORM">
                                    <div className="INSIDE_BOX">
                                        <label className="lbl">Expense ID:</label>
                                        <input
                                            type="text"
                                            className="IP"
                                            name="id"
                                            onChange={SendExpense}
                                            value={ExpenseObj.id}
                                        />
                                    </div>
                                    <div className="INSIDE_BOX">
                                        <label className="lbl">Expense Name:</label>
                                        <input
                                            type="text"
                                            className="IP"
                                            name="name"
                                            onChange={SendExpense}
                                            value={ExpenseObj.name}
                                        />
                                    </div>
                                    <div className="INSIDE_BOX">
                                        <label className="lbl">Expense Price:</label>
                                        <input
                                            type="text"
                                            className="IP"
                                            name="price"
                                            onChange={SendExpense}
                                            value={ExpenseObj.price}
                                        />
                                    </div>
                                    <div className="INSIDE_BOX">
                                        <label className="lbl">Expense Date:</label>
                                        <input
                                            type="date"
                                            className="IP"
                                            max={`${CurrentYear}-12-31`}
                                            min="2021-01-01"
                                            name="date"
                                            onChange={SendExpense}
                                            value={ExpenseObj.date}
                                        />
                                    </div>
                                </div>

                                <div className="EXP_FORM_BOX_BUTTON_BOX">
                                    <button onClick={CancelButton} className="CEBTN">
                                        <FontAwesomeIcon icon={faXmark} size="xl" style={{ color: "#000000", }} />
                                        Cancel
                                    </button>
                                    <button onClick={SubmitExpense}>
                                        <FontAwesomeIcon icon={faCheck} size="xl" style={{ color: "#000000", }} />
                                        {IsEditing ? 'Update' : 'Submit'}
                                    </button>
                                </div>
                            </>
                        )
                }
            </div>
            <>
                <ExpenseFilter
                    years={[2021, 2022, 2023, 2024]}
                    OnFilterChange={HandleFilterChange}
                    ExpenseData={ExpenseData}
                />
                {
                    FilteredYear === "All" ? (
                        <EList value={LocalStorageData} onDelete={HandleDeleteExpense} onEdit={HandleEdit} />
                    ) : (
                        <ExpenseFilterYear
                            year={FilteredYear}
                            hasValues={FilteredExpense.length > 0}
                            filteredData={
                                FilteredExpense.map((item) => ({
                                    ...item, ...DATE(item.date),
                                }))
                            }
                            onDelete={HandleDeleteExpense}
                            onEdit={HandleEdit}
                        />
                    )
                }
            </>
        </>
    );
}
export default Form;