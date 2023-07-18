const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const port = 8080;
const knex = require('knex')(require('../knexfile.js') ['development'])

app.use(express.json());
app.use(cors())


//All Get Requests
//-------------------------------------------------
app.get('/', (req, res) => {
  res.status(200).send('Server Is Running!')
})
//-------------------------------------------------
app.get('/items', async (req, res) => {
  try{
    const items = await knex('item')
    .select("*")
    res.status(200).json(items)
  }catch(err){
    res.status(500).json({message:"Failed to retrieve items."})
  }
})

app.listen(port, () => {
  console.log('Express Server Is Up & Running!')
})
