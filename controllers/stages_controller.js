const stages = require('express').Router()
const db = require('../models')
const {Stage, Event} = db
const {Op} = require('sequelize')

//Find ALL stages
stages.get('/', async (req,res)=>{
  try {
    const searchTerm = req.query.name ? req.query.name : ''
    const foundStages = await Stage.findAll({
      order: [
        ['manager', 'ASC'],
        ['name', 'ASC']
      ],
      where: {
        name: {
          [Op.iLike] : `%${searchTerm}%`
        }
      }
    })
    res.status(200).json(foundStages)
  } catch(e){
    res.status(500).json(e)
  }  
})

//Find one Stage
stages.get('/:name', async (req,res)=>{
  const {name} = req.params
  try {
    const foundStage = await Stage.findOne({
      where: {
        name: {
          [Op.iLike] : `%${name}%`
        }
      },
      include: {
        model: Event,
        as: 'events',
        through: {attributes: []}
      },
      order: [
        [{model: Event, as: 'events'}, 'date', 'ASC']
      ]

    })
    if (!foundStage) {
      res.status(404).json({message: 'Could not find'})
    } else {
      res.status(200).json(foundStage)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A Stage
stages.post('/', async (req, res) => {
  try {
      const newStage = await Stage.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new Stage',
          data: newStage
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// UPDATE A Stage
stages.put('/:id', async (req, res) => {
  const {id} = req.params
  try {
      const updatedStage = await Stage.update(req.body, {
          where: {
              Stage_id: id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedStage} Stage(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A Stage
stages.delete('/:id', async (req, res) => {
  try {
      const deletedStages = await Stage.destroy({
          where: {
              Stage_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedStages} Stage(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

module.exports = stages