function Ticket(props){
    const id = props.id
    return(
        <tr>
            <th scope="row"> {props.id} </th>
            <td> {props.title} </td>
            <td> <span className="status"> {props.status} </span> </td>
            <td> {props.assignedTo} </td>
            <td> {props.addedOn} </td>
            <td> 
                <button className="btn btn-warning mr-3 mb-1" onClick={()=>props.view(id)}> View/Update </button> 
                <button className="btn btn-danger mb-1" onClick={()=>props.delete(id)}> Delete </button> 
            </td>   
        </tr>
    )
}

export default Ticket