import LoadingScreen from '../Spinner/Spinner.js'
import {Card, Button} from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'


export default function SelectedItem(){
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState([])
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/item/${id}`)
    .then(res => res.json())
    .then(data => {setSelectedItem(data[0]); setLoading(false);})
  }, [])

  if(loading){
    return <LoadingScreen />
  }else{
    return(
      <Card>
        <p>{selectedItem.item_name}</p>
        <p>{selectedItem.description}</p>
        <p>{selectedItem.quantity}</p>
      </Card>
    )
  }
}