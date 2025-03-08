const express=require('express')
const router=express.Router()
const {protect}=require('../middleware/authMidleware.js')
const {createTickets,getTickets,getTicket,updateTicket,deleteTicket}= require('../controllers/ticketController.js')
const noteRoute =require('./noteRoute')
router.use(':ticketId/notes',noteRoute)
 router.route('/').get(protect,getTickets).post(protect,createTickets)
 router.route('/:id').get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket)
 

 module.exports=router