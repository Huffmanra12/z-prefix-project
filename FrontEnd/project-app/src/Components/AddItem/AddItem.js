import { Button, Card, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

export default function AddItem(){
  const [item_name, setItem_Name] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('')
  const userId = Cookies.get('id')
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {

    fetch('http://localhost:8080/item/add', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "item_name": item_name,
        "quantity": quantity,
        "description": description,
        "id": userId
      })
    })
    .then(res => res.json())
    .then(() => {
      setItem_Name('')
      setQuantity(null)
      setDescription('')
      Navigate('/user/items')
    })
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-1/2 border-2">
        <h1 className="text-center">Add Item</h1>
        <div className="flex flex-col gap-2 w-full ml-5 mb-3">
          <label htmlFor="item_name">Item Name</label>
          <textarea
            id="item_name"
            value={item_name}
            rows="3"
            className="w-1/2"
            placeholder="Enter Item Name...."
            onChange={(e) => setItem_Name(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full ml-5 mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            rows="7"
            className="w-3/4"
            placeholder="Enter Description...."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col ml-5 gap-2 mb-5">
          <label htmlFor="quantity" value="DOD ID Number">Quantity</label>
          <input
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            className="w-20"
            required
          />
        </div>
        <div className="flex justify-center mb-5">
          <Button onClick={() => handleSubmit()}>Add</Button>
        </div>
      </div>
    </div>
  )
}
