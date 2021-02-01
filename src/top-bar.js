import { useState } from "react"

function TopBar(props){
    const [val,setVal] = useState("")
    const [filterValue,setFilterValue] = useState("All")

    const changeAndSearch = (e) =>{
        setVal(e.target.value)

        props.search(e)
    }

    const showAll = (e) =>{
        setFilterValue(e.target.innerText)

        props.all()
    }

    const showOpen = (e) =>{
        setFilterValue(e.target.innerText)

        props.open()
    }

    const showClosed = (e) =>{
        setFilterValue(e.target.innerText)

        props.closed()
    }

    return(
        <div className="mt-4 mb-3 top-bar">
            <form className="form-group col-12 col-sm-10 col-md-8 col-lg-8">
                <input type="text" 
                       className="form-control" 
                       value={val} 
                       id="search-ip"
                       placeholder="Search Request"
                       onChange={(e)=>changeAndSearch(e)} 
                />
            </form>
            
            <div className="top-btns">
                <div className="dropdown mr-3">
                    <button className="btn btn-info dropdown-toggle" type="button" id="filter-btns" data-toggle="dropdown"> 
                        {filterValue}
                    </button>
                    <div className="dropdown-menu">
                        <button type="button" className="dropdown-item" onClick={(e)=>showAll(e)}> All </button>
                        <button type="button" className="dropdown-item" onClick={(e)=>showOpen(e)}> Open </button>
                        <button type="button" className="dropdown-item" onClick={(e)=>showClosed(e)}> Closed </button>
                    </div>
                </div>

                <div className="add-btn">
                    <button type="button" className="btn btn-warning" onClick={props.addTicket}> Add + </button>
                </div>
            </div>
        </div>
    )
} 

export default TopBar