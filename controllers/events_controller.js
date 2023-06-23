const events = require('express').Router()
const db = require('../models')
const {Event} = db
const {Op} = require('sequelize')

//Find ALL events
events.get('/', async (req,res)=>{
  try {
    const searchTerm = req.query.name ? req.query.name : ''
    const foundEvents = await Event.findAll({
      order: [
        ['start_time', 'ASC'],
        ['name', 'ASC']
      ],
      where: {
        name: {
          [Op.iLike] : `%${searchTerm}%`
        }
      }
    })
    res.status(200).json(foundEvents)
  } catch(e){
    res.status(500).json(e)
  }  
})

//Find one band
events.get('/:id', async (req,res)=>{
  const {id} = req.params
  try {
    const foundEvent = await Event.findOne({
      where: {event_id: id}
    })
    if (!foundEvent) {
      res.status(404).json({message: 'Could not find'})
    } else {
      res.status(200).json(foundEvent)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A BAND
events.post('/', async (req, res) => {
  try {
      const newEvent = await Event.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new Event',
          data: newEvent
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// UPDATE A BAND
events.put('/:id', async (req, res) => {
  const {id} = req.params
  try {
      const updatedEvent = await Event.update(req.body, {
          where: {
              event_id: id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedEvent} event(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A BAND
events.delete('/:id', async (req, res) => {
  try {
      const deletedEvents = await Event.destroy({
          where: {
              event_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedEvents} event(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

module.exports = events