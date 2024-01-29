import React, { useEffect, useState } from "react";
import '../Style/ExpenseFilter.css';
const ExpenseFilter = (props) => {
    const [SelectedYear, SetSelectedYear] = useState("All");
    //Calculate Total Amount Accoridng To The Selected Year Value
    const [TotalAmount, SetTotalAmount] = useState(0);
    //Add Logic To Show The Year
    const HandleYearChange = (year) => {
        SetSelectedYear(year);
    }
    useEffect(() => {
        props.OnFilterChange(SelectedYear);
        //Calculate Total Value
        const totalAmount = SelectedYear === "All" ?
            props.ExpenseData.reduce((total, expense) => total + parseInt(expense.price), 0)
            :
            props.ExpenseData
                .filter(expense => new Date(expense.date).getFullYear().toString() === SelectedYear)
                .reduce((total, expense) => total + parseInt(expense.price), 0);
        SetTotalAmount(totalAmount);
    }, [SelectedYear, props.OnFilterChange, props.ExpenseData])
    return (
        <>
            <div className="EXPENSE_FILTER_BOX">
                <div className="TOTAL_AM_BOX">
                    <label className="EXP_LBL">Filter By Year:</label>
                    <select className="OPT" value={SelectedYear} onChange={(e) => HandleYearChange(e.target.value)}>
                        <option value="All">All</option>
                        {
                            props.years.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="TOTAL_AM_BOX">
                    <p className="TM">Total Amount : {TotalAmount}</p>
                    <p className="TM1">Total Amount Of {SelectedYear} : {TotalAmount}</p>
                </div>
            </div>
        </>
    );
}
export default ExpenseFilter;