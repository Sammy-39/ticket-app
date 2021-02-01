import TicketForm from './ticket-form'
import TopBar from './top-bar'
import Ticket from './ticket'
import TicketView from './ticket-view'
import Nav from './nav'
import NoTicket from './no-ticket'
import React,{useEffect, useState} from 'react'
import Spinners from './spinners'
import ErrorMsg from './err-msg'
import SuccessMsg from './success-msg'
import ReactPaginate from 'react-paginate'

function App() {

  const baseUrl = `https://ticket-app-db.herokuapp.com/tickets`

  const [showTicketForm,setShowTicketForm] = useState("")
  const [showTicket,setShowTicket] = useState("")
  const [ticket,setTicket] = useState("")
  const [ticketData,setTicketData] = useState([])
  const [copyTicketData,setCopyTicketData] = useState("")
  const [ticketView,setTicketView] = useState("")
  const [showSpinner,setShowSpinner] = useState("")
  const [showErrMsg,setShowErrMsg] = useState("")
  const [showSuccessMsg,setShowSuccessMsg] = useState("")
  const [showNoTicket,setShowNoTicket] = useState("")

  const [offset, setOffset] = useState(0);
  const perPage = useState(5)[0];
  const [pageCount, setPageCount] = useState(0)

  const showAddTicket = () =>{
    setShowTicketForm("1")
    setShowNoTicket("")
  }

  const showTicketList = () =>{
    setShowTicketForm("")
  }

  const showTicketView = () =>{
    setShowTicket("1")
  }

  const closeTicketView = () =>{
    setShowTicket("")
  }

  const searchTicket = (e) =>{
    var val = e.target.value
    setTicketData(copyTicketData.filter((item)=>(
       item.title.toLowerCase().indexOf(val)!==-1 || item.timestamp.indexOf(val)!==-1 
    )))
  }

  const showAll = () =>{
    setTicketData(copyTicketData)
  }

  const showOpen = () =>{
    setTicketData(copyTicketData.filter((item)=>(
      item.status === "Open"
    )))
  }

  const showClosed = () =>{
    setTicketData(copyTicketData.filter((item)=>(
      item.status === "Closed"
    )))
  }

  const saveTicket = async (title,desc) =>{
    try{
      const date = new Date()
      const today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      var data = {
          title,
          desc,
          status: "Open",
          assignedTo: "Default",
          timestamp: today
        }

      var res = await fetch(`${baseUrl}`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
      })

      if(res.statusText==='Created'){
          var resData = await res.json()
          setTicket(resData)
          showTicketList()

          setShowSuccessMsg("Ticket Saved!!")
          setTimeout(()=>{setShowSuccessMsg("")},1500)
        }
      else{
           throw new Error()
        }
    }
    catch{
      setShowErrMsg("Unable to save ticket")
      setTimeout(()=>{setShowErrMsg("")},1500)
    }
}

const getTicketData = async () =>{ 
  setShowSpinner("1")
  try{
    var res = await fetch(`${baseUrl}`)
    var resData = await res.json()
    if(res.statusText==='OK'){
      const dataSlice = resData.slice(offset*perPage, (offset*perPage)+perPage)
      setTicketData(dataSlice)
      setCopyTicketData(dataSlice)

      setPageCount(Math.ceil(resData.length / perPage))
      setShowSpinner("")
    }
    else{
      throw new Error()
    }
  }
  catch{
    setShowSpinner("")
    setShowErrMsg("Unable to get tickets")
    setTimeout(()=>{setShowErrMsg("")},1500)
  }
}

useEffect(()=>{
  if(ticket!==""){
    getTicketData()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[ticket])

useEffect(()=>{
  if(ticketData.length>copyTicketData){
    setCopyTicketData(ticketData)
  }
  if(ticketData.length===0){
    setShowNoTicket("1")
  }
  else{
    setShowNoTicket("")
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[ticketData])

useEffect(()=>{
  getTicketData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const ticketSubmit = (e,title,desc)=>{
    e.preventDefault()
    saveTicket(title,desc)
}

const ViewTicket = (id) =>{
  copyTicketData.forEach((item)=>{
    if(item.id===id) { setTicketView(item) }
  })

  showTicketView()
}

const updateTicket = async (ticketValue) =>{
  const date = new Date()
  const today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  ticketValue.timestamp = today;
  try{
    var res = await fetch(`${baseUrl}/${ticketValue.id}`,{
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(ticketValue)
    })
 
    if(res.statusText==="OK"){
      getTicketData()
      closeTicketView()

      setShowSuccessMsg("Ticket Updated!!")
      setTimeout(()=>{setShowSuccessMsg("")},1500)
    }
    else{
      throw new Error()
    }
  }
  catch{
    setShowErrMsg("Unable to update ticket!!!")
    setTimeout(()=>{setShowErrMsg("")},1500)
  }
}

const deleteTicket = async (id) =>{
  try{
    var res = await fetch(`${baseUrl}/${id}`,{
          method: "DELETE" })

    if(res.statusText==="OK"){
      getTicketData()

      setShowSuccessMsg("Ticket Deleted!!")
      setTimeout(()=>{setShowSuccessMsg("")},1500)
    }
    else{
      throw new Error()
    }
  }
  catch{
    setShowErrMsg("Unable to delete ticket!!!")
    setTimeout(()=>{setShowErrMsg("")},1500)
  }
}

const handlePageClick = (e) =>{
  const selectedPage = e.selected
  setOffset(selectedPage)
}

useEffect(()=>{
  getTicketData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},  [offset] )

  return (
    <div>
      <Nav />
      <div className="container">

      {
        !showTicketForm && !showTicket &&
        <TopBar 
          addTicket={showAddTicket}
          search={(e)=>searchTicket(e)}
          all={showAll}
          open={showOpen}
          closed={showClosed}
        />
      }

      <div className="msg-div">
        { showErrMsg && <ErrorMsg msg={showErrMsg}/> }

        { showSuccessMsg && <SuccessMsg msg={showSuccessMsg}/> }
      </div>

      <div className="spin-div">
        { showSpinner && <Spinners /> }
      </div>

      { showNoTicket && <NoTicket /> }

      {
        showTicketForm && !showTicket &&
        <TicketForm  
          cancelSubmit={showTicketList}
          submit={(e,title,desc)=>ticketSubmit(e,title,desc)}
        />
      }

      {
        !showTicketForm && !showTicket && ticketData.length>0 &&
        <div>
          <h3>Tickets</h3>
          <table className="table table-hover table-responsive-sm 
            table-responsive-md table-responsive-lg mt-3">
            <thead>
              <tr>
                <th scope="col"> # </th>
                <th scope="col"> Title </th>
                <th scope="col"> Status </th>
                <th scope="col"> Assigned To </th>
                <th scope="col"> Updated On </th>
                <th scope="col"> Options </th>
              </tr>
            </thead>
            <tbody>
              {
                ticketData.map((item,index)=>(
                  <Ticket 
                    key={index}
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    status={item.status}
                    assignedTo={item.assignedTo}
                    addedOn={item.timestamp}
                    delete={(id)=>deleteTicket(id)}
                    view={(id)=>ViewTicket(id)}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      }

      {
        showTicket && 
        <TicketView 
        ticket={ticketView} 
        close={closeTicketView}
        update={(ticketValue)=>updateTicket(ticketValue)}
        />
      }
    
       <div className="d-flex justify-content-center">
          <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={""}
                  pageCount={pageCount}
                  marginPagesDisplayed={0}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={0}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
       </div>
      </div>
    </div>
  )
}

export default App;
