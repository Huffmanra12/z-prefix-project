import LoadingScreen from '../Spinner/Spinner.js'
import {Card, Button} from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {ImPencil} from "react-icons/im"
import { DiBitbucket } from "react-icons/di";
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'




export default function SelectedItem({reload, setReload}){
  const [loading, setLoading] = useState(true)
  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [isDisabled, setIsDisabled] = useState(true)
  const [userValidated, setUserValidated] = useState(false)
  const {id} = useParams();
  const Navigate = useNavigate()



  const onSubmit = () => {
    fetch(`http://localhost:8080/item/update/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "item_name": itemName,
        "quantity": quantity,
        "description": itemDesc,
      })
    })
    .then(res => res.json())
    .then(() => {
      setIsDisabled(true)
    })
  }

  const removeItem = () => {
    fetch(`http://localhost:8080/item/remove/${id}`, {method: "DELETE"})
    .then(res => res.json())
    .then(() => {setReload(!reload); Navigate('/user/items')})
  }

  useEffect(() => {

    const userId = Cookies.get('id')
    if(userId){
      setUserValidated(true)
    }
    fetch(`http://localhost:8080/item/${id}`)
    .then(res => res.json())
    .then(data => {setItemName(data[0].item_name); setItemDesc(data[0].description); setQuantity(data[0].quantity); setLoading(false);})
  }, [])

  if(loading){
    return <LoadingScreen />
  }else{
    return(
      <div className="flex justify-center">
        <Card className="w-3/4">
          <div className="flex justify-end">
            {userValidated && (
            <div className="flex gap-10">
            <ImPencil className="cursor-pointer" onClick={() => setIsDisabled(false)}/>
            <DiBitbucket className="cursor-pointer" onClick={() => removeItem()}/>
            </div>
            )}
          </div>
          <div className="flex flex-col">
          <label htmlFor="item_name">Item Name</label>
            <textarea
              id="item_name"
              value={itemName}
              rows="3"
              className="w-1/2"
              placeholder="Enter Item Name...."
              onChange={(e) => setItemName(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="flex flex-col">
          <label htmlFor="itemDesc">Description</label>
            <textarea
              id="itemDesc"
              value={itemDesc}
              rows="3"
              className="w-1/2"
              onChange={(e) => setItemDesc(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="quantity" value="DOD ID Number">Quantity</label>
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              className="w-20"
              disabled={isDisabled}
            />
          </div>
          {!isDisabled && (<div className="flex justify-center"><Button className="w-fit" onClick={() => onSubmit()}>Submit</Button></div>)}
        </Card>
      </div>
    )
  }
}