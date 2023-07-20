import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoadingScreen from '../Spinner/Spinner.js'
import SelectedItem from '../SelectedItem/SelectedItem.js'
import ManagerInventroy from './ManagerInventory.js'




export default function ManagerContent ({reload, setReload}){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = Cookies.get('id')

    fetch(`http://localhost:8080/users/items/${userId}`)
    .then(res => res.json())
    .then(data => {setItems(data); setLoading(false)})
  }, [reload])

  if(loading){
    return <LoadingScreen />
  }
  return (
    <Routes>
      <Route path='/' element={<ManagerInventroy items={items}/>}/>
      <Route path=':item/:id' element={<SelectedItem reload={reload} setReload={setReload}/>}/>
    </Routes>
  )
}