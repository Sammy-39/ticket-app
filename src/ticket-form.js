import React from 'react'

function TicketForm(props){
    const [title,setTitle] = React.useState("")
    const [desc,setDesc] = React.useState("")

    return(
        <form className="my-5 ticket-form" onSubmit={(e)=>props.submit(e,title,desc)}>
            <div className="mb-4">
                <h3> Add Ticket </h3>
            </div>

            <div className="form-group col-4 mb-4">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className="form-control" required value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            </div>

            <div className="form-group col-10">
                <label htmlFor="desc">Description</label>
                <textarea className="form-control" id="desc" rows="4" required value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
            </div>

            <div className="query-btn col-12 my-5">
                <button type="submit" className="btn btn-info mr-3"> Submit </button>
                <button type="button" className="btn btn-info" onClick={props.cancelSubmit}> Cancel </button>
            </div>    
        </form>
    )
}

export default TicketForm