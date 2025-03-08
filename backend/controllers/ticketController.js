
const asyncHandler = require('express-async-handler')
const Ticket=require('../models/ticketModel')
const User=require('../models/userModels')
  
  const getTickets = asyncHandler(async (req, res) => {
    const user= await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    const ticket= await Ticket.find({user:req.user.id})
    res.status(200).json(ticket)
  })
  const getTicket = asyncHandler(async (req, res) => {
    const user= await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    const ticket= await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !==req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }
    res.status(200).json(ticket)
  })
  const createTickets = asyncHandler(async (req, res) => {
    const {product,description}=req.body
    if(!product||!description){
      res.status(400)
      throw new Error('please add product and description')
    }
    const user= await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
        const ticket= await Ticket.create({
            product,
            description,
            status:'new',
            user:req.user.id
        })

        res.status(201).json(ticket)
    
  })

  const deleteTicket = asyncHandler(async (req, res) => {
    const user= await User.findById(req.user.id) 
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    const ticket= await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !==req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }
    await ticket.deleteOne()
    res.status(201).json({message:'successfully deleted'})
    
  })
  const updateTicket = asyncHandler(async (req, res) => {
    const user= await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    const ticket= await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !==req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }
    const updateTicket= await Ticket.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(updateTicket)
  })
module.exports= {
    createTickets,
    deleteTicket,
    updateTicket,
    getTickets,
    getTicket
}
