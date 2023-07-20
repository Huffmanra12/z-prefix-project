import {Routes, Route} from 'react-router-dom';
import SelectedItem from '../SelectedItem/SelectedItem.js'
import React, {useState, useEffect} from 'react'
import LoadingScreen from '../Spinner/Spinner.js'
import AllInventory from './AllInventory.js'

export default function AllItems({items, setReload, reload}){
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try{
      if(items.length >= 1){
        setLoading(false)
      }
    }catch{
      setLoading(true)
    }
  }, [items])

  if(loading){
    return <LoadingScreen />
  }
  return (
    <Routes>
      <Route path='/' element={<AllInventory items={items}/>}/>
      <Route path=':item/:id' element={<SelectedItem reload={reload} setReload={setReload}/>}/>
    </Routes>
  )
}


