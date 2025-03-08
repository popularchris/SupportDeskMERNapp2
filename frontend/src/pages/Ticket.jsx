import React from 'react'
import { getTicket,reset,closeTicket} from '../features/tickets/ticketSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useParams ,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
function Ticket() {
  const{ticket,isError,isloading,isSucccess,message}=useSelector((state)=>state.ticket)
  const params=useParams()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const{ticketId}=useParams()
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
     console.log(ticketId)
  },[isError,message,ticketId])
  if(isloading){
    return <Spinner/>
  }
if(isError){
 toast.error(message)
}
const onTicketClose = () => {
  // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
  // isSuccess state
  dispatch(closeTicket(ticketId))
    .unwrap()
    .then(() => {
      toast.success('Ticket Closed')
      navigate('/tickets')
    })
    .catch(toast.error)
}
  return (
    <>
    <BackButton url={'/tickets'}/>
    <div className='ticket-page'>
      <header className='ticket-header'>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
     </div>
     {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </>
  )
}

export default Ticket