import {Routes, Route} from 'react-router-dom';
import ListBuilder from '../ListBuilder/ListBuilder.js'
import SelectedItem from '../SelectedItem/SelectedItem.js'
import React, {useState, useEffect} from 'react'
import LoadingScreen from '../Spinner/Spinner.js'


export default function Visitor({items}){
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
      <Route path='/' element={<ListBuilder items={items}/>}/>
      <Route path=':item/:id' element={<SelectedItem/>}/>
    </Routes>
  )
}


