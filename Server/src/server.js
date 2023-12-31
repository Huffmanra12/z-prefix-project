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
//--------------------------------------------------
app.get('/item/:id', async (req, res) => {
  const {id} = req.params
  try{
  const item = await knex('item')
  .select("*")
  .where('item.id', id)

  res.status(200).json(item)
  }catch(err){
    res.status(500).json({message:"Failed to retrieve item."})
  }
})
//------------------------------------------------------------------------
app.get('/users/items/:id', async (req, res) => {
  const {id} = req.params
  try{
    const items = await knex('item')
    .select("*")
    .where('userid', id)

    res.status(200).json(items)
  }catch(err){
    res.status(500).json({message:"Failed to retrieve items."})
  }
})

//All Post Requests
//-------------------------------------------------------------------------
app.post('/register/createUser', async (req, res) => {
  const {last_name, first_name, username, password } = req.body;
  const hashedPass = await bcrypt.hashSync(password, 10)

  try {
    const newUser = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password : hashedPass,
    };

    let addedUser = await knex('users')
      .insert(newUser)
      .returning('*');

    addedUser = addedUser.map(user => {
      delete user.Password;
      return user;
    });

    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).json({ message: "Error adding new user" });
  }
});

//--------------------------------------------------------------------------------
app.post('/login', async (req, res) => {
  const {username, password} = req.body


  try{
    const user = await knex('users')
    .select('id', 'username', 'password')
    .where('username', username)
    .first()

    if(user){
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if(isPasswordValid){
        res.status(201).json({id: user.id, username: user.username, token: 8675309})
      }else{
        res.status(401).json({id: ''})
      }
    }else{
      res.status(401).json({id:''})
    }
  }catch(err){
    res.status(500).json({message: "Failed to find user."})
  }
})

//--------------------------------------------------------------------------------------------
app.post('/item/add', async (req, res) => {
  const {id, quantity, item_name, description} = req.body

  const itemToAdd = {
    userid: id,
    item_name: item_name,
    description: description,
    quantity: quantity
  }

  try{
    const addedItem = await knex('item')
    .insert(itemToAdd)
    .returning("*")
    res.status(200).json(addedItem)
  }catch(err){
    res.status(500).json({message:"Failed to add item."})
  }
})
//All Patch requests
app.patch('/item/update/:id', async (req, res) => {
  const {id} = req.params
  const {item_name, description, quantity} = req.body

  try{
    const itemToUpdate = {}

    if(item_name) itemToUpdate.item_name = item_name;
    if(description) itemToUpdate.description = description;
    if(quantity) itemToUpdate.quantity = quantity;

    const updatedItem = await knex('item')
    .where({id})
    .update(itemToUpdate)
    .returning("*")

    if(!updatedItem.length){
      return res.status(404).json({message:"Item not found."})
    }
    res.status(200).json(updatedItem)
  }catch(err){

    res.status(500).json({message: "Error updating item."})
  }

})

//All delete requests
app.delete('/item/remove/:id', async (req, res) => {
  const {id} = req.params

  try{
    await knex('item')
    .delete()
    .where('id', id)

    res.status(200).json({message: "Item Deleted"})
  }catch(err){
    res.status(200).json({message: "Failed to delete item."})
  }
})

app.listen(port, () => {
  console.log('Express Server Is Up & Running!')
})
