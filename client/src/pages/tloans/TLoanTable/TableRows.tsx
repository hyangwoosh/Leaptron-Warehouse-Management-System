



function TableRows({rowsData, deleteTableRows, handleChange}) {
    return(
        
        rowsData.map((data, index)=>{
            const {ItemNo, ItemName, BatchNo, Quantity}= data;
            return(
                <tr key={index}>
                <td>
            <input type="text" value={ItemNo} onChange={(e)=>setItems(e.target.value)} name="itemNo" className="form-control"/>
                </td>
                <td><input type="text" value={ItemName}  onChange={(evnt)=>(handleChange(index, evnt))} name="ItemName" className="form-control"/> </td>
                <td><input type="text" value={BatchNo}  onChange={(evnt)=>(handleChange(index, evnt))} name="BatchNo" className="form-control"/> </td>
                <td><input type="number" min="0" value={Quantity}  onChange={(evnt)=>(handleChange(index, evnt))} name="Quantity" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })

    )
    
}
export default TableRows;

