import {useState} from 'react'

function TicketView(props){
    const id = useState(props.ticket.id)[0]

    const [title,setTitle] = useState(props.ticket.title)

    const [desc,setDesc] = useState(props.ticket.desc)

    const [status,setStatus] = useState(props.ticket.status)

    const [assignedTo,setAssignedTo] = useState(props.ticket.assignedTo)

    const ticketUpdate = (e) =>{
        e.preventDefault()
        props.update({id,title,desc,status,assignedTo})
    }

    return(
        <div className="my-5 ticket-form">
            <div className="d-flex flex-wrap justify-content-between mb-4">
                <h3 className="mb-3 mr-3"> Ticket ID: {props.ticket.id} </h3>
                <h6> Updated On: {props.ticket.timestamp}  </h6>
            </div>
            <form onSubmit={(e)=>ticketUpdate(e)}>
                <div className="form-row">
                    <div className="form-group col-6">
                        <label htmlFor="title"> Title </label>
                        <input type="text" className="form-control" id="title" required value={title} onChange={(e)=>(setTitle(e.target.value))}/>
                    </div>
                </div>

                <div className="form-row flex-wrap">
                    <div className="form-group mr-4">
                        <label htmlFor="status"> Status </label>
                        <select className="form-control" id="status" value={status} onChange={(e)=>(setStatus(e.target.value))}>
                            <option value="Open"> Open </option>
                            <option value="Closed"> Closed </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="assigned-to"> Assigned To </label>
                        <input type="text" className="form-control" id="assigned-to" required value={assignedTo} onChange={(e)=>(setAssignedTo(e.target.value))}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-10">
                        <label htmlFor="desc">Description</label>
                        <textarea className="form-control" id="desc" rows="6" required value={desc} onChange={(e)=>(setDesc(e.target.value))}></textarea>
                    </div>
                </div>     
            
                <div className="update-btns mt-4"> 
                    <button type="submit" className="btn btn-success mr-3"> Update </button>
                    <button type="button" className="btn btn-success" onClick={props.close}> Back </button>
                </div>
            </form>
        </div>
    )
}

export default TicketView