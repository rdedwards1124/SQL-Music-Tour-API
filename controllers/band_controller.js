const bands = require('express').Router()
const db = require('../models')
const {Band} = db
const {Op} = require('sequelize')

//Find ALL bands
bands.get('/', async (req,res)=>{
  try {
    const searchTerm = req.query.name ? req.query.name : ''
    const foundBands = await Band.findAll({
      order: [
        ['available_start_time', 'ASC'],
        ['name', 'ASC']
      ],
      where: {
        name: {
          [Op.iLike] : `%${searchTerm}%`
        }
      }
    })
    res.status(200).json(foundBands)
  } catch(e){
    res.status(500).json(e)
  }  
})

//Find one band
bands.get('/:id', async (req,res)=>{
  const {id} = req.params
  try {
    const foundBand = await Band.findOne({
      where: {band_id: id}
    })
    if (!foundBand) {
      res.status(404).json({message: 'Could not find'})
    } else {
      res.status(200).json(foundBand)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
  try {
      const newBand = await Band.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new band',
          data: newBand
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
  const {id} = req.params
  try {
      const updatedBand = await Band.update(req.body, {
          where: {
              band_id: id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedBand} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
  try {
      const deletedBands = await Band.destroy({
          where: {
              band_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

module.exports = bands

