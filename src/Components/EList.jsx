import React from "react";
import '../Style/EList.css';
const EList = (props) => {
    const DATE = (DateString) => {
        const date = new Date(DateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return {day, month, year};
   }
   const HandleEdit = (id) => {
    const SelectedItem = JSON.parse(localStorage.getItem(id));
    props.onEdit(SelectedItem)
   }
    return(
<>
        <div className="LIST_BOX_MAIN">
            {
                props.value.map((item, index)=>{
                    const {day, month, year} = DATE(item.date);
                    return(
                        <div key={index} className="LIST_BOX_U">
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{`${day} - ${month} - ${year}`}</p>
                            <button onClick={()=>props.onDelete(item.id)}>DEL</button>
                            <button onClick={()=>HandleEdit(item.id)}>UPD</button>
                        </div>
                    );
                })
            }
        </div>
</>        
    );
}
export default EList;