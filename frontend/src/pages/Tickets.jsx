import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getTickets,reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButon from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
    const {tickets,isError,isloading,isSuccess}=useSelector((state)=>state.ticket)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(isSuccess){
            dispatch(getTickets())
        }
    },[dispatch,isSuccess])
    useEffect(()=>{
        dispatch(getTickets())
    },[dispatch])
    if(isloading){
        return <Spinner/>
    }
  return (
  <>
    <BackButon url='/'/>
    <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
</>
  )
}

export default Tickets